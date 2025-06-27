import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Users, 
  Settings,
  Plus,
  MessageSquare,
  DollarSign,
  Palette,
  Bell,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { cn } from '../utils/cn';
import { Dashboard } from './Dashboard';
import { ContentManager } from './ContentManager';
import { Analytics } from './Analytics';
import { StudentManager } from './StudentManager';
import { CourseCreator } from './CourseCreator';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  section?: string;
}

interface CourseStudioProps {
  onBack: () => void;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "main" },
  { id: "content", label: "Content", icon: Video, section: "main" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "main" },
  { id: "students", label: "Students", icon: Users, badge: "247", section: "main" },
  { id: "comments", label: "Comments", icon: MessageSquare, badge: "12", section: "engagement" },
  { id: "monetization", label: "Monetization", icon: DollarSign, section: "business" },
  { id: "customization", label: "Customization", icon: Palette, section: "business" },
  { id: "notifications", label: "Notifications", icon: Bell, section: "settings" },
  { id: "settings", label: "Settings", icon: Settings, section: "settings" },
  { id: "help", label: "Help & Support", icon: HelpCircle, section: "settings" },
];

export function CourseStudio({ onBack }: CourseStudioProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCourseCreator, setShowCourseCreator] = useState(false);

  const groupedItems = sidebarItems.reduce((acc, item) => {
    const section = item.section || 'main';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const sectionTitles = {
    main: 'Main',
    engagement: 'Engagement',
    business: 'Business',
    settings: 'Settings'
  };

  const handleCreateCourse = (courseData: any) => {
    console.log('New course created:', courseData);
    setShowCourseCreator(false);
    // Handle course creation logic here
  };

  if (showCourseCreator) {
    return (
      <CourseCreator 
        onSave={handleCreateCourse}
        onCancel={() => setShowCourseCreator(false)}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "content":
        return <ContentManager />;
      case "analytics":
        return <Analytics />;
      case "students":
        return <StudentManager />;
      case "comments":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Comments & Discussions</h1>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
              <p className="text-slate-400">Comments management system coming soon...</p>
            </div>
          </div>
        );
      case "monetization":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Monetization</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Subscription Plans</h3>
                <p className="text-slate-400 mb-4">Set up recurring subscription plans for your courses</p>
                <Button className="w-full">Configure Plans</Button>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">One-time Purchases</h3>
                <p className="text-slate-400 mb-4">Sell individual courses or course bundles</p>
                <Button className="w-full" variant="outline">Set Pricing</Button>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Payment Gateway</h3>
                <p className="text-slate-400 mb-4">Connect Stripe, PayPal, or other payment providers</p>
                <Button className="w-full" variant="outline">Connect</Button>
              </div>
            </div>
          </div>
        );
      case "customization":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Customization</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Brand Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Logo</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <p className="text-slate-400">Upload your logo</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Primary Color</label>
                    <input type="color" className="w-full h-10 rounded border border-slate-600" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Meta Title</label>
                    <input type="text" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Meta Description</label>
                    <textarea className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 h-20"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Notifications</h1>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-100">New Student Enrollments</p>
                    <p className="text-sm text-slate-400">Get notified when students enroll in your courses</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-100">Course Completions</p>
                    <p className="text-sm text-slate-400">Get notified when students complete your courses</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-100">New Comments</p>
                    <p className="text-sm text-slate-400">Get notified about new comments on your content</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                    <input type="text" defaultValue="Sarah Thompson" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input type="email" defaultValue="sarah@example.com" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-100">Public Profile</p>
                      <p className="text-sm text-slate-400">Make your profile visible to students</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-100">Analytics Sharing</p>
                      <p className="text-sm text-slate-400">Share anonymous analytics data</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "help":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Help & Support</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Documentation</h3>
                <p className="text-slate-400 mb-4">Learn how to use all features of Course Studio</p>
                <Button variant="outline" className="w-full">View Docs</Button>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Contact Support</h3>
                <p className="text-slate-400 mb-4">Get help from our support team</p>
                <Button className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-slate-300 hover:text-slate-100"
          >
            ← Back to Dashboard
          </Button>
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-100">Course Studio</span>
        </div>
        <Avatar>
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 mt-16 lg:mt-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full bg-slate-800 border-r border-slate-700">
            {/* Logo */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-slate-100">Course Studio</h1>
                  <p className="text-xs text-slate-400">Creator Dashboard</p>
                </div>
              </div>
            </div>

            {/* Course Creator Button */}
            <div className="p-4 border-b border-slate-700">
              <Button 
                onClick={() => setShowCourseCreator(true)}
                className="w-full gap-2 bg-gradient-to-r from-violet-500 to-pink-500"
              >
                <Plus className="h-4 w-4" />
                Course Creator
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              {Object.entries(groupedItems).map(([section, items]) => (
                <div key={section} className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {sectionTitles[section as keyof typeof sectionTitles]}
                  </h3>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 font-medium group",
                            activeTab === item.id
                              ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg"
                              : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                          )}
                        >
                          <Icon className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            activeTab === item.id ? "scale-110" : "group-hover:scale-105"
                          )} />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <Badge 
                              variant={activeTab === item.id ? "secondary" : "outline"}
                              className={cn(
                                "text-xs font-medium",
                                activeTab === item.id 
                                  ? "bg-white/20 text-white border-white/30" 
                                  : "bg-slate-600 text-slate-300 border-slate-600"
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Profile */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold">
                    ST
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-100 truncate">Sarah Thompson</p>
                  <p className="text-xs text-slate-400 truncate">Course Creator</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6 max-w-7xl mx-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}