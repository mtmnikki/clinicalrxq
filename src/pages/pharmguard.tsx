import React from 'react'
import { Button } from '../components/ui/button'
import { PharmGuardApp } from '../features/pharmguard/PharmGuardApp'
import { hasPharmGuardSupabaseConfig } from '../features/pharmguard/lib/supabase'

export function PharmGuardPage() {
	if (!hasPharmGuardSupabaseConfig) {
		return (
			<div className="min-h-screen bg-white px-6 py-12">
				<div className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-8">
					<h1 className="text-3xl font-bold text-gray-900">PharmGuard configuration required</h1>
					<p className="mt-3 text-gray-700">
						Set <code>VITE_PHARMGUARD_SUPABASE_URL</code> and <code>VITE_PHARMGUARD_SUPABASE_ANON_KEY</code>
						in ClinicalRxQ to enable the native PharmGuard page.
					</p>
					<div className="mt-6">
						<a href="/"><Button>Return Home</Button></a>
					</div>
				</div>
			</div>
		)
	}

	return <PharmGuardApp />
}
