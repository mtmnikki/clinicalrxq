import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
import { ProfileProvider } from './contexts/profile-context'
import { BookmarkProvider } from './contexts/bookmark-context'
import { BookmarksPanelProvider } from './contexts/bookmarks-panel-context'
import { ProtectedRoute } from './components/protected-route'
import { MemberShell } from './components/member-shell'
import { HomePage } from './pages/home'
import { ContactPage } from './pages/contact'
import { LoginPage } from './pages/login'
import { DashboardPage } from './pages/dashboard'
import { ClinicalProgramPage } from './pages/clinical-program'
import { ResourceLibraryPage } from './pages/resource-library'
import { AccountPage } from './pages/account'

function App() {
	return (
		<AuthProvider>
			<ProfileProvider>
				<BookmarkProvider>
					<BookmarksPanelProvider>
						<Router>
							<Routes>
								{/* Public Routes */}
								<Route path="/" element={<HomePage />} />
								<Route path="/contact" element={<ContactPage />} />
								<Route path="/login" element={<LoginPage />} />
								
								{/* Protected Member Routes */}
								<Route
									path="/*"
									element={
										<ProtectedRoute>
											<MemberShell />
										</ProtectedRoute>
									}
								>
									<Route path="dashboard" element={<DashboardPage />} />
									<Route path="programs/:slug" element={<ClinicalProgramPage />} />
									<Route path="resources" element={<ResourceLibraryPage />} />
									<Route path="account" element={<AccountPage />} />
								</Route>
							</Routes>
						</Router>
					</BookmarksPanelProvider>
				</BookmarkProvider>
			</ProfileProvider>
		</AuthProvider>
	)
}

export default App