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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgmq_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      delete: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      pop: {
        Args: { queue_name: string }
        Returns: unknown[]
        SetofOptions: {
          from: "*"
          to: "message_record"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      read: {
        Args: { n: number; queue_name: string; sleep_seconds: number }
        Returns: unknown[]
        SetofOptions: {
          from: "*"
          to: "message_record"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      send: {
        Args: { message: Json; queue_name: string; sleep_seconds?: number }
        Returns: number[]
      }
      send_batch: {
        Args: { messages: Json[]; queue_name: string; sleep_seconds?: number }
        Returns: number[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_id: string
          address1: string | null
          city: string | null
          created_at: string | null
          email: string
          id: string | null
          pharmacy_name: string | null
          pharmacy_phone: string | null
          role: Database["public"]["Enums"]["role"]
          state: string | null
          subscription_status: string | null
          updated_at: string | null
          zipcode: string | null
        }
        Insert: {
          account_id: string
          address1?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          id?: string | null
          pharmacy_name?: string | null
          pharmacy_phone?: string | null
          role?: Database["public"]["Enums"]["role"]
          state?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          zipcode?: string | null
        }
        Update: {
          account_id?: string
          address1?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          id?: string | null
          pharmacy_name?: string | null
          pharmacy_phone?: string | null
          role?: Database["public"]["Enums"]["role"]
          state?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          body: string | null
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string | null
          file_name: string | null
          id: string
          profile_id: string | null
          resource_id: string
        }
        Insert: {
          created_at?: string | null
          file_name?: string | null
          id?: string
          profile_id?: string | null
          resource_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string | null
          id?: string
          profile_id?: string | null
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      claims: {
        Row: {
          account_balance: number | null
          account_number: string | null
          billing_status: string | null
          cpt_hcpcs_code: string | null
          created_at: string | null
          id: string
          insurance_adjustment: number | null
          insurance_paid: number | null
          notes: string | null
          patient_id: string | null
          patient_name: string
          patient_paid_amount: number | null
          patient_responsibility: number | null
          payment_status: string | null
          pharmacy_of_service: string | null
          rx_number: string | null
          service_date: string
          statement_created_date: string | null
          statement_mailed: boolean | null
          statement_paid: boolean | null
          statement_sent_2nd_at: string | null
          statement_sent_3rd_at: string | null
          statement_sent_at: string | null
          statement_three_mailed: boolean | null
          statement_two_mailed: boolean | null
          total_charged_amount: number | null
          updated_at: string | null
          workflow: string | null
        }
        Insert: {
          account_balance?: number | null
          account_number?: string | null
          billing_status?: string | null
          cpt_hcpcs_code?: string | null
          created_at?: string | null
          id?: string
          insurance_adjustment?: number | null
          insurance_paid?: number | null
          notes?: string | null
          patient_id?: string | null
          patient_name: string
          patient_paid_amount?: number | null
          patient_responsibility?: number | null
          payment_status?: string | null
          pharmacy_of_service?: string | null
          rx_number?: string | null
          service_date: string
          statement_created_date?: string | null
          statement_mailed?: boolean | null
          statement_paid?: boolean | null
          statement_sent_2nd_at?: string | null
          statement_sent_3rd_at?: string | null
          statement_sent_at?: string | null
          statement_three_mailed?: boolean | null
          statement_two_mailed?: boolean | null
          total_charged_amount?: number | null
          updated_at?: string | null
          workflow?: string | null
        }
        Update: {
          account_balance?: number | null
          account_number?: string | null
          billing_status?: string | null
          cpt_hcpcs_code?: string | null
          created_at?: string | null
          id?: string
          insurance_adjustment?: number | null
          insurance_paid?: number | null
          notes?: string | null
          patient_id?: string | null
          patient_name?: string
          patient_paid_amount?: number | null
          patient_responsibility?: number | null
          payment_status?: string | null
          pharmacy_of_service?: string | null
          rx_number?: string | null
          service_date?: string
          statement_created_date?: string | null
          statement_mailed?: boolean | null
          statement_paid?: boolean | null
          statement_sent_2nd_at?: string | null
          statement_sent_3rd_at?: string | null
          statement_sent_at?: string | null
          statement_three_mailed?: boolean | null
          statement_two_mailed?: boolean | null
          total_charged_amount?: number | null
          updated_at?: string | null
          workflow?: string | null
        }
        Relationships: []
      }
      csv_uploads: {
        Row: {
          created_at: string | null
          errors: string | null
          file_name: string
          file_path: string
          id: string
          records_imported: number | null
          status: string | null
          upload_date: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          errors?: string | null
          file_name: string
          file_path: string
          id?: string
          records_imported?: number | null
          status?: string | null
          upload_date?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          errors?: string | null
          file_name?: string
          file_path?: string
          id?: string
          records_imported?: number | null
          status?: string | null
          upload_date?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      documentation_forms: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          name: string
          program_id: string | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
          program_id?: string | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
          program_id?: string | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentation_forms_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentation_forms_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "documentation_forms_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      generated_statements: {
        Row: {
          account_number: string | null
          claim_ids: string[] | null
          created_at: string | null
          id: string
          patient_id: string | null
          pdf_path: string | null
          sent: boolean | null
          sent_at: string | null
          statement_date: string
          statement_type: string | null
          total_amount: number
        }
        Insert: {
          account_number?: string | null
          claim_ids?: string[] | null
          created_at?: string | null
          id?: string
          patient_id?: string | null
          pdf_path?: string | null
          sent?: boolean | null
          sent_at?: string | null
          statement_date: string
          statement_type?: string | null
          total_amount: number
        }
        Update: {
          account_number?: string | null
          claim_ids?: string[] | null
          created_at?: string | null
          id?: string
          patient_id?: string | null
          pdf_path?: string | null
          sent?: boolean | null
          sent_at?: string | null
          statement_date?: string
          statement_type?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "generated_statements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patient_statement_view"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "generated_statements_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      interventions: {
        Row: {
          action_other: string | null
          actions: string[] | null
          clinical_notes: string | null
          condition: string | null
          cost_avoidance: number | null
          created_at: string | null
          drug_class: string | null
          drug_name: string | null
          drug_strength: string | null
          encounter_dt: string | null
          error_category: string | null
          error_category_other: string | null
          id: string
          new_drug_class: string | null
          new_drug_name: string | null
          new_drug_strength: number | null
          new_sig: string | null
          new_strength_unit: string | null
          patient_age: number | null
          patient_gender: string | null
          pharmacist_actions: string[] | null
          pharmacist_id: string | null
          pharmacy_site: string | null
          practice_setting: string | null
          prescriber_credentials: string | null
          prescriber_location: string | null
          prescriber_name: string | null
          prescriber_npi: string | null
          prescriber_response: string | null
          prescriber_response_other: string | null
          prob_ade: string | null
          severity: string | null
          sig: string | null
          strength_unit: string | null
          time_spent_min: number | null
        }
        Insert: {
          action_other?: string | null
          actions?: string[] | null
          clinical_notes?: string | null
          condition?: string | null
          cost_avoidance?: number | null
          created_at?: string | null
          drug_class?: string | null
          drug_name?: string | null
          drug_strength?: string | null
          encounter_dt?: string | null
          error_category?: string | null
          error_category_other?: string | null
          id?: string
          new_drug_class?: string | null
          new_drug_name?: string | null
          new_drug_strength?: number | null
          new_sig?: string | null
          new_strength_unit?: string | null
          patient_age?: number | null
          patient_gender?: string | null
          pharmacist_actions?: string[] | null
          pharmacist_id?: string | null
          pharmacy_site?: string | null
          practice_setting?: string | null
          prescriber_credentials?: string | null
          prescriber_location?: string | null
          prescriber_name?: string | null
          prescriber_npi?: string | null
          prescriber_response?: string | null
          prescriber_response_other?: string | null
          prob_ade?: string | null
          severity?: string | null
          sig?: string | null
          strength_unit?: string | null
          time_spent_min?: number | null
        }
        Update: {
          action_other?: string | null
          actions?: string[] | null
          clinical_notes?: string | null
          condition?: string | null
          cost_avoidance?: number | null
          created_at?: string | null
          drug_class?: string | null
          drug_name?: string | null
          drug_strength?: string | null
          encounter_dt?: string | null
          error_category?: string | null
          error_category_other?: string | null
          id?: string
          new_drug_class?: string | null
          new_drug_name?: string | null
          new_drug_strength?: number | null
          new_sig?: string | null
          new_strength_unit?: string | null
          patient_age?: number | null
          patient_gender?: string | null
          pharmacist_actions?: string[] | null
          pharmacist_id?: string | null
          pharmacy_site?: string | null
          practice_setting?: string | null
          prescriber_credentials?: string | null
          prescriber_location?: string | null
          prescriber_name?: string | null
          prescriber_npi?: string | null
          prescriber_response?: string | null
          prescriber_response_other?: string | null
          prob_ade?: string | null
          severity?: string | null
          sig?: string | null
          strength_unit?: string | null
          time_spent_min?: number | null
        }
        Relationships: []
      }
      kv_store_8a7dc670: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      member_profiles: {
        Row: {
          account_id: string | null
          created_at: string | null
          first_name: string | null
          last_name: string | null
          license_number: string | null
          nabp_eprofile_id: string | null
          phone_number: string | null
          profile_email: string | null
          profile_id: string
          profile_role: Database["public"]["Enums"]["profile_role"] | null
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          first_name?: string | null
          last_name?: string | null
          license_number?: string | null
          nabp_eprofile_id?: string | null
          phone_number?: string | null
          profile_email?: string | null
          profile_id?: string
          profile_role?: Database["public"]["Enums"]["profile_role"] | null
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          first_name?: string | null
          last_name?: string | null
          license_number?: string | null
          nabp_eprofile_id?: string | null
          phone_number?: string | null
          profile_email?: string | null
          profile_id?: string
          profile_role?: Database["public"]["Enums"]["profile_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_profiles_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account_id"]
          },
        ]
      }
      member_training_progress: {
        Row: {
          attempts: number
          completed_at: string | null
          completion_percentage: number
          created_at: string | null
          id: string
          is_completed: boolean
          last_position: string | null
          notes: string | null
          profile_id: string
          score: number | null
          started_at: string | null
          training_module_id: string
          updated_at: string | null
        }
        Insert: {
          attempts?: number
          completed_at?: string | null
          completion_percentage?: number
          created_at?: string | null
          id?: string
          is_completed?: boolean
          last_position?: string | null
          notes?: string | null
          profile_id: string
          score?: number | null
          started_at?: string | null
          training_module_id: string
          updated_at?: string | null
        }
        Update: {
          attempts?: number
          completed_at?: string | null
          completion_percentage?: number
          created_at?: string | null
          id?: string
          is_completed?: boolean
          last_position?: string | null
          notes?: string | null
          profile_id?: string
          score?: number | null
          started_at?: string | null
          training_module_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_training_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "hba1c_training"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "mtmthefuturetoday_training"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_training"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_training"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_training"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_training_progress_training_module_id_fkey"
            columns: ["training_module_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["training_module_id"]
          },
        ]
      }
      notes: {
        Row: {
          body: string | null
          content: string | null
          created_at: string | null
          id: string
          mood: string | null
          pinned: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          body?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          mood?: string | null
          pinned?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          body?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          mood?: string | null
          pinned?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          account_number: string
          address_city: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          patient_name: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          account_number: string
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          patient_name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          account_number?: string
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          patient_name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pharmacies: {
        Row: {
          address_city: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          contact_name: string | null
          created_at: string | null
          email: string | null
          id: string
          last_sync_at: string | null
          name: string
          notes: string | null
          npi: string | null
          phone: string | null
          services: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          contact_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_sync_at?: string | null
          name: string
          notes?: string | null
          npi?: string | null
          phone?: string | null
          services?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          contact_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_sync_at?: string | null
          name?: string
          notes?: string | null
          npi?: string | null
          phone?: string | null
          services?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string | null
          description: string | null
          experience_level: string | null
          id: string
          name: string
          overview: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          name: string
          overview?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          name?: string
          overview?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      recent_activity: {
        Row: {
          accessed_at: string | null
          file_name: string | null
          id: string
          profile_id: string | null
          resource_id: string | null
          resource_type: string | null
        }
        Insert: {
          accessed_at?: string | null
          file_name?: string | null
          id?: string
          profile_id?: string | null
          resource_id?: string | null
          resource_type?: string | null
        }
        Update: {
          accessed_at?: string | null
          file_name?: string | null
          id?: string
          profile_id?: string | null
          resource_id?: string | null
          resource_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recent_activity_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "recent_activity_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      storage_files_catalog: {
        Row: {
          bucket_name: string
          created_at: string | null
          file_id: string
          file_name: string
          file_path: string
          file_size: number | null
          file_url: string
          form_category: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory: string | null
          last_modified: string | null
          medical_condition:
            | Database["public"]["Enums"]["medical_conditions"]
            | null
          mime_type: string | null
          program_id: string | null
          program_name: string | null
          resource_type:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
          updated_at: string | null
          use_case: string | null
        }
        Insert: {
          bucket_name: string
          created_at?: string | null
          file_id?: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_url: string
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          last_modified?: string | null
          medical_condition?:
            | Database["public"]["Enums"]["medical_conditions"]
            | null
          mime_type?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
          updated_at?: string | null
          use_case?: string | null
        }
        Update: {
          bucket_name?: string
          created_at?: string | null
          file_id?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_url?: string
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          last_modified?: string | null
          medical_condition?:
            | Database["public"]["Enums"]["medical_conditions"]
            | null
          mime_type?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
          updated_at?: string | null
          use_case?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
        ]
      }
      training_modules: {
        Row: {
          created_at: string | null
          id: string
          length: string | null
          name: string | null
          program_id: string | null
          sort_order: number | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      us_gaz: {
        Row: {
          id: number
          is_custom: boolean
          seq: number | null
          stdword: string | null
          token: number | null
          word: string | null
        }
        Insert: {
          id?: number
          is_custom?: boolean
          seq?: number | null
          stdword?: string | null
          token?: number | null
          word?: string | null
        }
        Update: {
          id?: number
          is_custom?: boolean
          seq?: number | null
          stdword?: string | null
          token?: number | null
          word?: string | null
        }
        Relationships: []
      }
      us_lex: {
        Row: {
          id: number
          is_custom: boolean
          seq: number | null
          stdword: string | null
          token: number | null
          word: string | null
        }
        Insert: {
          id?: number
          is_custom?: boolean
          seq?: number | null
          stdword?: string | null
          token?: number | null
          word?: string | null
        }
        Update: {
          id?: number
          is_custom?: boolean
          seq?: number | null
          stdword?: string | null
          token?: number | null
          word?: string | null
        }
        Relationships: []
      }
      us_rules: {
        Row: {
          id: number
          is_custom: boolean
          rule: string | null
        }
        Insert: {
          id?: number
          is_custom?: boolean
          rule?: string | null
        }
        Update: {
          id?: number
          is_custom?: boolean
          rule?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      hba1c_training: {
        Row: {
          created_at: string | null
          id: string | null
          length: string | null
          name: string | null
          program_id: string | null
          sort_order: number | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      hba1c_view: {
        Row: {
          file_id: string | null
          file_name: string | null
          file_path: string | null
          file_url: string | null
          form_category: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory: string | null
          program_id: string | null
          program_name: string | null
          resource_type:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Insert: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Update: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
        ]
      }
      hypopg_hidden_indexes: {
        Row: {
          am_name: unknown
          index_name: unknown
          indexrelid: unknown
          is_hypo: boolean | null
          schema_name: unknown
          table_name: unknown
        }
        Relationships: []
      }
      hypopg_list_indexes: {
        Row: {
          am_name: unknown
          index_name: string | null
          indexrelid: unknown
          schema_name: unknown
          table_name: unknown
        }
        Relationships: []
      }
      intervention_by_setting: {
        Row: {
          count: number | null
          practice_setting: string | null
        }
        Relationships: []
      }
      intervention_by_site: {
        Row: {
          count: number | null
          pharmacy_site: string | null
        }
        Relationships: []
      }
      intervention_drug_classes: {
        Row: {
          count: number | null
          drug_class: string | null
        }
        Relationships: []
      }
      intervention_errors: {
        Row: {
          count: number | null
          error_category: string | null
        }
        Relationships: []
      }
      intervention_kpis: {
        Row: {
          avg_time_min: number | null
          high_risk_count: number | null
          total_cost_avoidance: number | null
          total_interventions: number | null
        }
        Relationships: []
      }
      intervention_responses: {
        Row: {
          count: number | null
          prescriber_response: string | null
        }
        Relationships: []
      }
      intervention_severity: {
        Row: {
          count: number | null
          severity: string | null
        }
        Relationships: []
      }
      mtmthefuturetoday_training: {
        Row: {
          created_at: string | null
          id: string | null
          length: string | null
          name: string | null
          program_id: string | null
          sort_order: number | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      mtmthefututuretoday_view: {
        Row: {
          file_id: string | null
          file_name: string | null
          file_path: string | null
          file_url: string | null
          form_category: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory: string | null
          program_id: string | null
          program_name: string | null
          resource_type:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Insert: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Update: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
        ]
      }
      oralcontraceptives_training: {
        Row: {
          created_at: string | null
          id: string | null
          length: string | null
          name: string | null
          program_id: string | null
          sort_order: number | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      oralcontraceptives_view: {
        Row: {
          file_id: string | null
          file_name: string | null
          file_path: string | null
          file_url: string | null
          form_category: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory: string | null
          program_id: string | null
          program_name: string | null
          resource_type:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Insert: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Update: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
        ]
      }
      patient_statement_view: {
        Row: {
          account_number: string | null
          address_city: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          any_statement_sent: boolean | null
          date_of_birth: string | null
          last_service_date: string | null
          patient_id: string | null
          patient_name: string | null
          total_balance: number | null
          total_claims: number | null
        }
        Relationships: []
      }
      testandtreat_training: {
        Row: {
          created_at: string | null
          id: string | null
          length: string | null
          name: string | null
          program_id: string | null
          sort_order: number | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      testandtreat_view: {
        Row: {
          file_id: string | null
          file_name: string | null
          file_path: string | null
          file_url: string | null
          form_category: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory: string | null
          program_id: string | null
          program_name: string | null
          resource_type:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Insert: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Update: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
        ]
      }
      timemymeds_training: {
        Row: {
          created_at: string | null
          id: string | null
          length: string | null
          name: string | null
          program_id: string | null
          sort_order: number | null
          storage_file_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          length?: string | null
          name?: string | null
          program_id?: string | null
          sort_order?: number | null
          storage_file_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "hba1c_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "mtmthefututuretoday_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "oralcontraceptives_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "storage_files_catalog"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "testandtreat_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "timemymeds_view"
            referencedColumns: ["file_id"]
          },
          {
            foreignKeyName: "training_modules_storage_file_id_fkey"
            columns: ["storage_file_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["file_id"]
          },
        ]
      }
      timemymeds_view: {
        Row: {
          file_id: string | null
          file_name: string | null
          file_path: string | null
          file_url: string | null
          form_category: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory: string | null
          program_id: string | null
          program_name: string | null
          resource_type:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Insert: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Update: {
          file_id?: string | null
          file_name?: string | null
          file_path?: string | null
          file_url?: string | null
          form_category?: Database["public"]["Enums"]["form_categories"] | null
          form_subcategory?: string | null
          program_id?: string | null
          program_name?: string | null
          resource_type?:
            | Database["public"]["Enums"]["specific_resource_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_files_catalog_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "training_resources_view"
            referencedColumns: ["program_id"]
          },
        ]
      }
      training_resources_view: {
        Row: {
          content_class: string | null
          experience_level: string | null
          file_id: string | null
          file_name: string | null
          file_path: string | null
          file_size: number | null
          file_url: string | null
          length: string | null
          mime_type: string | null
          program_id: string | null
          program_name: string | null
          sort_order: number | null
          training_module_id: string | null
          training_module_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      bytea_to_text: { Args: { data: string }; Returns: string }
      crosstab: { Args: { "": string }; Returns: Record<string, unknown>[] }
      crosstab2: {
        Args: { "": string }
        Returns: Database["public"]["CompositeTypes"]["tablefunc_crosstab_2"][]
        SetofOptions: {
          from: "*"
          to: "tablefunc_crosstab_2"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      crosstab3: {
        Args: { "": string }
        Returns: Database["public"]["CompositeTypes"]["tablefunc_crosstab_3"][]
        SetofOptions: {
          from: "*"
          to: "tablefunc_crosstab_3"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      crosstab4: {
        Args: { "": string }
        Returns: Database["public"]["CompositeTypes"]["tablefunc_crosstab_4"][]
        SetofOptions: {
          from: "*"
          to: "tablefunc_crosstab_4"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_file_statistics: {
        Args: { p_days_back?: number; p_file_id: string }
        Returns: {
          avg_view_duration: number
          file_id: string
          file_name: string
          most_recent_access: string
          total_views: number
          unique_viewers: number
        }[]
      }
      get_user_pharmacy: { Args: never; Returns: string }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "http_request"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_get:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
        SetofOptions: {
          from: "*"
          to: "http_header"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_list_curlopt: {
        Args: never
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_post:
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_reset_curlopt: { Args: never; Returns: boolean }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      hypopg: { Args: never; Returns: Record<string, unknown>[] }
      hypopg_create_index: {
        Args: { sql_order: string }
        Returns: Record<string, unknown>[]
      }
      hypopg_drop_index: { Args: { indexid: unknown }; Returns: boolean }
      hypopg_get_indexdef: { Args: { indexid: unknown }; Returns: string }
      hypopg_hidden_indexes: {
        Args: never
        Returns: {
          indexid: unknown
        }[]
      }
      hypopg_hide_index: { Args: { indexid: unknown }; Returns: boolean }
      hypopg_relation_size: { Args: { indexid: unknown }; Returns: number }
      hypopg_reset: { Args: never; Returns: undefined }
      hypopg_reset_index: { Args: never; Returns: undefined }
      hypopg_unhide_all_indexes: { Args: never; Returns: undefined }
      hypopg_unhide_index: { Args: { indexid: unknown }; Returns: boolean }
      id_decode: { Args: { "": string }; Returns: number[] }
      id_decode_once: { Args: { "": string }; Returns: number }
      index_advisor: {
        Args: { query: string }
        Returns: {
          errors: string[]
          index_statements: string[]
          startup_cost_after: Json
          startup_cost_before: Json
          total_cost_after: Json
          total_cost_before: Json
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      is_admin_user: { Args: never; Returns: boolean }
      json_matches_schema: {
        Args: { instance: Json; schema: Json }
        Returns: boolean
      }
      jsonb_matches_schema: {
        Args: { instance: Json; schema: Json }
        Returns: boolean
      }
      jsonschema_is_valid: { Args: { schema: Json }; Returns: boolean }
      jsonschema_validation_errors: {
        Args: { instance: Json; schema: Json }
        Returns: string[]
      }
      list_all_files: {
        Args: { bucket_name: string }
        Returns: {
          id: string
          metadata: Json
          name: string
          path: string
        }[]
      }
      populate_storage_files_catalog: { Args: never; Returns: undefined }
      search_content: {
        Args: { search_term: string }
        Returns: {
          category: string
          file_name: string
          file_path: string
          file_url: string
          id: string
          media_type: string
          program_name: string
          relevance_score: number
          subcategory: string
        }[]
      }
      search_files: {
        Args: {
          category?: string
          content_class?: string
          mime_type?: string
          program_id?: string
          search_term?: string
          subcategory?: string
        }
        Returns: {
          category: string
          content_class: string
          file_name: string
          file_path: string
          file_size: number
          file_url: string
          id: string
          last_modified: string
          mime_type: string
          program_id: string
          program_name: string
          subcategory: string
        }[]
      }
      text_to_bytea: { Args: { data: string }; Returns: string }
      track_file_access: {
        Args: { p_file_id: string; p_profile_id: string }
        Returns: undefined
      }
      update_all_bookmark_file_names: { Args: never; Returns: number }
      update_bookmark_by_resource_id: {
        Args: { resource_id_param: string }
        Returns: {
          created_at: string | null
          file_name: string | null
          id: string
          profile_id: string | null
          resource_id: string
        }
        SetofOptions: {
          from: "*"
          to: "bookmarks"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      update_bookmark_file_name: {
        Args: { bookmark_id_param: string }
        Returns: {
          created_at: string | null
          file_name: string | null
          id: string
          profile_id: string | null
          resource_id: string
        }
        SetofOptions: {
          from: "*"
          to: "bookmarks"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      update_resource_file_reference: {
        Args: { file_id: string; res_id: string; table_name: string }
        Returns: boolean
      }
      urlencode:
        | { Args: { data: Json }; Returns: string }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
    }
    Enums: {
      form_categories:
        | "patient_intake"
        | "pharmacist_assessment"
        | "pharmacist_care_plan"
        | "patient_consent"
        | "prescriber_communication"
        | "billing"
        | "outcomes_tips"
        | "medical_conditions_flowsheets"
        | "referral"
        | "tracking"
        | "other"
      medical_conditions:
        | "Beers List"
        | "Hypertension"
        | "Cholesterol"
        | "Diabetes"
        | "Heart Failure"
        | "Gastrointestinal"
        | "Genitourinary"
        | "Hematological"
        | "Infectious Disease"
        | "Musculoskeletal"
        | "Neurological"
        | "Psychiatric"
        | "Reproductive"
        | "Respiratory"
        | "Pain"
        | "Other"
      profile_role:
        | "Pharmacist"
        | "Pharmacist-PIC"
        | "Pharmacy Technician"
        | "Intern"
        | "Admin"
        | "Pharmacy"
      role: "admin" | "pharmacy"
      slug:
        | "timemymeds"
        | "mtmthefuturetoday"
        | "testandtreat"
        | "hba1c"
        | "oralcontraceptives"
        | "patienthandouts"
        | "clinicalguidelines"
        | "medicalbilling"
        | "generalresources"
      specific_resource_type:
        | "documentation_form"
        | "protocol_manual"
        | "training_module"
        | "additional_resource"
        | "patient_handout"
        | "clinical_guideline"
        | "medical_billing"
        | "other"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
      tablefunc_crosstab_2: {
        row_name: string | null
        category_1: string | null
        category_2: string | null
      }
      tablefunc_crosstab_3: {
        row_name: string | null
        category_1: string | null
        category_2: string | null
        category_3: string | null
      }
      tablefunc_crosstab_4: {
        row_name: string | null
        category_1: string | null
        category_2: string | null
        category_3: string | null
        category_4: string | null
      }
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          deleted_at: string | null
          format: string
          id: string
          name: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          metadata: Json | null
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          metadata?: Json | null
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          metadata?: Json | null
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vector_indexes_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets_vectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      allow_any_operation: {
        Args: { expected_operations: string[] }
        Returns: boolean
      }
      allow_only_operation: {
        Args: { expected_operation: string }
        Returns: boolean
      }
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      delete_leaf_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_common_prefix: {
        Args: { p_delimiter: string; p_key: string; p_prefix: string }
        Returns: string
      }
      get_level: { Args: { name: string }; Returns: number }
      get_prefix: { Args: { name: string }; Returns: string }
      get_prefixes: { Args: { name: string }; Returns: string[] }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          _bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_by_timestamp: {
        Args: {
          p_bucket_id: string
          p_level: number
          p_limit: number
          p_prefix: string
          p_sort_column: string
          p_sort_column_after: string
          p_sort_order: string
          p_start_after: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_legacy_v1: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS" | "VECTOR"
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
  graphql_public: {
    Enums: {},
  },
  pgmq_public: {
    Enums: {},
  },
  public: {
    Enums: {
      form_categories: [
        "patient_intake",
        "pharmacist_assessment",
        "pharmacist_care_plan",
        "patient_consent",
        "prescriber_communication",
        "billing",
        "outcomes_tips",
        "medical_conditions_flowsheets",
        "referral",
        "tracking",
        "other",
      ],
      medical_conditions: [
        "Beers List",
        "Hypertension",
        "Cholesterol",
        "Diabetes",
        "Heart Failure",
        "Gastrointestinal",
        "Genitourinary",
        "Hematological",
        "Infectious Disease",
        "Musculoskeletal",
        "Neurological",
        "Psychiatric",
        "Reproductive",
        "Respiratory",
        "Pain",
        "Other",
      ],
      profile_role: [
        "Pharmacist",
        "Pharmacist-PIC",
        "Pharmacy Technician",
        "Intern",
        "Admin",
        "Pharmacy",
      ],
      role: ["admin", "pharmacy"],
      slug: [
        "timemymeds",
        "mtmthefuturetoday",
        "testandtreat",
        "hba1c",
        "oralcontraceptives",
        "patienthandouts",
        "clinicalguidelines",
        "medicalbilling",
        "generalresources",
      ],
      specific_resource_type: [
        "documentation_form",
        "protocol_manual",
        "training_module",
        "additional_resource",
        "patient_handout",
        "clinical_guideline",
        "medical_billing",
        "other",
      ],
    },
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS", "VECTOR"],
    },
  },
} as const
