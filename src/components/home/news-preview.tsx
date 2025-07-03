import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const news = [
  {
    id: 1,
    title: 'NEXUS Defense Unveils Next-Generation Radar System',
    description: 'Our latest radar technology provides unprecedented detection capabilities and resistance to electronic countermeasures.',
    date: 'May 28, 2025',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/c099cdc9-4b6b-4c06-a1ad-136ace933796.jpg',
    href: '/news/next-gen-radar',
  },
  {
    id: 2,
    title: 'Strategic Partnership with European Defense Agency',
    description: 'New collaboration aims to enhance cybersecurity capabilities across NATO member countries.',
    date: 'April 15, 2025',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/a3c9236f-0f20-4124-8ca4-bb56cd61838b.jpg',
    href: '/news/european-partnership',
  },
  {
    id: 3,
    title: 'NEXUS Defense Recognized for Innovation Excellence',
    description: 'Our R&D team receives prestigious industry award for breakthroughs in autonomous defense systems.',
    date: 'March 10, 2025',
    image: 'https://pub-cdn.wisebox.ai/u/U0BGVHO7LB/web-coder/6841125098a04ddfd9e97855/resource/e0c71c0e-2ece-4774-8e83-cbe04eccb490.jpg',
    href: '/news/innovation-award',
  },
];

export default function NewsPreview() {
  return (
    <section className="py-24 bg-gray-950">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-500">LATEST UPDATES</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            News & Announcements
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Stay informed about our latest innovations, partnerships, and industry leadership.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-blue-900/20 bg-gray-900 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <p className="text-sm text-blue-400">
                    <time dateTime={item.date}>{item.date}</time>
                  </p>
                  <Link to={item.href} className="mt-2 block">
                    <h3 className="text-xl font-semibold leading-6 text-white hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-400">{item.description}</p>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="techOutline" asChild>
            <Link to="/news">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
