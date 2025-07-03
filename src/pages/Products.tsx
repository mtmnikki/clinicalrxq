import Layout from '../components/layout/layout';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

const productCategories = [
  {
    name: 'Defense Systems',
    description: 'Advanced combat and security systems for land, sea, and air operations.',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/9acc631f-4126-4541-a34d-74018ac9defd.jpg',
    href: '/products/defense-systems',
  },
  {
    name: 'Aerospace Technologies',
    description: 'Cutting-edge aircraft, drones, and space-based defense solutions.',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/92a0b1b4-05ca-47fd-8d8e-a5cdeb8ba28f.jpg',
    href: '/products/aerospace',
  },
  {
    name: 'Cybersecurity Solutions',
    description: 'Digital protection for critical infrastructure and defense networks.',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/bf541ac7-1a21-450d-a283-b3d7dc00fa20.jpg',
    href: '/products/cybersecurity',
  },
];

export default function Products() {
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/f15fb32d-7e67-49c1-b45f-cf7aa117830c.jpg"
            alt="Advanced defense technologies"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>
        
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Products & Services
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              Cutting-edge defense technologies and comprehensive security solutions for the modern battlefield.
            </p>
          </div>
        </Container>
      </div>

      {/* Product categories section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Our Solution Categories</h2>
            <p className="mt-6 text-gray-300">
              Explore our comprehensive range of defense and security technologies designed to address 
              evolving threats across all domains of warfare.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <div key={category.name} className="group relative bg-gray-900 rounded-lg overflow-hidden border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-2 text-gray-400">{category.description}</p>
                  <div className="mt-6">
                    <Button variant="techOutline" size="sm" asChild>
                      <Link to={category.href}>
                        Explore
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach section */}
      <section className="py-16 bg-gray-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">Our Approach</h2>
              <div className="mt-6 space-y-6 text-gray-300">
                <p>
                  At NEXUS Defense, we take a comprehensive approach to defense technology development. 
                  Our solutions are designed with a deep understanding of modern warfare requirements 
                  and the evolving threat landscape.
                </p>
                <p>
                  We begin with thorough threat analysis and requirements gathering, working closely 
                  with defense experts and end-users to ensure our technologies address real-world challenges. 
                  Our research and development teams then create innovative solutions that combine cutting-edge 
                  technologies with practical, field-ready implementations.
                </p>
                <p>
                  Every NEXUS Defense product undergoes rigorous testing in simulated and real-world 
                  environments to ensure reliability, durability, and effectiveness in the most demanding 
                  conditions. We also provide comprehensive training, maintenance, and support services 
                  to ensure optimal performance throughout the product lifecycle.
                </p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-xl opacity-70"></div>
              <img 
                src="https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/c94a5360-0a44-4900-a1a0-dd521c69edf8.jpg" 
                alt="NEXUS Defense testing facility" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Services section */}
      <section className="py-16 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Comprehensive Services</h2>
            <p className="mt-6 text-gray-300">
              Beyond our product offerings, NEXUS Defense provides a range of specialized services 
              to support your defense and security needs.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Consulting & Advisory',
                description: 'Strategic guidance on defense technology implementation and security architecture design.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/86ab7771-4d54-4164-a0f6-9de9bcf2b530.jpg'
              },
              {
                title: 'Training & Simulation',
                description: 'Comprehensive training programs and advanced simulation environments for personnel readiness.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/51d08425-ed55-46d9-b28c-d5207b0f355b.jpg'
              },
              {
                title: 'Custom Solutions Development',
                description: 'Tailored defense technology solutions designed to address your specific operational requirements.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/be873d32-9aee-405d-93ce-e336f9ba4cce.jpg'
              },
              {
                title: 'System Integration',
                description: 'Seamless integration of NEXUS technologies with existing defense infrastructure and platforms.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/bab5106f-3f6e-443a-a123-fbddb629a436.jpg'
              },
              {
                title: 'Maintenance & Support',
                description: 'Long-term maintenance, upgrades, and operational support for deployed systems.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/ce3733c6-699b-4994-a04e-5a926607b856.jpg'
              },
              {
                title: 'Threat Analysis & Response',
                description: 'Continuous monitoring, analysis, and rapid response to emerging security threats.',
                image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/d4b86880-fb72-48c8-9e17-386832879f27.jpg'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-b from-gray-950 to-black">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Enhance Your Defense Capabilities?</h2>
            <p className="mt-6 text-gray-300">
              Contact our team to discuss how NEXUS Defense technologies and services can address your specific security challenges.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="tech" size="lg" asChild>
                <Link to="/contact">Request Consultation</Link>
              </Button>
              <Button variant="techOutline" size="lg" asChild>
                <Link to="/products/defense-systems">Explore Defense Systems</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
