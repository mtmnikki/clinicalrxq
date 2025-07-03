import Layout from '../components/layout/layout';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/d745a2c9-30df-4860-a0b9-6a91563238d6.jpg"
            alt="Contact us"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Get in touch with our team to discuss how NEXUS Defense can help address your security challenges.
            </p>
          </div>
        </Container>
      </div>

      {/* Contact information and form */}
      <section className="py-16 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Global Headquarters</h3>
                    <p className="mt-2 text-gray-300">
                      1200 Defense Boulevard<br />
                      Arlington, VA 22209, USA
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="mt-2 text-gray-300">+1 (800) 555-1234</p>
                    <p className="text-gray-300">+1 (703) 555-5678 (International)</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="mt-2 text-gray-300">info@nexusdefense.com</p>
                    <p className="text-gray-300">sales@nexusdefense.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Business Hours</h3>
                    <p className="mt-2 text-gray-300">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Globe className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Global Offices</h3>
                    <ul className="mt-2 space-y-1 text-gray-300">
                      <li>London, United Kingdom</li>
                      <li>Tokyo, Japan</li>
                      <li>Tel Aviv, Israel</li>
                      <li>Singapore</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="inquiry-type" className="block text-sm font-medium text-white">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiry-type"
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option>Product Information</option>
                    <option>Partnership Opportunities</option>
                    <option>Technical Support</option>
                    <option>Career Information</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-gray-900 border border-gray-700 py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="privacy-policy"
                    name="privacy-policy"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500 bg-gray-900"
                  />
                  <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-300">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>
                
                <Button variant="tech" type="submit" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Map section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Global Headquarters</h2>
          
          <div className="relative rounded-lg overflow-hidden h-96 border border-blue-900/30">
            <img 
              src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/b158b3c8-39b8-4517-8662-0bdf05cdc44d.jpg" 
              alt="Map of NEXUS Defense headquarters" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/30 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 w-6 h-6 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
