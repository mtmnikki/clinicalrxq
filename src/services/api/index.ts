/**
 * API client for ClinicalRxQ
 * - Live Airtable only for Programs and Resource Library (no mock fallback).
 * - Requires AIRTABLE_API_KEY in environment. No in-app key configuration.
 */

import {
  ApiError,
  AuthResponse,
  ClinicalProgram,
  LoginPayload,
  MemberAccount,
  ProgramSlug,
  QuickAccessItem,
  RecentActivity,
  ResourceItem,
  Announcement,
} from './types'
import { airtableService as AirtableService } from './airtable'

/** Local storage keys used for harmless UI persistence only */
const LS_TOKEN = 'crxq_token'
const LS_MEMBER = 'crxq_member'
const LS_LOGIN_ATTEMPTS = 'crxq_login_attempts'
const LS_BOOKMARKS = 'crxq_bookmarks'

/**
 * Safe env getter (esbuild-compatible)
 */
function safeEnv(): Record<string, any> | undefined {
  try {
    return (import.meta as any)?.env
  } catch {
    return undefined
  }
}

/**
 * Is Airtable configured via environment
 */
function isAirtableConfigured(): boolean {
  const env = safeEnv()
  const apiKey = env?.AIRTABLE_API_KEY
  return !!apiKey
}

/**
 * Tiny delay for parity in UX animations if needed
 */
const wait = (ms = 120) => new Promise((r) => setTimeout(r, ms))

/**
 * Bookmark helpers (client-side only)
 */
function getBookmarkSet(): Set<string> {
  const raw = localStorage.getItem(LS_BOOKMARKS)
  return new Set(raw ? (JSON.parse(raw) as string[]) : [])
}
function setBookmarkSet(set: Set<string>) {
  localStorage.setItem(LS_BOOKMARKS, JSON.stringify(Array.from(set)))
}

/**
 * Real login against Airtable Members table.
 * Throws if Airtable is not configured.
 */
async function realLogin(payload: LoginPayload): Promise<AuthResponse> {
  const attempts = Number(localStorage.getItem(LS_LOGIN_ATTEMPTS) || '0')
  if (attempts >= 5) throw new ApiError('Too many attempts. Please try again later.', 429, 'RATE_LIMIT')

  if (!isAirtableConfigured()) {
    throw new ApiError('Airtable is not configured. Set AIRTABLE_API_KEY and redeploy.', 500, 'CONFIG_ERROR')
  }

  try {
    const member = await AirtableService.authenticateMember(payload.email, payload.password)
    const token = 'session-token' // Client-only placeholder; server auth can replace later.
    localStorage.setItem(LS_TOKEN, token)
    localStorage.setItem(LS_MEMBER, JSON.stringify(member))
    localStorage.setItem(LS_LOGIN_ATTEMPTS, '0')
    return { token, member }
  } catch (e) {
    localStorage.setItem(LS_LOGIN_ATTEMPTS, String(attempts + 1))
    throw e
  }
}

/**
 * Real logout
 */
async function realLogout(): Promise<void> {
  await wait(60)
  localStorage.removeItem(LS_TOKEN)
  localStorage.removeItem(LS_MEMBER)
}

/**
 * API facade (live Airtable only for programs/resources; no mock fallback)
 */
export const Api = {
  /**
   * Deprecated: no runtime configuration. Kept to avoid breaking imports.
   */
  configureAirtable(_: { apiKey: string; baseId?: string }) {
    return false
  },

  /** Check if Airtable is configured via env. */
  isAirtableConfigured(): boolean {
    return isAirtableConfigured()
  },

  /** Test Airtable by loading programs. */
  async testAirtableConnection(): Promise<{ ok: boolean; error?: string }> {
    try {
      const list = await AirtableService.getClinicalPrograms()
      return { ok: Array.isArray(list) }
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Unknown error' }
    }
  },

  // Auth
  async login(payload: LoginPayload) {
    return realLogin(payload)
  },
  async logout() {
    return realLogout()
  },
  getStoredAuth(): AuthResponse | null {
    const token = localStorage.getItem(LS_TOKEN)
    const memberRaw = localStorage.getItem(LS_MEMBER)
    if (!token || !memberRaw) return null
    try {
      const member = JSON.parse(memberRaw) as MemberAccount
      return { token, member }
    } catch {
      return null
    }
  },

  // Programs (LIVE ONLY)
  async getPrograms(): Promise<ClinicalProgram[]> {
    if (!isAirtableConfigured()) {
      throw new ApiError('Airtable is not configured. Set AIRTABLE_API_KEY and redeploy.', 500, 'CONFIG_ERROR')
    }
    return AirtableService.getClinicalPrograms()
  },

  // Program-specific (Documentation Forms tab) (LIVE ONLY)
  async getProgramResources(slug: ProgramSlug): Promise<ResourceItem[]> {
    if (!isAirtableConfigured()) {
      throw new ApiError('Airtable is not configured. Set AIRTABLE_API_KEY and redeploy.', 500, 'CONFIG_ERROR')
    }
    return AirtableService.getProgramDocumentationForms(slug)
  },

  // Library (LIVE ONLY)
  async getResources(filters?: Partial<any>): Promise<ResourceItem[]> {
    if (!isAirtableConfigured()) {
      throw new ApiError('Airtable is not configured. Set AIRTABLE_API_KEY and redeploy.', 500, 'CONFIG_ERROR')
    }
    return AirtableService.getResources(filters || {})
  },

  async getResourceById(id: string): Promise<ResourceItem> {
    if (!isAirtableConfigured()) {
      throw new ApiError('Airtable is not configured. Set AIRTABLE_API_KEY and redeploy.', 500, 'CONFIG_ERROR')
    }
    return AirtableService.getResourceById(id)
  },

  // Bookmarks (client-side only)
  async getBookmarkedResources(): Promise<ResourceItem[]> {
    if (!isAirtableConfigured()) {
      throw new ApiError('Airtable is not configured. Set AIRTABLE_API_KEY and redeploy.', 500, 'CONFIG_ERROR')
    }
    const set = getBookmarkSet()
    const list = await AirtableService.getResources({})
    return list.map((r) => ({ ...r, bookmarked: set.has(r.id) || !!r.bookmarked })).filter((r) => r.bookmarked)
  },

  async toggleBookmark(resourceId: string, value?: boolean) {
    const set = getBookmarkSet()
    const should = value ?? !set.has(resourceId)
    if (should) set.add(resourceId)
    else set.delete(resourceId)
    setBookmarkSet(set)
    return should
  },

  // Dashboard extras (optional; keep empty until server sources are defined)
  async getQuickAccess(): Promise<QuickAccessItem[]> {
    // Not backed by Airtable in this client build. Return empty list to avoid mock usage.
    return []
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    // Not tracked in Airtable in this client build. Return empty list.
    return []
  },

  async getAnnouncements(): Promise<Announcement[]> {
    // Not backed by Airtable in this client build. Return empty list.
    return []
  },
}
