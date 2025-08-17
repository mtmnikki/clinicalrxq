/**
 * API type definitions and app-domain models for ClinicalRxQ
 * IMPORTANT: Airtable table names, IDs, and field IDs are mapped centrally in src/services/api/airtable.ts.
 * This file intentionally does NOT duplicate table/field definitions to avoid drift or confusion.
 * - Keep these app models stable.
 * - See airtable.ts for the authoritative mapping to your Airtable base.
 */

export type SubscriptionStatus = 'Active' | 'Expiring' | 'Trial'

/**
 * Represents the authenticated member account (pharmacy/team)
 */
export interface MemberAccount {
  id: string
  pharmacyName: string
  email: string
  subscriptionStatus: SubscriptionStatus
  lastLoginISO: string
}

/**
 * Authentication response payload
 */
export interface AuthResponse {
  token: string
  member: MemberAccount
}

/**
 * Login payload for authentication
 */
export interface LoginPayload {
  email: string
  password: string
}

/**
 * Clinical program identifiers (slugs) used across routing and filtering
 */
export type ProgramSlug = 'tmm' | 'mtmtft' | 'tnt' | 'a1c' | 'oc'

/**
 * Clinical program model used for navigation and page headers
 */
export interface ClinicalProgram {
  slug: ProgramSlug
  name: string
  description: string
  icon: string // lucide icon name
  resourceCount: number
  lastUpdatedISO?: string
  downloadCount?: number
}

/**
 * Resource type classification used for filters and badges
 */
export type ResourceType =
  | 'Documentation Forms'
  | 'Clinical Resources'
  | 'Patient Handouts'
  | 'Protocols'
  | 'Training Materials'
  | 'Medical Billing'
  | 'Additional Resources'

/**
 * General resource model
 */
export interface ResourceItem {
  id: string
  name: string
  program?: ProgramSlug | 'general'
  type: ResourceType
  category?: string
  tags?: string[]
  fileUrl?: string
  sizeMB?: number
  lastUpdatedISO?: string
  downloadCount?: number
  bookmarked?: boolean
}

/**
 * Dashboard quick access card info
 */
export interface QuickAccessItem {
  id: string
  title: string
  subtitle: string
  icon: string // lucide icon name
  cta: 'Download' | 'Watch'
  resourceId?: string
}

/**
 * Simple announcement model
 */
export interface Announcement {
  id: string
  title: string
  body: string
  dateISO: string
  type?: 'update' | 'webinar' | 'regulatory'
}

/**
 * Activity feed item
 */
export interface RecentActivity {
  id: string
  resourceId: string
  name: string
  program?: ProgramSlug | 'general'
  accessedAtISO: string
}

/**
 * Airtable table record base type
 * Kept generic so mapping logic can handle any table schema in airtable.ts.
 */
export interface AirtableRecord<TFields> {
  id: string
  createdTime: string
  fields: TFields
}

/**
 * Resource filters for querying (client-side convenience)
 */
export interface ResourceFilters {
  program?: ProgramSlug | 'general'
  type?: ResourceType
  category?: string
  tags?: string[]
  medicalCondition?: string[]
  bookmarked?: boolean
  search?: string
  limit?: number
  offset?: number
  sortBy?: 'name' | 'lastUpdated' | 'downloadCount' | 'category'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Generic API error
 */
export class ApiError extends Error {
  code?: string
  status?: number
  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

/**
 * NOTE ABOUT AIRTABlE SCHEMA:
 * - All table names, IDs, and field IDs are implemented in src/services/api/airtable.ts.
 * - This avoids duplication and eliminates mismatches between docs and code.
 * - If the Airtable schema changes, update airtable.ts only.
 */
