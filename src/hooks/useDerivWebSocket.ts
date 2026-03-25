import { useEffect, useState, useRef, useCallback } from 'react';

interface WebSocketMessage {
  msg_type?: string;
  [key: string]: unknown;
}

export const useDerivWebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [activeSymbols, setActiveSymbols] = useState<unknown[]>([]);
  const [tickData, setTickData] = useState<Record<string, unknown>>({});
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket('wss://api.derivws.com/trading/v1/options/ws/public');

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({
        active_symbols: 'brief',
        req_id: 1
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as WebSocketMessage;

      if (data.msg_type === 'active_symbols') {
        setActiveSymbols((data.active_symbols as unknown[]) || []);
      } else if (data.msg_type === 'tick') {
        const tick = data.tick as Record<string, unknown>;
        setTickData(prev => ({
          ...prev,
          [tick.symbol as string]: tick
        }));
      }
    };

    ws.onerror = () => {
      setConnected(false);
    };

    ws.onclose = () => {
      setConnected(false);
      setTimeout(() => {
        if (wsRef.current === ws) {
          connect();
        }
      }, 3000);
    };

    wsRef.current = ws;
  }, []);

  const subscribeTicks = useCallback((symbols: string[]) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        ticks: symbols,
        subscribe: 1
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    connected,
    activeSymbols,
    tickData,
    subscribeTicks,
  };
};
