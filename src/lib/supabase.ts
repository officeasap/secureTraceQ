import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      driver_codes: {
        Row: {
          id: string;
          code: string;
          card_front_url: string;
          card_back_url: string;
          category: string;
          reference: string;
          departure: string;
          sorting_center: string;
          current_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          code: string;
          card_front_url: string;
          card_back_url: string;
          category: string;
          reference: string;
          departure: string;
          sorting_center: string;
          current_status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      delivery_audit: {
        Row: {
          id: string;
          driver_code_hash: string;
          stage: string;
          status: string;
          timestamp: string;
          owner_email?: string;
          ip_address: string;
          user_agent: string;
          compliance_tags: string[];
          previous_hash: string;
          created_at: string;
        };
        Insert: {
          driver_code_hash: string;
          stage: string;
          status: string;
          timestamp: string;
          owner_email?: string;
          ip_address: string;
          user_agent: string;
          compliance_tags: string[];
          previous_hash: string;
          created_at: string;
        };
      };
      tracking_updates: {
        Row: {
          id: string;
          tracking_code: string;
          previous_status: string;
          new_status: string;
          timestamp: string;
          triggered_by: string;
        };
        Insert: {
          tracking_code: string;
          previous_status: string;
          new_status: string;
          timestamp: string;
          triggered_by: string;
        };
      };
      auth_audit: {
        Row: {
          id: string;
          driver_code_hash: string;
          success: boolean;
          ip_address: string;
          attempt_count: number;
          locked_until?: string;
          created_at: string;
        };
        Insert: {
          driver_code_hash: string;
          success: boolean;
          ip_address: string;
          attempt_count: number;
          locked_until?: string;
          created_at: string;
        };
      };
    };
  };
};