import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Calendar,
  Settings,
  Sun,
  Moon,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Target,
  Clock,
  GraduationCap
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { ContentManager } from './ContentManager';
import { Analytics } from './Analytics';
import { Calendar as CalendarComponent } from './Calendar';
import { CourseStudio } from './CourseStudio';
import { CourseCreator } from './CourseCreator';
import { CourseAnalytics } from './CourseAnalytics';
import { QuizManager } from './QuizManager';
import { StudentManager } from './StudentManager';
import { AIAssistant } from './AIAssistant';
import { ChatInterface } from './ChatInterface';
import { StartCourseModal } from './StartCourseModal';
import { ProfileModal } from './ProfileModal';
import { NotificationPanel } from './NotificationPanel';
import { cn } from '../utils/cn';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigationItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "studio", label: "Studio", icon: Video },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "calendar", label: "Calendar", icon: Calendar },
];

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCourseStudio, setShowCourseStudio] = useState(false);
  const [showCourseCreator, setShowCourseCreator] = useState(false);
  const [showStartCourseModal, setShowStartCourseModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Biology",
      description: "Comprehensive biology course covering cell structure, genetics, and ecology",
      students: 45,
      completionRate: 78,
      avgGrade: 85,
      totalLessons: 24,
      completedLessons: 18,
      lastUpdated: "2 days ago",
      status: "active",
      category: "Biology",
      difficulty: "beginner",
      estimatedHours: "40",
      files: []
    },
    {
      id: 2,
      title: "Advanced Chemistry", 
      description: "Deep dive into organic chemistry and molecular structures",
      students: 32,
      completionRate: 65,
      avgGrade: 82,
      totalLessons: 20,
      completedLessons: 13,
      lastUpdated: "1 week ago",
      status: "active",
      category: "Chemistry",
      difficulty: "advanced",
      estimatedHours: "35",
      files: []
    },
    {
      id: 3,
      title: "Physics Fundamentals",
      description: "Basic physics principles and laboratory experiments",
      students: 28,
      completionRate: 92,
      avgGrade: 88,
      totalLessons: 16,
      completedLessons: 16,
      lastUpdated: "3 days ago",
      status: "completed",
      category: "Physics",
      difficulty: "intermediate",
      estimatedHours: "30",
      files: []
    }
  ]);

  // Apply theme class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-close sidebar when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Close sidebar on mobile/tablet when navigating
    setIsSidebarOpen(false);
  };

  const handleCreateCourse = (courseData: any) => {
    const newCourse = {
      ...courseData,
      id: courses.length + 1,
      students: 0,
      completionRate: 0,
      avgGrade: 0,
      totalLessons: courseData.files?.length || 0,
      completedLessons: 0,
      lastUpdated: "Just created",
      status: courseData.status || "draft"
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
    // Close sidebar when opening profile modal
    setIsSidebarOpen(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // Mark notifications as read when opened
    if (!showNotifications) {
      setUnreadNotifications(0);
    }
  };

  if (showCourseStudio) {
    return <CourseStudio onBack={() => setShowCourseStudio(false)} />;
  }

  if (showCourseCreator) {
    return (
      <div className={cn(
        "min-h-screen p-6 transition-all duration-300",
        // Student dashboard matching background
        isDarkMode ? "bg-neutral-900" : "bg-gray-25"
      )}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className={cn(
              "text-2xl font-semibold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Create New Course
            </h1>
            <Button variant="outline" onClick={() => setShowCourseCreator(false)}>
              Cancel
            </Button>
          </div>
          <CourseCreator 
            onClose={() => setShowCourseCreator(false)}
            onSave={handleCreateCourse}
          />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Welcome Section - Professional greeting without emoji */}
            <div className="text-center space-y-4">
              <h1 className={cn(
                "text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent",
                "transition-all duration-300"
              )}>
                Welcome back, Sarah!
              </h1>
              <p className={cn(
                "text-lg max-w-2xl mx-auto",
                isDarkMode ? "text-neutral-400" : "text-gray-600"
              )}>
                Manage your courses and track student progress with powerful teaching tools
              </p>
            </div>

            {/* Stats Cards - Using Lucide icons instead of emojis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: "Total Students", 
                  value: "127", 
                  change: "+12 this month",
                  positive: true,
                  icon: Users,
                  color: "from-blue-500 to-cyan-500"
                },
                { 
                  title: "Active Courses", 
                  value: courses.filter(c => c.status === 'active').length.toString(), 
                  change: `${courses.length} total`,
                  icon: BookOpen,
                  color: "from-green-500 to-emerald-500"
                },
                { 
                  title: "Avg Completion", 
                  value: "78%", 
                  change: "+5% this month",
                  positive: true,
                  icon: Target,
                  color: "from-purple-500 to-violet-500"
                },
                { 
                  title: "Course Rating", 
                  value: "4.8", 
                  change: "Based on reviews",
                  icon: Award,
                  color: "from-orange-500 to-yellow-500"
                }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card 
                    key={stat.title}
                    variant="elevated"
                    interactive
                    className={cn(
                      "p-6 transition-all duration-300 hover:scale-105 group",
                      // Student dashboard matching styling
                      "bg-white dark:bg-neutral-800",
                      "border border-gray-100 dark:border-neutral-700",
                      "shadow-soft hover:shadow-medium"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                        "bg-gradient-to-r", stat.color,
                        "shadow-soft"
                      )}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className={cn(
                        "text-2xl font-bold transition-colors duration-300",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {stat.value}
                      </div>
                    </div>
                    <h3 className={cn(
                      "font-medium mb-1 transition-colors duration-300",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      {stat.title}
                    </h3>
                    <p className={cn(
                      "text-sm transition-colors duration-300",
                      stat.positive ? "text-success-600" : 
                      isDarkMode ? "text-neutral-500" : "text-gray-500"
                    )}>
                      {stat.change}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* Course Management Section - Student dashboard style */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={cn(
                    "text-2xl font-bold transition-colors duration-300",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Course Management
                  </h2>
                  <p className={cn(
                    "text-sm mt-1 transition-colors duration-300",
                    isDarkMode ? "text-neutral-400" : "text-gray-600"
                  )}>
                    Create, manage, and track your educational content
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange('studio');
                    }}
                    className={cn(
                      "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ease-smooth",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                      "disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                      "hover:scale-[1.02] active:scale-[0.98] transform-gpu",
                      "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-medium hover:shadow-large",
                      "hover:from-primary-600 hover:to-secondary-600 focus:shadow-glow",
                      "dark:shadow-dark-medium dark:hover:shadow-dark-large",
                      "h-10 px-4 py-2 gap-2"
                    )}
                  >
                    <Video className="h-4 w-4" />
                    Course Studio
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <Card 
                    key={course.id} 
                    variant="elevated"
                    interactive
                    className={cn(
                      "p-6 transition-all duration-300 hover:scale-105 group",
                      // Student dashboard matching card style
                      "bg-white dark:bg-neutral-800",
                      "border border-gray-100 dark:border-neutral-700",
                      "shadow-soft hover:shadow-medium"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={cn(
                        "font-semibold text-lg transition-colors duration-300",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {course.title}
                      </h3>
                      <Badge 
                        variant={
                          course.status === 'active' ? 'success' :
                          course.status === 'completed' ? 'default' : 'warning'
                        }
                        className="shadow-soft"
                      >
                        {course.status}
                      </Badge>
                    </div>
                    
                    <p className={cn(
                      "text-sm mb-6 line-clamp-2 transition-colors duration-300",
                      isDarkMode ? "text-neutral-400" : "text-gray-600"
                    )}>
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className={cn(
                          "text-2xl font-bold transition-colors duration-300",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {course.students}
                        </div>
                        <div className={cn(
                          "text-xs transition-colors duration-300",
                          isDarkMode ? "text-neutral-500" : "text-gray-500"
                        )}>
                          Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={cn(
                          "text-2xl font-bold transition-colors duration-300",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {course.completionRate}%
                        </div>
                        <div className={cn(
                          "text-xs transition-colors duration-300",
                          isDarkMode ? "text-neutral-500" : "text-gray-500"
                        )}>
                          Completion
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar - Student dashboard style */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={cn(
                          "transition-colors duration-300",
                          isDarkMode ? "text-neutral-400" : "text-gray-600"
                        )}>
                          Progress
                        </span>
                        <span className={cn(
                          "font-medium transition-colors duration-300",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {course.completedLessons}/{course.totalLessons}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full group-hover:shadow-soft transition-all duration-300">
                      Manage Course
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      case "studio":
        return <ContentManager onStartCourse={() => setShowStartCourseModal(true)} />;
      case "analytics":
        return <Analytics />;
      case "calendar":
        return <CalendarComponent />;
      case "students":
        return <StudentManager />;
      case "quizzes":
        return <QuizManager />;
      case "assistant":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={cn(
                  "text-2xl font-bold transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  AI Teaching Assistant
                </h1>
                <p className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-neutral-400" : "text-gray-600"
                )}>
                  Get help with lesson planning, student engagement, and more
                </p>
              </div>
            </div>
            
            <Card 
              variant="elevated"
              className={cn(
                "h-[calc(100vh-200px)] overflow-hidden",
                // Student dashboard matching card style
                "bg-white dark:bg-neutral-800",
                "border border-gray-100 dark:border-neutral-700",
                "shadow-soft"
              )}
            >
              <ChatInterface />
            </Card>
          </div>
        );
      case "comments":
        return (
          <div className="space-y-6">
            <h1 className={cn(
              "text-2xl font-bold transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Comments & Discussions
            </h1>
            <Card 
              variant="elevated"
              className={cn(
                "p-8 text-center",
                "bg-white dark:bg-neutral-800",
                "border border-gray-100 dark:border-neutral-700",
                "shadow-soft"
              )}
            >
              <p className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-neutral-400" : "text-gray-600"
              )}>
                Comments management system coming soon...
              </p>
            </Card>
          </div>
        );
      case "monetization":
        return (
          <div className="space-y-6">
            <h1 className={cn(
              "text-2xl font-bold transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Monetization
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Subscription Plans",
                  description: "Set up recurring subscription plans for your courses",
                  action: "Configure Plans",
                  icon: DollarSign
                },
                {
                  title: "One-time Purchases", 
                  description: "Sell individual courses or course bundles",
                  action: "Set Pricing",
                  icon: BookOpen
                },
                {
                  title: "Payment Gateway",
                  description: "Connect Stripe, PayPal, or other payment providers", 
                  action: "Connect",
                  icon: Settings
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card 
                    key={item.title}
                    variant="elevated"
                    interactive
                    className={cn(
                      "p-6 transition-all duration-300 hover:scale-105 group",
                      "bg-white dark:bg-neutral-800",
                      "border border-gray-100 dark:border-neutral-700",
                      "shadow-soft hover:shadow-medium"
                    )}
                  >
                    <IconComponent className="h-12 w-12 text-primary-500 mb-4" />
                    <h3 className={cn(
                      "text-lg font-semibold mb-2 transition-colors duration-300",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {item.title}
                    </h3>
                    <p className={cn(
                      "text-sm mb-4 transition-colors duration-300",
                      isDarkMode ? "text-neutral-400" : "text-gray-600"
                    )}>
                      {item.description}
                    </p>
                    <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                      {item.action}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h1 className={cn(
              "text-2xl font-bold transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Settings
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card 
                variant="elevated"
                className={cn(
                  "p-6",
                  "bg-white dark:bg-neutral-800",
                  "border border-gray-100 dark:border-neutral-700",
                  "shadow-soft"
                )}
              >
                <h3 className={cn(
                  "text-lg font-semibold mb-4 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2 transition-colors duration-300",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Display Name
                    </label>
                    <Input defaultValue="Sarah Thompson" />
                  </div>
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2 transition-colors duration-300",
                      isDarkMode ? "text-neutral-300" : "text-gray-700"
                    )}>
                      Email
                    </label>
                    <Input type="email" defaultValue="sarah@example.com" />
                  </div>
                </div>
              </Card>
              <Card 
                variant="elevated"
                className={cn(
                  "p-6",
                  "bg-white dark:bg-neutral-800",
                  "border border-gray-100 dark:border-neutral-700",
                  "shadow-soft"
                )}
              >
                <h3 className={cn(
                  "text-lg font-semibold mb-4 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Privacy Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn(
                        "font-medium transition-colors duration-300",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        Public Profile
                      </p>
                      <p className={cn(
                        "text-sm transition-colors duration-300",
                        isDarkMode ? "text-neutral-400" : "text-gray-600"
                      )}>
                        Make your profile visible to students
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn(
                        "font-medium transition-colors duration-300",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        Analytics Sharing
                      </p>
                      <p className={cn(
                        "text-sm transition-colors duration-300",
                        isDarkMode ? "text-neutral-400" : "text-gray-600"
                      )}>
                        Share anonymous analytics data
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      case "help":
        return (
          <div className="space-y-6">
            <h1 className={cn(
              "text-2xl font-bold transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Help & Support
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                variant="elevated"
                interactive
                className={cn(
                  "p-6 transition-all duration-300 hover:scale-105",
                  "bg-white dark:bg-neutral-800",
                  "border border-gray-100 dark:border-neutral-700",
                  "shadow-soft hover:shadow-medium"
                )}
              >
                <BookOpen className="h-12 w-12 text-primary-500 mb-4" />
                <h3 className={cn(
                  "text-lg font-semibold mb-2 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Documentation
                </h3>
                <p className={cn(
                  "text-sm mb-4 transition-colors duration-300",
                  isDarkMode ? "text-neutral-400" : "text-gray-600"
                )}>
                  Learn how to use all features of the platform
                </p>
                <Button variant="outline" className="w-full">View Docs</Button>
              </Card>
              <Card 
                variant="elevated"
                interactive
                className={cn(
                  "p-6 transition-all duration-300 hover:scale-105",
                  "bg-white dark:bg-neutral-800",
                  "border border-gray-100 dark:border-neutral-700",
                  "shadow-soft hover:shadow-medium"
                )}
              >
                <Users className="h-12 w-12 text-primary-500 mb-4" />
                <h3 className={cn(
                  "text-lg font-semibold mb-2 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Contact Support
                </h3>
                <p className={cn(
                  "text-sm mb-4 transition-colors duration-300",
                  isDarkMode ? "text-neutral-400" : "text-gray-600"
                )}>
                  Get help from our support team
                </p>
                <Button className="w-full">Contact Us</Button>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-300",
      // Student dashboard matching background
      isDarkMode ? "bg-neutral-900" : "bg-gray-25"
    )}>
      {/* Top Navigation - Student dashboard style */}
      <nav className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-sm transition-all duration-300",
        // Student dashboard matching nav style
        isDarkMode 
          ? "bg-neutral-800/90 border-neutral-700" 
          : "bg-white/90 border-gray-150",
        "shadow-xs"
      )}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-soft">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className={cn(
                    "font-bold text-lg transition-colors duration-300",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Rafiq
                  </h1>
                  <p className={cn(
                    "text-xs transition-colors duration-300",
                    isDarkMode ? "text-neutral-400" : "text-gray-600"
                  )}>
                    Teacher Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Main Navigation - Student dashboard style */}
            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 relative",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-soft"
                        : isDarkMode
                          ? "text-neutral-300 hover:bg-neutral-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="outline"
                        size="sm"
                        className={cn(
                          "ml-1",
                          isActive 
                            ? "bg-white/20 text-white border-white/30"
                            : isDarkMode
                              ? "bg-neutral-700 text-neutral-300 border-neutral-600"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side Actions - Student dashboard style */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden lg:block">
                <Search className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300",
                  isDarkMode ? "text-neutral-400" : "text-gray-500"
                )} />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleNotificationClick}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </span>
                    </div>
                  )}
                </Button>
                
                {/* Notification Panel */}
                {showNotifications && (
                  <NotificationPanel 
                    onClose={() => setShowNotifications(false)}
                    isDarkMode={isDarkMode}
                  />
                )}
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "transition-all duration-300",
                  isDarkMode ? "text-yellow-400 hover:text-yellow-300" : "text-gray-600 hover:text-gray-900"
                )}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Profile */}
              <button onClick={handleProfileClick}>
                <Avatar className="h-8 w-8 hover:ring-2 hover:ring-primary-500 transition-all duration-300">
                  <AvatarFallback className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium text-sm">
                    ST
                  </AvatarFallback>
                </Avatar>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "pt-20 lg:pt-4 p-4"
        )}>
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onProfileClick={handleProfileClick}
          />
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6 max-w-6xl mx-auto">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Modals */}
      <StartCourseModal
        open={showStartCourseModal}
        onOpenChange={setShowStartCourseModal}
        onSave={handleCreateCourse}
      />

      <ProfileModal
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
        isDarkMode={isDarkMode}
      />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}