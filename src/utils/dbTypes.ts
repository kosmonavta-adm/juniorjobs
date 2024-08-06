export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      juniors: {
        Row: {
          about: string
          created_at: string
          email: string | null
          full_name: string
          id: number
          is_verified: boolean
          project_url_0: string
          project_url_1: string | null
          project_url_2: string | null
          project_url_3: string | null
          project_url_4: string | null
          tag_0: string
          tag_1: string | null
          tag_2: string | null
          tag_3: string | null
          tag_4: string | null
          tag_5: string | null
          tag_6: string | null
          tag_7: string | null
          tag_8: string | null
          tag_9: string | null
          user_id: string
        }
        Insert: {
          about: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: number
          is_verified?: boolean
          project_url_0: string
          project_url_1?: string | null
          project_url_2?: string | null
          project_url_3?: string | null
          project_url_4?: string | null
          tag_0: string
          tag_1?: string | null
          tag_2?: string | null
          tag_3?: string | null
          tag_4?: string | null
          tag_5?: string | null
          tag_6?: string | null
          tag_7?: string | null
          tag_8?: string | null
          tag_9?: string | null
          user_id?: string
        }
        Update: {
          about?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: number
          is_verified?: boolean
          project_url_0?: string
          project_url_1?: string | null
          project_url_2?: string | null
          project_url_3?: string | null
          project_url_4?: string | null
          tag_0?: string
          tag_1?: string | null
          tag_2?: string | null
          tag_3?: string | null
          tag_4?: string | null
          tag_5?: string | null
          tag_6?: string | null
          tag_7?: string | null
          tag_8?: string | null
          tag_9?: string | null
          user_id?: string
        }
        Relationships: []
      }
      peeks: {
        Row: {
          created_at: string
          id: number
          junior_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          junior_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          junior_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "peeks_junior_id_fkey"
            columns: ["junior_id"]
            isOneToOne: false
            referencedRelation: "juniors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: number
          portfolio_id: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          portfolio_id?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          portfolio_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "juniors"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment: {
        Args: {
          row_id: number
        }
        Returns: undefined
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
