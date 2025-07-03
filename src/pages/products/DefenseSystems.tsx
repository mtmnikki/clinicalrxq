import Layout from '../../components/layout/layout';
import { Container } from '../../components/ui/container';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    name: 'AEGIS Combat System',
    description: 'Advanced integrated naval weapons system providing multi-mission capability against advanced air, surface, and subsurface threats.',
    features: [
      'Integrated radar and missile guidance',
      'Multi-target tracking and engagement',
      'Automated threat response protocols',
      'AI-enhanced decision support',
      'Network-centric operations capability'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/ad43aced-7d6e-4114-b9fa-2de7f7b5c7f5.jpg'
  },
  {
    name: 'GUARDIAN Tank Defense System',
    description: 'Comprehensive protection system for armored vehicles, integrating active and passive defense mechanisms against modern threats.',
    features: [
      'Active protection against anti-tank missiles',
      'Multi-spectral smoke screen deployment',
      'Advanced composite armor integration',
      'Threat detection and tracking radar',
      'Automated countermeasure deployment'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/d8fde195-c534-4c6a-aa36-0320f42218bb.jpg'
  },
  {
    name: 'PATRIOT Air Defense System',
    description: 'Long-range, all-altitude, all-weather air defense system to counter tactical ballistic missiles, cruise missiles, and advanced aircraft.',
    features: [
      'Long-range surveillance radar',
      'Multi-target engagement capability',
      'Advanced electronic countermeasures',
      'Mobile deployment platform',
      'Integrated battle management system'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/2396953f-6752-4dde-8a90-c681fb449913.jpg'
  },
  {
    name: 'SENTINEL Border Security System',
    description: 'Integrated solution for comprehensive border monitoring and protection, combining multiple sensor technologies and response capabilities.',
    features: [
      'Multi-sensor fusion technology',
      'Autonomous surveillance drones',
      'AI-powered anomaly detection',
      'Real-time situational awareness',
      'Integrated command and control interface'
    ],
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/c30aedc6-ba07-4461-8fd7-369b072d98df.jpg'
  }
];

export default function DefenseSystems() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/fd581b06-faef-45f6-83b4-4eeee1a0db31.jpg"
            alt="Defense Systems"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Defense Systems
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Advanced combat and security systems designed to provide superior protection and operational advantage across land, sea, and air.
            </p>
          </div>
        </Container>
      </div>

      {/* Products section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white text-center">Our Defense Systems</h2>
            <p className="mt-6 text-gray-300 text-center">
              NEXUS Defense offers a comprehensive range of advanced defense systems designed to meet the evolving challenges of modern warfare and security operations.
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

      {/* Technical Specifications section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Technical Excellence</h2>
            <p className="mt-6 text-gray-300">
              Our defense systems are built to the highest technical standards, ensuring reliability and performance in the most demanding conditions.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">Advanced Materials</h3>
              <p className="text-gray-300 mb-4">
                NEXUS Defense systems utilize cutting-edge materials including:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Nano-composite armor plating
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  High-temperature resistant alloys
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Radiation-hardened electronics
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Self-healing composite structures
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Electromagnetic interference shielding
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">AI & Processing Power</h3>
              <p className="text-gray-300 mb-4">
                Our systems leverage advanced computational capabilities:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Neural network target identification
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Quantum-enhanced encryption
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Multi-core battlefield processors
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Distributed computing architecture
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Edge AI deployment for offline operation
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">Sensor Technologies</h3>
              <p className="text-gray-300 mb-4">
                Multi-spectrum sensing capabilities include:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  AESA radar systems
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Quantum LIDAR measurement
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Hyperspectral imaging arrays
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Acoustic signature detection
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Chemical/biological agent sensors
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg border border-blue-900/30">
              <h3 className="text-xl font-bold text-white mb-4">Environmental Durability</h3>
              <p className="text-gray-300 mb-4">
                All systems are rated to operate in extreme conditions:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Temperature range: -40°C to +70°C
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Waterproof to IP68 standards
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  MIL-STD-810 shock and vibration resistant
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  EMI/EMP hardened circuitry
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Sand, dust, and salt fog resistant
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-black">
        <Container>
          <div className="relative isolate overflow-hidden rounded-2xl bg-gray-900 border border-blue-900/30">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ready to Enhance Your Defense Capabilities?
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Contact our team to discuss how NEXUS Defense systems can address your specific security challenges and operational requirements.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-y-6 lg:justify-center">
                  <Button variant="tech" size="lg" asChild>
                    <Link to="/contact">Schedule a Demonstration</Link>
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
