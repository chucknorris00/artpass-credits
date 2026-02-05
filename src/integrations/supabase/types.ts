export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          attended_at: string | null
          booked_at: string
          cancelled_at: string | null
          class_id: string
          created_at: string
          credits_used: number
          id: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          attended_at?: string | null
          booked_at?: string
          cancelled_at?: string | null
          class_id: string
          created_at?: string
          credits_used?: number
          id?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          attended_at?: string | null
          booked_at?: string
          cancelled_at?: string | null
          class_id?: string
          created_at?: string
          credits_used?: number
          id?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          art_category: string | null
          created_at: string
          credit_cost: number
          description: string | null
          duration_minutes: number | null
          id: string
          instructor_name: string | null
          is_active: boolean | null
          max_capacity: number
          name: string
          schedule: string
          studio_id: string
          updated_at: string
        }
        Insert: {
          art_category?: string | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          duration_minutes?: number | null
          id?: string
          instructor_name?: string | null
          is_active?: boolean | null
          max_capacity?: number
          name: string
          schedule: string
          studio_id: string
          updated_at?: string
        }
        Update: {
          art_category?: string | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          duration_minutes?: number | null
          id?: string
          instructor_name?: string | null
          is_active?: boolean | null
          max_capacity?: number
          name?: string
          schedule?: string
          studio_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_studio_id_fkey"
            columns: ["studio_id"]
            isOneToOne: false
            referencedRelation: "studios"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_plans: {
        Row: {
          created_at: string
          credits_per_month: number
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          credits_per_month?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_cents?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          credits_per_month?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      payment_history: {
        Row: {
          amount_cents: number
          created_at: string
          credits_purchased: number
          id: string
          payment_method: string | null
          status: string | null
          stripe_payment_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          credits_purchased?: number
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          credits_purchased?: number
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          available_credits: number
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          plan_id: string | null
          updated_at: string
        }
        Insert: {
          available_credits?: number
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          plan_id?: string | null
          updated_at?: string
        }
        Update: {
          available_credits?: number
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          plan_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      studios: {
        Row: {
          address: string
          art_categories: string[] | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          photos: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          art_categories?: string[] | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          photos?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          art_categories?: string[] | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          photos?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_booking: {
        Args: { _booking_id: string; _user_id: string }
        Returns: Json
      }
      create_booking: {
        Args: { _class_id: string; _user_id: string }
        Returns: Json
      }
      get_class_attendees_count: {
        Args: { _class_id: string }
        Returns: number
      }
      get_user_credits: { Args: { _user_id: string }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      booking_status: "booked" | "attended" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      booking_status: ["booked", "attended", "cancelled"],
    },
  },
} as const
