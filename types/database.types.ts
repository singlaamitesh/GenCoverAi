export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      designs: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          price: number
          image_url: string
          style: string
          prompt: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          price: number
          image_url: string
          style: string
          prompt?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string
          style?: string
          prompt?: string | null
          user_id?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: string
          total: number
          shipping_address: Json
          payment_method: string
          payment_status: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: string
          total: number
          shipping_address: Json
          payment_method: string
          payment_status?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: string
          total?: number
          shipping_address?: Json
          payment_method?: string
          payment_status?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          design_id: string | null
          quantity: number
          price: number
          case_type: string
          phone_model: Json
        }
        Insert: {
          id?: string
          order_id: string
          design_id?: string | null
          quantity: number
          price: number
          case_type: string
          phone_model: Json
        }
        Update: {
          id?: string
          order_id?: string
          design_id?: string | null
          quantity?: number
          price?: number
          case_type?: string
          phone_model?: Json
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
