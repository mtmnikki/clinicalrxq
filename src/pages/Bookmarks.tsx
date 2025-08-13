/**
 * Bookmarks page (protected)
 * - Adds breadcrumb navigation anchored at Dashboard.
 * - Placeholder list for saved items (to be wired to real data later)
 */
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Bookmark } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function Bookmarks() {
  const bookmarks: Array<{ id: string; title: string; href: string }> = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Bookmarks' },
            ]}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bookmarks</h1>
          <p className="text-gray-600">Quick access to items you’ve saved</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-cyan-500" />
              Saved Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookmarks.length === 0 ? (
              <p className="text-gray-600">You haven’t saved any items yet.</p>
            ) : (
              <ul className="space-y-3">
                {bookmarks.map((b) => (
                  <li key={b.id}>
                    <a href={b.href} className="text-blue-600 hover:underline">
                      {b.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
