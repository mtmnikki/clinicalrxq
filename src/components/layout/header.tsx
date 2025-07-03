/**
 * Main header component with navigation for ClinicalRxQ website
 * Features responsive design and clear navigation structure
 */
import { useState } from 'react'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const programLinks = [
    { name: 'Oral Contraceptive Program', href: '/programs/oral-contraceptive' },
    { name: 'MTM Certification', href: '/programs/mtm' },
    { name: 'Point-of-Care Testing', href: '/programs/point-of-care' },
    { name: 'Chronic Care Management', href: '/programs/chronic-care' },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">ClinicalRxQ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            
            {/* Programs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                Programs
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {programLinks.map((program) => (
                  <DropdownMenuItem key={program.href} asChild>
                    <Link to={program.href} className="block px-4 py-2 text-sm">
                      {program.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to="/training" className="block px-4 py-2 text-sm font-medium border-t">
                    View All Programs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/training" className="text-gray-600 hover:text-blue-600 transition-colors">
              Training
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
              Resources
            </Link>
            <Link to="/success-stories" className="text-gray-600 hover:text-blue-600 transition-colors">
              Success Stories
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">
              Login
            </Button>
            <Button>
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/training" className="text-gray-600 hover:text-blue-600 transition-colors">
                Training
              </Link>
              
              {/* Mobile Programs Links */}
              <div className="pl-4 space-y-2">
                <div className="text-sm font-medium text-gray-900">Programs:</div>
                {programLinks.map((program) => (
                  <Link 
                    key={program.href}
                    to={program.href} 
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors pl-2"
                  >
                    {program.name}
                  </Link>
                ))}
              </div>
              
              <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link to="/success-stories" className="text-gray-600 hover:text-blue-600 transition-colors">
                Success Stories
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline">
                  Login
                </Button>
                <Button>
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}