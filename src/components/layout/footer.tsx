/**
 * Footer component for ClinicalRxQ website
 * Contains company information, links, and contact details
 */
import { Link } from 'react-router'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Rx</span>
              </div>
              <span className="text-xl font-bold">ClinicalRxQ</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering community pharmacies to deliver exceptional clinical services through comprehensive training and ongoing support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/training" className="text-gray-400 hover:text-white transition-colors">
                  Online Training
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link to="/consulting" className="text-gray-400 hover:text-white transition-colors">
                  Expert Consulting
                </Link>
              </li>
              <li>
                <Link to="/implementation" className="text-gray-400 hover:text-white transition-colors">
                  Implementation Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Training Areas */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Training Areas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mtm" className="text-gray-400 hover:text-white transition-colors">
                  Medication Therapy Management
                </Link>
              </li>
              <li>
                <Link to="/immunizations" className="text-gray-400 hover:text-white transition-colors">
                  Immunization Services
                </Link>
              </li>
              <li>
                <Link to="/point-of-care" className="text-gray-400 hover:text-white transition-colors">
                  Point-of-Care Testing
                </Link>
              </li>
              <li>
                <Link to="/chronic-care" className="text-gray-400 hover:text-white transition-colors">
                  Chronic Care Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">1-800-CLINICAL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">support@clinicalrxq.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-400">
                  123 Healthcare Drive<br />
                  Suite 100<br />
                  Medical City, MC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 ClinicalRxQ. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
