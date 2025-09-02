import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="max-w-7xl mx-auto px-6 text-center">
				<h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
					ClinicalRxQ
				</h4>
				<p className="text-gray-300 mb-6">
					Empowering community pharmacies with clinical excellence.
				</p>
				<div className="flex justify-center gap-6">
					<Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
						Contact
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer