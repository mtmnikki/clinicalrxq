import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Profile type definition derived from generated types
export type Profile = Database['public']['Tables']['member_profiles']['Row']

// Bookmark type definition with joined file data
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'] & {
	file_url: string | null
}

// Additional type exports for application use
export type StorageFile = Database['public']['Tables']['storage_files_catalog']['Row']
export type Program = Database['public']['Tables']['programs']['Row']
export type Account = Database['public']['Tables']['accounts']['Row']
export type TrainingModule = Database['public']['Tables']['training_modules']['Row']
export type TrainingProgress = Database['public']['Tables']['member_training_progress']['Row']
export type Announcement = Database['public']['Tables']['announcements']['Row']

// View type exports
export type TrainingResourcesView = Database['public']['Views']['training_resources_view']['Row']
export type HBA1CView = Database['public']['Views']['hba1c_view']['Row']
export type MTMTheFutureTodayView = Database['public']['Views']['mtmthefututuretoday_view']['Row']
export type TimeMyMedsView = Database['public']['Views']['timemymeds_view']['Row']
export type OralContraceptivesView = Database['public']['Views']['oralcontraceptives_view']['Row']
export type TestAndTreatView = Database['public']['Views']['testandtreat_view']['Row']

// Enum type exports
export type ProfileRole = Database['public']['Enums']['profile_role']
export type FormCategory = Database['public']['Enums']['form_categories']
export type MedicalCondition = Database['public']['Enums']['medical_conditions']
export type SpecificResourceType = Database['public']['Enums']['specific_resource_type']