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
  Plus
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Dashboard } from './Dashboard';
import { ContentManager } from './ContentManager';
import { Analytics } from './Analytics';
import { Calendar as CalendarComponent } from './Calendar';
import { CourseStudio } from './CourseStudio';
import { CourseCreator } from './CourseCreator';
import { CourseAnalytics } from './CourseAnalytics';
import { QuizManager } from './QuizManager';
import { AIAssistant } from './AIAssistant';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showCourseStudio, setShowCourseStudio] = useState(false);
  const [showCourseCreator, setShowCourseCreator] = useState(false);
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

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
      status: "draft"
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (showCourseStudio) {
    return <CourseStudio onBack={() => setShowCourseStudio(false)} />;
  }

  if (showCourseCreator) {
    return (
      <div className={cn(
        "min-h-screen p-6 transition-all duration-500",
        isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
      )}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className={cn(
              "text-2xl font-semibold",
              isDarkMode ? "text-white" : "text-neutral-900"
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
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h1 className={cn(
                "text-3xl font-bold",
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Welcome back, Sarah
              </h1>
              <p className={cn(
                "text-lg",
                isDarkMode ? "text-neutral-400" : "text-neutral-600"
              )}>
                Manage your courses and track student progress
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: "Total Students", 
                  value: "127", 
                  change: "+12 this month",
                  positive: true,
                  icon: "👥"
                },
                { 
                  title: "Active Courses", 
                  value: courses.filter(c => c.status === 'active').length.toString(), 
                  change: `${courses.length} total`,
                  icon: "📚"
                },
                { 
                  title: "Avg Completion", 
                  value: "78%", 
                  change: "+5% this month",
                  positive: true,
                  icon: "✅"
                },
                { 
                  title: "Course Rating", 
                  value: "4.8", 
                  change: "Based on reviews",
                  icon: "⭐"
                }
              ].map((stat, index) => (
                <div 
                  key={stat.title}
                  className={cn(
                    "rounded-2xl p-6 border transition-all duration-300 hover:scale-105",
                    isDarkMode 
                      ? "bg-neutral-800 border-neutral-700 hover:border-neutral-600" 
                      : "bg-white border-neutral-200 hover:border-neutral-300",
                    "shadow-soft hover:shadow-large"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className={cn(
                      "text-2xl font-bold",
                      isDarkMode ? "text-white" : "text-neutral-900"
                    )}>
                      {stat.value}
                    </div>
                  </div>
                  <h3 className={cn(
                    "font-medium mb-1",
                    isDarkMode ? "text-neutral-300" : "text-neutral-700"
                  )}>
                    {stat.title}
                  </h3>
                  <p className={cn(
                    "text-sm",
                    stat.positive ? "text-green-500" : 
                    isDarkMode ? "text-neutral-500" : "text-neutral-500"
                  )}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Course Management Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className={cn(
                  "text-2xl font-semibold",
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Course Management
                </h2>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowCourseStudio(true)}
                    className="gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Course Studio
                  </Button>
                  <Button 
                    onClick={() => setShowCourseCreator(true)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Course
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <div 
                    key={course.id} 
                    className={cn(
                      "rounded-2xl p-6 border transition-all duration-300 hover:scale-105",
                      isDarkMode 
                        ? "bg-neutral-800 border-neutral-700 hover:border-neutral-600" 
                        : "bg-white border-neutral-200 hover:border-neutral-300",
                      "shadow-soft hover:shadow-large"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={cn(
                        "font-semibold text-lg",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.title}
                      </h3>
                      <Badge 
                        className={cn(
                          course.status === 'active' 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          course.status === 'completed' 
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : 
                            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        )}
                      >
                        {course.status}
                      </Badge>
                    </div>
                    
                    <p className={cn(
                      "text-sm mb-6 line-clamp-2",
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className={cn(
                          "text-2xl font-bold",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {course.students}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={cn(
                          "text-2xl font-bold",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {course.completionRate}%
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Completion
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Manage Course
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "studio":
        return <ContentManager />;
      case "analytics":
        return <CourseAnalytics />;
      case "calendar":
        return <CalendarComponent />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500",
      isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
    )}>
      {/* Top Navigation Bar */}
      <nav className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-sm transition-all duration-300",
        isDarkMode 
          ? "bg-neutral-800/90 border-neutral-700" 
          : "bg-white/90 border-neutral-200"
      )}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className={cn(
                  "font-bold text-lg",
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Rafiq
                </h1>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-neutral-400" : "text-neutral-600"
                )}>
                  Teacher Dashboard
                </p>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 relative",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                        : isDarkMode
                          ? "text-neutral-300 hover:bg-neutral-700 hover:text-white"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs ml-1",
                          isActive 
                            ? "bg-white/20 text-white border-white/30"
                            : isDarkMode
                              ? "bg-neutral-700 text-neutral-300 border-neutral-600"
                              : "bg-neutral-100 text-neutral-600 border-neutral-200"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                  isDarkMode ? "text-neutral-400" : "text-neutral-500"
                )} />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>

              {/* Profile */}
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium text-sm">
                  ST
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}