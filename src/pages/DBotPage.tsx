import { ExternalLink } from 'lucide-react';

export const DBotPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DBot</h1>
            <p className="text-gray-600 text-sm">Automated trading bot builder</p>
          </div>
          <a
            href="https://app.deriv.com/bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="flex-1 relative">
        <iframe
          src="https://app.deriv.com/bot"
          className="absolute inset-0 w-full h-full border-0"
          title="DBot - Automated Trading Bot"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};
