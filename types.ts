export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: '13.0.4'
    }
    public: {
        Tables: {
            forms: {
                Row: {
                    created_at: string
                    created_by: string
                    description: string | null
                    id: number
                    timer: number | null
                    title: string
                }
                Insert: {
                    created_at?: string
                    created_by?: string
                    description?: string | null
                    id?: number
                    timer?: number | null
                    title: string
                }
                Update: {
                    created_at?: string
                    created_by?: string
                    description?: string | null
                    id?: number
                    timer?: number | null
                    title?: string
                }
                Relationships: []
            }
            option_answers: {
                Row: {
                    option_id: number
                    question_id: number
                    submission_id: number
                }
                Insert: {
                    option_id: number
                    question_id: number
                    submission_id?: number
                }
                Update: {
                    option_id?: number
                    question_id?: number
                    submission_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'option_answers_option_id_fkey'
                        columns: ['option_id']
                        isOneToOne: false
                        referencedRelation: 'options'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'option_answers_question_id_fkey'
                        columns: ['question_id']
                        isOneToOne: false
                        referencedRelation: 'questions'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'option_answers_submission_id_fkey'
                        columns: ['submission_id']
                        isOneToOne: false
                        referencedRelation: 'submissions'
                        referencedColumns: ['id']
                    },
                ]
            }
            options: {
                Row: {
                    id: number
                    question_id: number
                    text: string
                }
                Insert: {
                    id?: number
                    question_id: number
                    text: string
                }
                Update: {
                    id?: number
                    question_id?: number
                    text?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'options_question_id_fkey'
                        columns: ['question_id']
                        isOneToOne: false
                        referencedRelation: 'questions'
                        referencedColumns: ['id']
                    },
                ]
            }
            questions: {
                Row: {
                    form_id: number
                    id: number
                    is_required: boolean | null
                    question_type: Database['public']['Enums']['question_type']
                    text: string
                }
                Insert: {
                    form_id: number
                    id?: number
                    is_required?: boolean | null
                    question_type?: Database['public']['Enums']['question_type']
                    text: string
                }
                Update: {
                    form_id?: number
                    id?: number
                    is_required?: boolean | null
                    question_type?: Database['public']['Enums']['question_type']
                    text?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'questions_form_id_fkey'
                        columns: ['form_id']
                        isOneToOne: false
                        referencedRelation: 'forms'
                        referencedColumns: ['id']
                    },
                ]
            }
            submissions: {
                Row: {
                    created_at: string
                    form_id: number
                    id: number
                    submitted_by: string
                }
                Insert: {
                    created_at?: string
                    form_id: number
                    id?: number
                    submitted_by?: string
                }
                Update: {
                    created_at?: string
                    form_id?: number
                    id?: number
                    submitted_by?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'submissions_form_id_fkey'
                        columns: ['form_id']
                        isOneToOne: false
                        referencedRelation: 'forms'
                        referencedColumns: ['id']
                    },
                ]
            }
            text_answers: {
                Row: {
                    question_id: number
                    submission_id: number
                    text: string
                }
                Insert: {
                    question_id: number
                    submission_id: number
                    text: string
                }
                Update: {
                    question_id?: number
                    submission_id?: number
                    text?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'text_answers_question_id_fkey'
                        columns: ['question_id']
                        isOneToOne: false
                        referencedRelation: 'questions'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'text_answers_submission_id_fkey'
                        columns: ['submission_id']
                        isOneToOne: false
                        referencedRelation: 'submissions'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            question_type: 'oneLine' | 'multiLine' | 'singleChoice' | 'multipleChoice'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
            DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] &
            DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema['Tables']
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema['Tables']
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
        : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema['Enums']
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
      ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
      : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema['CompositeTypes']
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never

export const Constants = {
    public: {
        Enums: {
            question_type: ['oneLine', 'multiLine', 'singleChoice', 'multipleChoice'],
        },
    },
} as const
