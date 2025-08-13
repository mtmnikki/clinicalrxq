/**
 * My Account page
 * - Combines previous Dashboard "Account" and "Billing" content
 * - Protected route (configured in App.tsx)
 * - Adds breadcrumb navigation anchored at Dashboard.
 */
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { User as UserIcon, Settings, CreditCard } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import SafeText from '../components/common/SafeText';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function Account() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'My Account' },
            ]}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and billing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={String((user?.['firstName'] ?? '') as any)}
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={String((user?.['lastName'] ?? '') as any)}
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={String((user?.email ?? '') as any)}
                    className="w-full p-2 border rounded-md"
                    readOnly
                  />
                </div>

                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing (moved here from Dashboard) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing &amp; Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Active Subscriptions</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Clinical Pharmacy Fundamentals</p>
                        <p className="text-sm text-gray-600">Next billing: January 15, 2024</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/26</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
