import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ProfileModal } from '../components/profile-modal'
import { useAuth } from '../contexts/auth-context'
import { useProfile } from '../contexts/profile-context'
import { Profile } from '../lib/supabase'
import { User, Mail, Lock, Users, Plus, Edit, Trash2, Check } from 'lucide-react'

export function AccountPage() {
	const { user } = useAuth()
	const { 
		activeProfile, 
		profiles, 
		isLoading, 
		error, 
		selectProfile, 
		deleteProfile 
	} = useProfile()
	
	const [modalOpen, setModalOpen] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
	const [accountInfo, setAccountInfo] = useState({
		email: user?.email || '',
		pharmacyName: ''
	})

	const handleAddProfile = () => {
		setModalMode('create')
		setSelectedProfile(null)
		setModalOpen(true)
	}

	const handleEditProfile = (profile: Profile) => {
		setModalMode('edit')
		setSelectedProfile(profile)
		setModalOpen(true)
	}

	const handleDeleteProfile = async (profile: Profile) => {
		if (profiles.length <= 1) {
			alert('Cannot delete the last profile. At least one profile is required.')
			return
		}

		const confirmed = window.confirm(
			`Are you sure you want to delete the profile for ${profile.first_name} ${profile.last_name}?`
		)

		if (confirmed) {
			const result = await deleteProfile(profile.profile_id)
			if (result.error) {
				alert(`Error deleting profile: ${result.error}`)
			}
		}
	}

	const handleSelectProfile = (profile: Profile) => {
		selectProfile(profile.profile_id)
	}

	const formatRole = (role: Profile['profile_role']) => {
		if (!role) return 'No role assigned'
		return role.replace('-', ' ')
	}

	if (isLoading && profiles.length === 0) {
		return (
			<div className="p-6">
				<div className="max-w-4xl mx-auto">
					<div className="flex items-center justify-center min-h-96">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Account Settings
					</h1>
					<p className="text-gray-600">
						Manage your pharmacy account and staff profiles.
					</p>
				</div>

				{/* Error Display */}
				{error && (
					<div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
						{error}
					</div>
				)}

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content - Profiles */}
					<div className="lg:col-span-2">
						{/* Active Profile Display */}
						{activeProfile && (
							<Card className="mb-6 border-l-4 border-l-blue-600">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Users size={20} />
										Active Profile
									</CardTitle>
									<CardDescription>
										Currently signed in as {activeProfile.first_name} {activeProfile.last_name}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid md:grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-gray-600">Name</p>
											<p className="font-medium">{activeProfile.first_name} {activeProfile.last_name}</p>
										</div>
										<div>
											<p className="text-gray-600">Role</p>
											<p className="font-medium">{formatRole(activeProfile.profile_role)}</p>
										</div>
										{activeProfile.profile_email && (
											<div>
												<p className="text-gray-600">Email</p>
												<p className="font-medium">{activeProfile.profile_email}</p>
											</div>
										)}
										{activeProfile.license_number && (
											<div>
												<p className="text-gray-600">License Number</p>
												<p className="font-medium">{activeProfile.license_number}</p>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						)}

						{/* Staff Profiles Table */}
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="flex items-center gap-2">
											<Users size={20} />
											Staff Profiles ({profiles.length})
										</CardTitle>
										<CardDescription>
											Manage staff member profiles for your pharmacy.
										</CardDescription>
									</div>
									<Button onClick={handleAddProfile} className="flex items-center gap-2">
										<Plus size={16} />
										Add Profile
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								{profiles.length > 0 ? (
									<div className="overflow-x-auto">
										<table className="w-full text-sm">
											<thead>
												<tr className="border-b border-gray-200">
													<th className="text-left py-3 px-2 font-medium text-gray-700">Active</th>
													<th className="text-left py-3 px-2 font-medium text-gray-700">Name</th>
													<th className="text-left py-3 px-2 font-medium text-gray-700">Role</th>
													<th className="text-left py-3 px-2 font-medium text-gray-700">Email</th>
													<th className="text-left py-3 px-2 font-medium text-gray-700">License</th>
													<th className="text-right py-3 px-2 font-medium text-gray-700">Actions</th>
												</tr>
											</thead>
											<tbody>
												{profiles.map((profile) => (
													<tr key={profile.profile_id} className="border-b border-gray-100 hover:bg-gray-50">
														<td className="py-3 px-2">
															<Button
																size="sm"
																variant={activeProfile?.profile_id === profile.profile_id ? "default" : "outline"}
																onClick={() => handleSelectProfile(profile)}
																className="w-8 h-8 p-0"
															>
																{activeProfile?.profile_id === profile.profile_id && (
																	<Check size={14} />
																)}
															</Button>
														</td>
														<td className="py-3 px-2">
															<div className="font-medium text-gray-900">
																{profile.first_name} {profile.last_name}
															</div>
															{profile.phone_number && (
																<div className="text-xs text-gray-500">
																	{profile.phone_number}
																</div>
															)}
														</td>
														<td className="py-3 px-2 text-gray-600">
															{formatRole(profile.profile_role)}
														</td>
														<td className="py-3 px-2 text-gray-600">
															{profile.profile_email || '-'}
														</td>
														<td className="py-3 px-2 text-gray-600">
															{profile.license_number || '-'}
														</td>
														<td className="py-3 px-2">
															<div className="flex items-center justify-end gap-2">
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => handleEditProfile(profile)}
																	className="w-8 h-8 p-0"
																>
																	<Edit size={14} />
																</Button>
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => handleDeleteProfile(profile)}
																	className="w-8 h-8 p-0 text-red-600 hover:text-red-700 hover:border-red-300"
																	disabled={profiles.length <= 1}
																>
																	<Trash2 size={14} />
																</Button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="text-center py-12">
										<Users className="mx-auto text-gray-400 mb-4" size={48} />
										<p className="text-gray-500 mb-4">No profiles found.</p>
										<Button onClick={handleAddProfile}>
											<Plus className="mr-2" size={16} />
											Create First Profile
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Right Sidebar - Account Info */}
					<div className="space-y-6">
						{/* Account Overview */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<User size={20} />
									Account Overview
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3">
									<Mail size={16} className="text-gray-400" />
									<div>
										<p className="text-sm text-gray-600">Account Email</p>
										<p className="font-medium">{user?.email}</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<User size={16} className="text-gray-400" />
									<div>
										<p className="text-sm text-gray-600">Member Since</p>
										<p className="font-medium">
											{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Pharmacy Information */}
						<Card>
							<CardHeader>
								<CardTitle>Pharmacy Information</CardTitle>
								<CardDescription>
									Update your pharmacy details
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
										Account Email
									</label>
									<Input
										id="email"
										type="email"
										value={accountInfo.email}
										onChange={(e) => setAccountInfo(prev => ({ ...prev, email: e.target.value }))}
										disabled
									/>
								</div>
								<div>
									<label htmlFor="pharmacyName" className="block text-sm font-medium text-gray-700 mb-2">
										Pharmacy Name
									</label>
									<Input
										id="pharmacyName"
										value={accountInfo.pharmacyName}
										onChange={(e) => setAccountInfo(prev => ({ ...prev, pharmacyName: e.target.value }))}
										placeholder="Enter pharmacy name"
									/>
								</div>
								<Button variant="outline" className="w-full">
									Update Pharmacy Info
								</Button>
							</CardContent>
						</Card>

						{/* Security */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Lock size={20} />
									Security
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Button variant="outline" className="w-full">
									Change Password
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Profile Modal */}
				<ProfileModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					profile={selectedProfile}
					mode={modalMode}
				/>
			</div>
		</div>
	)
}