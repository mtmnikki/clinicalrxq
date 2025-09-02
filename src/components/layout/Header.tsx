import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import LogoImage from '../../assets/images/logoimage.svg'

const Header: React.FC = () => {
	return (
		<header className="bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link to="/">
						<h1 className="flex items-center gap-1">
							<img src={LogoImage} alt="ClinicalRxQ Logo" className="h-8 w-8" />
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
								ClinicalRxQ
							</span>
						</h1>
					</Link>
					<div className="flex items-center gap-4">
						<Link to="/contact">
							<Button variant="ghost">Contact</Button>
						</Link>
						<Link to="/login">
							<Button>Login</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header