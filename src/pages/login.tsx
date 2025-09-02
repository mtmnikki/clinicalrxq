import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { useAuth } from '../contexts/auth-context'
import { CheckCircle, FileText, BookOpen, Video, Eye, EyeOff } from 'lucide-react'
import WhiteSloganLogo from '../assets/images/whitesloganlogo.svg'

export function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { signIn } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			await signIn(email, password)
			navigate('/dashboard')
		} catch (error) {
			setError('Invalid email or password')
		} finally {
			setIsLoading(false)
		}
	}

	const features = [
		{
			icon: FileText,
			title: 'Docs',
			description: 'Legally compliant forms'
		},
		{
			icon: BookOpen,
			title: 'Protocols',
			description: 'Evidence-based workflows'
		},
		{
			icon: Video,
			title: 'Training',
			description: 'Modules and webinars'
		}
	]

	return (
		<div className="min-h-screen bg-white">
			<Header />
			
			<div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
			{/* Left Side - Branding & Features */}
			<div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-800 to-cyan-500 relative overflow-hidden">
				<div className="flex flex-col justify-center items-center text-center p-12 text-white relative z-10 w-full">
					{/* Logo */}
					<div className="mb-12 w-full">
						<div className="backdrop-blur-md bg-black/20 border rounded-2xl p-8 mx-auto max-w-xl shadow-xl">
							<img 
								src={WhiteSloganLogo} 
								alt="ClinicalRxQ - Where Dispensing Meets Direct Patient Care" 
								className="w-full drop-shadow-lg" 
							/>
						</div>
					</div>

					{/* Main Content */}
					<div className="mb-12">
						<p className="text-xl text-white leading-relaxed">
							Access 190+ resources, protocols, and training materials to transform your pharmacy into a clinical care destination.
						</p>
					</div>

					{/* Feature Cards */}
					<div className="grid grid-cols-3 gap-4 mb-12">
						{features.map((feature, index) => (
							<Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
								<CardContent className="p-4 text-center">
									<feature.icon className="w-8 h-8 mx-auto mb-2 text-white" />
									<h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
									<p className="text-xs text-white">{feature.description}</p>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Bottom Message */}
					<div className="flex items-center gap-2">
						<CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
						<p className="text-white font-medium">
							Team-Based Care. Patient-Centered Workflows.
						</p>
					</div>
				</div>

				{/* Background decoration */}
				<div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
			</div>

			{/* Right Side - Login Form */}
			<div className="flex-1 lg:flex-none lg:w-1/2 flex items-center justify-center p-8 bg-white">
				<div className="w-full max-w-md">
					{/* Mobile Logo (visible only on small screens) */}
					<div className="lg:hidden text-center mb-8">
						<Link to="/">
							<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
								ClinicalRxQ
							</h1>
						</Link>
					</div>

					{/* Form Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Welcome Back
						</h1>
						<p className="text-gray-600">
							Sign in to access your member dashboard
						</p>
					</div>

					{/* Login Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
								{error}
							</div>
						)}

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="pharmacy@example.com"
								className="h-12"
								required
								disabled={isLoading}
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Enter your password"
									className="h-12 pr-12"
									required
									disabled={isLoading}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-600">Remember me</span>
							</label>
							<button
								type="button"
								className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
							>
								Forgot Password?
							</button>
						</div>

						<Button 
							type="submit" 
							className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
							disabled={isLoading}
						>
							{isLoading ? 'Signing in...' : 'Sign In'}
						</Button>
					</form>

					{/* Sign Up Link */}
					<div className="mt-8 text-center">
						<p className="text-sm text-gray-600 mb-4">
							New to ClinicalRxQ?
						</p>
						<Button 
							variant="outline" 
							className="w-full h-12"
							onClick={() => {
								// Handle request access - could navigate to contact page or open a modal
								navigate('/contact')
							}}
						>
							Request Access
						</Button>
					</div>

					{/* Back to Home */}
					<div className="mt-8 text-center">
						<Link to="/" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
							← Back to Home
						</Link>
					</div>
				</div>
			</div>
			</div>
		</div>
	)
}