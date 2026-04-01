import React from 'react'
import Header from '../components/layout/Header'

const PHARMGUARD_URL = 'https://pharmguard.vercel.app'

export function PharmGuardPage() {
	return (
		<div className="min-h-screen bg-white">
			<Header />
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">PharmGuard</h1>
					<p className="mt-2 text-gray-600">
						Intervention logging, dashboard analytics, and history review are available below.
					</p>
				</div>
				<div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
					<iframe
						src={PHARMGUARD_URL}
						title="PharmGuard"
						className="block h-[calc(100vh-220px)] min-h-[900px] w-full bg-white"
						loading="lazy"
						referrerPolicy="strict-origin-when-cross-origin"
						allow="clipboard-read; clipboard-write"
					/>
				</div>
			</div>
		</div>
	)
}
