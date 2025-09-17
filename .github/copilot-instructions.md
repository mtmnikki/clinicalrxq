# ClinicalRxQ – AI Coding Agent Instructions

Concise, project-specific guidance to accelerate safe, consistent contributions. Keep changes focused; do not introduce new architectural patterns without explicit request.

## Tech Stack & Tooling
- React 18 + TypeScript + Vite (`npm run dev`, `npm run build`, `npm run preview`).
- State via colocated React Context providers (no Redux/Zustand). See `src/contexts/*`.
- Supabase is the backend: types are generated in `src/types/supabase.ts` and consumed through a single client in `src/lib/supabase.ts` (never recreate clients).
- Styling: TailwindCSS + small UI primitives in `src/components/ui/*` (shadcn-style) + helper `cn()` from `src/lib/utils.ts`.
- Routing: `react-router-dom@7` (use `<Navigate />` & hooks from v7—avoid legacy v5 patterns). Protected content wrapped by `ProtectedRoute`.

## Architectural Overview
- Entry: `src/main.tsx` mounts `<App />` which sets up routing & global providers.
- Core cross-cutting concerns are isolated as contexts:
  - `auth-context`: wraps Supabase auth; exposes `{ user, session, loading, signIn, signUp, signOut }`.
  - `profile-context`: per-account multi-profile management; persists active profile id in `localStorage` under `activeProfileId`.
  - `bookmark-context`: derived, profile-scoped bookmarks with local Set for O(1) lookups; always check `activeProfile` before DB ops.
  - `bookmarks-panel-context`: purely UI state for side drawer.
- Data Flow: UI components call context methods → contexts call Supabase (tables: `member_profiles`, `bookmarks`, `storage_files_catalog`, etc.) → local React state updated optimistically.
- Supabase row & view types are the single source of truth—prefer field names from generated types; augment (compose) rather than redefine.

## Conventions & Patterns
- Prefer functional React components with explicit prop interfaces at top of file.
- Side-effects: use `useEffect` with minimal dependency arrays; guard on required identifiers (e.g. `if (!activeProfile?.profile_id) return`).
- Loading UX pattern: full-screen spinner for auth gating (`ProtectedRoute`), inline spinners for panel/list fetches.
- Conditional rendering instead of route guards inside pages; wrap entire protected sections in `<ProtectedRoute>` higher in the tree.
- Do not access `localStorage` outside `profile-context` for profile selection logic.
- Bookmark toggling: validate `fileId` (non-empty string) before Supabase writes; update both list array and Set to keep them in sync.
- Resource filtering (see `resource-library.tsx`): keep filter logic pure and avoid mutating source `resources` array; when extending filters, mirror existing pattern (derive `filteredResources` then paginate).
- Use `cn()` for class concatenation instead of manual template joins.
- Icons: sourced from `lucide-react`; avoid adding mismatched icon libraries.

## Adding / Modifying Data Interactions
- Always reuse the exported `supabase` client. Never call `createClient` again.
- When adding new tables or views, extend type imports in `src/lib/supabase.ts` rather than sprinkling raw `any` types.
- Maintain optimistic UI patterns: update local state immediately after successful insert/delete, mirroring existing implementations (`toggleBookmark`).
- Handle errors by `console.error` + storing a human-friendly string in context state (`error` field) — keep pattern consistent; do not introduce toast systems unless asked.

## Environment & Secrets
- Relies on `import.meta.env.VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`; never hardcode credentials. Document any new required vars at the top of the created/edited file.

## UI & Styling Rules
- Use existing UI primitives (`button.tsx`, `card.tsx`, etc.) before creating new bespoke components.
- Follow existing gradient + neutral gray palette conventions; do not introduce new brand colors.
- Keep responsive layout via Tailwind utility classes; avoid external CSS unless unavoidable.

## Performance & Safety Considerations
- Avoid unnecessary rerenders: derive filtered lists with `useMemo` only if computation becomes heavy; current code favors straightforward recompute—match the surrounding style unless profiling shows issues.
- Large lists: paginate on client as done in `resource-library.tsx` (maintain `currentPage`, `itemsPerPage`). If adding server-side pagination, keep backward compatibility.
- Sanitize untrusted text via `SafeText` (see `components/common/SafeText.tsx`). Use it for any new dynamic HTML-like strings.

## Typical Extension Examples
- New protected page: create under `src/pages/`, export component, add route wrapped by `ProtectedRoute`, and leverage contexts instead of duplicating fetch logic.
- New context: only if cross-cutting; colocate domain-specific state inside feature component first.
- New Supabase view usage: add type alias export in `lib/supabase.ts`, query in a context or page component; avoid embedding complex joins directly in many UI components.

## What To Avoid
- Creating alternate global state systems (Redux, Zustand, Recoil) without instruction.
- Duplicating profile/bookmark logic inside pages.
- Mixing async side-effects directly inside render paths.
- Committing generated Supabase service keys or secrets.

## Workflow Commands
```bash
npm install      # Install deps
npm run dev      # Start Vite dev server
npm run build    # Production build (dist/)
npm run preview  # Preview built assets
npm run lint     # ESLint (no custom fix script yet)
```

## Pull Request Expectations
- Keep diffs minimal & localized; reference the context(s) touched.
- If adding a new pattern, explain rationale inline (in PR description, not code comments unless critical).
- Update this file only when introducing a net-new convention.

---
If any convention here conflicts with emerging code, flag it for clarification instead of guessing.

## Supabase Schema Quick Reference
Authoritative types live in `src/types/supabase.ts`; only alias/compose in app code (`src/lib/supabase.ts`). Below is a working mental map (do not duplicate types manually):

### Core Tables
- `accounts` (referenced indirectly): One row per authenticated Supabase user (maps to `auth.users.id`). Business/account-level settings would belong here (not yet surfaced in code). Think: Netflix “Account Owner”.
- `member_profiles`: Child profiles under a single account (`account_id` FK → `auth.users.id`). Switchable user-facing identities (Netflix-style profile picker). Primary key: `profile_id`. Used for scoping bookmarks and (future) progress/state.
- `bookmarks`: User-saved references to resources. Fields: `id`, `profile_id` (FK), `resource_id` (FK → `storage_files_catalog.file_id`), `created_at`.
- `storage_files_catalog`: Catalog of downloadable or streamable assets. Important fields: `file_id`, `file_name`, `file_url`, `mime_type`, classification fields (`program_name`, `medical_condition`, `resource_type`, `form_category`, etc.). Source for resource library and bookmark joins.
- `programs` / `training_modules` / `member_training_progress` (present in type exports): Not yet wired into current UI pages but reserved for future training/progress features.
- `announcements`: System or program messages (not yet surfaced in current components).

### Views (Read-Only)
- `training_resources_view`, `hba1c_view`, `mtmthefututuretoday_view`, `timemymeds_view`, `oralcontraceptives_view`, `testandtreat_view`: Themed/filtered aggregations for program-specific resource surfacing. When integrating, prefer querying a view instead of reproducing complex filters client-side.

### Enums
- `profile_role`: Role/permission classification for a profile (future gate logic candidate).
- `form_categories`: Canonical list for `form_category` field (mirror via filter groups if UI expands).
- `medical_conditions`: Normalized condition taxonomy for filtering and future clinical logic.
- `specific_resource_type`: Granular type classification (paired with `resource_type`).

### Relationship Usage Patterns
- Profile-scoped data always keys by `profile_id` (never by `user.id` directly once profile chosen).
- Joins: Bookmarks → `storage_files_catalog` performed ad-hoc in `bookmark-context` using a foreign key alias path; replicate pattern for similar lightweight enrichments.

## Account & Profile Model ("Netflix" Analogy)
Flow: `auth.user (supabase.auth)` → `accounts` (1:1) → `member_profiles` (1:N).

- Authentication happens only at the account level (email/password). After login, the app surfaces one or more profiles owned by that account.
- Each profile represents a distinct working identity (e.g., different staff member, role focus, or location persona) but does NOT possess independent credentials.
- Active profile selection stored in `localStorage['activeProfileId']` and restored on session resume (`profile-context`). Never read/write this key outside the context.
- Changing active profile should not re-authenticate; it simply re-queries dependent scoped data (e.g., bookmarks) keyed by the new `profile_id`.
- Bookmark & future progress data MUST be keyed by `profile_id` to remain isolated between profiles under the same login.

Implementation Highlights:
- On sign-out: `profile-context` clears profiles + removes `activeProfileId`.
- On sign-in: Fetch profiles → auto-select stored ID or first profile.
- When adding new profile-scoped features (e.g., training progress) reuse the same pattern: guard `if (!activeProfile?.profile_id) return` inside effects.
- Never couple profile logic to raw `user.id` after selection except when creating new profiles (needs `account_id = user.id`).

Extending Safely:
- New table requiring profile scoping: include `profile_id` FK, index it, then mirror the fetch/guard pattern from `bookmark-context`.
- New view exposing mixed account data: always filter with `.eq('profile_id', activeProfile.profile_id)` after selection.

## Extending Filters & Dynamic Content
Pages rely on Supabase taxonomy fields (`program_name`, `medical_condition`, `resource_type`, `form_category`, `mime_type`). Keep UI filter sources declarative and single-sourced.

### Resource Library (`resource-library.tsx`)
Current filter sources:
- Quick filter tiles: `quickFilterCards` array (id, title, icon, `filter` object with single field/value).
- Sidebar checkbox groups: `filterGroups` constant (each group: `title`, `field`, `options`). Some options are raw strings, others objects with `label`/`value`.
- Client logic: `filterResources()` applies in order: search → quick filter → each checkbox group → pagination slice.

When adding a new taxonomy (e.g. new enum in Supabase):
1. Add the field to Supabase + regenerate types (if you introduce a migration step).
2. Decide UI representation: quick tile vs checkbox group.
3. For a quick tile: append to `quickFilterCards` with `filter: { new_field: 'value' }` (only one key supported by current logic). If you need multi-field matching, extend logic to iterate entries of `quickFilter.filter`.
4. For checkbox group: append a new object in `filterGroups` with `field` matching the Supabase column and an `options` array. Ensure `checkboxFilters` initial state includes an empty array for the new `field`.
5. If pagination should stay consistent, no changes required—`filteredResources` drives it automatically.
6. For performance, only introduce `useMemo` if the filtering cost becomes significant (> few thousand rows).

Adding new program names / medical conditions:
- Just update options array values to exactly match stored row values (case sensitive equality in filters). Avoid human-friendly labels that differ from DB values unless you map via `{ label, value }` objects.

Adding new MIME types:
- Extend the Content Format group options with `{ label: 'Friendly', value: 'actual/mime' }`.
- If adding a quick tile (e.g. new video type), set `filter: { mime_type: 'actual/mime' }`.

### Clinical Program Page (`clinical-program.tsx`)
Data retrieval patterns:
- Program context: `programs` table filtered by `slug`.
- Training modules/videos: `training_resources_view` filtered by `.eq('program_name', program.name)` and ordered by `sort_order`.
- Other assets: repeated queries against `storage_files_catalog` with `.eq('program_name', program.name)` plus `.eq('resource_type', '...')`.

To introduce a new tab category (e.g. "Assessments") bound to a new `resource_type`:
1. Add new constant in `tabs` array `{ id: 'assessments', label: 'Assessments' }`.
2. Query inside fetch routine after existing sections:
   ```ts
   const { data: assessmentsData, error: assessmentsError } = await supabase
     .from('storage_files_catalog')
     .select('*')
     .eq('program_name', program.name)
     .eq('resource_type', 'assessment')
     .order('file_name', { ascending: true })
   ```
3. Store in new state slice (e.g. `assessments`) and render in a new `<TabsContent value="assessments">` reusing card pattern.
4. If the new content needs hierarchical grouping (like Forms), abstract existing `groupFormsByCategory` util into a generic grouper, pass field names as arguments.

Adding / changing form categories or subcategories:
- Categories come from `form_category` / `form_subcategory` fields. No code changes required if new values appear—they will be grouped dynamically. For custom ordering, introduce a priority map before sorting.

Adding video training content:
- Ensure new rows appear in `training_resources_view` with `program_name` & correct `sort_order`. The page already sorts and auto-selects the first module.
- If new media type (non `video/mp4`) appears, adjust the `<video>` source `type` or add conditional handling.

### General Filter Extension Checklist
1. Schema: Confirm column/value exists in Supabase & types updated.
2. Source Constant: Add to `quickFilterCards`, `filterGroups`, or `tabs` as appropriate.
3. State: Initialize corresponding state array/key if using checkbox pattern.
4. Filtering Logic: Ensure `filterResources()` (resource library) recognizes the new field—current generic loop covers any `checkboxFilters` key.
5. UI: Reuse existing component structures (cards, checkboxes, tabs) to maintain consistency.
6. Performance: Avoid nested loops over large arrays; rely on single pass filtering unless complexity increases.
7. Naming: Keep DB value exact; map to human label when needed via `{ label, value }` objects.

Avoid embedding raw filter value strings multiple times—centralize in the configuration arrays so logic changes (e.g. adding multi-key quick filters) remain localized.

