import React, { useState } from 'react';
import { Menu, X, Video } from 'lucide-react';
import { Button } from './ui/Button';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { ContentManager } from './ContentManager';
import { Analytics } from './Analytics';
import { StudentManager } from './StudentManager';
import { VideoPlayer } from './VideoPlayer';
import { CourseStudio } from './CourseStudio';
import { CourseCreator } from './CourseCreator';
import { CourseAnalytics } from './CourseAnalytics';
import { Calendar } from './Calendar';
import { AIAssistant } from './AIAssistant';
import { QuizManager } from './QuizManager';
import { cn } from '../utils/cn';

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleCreateCourse = (courseData: any) => {
    const newCourse = {
      ...courseData,
      id: courses.length + 1,
      students: 0,
      completionRate: 0,
      avgGrade: 0,
      totalLessons: courseData.files.length,
      completedLessons: 0,
      lastUpdated: "Just created",
      status: "draft"
    };
    setCourses(prev => [...prev, newCourse]);
  };

  if (showCourseStudio) {
    return <CourseStudio onBack={() => setShowCourseStudio(false)} />;
  }

  if (showCourseCreator) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-100">Create New Course</h1>
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-100">Welcome back, Sarah!</h1>
                <p className="text-slate-400">Here's what's happening in your classes today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setShowCourseStudio(true)}
                  className="gap-2"
                >
                  <Video className="h-4 w-4" />
                  Course Studio
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-400">Total Students</h3>
                <div className="text-2xl font-bold text-slate-100">127</div>
                <p className="text-xs text-slate-400">+3 from last week</p>
              </div>
              
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-400">Active Courses</h3>
                <div className="text-2xl font-bold text-slate-100">{courses.filter(c => c.status === 'active').length}</div>
                <p className="text-xs text-slate-400">{courses.length} total courses</p>
              </div>
              
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-400">Pending Reviews</h3>
                <div className="text-2xl font-bold text-slate-100">8</div>
                <p className="text-xs text-orange-400">2 urgent</p>
              </div>
              
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-sm font-medium text-slate-400">Average Grade</h3>
                <div className="text-2xl font-bold text-slate-100">85%</div>
                <p className="text-xs text-green-400">+2% from last month</p>
              </div>
            </div>

            {/* My Courses Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-100">My Courses</h2>
                <Button 
                  onClick={() => setShowCourseCreator(true)}
                  className="gap-2"
                >
                  Start New Course
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-slate-100">{course.title}</h3>
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        course.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        course.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                      )}>
                        {course.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-slate-400">Students</p>
                        <p className="font-medium text-slate-100">{course.students}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Completion</p>
                        <p className="font-medium text-slate-100">{course.completionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Updated {course.lastUpdated}</span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "content":
        return <ContentManager />;
      case "analytics":
        return <CourseAnalytics />;
      case "students":
        return <StudentManager />;
      case "calendar":
        return <Calendar />;
      case "quizzes":
        return <QuizManager />;
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
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-100">Welcome back, Sarah!</h1>
            <p className="text-slate-400">Here's what's happening in your classes today.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-slate-300"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-100">Rafiq - Teacher Dashboard</span>
        </div>
        <Avatar>
          <AvatarFallback>ST</AvatarFallback>
        
        </Avatar>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
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

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}