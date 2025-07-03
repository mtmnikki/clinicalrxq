import Layout from '../../components/layout/layout';
import { Container } from '../../components/ui/container';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    name: 'SENTINEL Drone System',
    description: 'Advanced autonomous reconnaissance and surveillance unmanned aerial system with AI-powered target recognition capabilities.',
    features: [
      '24+ hour flight endurance',
      'Modular payload system',
      'Encrypted communications',
      'Autonomous mission execution',
      'All-weather operation capability'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/0677ceab-4e24-4ca4-9f11-4c60779cf21f.jpg'
  },
  {
    name: 'RAPTOR Combat Aircraft Enhancement',
    description: 'Comprehensive avionics and weapons systems upgrade package for next-generation fighter aircraft.',
    features: [
      'Advanced radar integration',
      'Enhanced electronic warfare suite',
      'AESA radar compatibility',
      'Multi-target weapons management',
      'Data fusion cockpit display'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/59f19d8b-5ce8-4f5f-a2d6-85d54922a3c6.jpg'
  },
  {
    name: 'ORION Satellite Defense Network',
    description: 'Space-based surveillance and communications system providing global coverage for defense operations.',
    features: [
      'Real-time imagery intelligence',
      'Secure communications relay',
      'Advanced signal intelligence gathering',
      'Global positioning enhancement',
      'Space debris monitoring'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/164c05b0-313d-40f9-968d-4a72f296ee5c.jpg'
  },
  {
    name: 'PHOENIX Air Defense System',
    description: 'Integrated air defense solution combining radar, missile systems, and command and control for comprehensive airspace protection.',
    features: [
      'Multi-band radar system',
      'Layered defense capability',
      'Networked command structure',
      'Counter-stealth technology',
      'Rapid deployment configuration'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/508b2a0a-63e4-43b2-9e9b-24390b26c6b8.jpg'
  }
];

export default function Aerospace() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/87f0552a-52be-4298-b186-4fdb3d149a3a.jpg"
            alt="Aerospace Technologies"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Aerospace Technologies
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Cutting-edge aircraft, drones, satellites, and space-based defense solutions for air and space superiority.
            </p>
          </div>
        </Container>
      </div>

      {/* Products section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white text-center">Our Aerospace Systems</h2>
            <p className="mt-6 text-gray-300 text-center">
              NEXUS Defense offers advanced aerospace technologies designed to provide superior intelligence, surveillance, and combat capabilities.
            </p>
          </div>
          
          <div className="mt-16 space-y-24">
            {products.map((product, index) => (
              <div 
                key={product.name} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
                  <div className="relative overflow-hidden rounded-lg border border-blue-900/30 bg-gray-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-4 text-lg text-gray-300">
                    {product.description}
                  </p>
                  
                  <h4 className="mt-8 text-xl font-semibold text-white">Key Features</h4>
                  <ul className="mt-4 space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        </span>
                        <span className="ml-3 text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button variant="techOutline" asChild>
                      <Link to="/contact">
                        Request Information
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Aerospace Innovation */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Aerospace Innovation</h2>
            <p className="mt-6 text-gray-300">
              Our research and development in aerospace technology is pushing the boundaries of what's possible in air and space defense.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">Unmanned Systems</h3>
              <p className="text-gray-300 mb-6">
                Our advancements in autonomous aerial systems are revolutionizing reconnaissance, surveillance, and strike capabilities.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Swarm intelligence coordination
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Multi-day endurance platforms
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  AI-driven mission adaptation
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Stealth technology integration
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">Space Defense</h3>
              <p className="text-gray-300 mb-6">
                Protecting assets in space and leveraging orbital advantages for defense operations.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Anti-satellite countermeasures
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Orbital surveillance networks
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Secure satellite communications
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Rapid launch capabilities
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">Hypersonic Technology</h3>
              <p className="text-gray-300 mb-6">
                Developing next-generation propulsion and airframe technologies for hypersonic flight.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Scramjet propulsion systems
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  High-temperature materials
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Aerodynamic configuration design
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Thermal management solutions
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Aerospace Capabilities */}
      <section className="py-16 bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
              <img 
                src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/454fab08-9083-48e4-a865-b71b9e92c92d.jpg" 
                alt="Aerospace testing facility" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white">Comprehensive Aerospace Capabilities</h2>
              <div className="mt-6 space-y-6 text-gray-300">
                <p>
                  NEXUS Defense provides end-to-end solutions for aerospace defense, from concept and design to 
                  testing, deployment, and ongoing support. Our integrated approach ensures that all components 
                  work seamlessly together to provide maximum effectiveness and reliability.
                </p>
                <p>
                  Our aerospace technologies leverage the latest advancements in materials science, propulsion, 
                  avionics, and communications to deliver superior performance in challenging operational environments. 
                  All systems are designed with interoperability in mind, allowing for seamless integration with 
                  existing platforms and infrastructure.
                </p>
                <p>
                  With rigorous testing procedures and quality control measures, NEXUS Defense ensures that our 
                  aerospace systems meet the highest standards of reliability and durability. Our comprehensive 
                  training and support services enable operators to maximize the capabilities of our technologies 
                  in the field.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-b from-gray-950 to-black">
        <Container>
          <div className="relative isolate overflow-hidden rounded-2xl bg-gray-900 border border-blue-900/30">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Elevate Your Aerospace Capabilities
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Contact our aerospace specialists to discuss how NEXUS Defense technologies can enhance your air and space defense operations.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-y-6 lg:justify-center">
                  <Button variant="tech" size="lg" asChild>
                    <Link to="/contact">Schedule a Consultation</Link>
                  </Button>
                  <Button variant="techOutline" size="lg" asChild>
                    <Link to="/products">Explore Other Solutions</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.2" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#1e40af" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
