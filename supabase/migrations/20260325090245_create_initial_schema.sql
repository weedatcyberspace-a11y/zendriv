/*
  # Create Initial Schema for Zendriv Trading Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `deriv_accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `account_id` (text) - Deriv account ID
      - `account_type` (text) - demo or real
      - `currency` (text)
      - `balance` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `trading_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `default_stake` (numeric)
      - `default_duration` (integer)
      - `default_duration_unit` (text)
      - `favorite_symbols` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create deriv_accounts table
CREATE TABLE IF NOT EXISTS deriv_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  account_id text NOT NULL,
  account_type text NOT NULL DEFAULT 'demo',
  currency text NOT NULL DEFAULT 'USD',
  balance numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE deriv_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own deriv accounts"
  ON deriv_accounts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own deriv accounts"
  ON deriv_accounts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own deriv accounts"
  ON deriv_accounts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own deriv accounts"
  ON deriv_accounts FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create trading_preferences table
CREATE TABLE IF NOT EXISTS trading_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  default_stake numeric DEFAULT 10,
  default_duration integer DEFAULT 5,
  default_duration_unit text DEFAULT 't',
  favorite_symbols jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trading_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trading preferences"
  ON trading_preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own trading preferences"
  ON trading_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own trading preferences"
  ON trading_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
