/**
 * Hero section component for ClinicalRxQ home page
 * Main banner showcasing the company's mission and value proposition
 */
import { Button } from '../ui/button'
import { PlayCircle, BookOpen, Users } from 'lucide-react'
import { Link } from 'react-router'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your
                <span className="text-blue-600 block">Community Pharmacy</span>
                with Clinical Excellence
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                ClinicalRxQ provides comprehensive online training, resources, and content to help community pharmacies implement and operationalize clinical services into their daily workflow.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/training">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Training
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">500+ Pharmacies Trained</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">50+ Training Modules</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/686136c80385cdf98044671e/resource/c3db7c39-3844-42e7-92aa-e8654a0b0deb.jpg" 
                alt="Pharmacy Training Platform"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Clinical Services Implementation</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    In Progress
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-gray-600">Module 3 of 4 completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
