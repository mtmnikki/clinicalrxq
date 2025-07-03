import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'AEGIS Combat System',
    description: 'Advanced integrated naval weapons system providing multi-mission capability against advanced air, surface, and subsurface threats.',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/e1b1cd54-5192-44c4-b9da-c22e2b12925a.jpg',
    href: '/products/defense-systems',
  },
  {
    id: 2,
    name: 'SENTINEL Drone System',
    description: 'Autonomous reconnaissance and surveillance unmanned aerial system with advanced AI-powered target recognition capabilities.',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/9635e268-f288-48d8-957b-02bfd973c076.jpg',
    href: '/products/aerospace',
  },
  {
    id: 3,
    name: 'FORTRESS Cybersecurity Platform',
    description: 'Comprehensive cybersecurity solution protecting critical defense infrastructure from advanced persistent threats and cyberattacks.',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/94580482-2082-46c4-81b0-b535f5cb2e8a.jpg',
    href: '/products/cybersecurity',
  },
];

export default function ProductsShowcase() {
  return (
    <section className="py-24 bg-black">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-500">PRODUCT HIGHLIGHTS</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Advanced Defense Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover our flagship products designed to provide superior protection and tactical advantage in challenging environments.
          </p>
        </div>
        
        <div className="mt-16 space-y-12 lg:space-y-20">
          {products.map((product, index) => (
            <div 
              key={product.id} 
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
                <div className="mt-6">
                  <Button variant="techOutline" asChild>
                    <Link to={product.href}>
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="tech" size="lg" asChild>
            <Link to="/products">View All Solutions</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
