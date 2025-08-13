/**
 * Member dashboard - Overview hub with quick tabbed navigation (route links)
 * - Adds breadcrumb navigation anchored at Dashboard.
 * - The quick menu sits above the welcome area
 * - Tabs route to dedicated pages: Overview (/dashboard), Clinical Programs (/member-content),
 *   Resource Library (/resources), Bookmarks (/bookmarks), My Account (/account)
 * - Billing content moved to My Account page (combined)
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import {
  User as UserIcon,
  BookOpen,
  Award,
  Calendar,
  Clock,
  Play,
  FileText,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import SafeText from '../components/common/SafeText';
import Breadcrumbs from '../components/common/Breadcrumbs';

/** Small pill-style route tab link */
function TabLink({
  to,
  label,
  isActive,
}: {
  to: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
        isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  );
}

/** Dashboard page (Overview) */
export default function Dashboard() {
  const { user } = useAuthStore();
  const location = useLocation();

  const tabs = [
    { to: '/dashboard', label: 'Overview' },
    { to: '/member-content', label: 'Clinical Programs' },
    { to: '/resources', label: 'Resource Library' },
    { to: '/bookmarks', label: 'Bookmarks' },
    { to: '/account', label: 'My Account' },
  ];

  /** Mock data for Overview widgets */
  const enrolledPrograms = [
    {
      id: 'clinical-fundamentals',
      title: 'Clinical Pharmacy Fundamentals',
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      nextModule: 'Advanced Drug Interactions',
      dueDate: '2024-01-15',
      status: 'active',
    },
  ];

  const recentActivity = [
    { action: 'Completed Module 8', program: 'Clinical Pharmacy Fundamentals', date: '2024-01-10' },
    { action: 'Downloaded Resource', program: 'Clinical Pharmacy Fundamentals', date: '2024-01-09' },
    { action: 'Joined Live Session', program: 'Clinical Pharmacy Fundamentals', date: '2024-01-08' },
  ];

  const upcomingEvents = [
    { title: 'Live Q&A Session', date: '2024-01-12', time: '2:00 PM EST' },
    { title: 'Module 9 Due', date: '2024-01-15', time: '11:59 PM EST' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Dashboard' }]} />
        </div>

        {/* Quick route tabs above everything */}
        <div className="mb-6">
          <div className="w-full rounded-xl bg-gray-100 p-1.5 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <TabLink key={t.to} to={t.to} label={t.label} isActive={location.pathname === t.to} />
            ))}
          </div>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <SafeText value={user?.['firstName']} />!
          </h1>
          <p className="text-gray-600">Track your progress and manage your learning journey</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Programs</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold">65%</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hours Completed</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Clock className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certifications</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress + Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {enrolledPrograms.map((program) => (
                <div key={program.id} className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        <SafeText value={program.title} />
                      </h3>
                      <p className="text-sm text-gray-600">
                        {program.completedModules} of {program.totalModules} modules completed
                      </p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <Progress value={program.progress} className="w-full" />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">
                        Next: <SafeText value={program.nextModule} />
                      </p>
                      <p className="text-xs text-gray-500">
                        Due: <SafeText value={program.dueDate} />
                      </p>
                    </div>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">
                        <SafeText value={event.title} />
                      </p>
                      <p className="text-sm text-gray-600">
                        <SafeText value={`${event.date} at ${event.time}`} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/member-content">
                <Button className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 hover:from-blue-700 hover:via-cyan-600 hover:to-teal-400">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Member Content
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" className="bg-transparent w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Resource Library
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
