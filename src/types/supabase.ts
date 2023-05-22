export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          onboarded: boolean
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          onboarded?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          onboarded?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      projects: {
        Row: {
          api_key: string
          credit: number
          id: number
          name: string
          project_id: string
          type: string
          user_id: string
        }
        Insert: {
          api_key: string
          credit?: number
          id?: number
          name: string
          project_id: string
          type?: string
          user_id: string
        }
        Update: {
          api_key?: string
          credit?: number
          id?: number
          name?: string
          project_id?: string
          type?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
