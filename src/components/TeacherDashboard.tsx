import React, { useState } from 'react';
import { Menu, X, Video, Sun, Moon } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (showCourseStudio) {
    return <CourseStudio onBack={() => setShowCourseStudio(false)} />;
  }

  if (showCourseCreator) {
    return (
      <div className={cn(
        "min-h-screen p-6 transition-colors duration-300",
        isDarkMode ? "bg-navy-900" : "bg-gray-50"
      )}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className={cn(
              "text-xl font-semibold transition-colors duration-300",
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={cn(
                  "text-xl font-semibold mb-1 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Welcome back, Sarah
                </h1>
                <p className={cn(
                  "text-sm transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Here's what's happening in your classes today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => setShowCourseStudio(true)}
                  className="gap-2 h-10 px-4"
                >
                  <Video className="h-4 w-4" />
                  Course Studio
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={cn(
                "rounded-xl p-6 border transition-all duration-300 shadow-sm",
                isDarkMode 
                  ? "bg-blue-gray-800 border-blue-gray-700" 
                  : "bg-white border-gray-200"
              )}>
                <h3 className={cn(
                  "text-sm font-medium mb-2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Total Students
                </h3>
                <div className={cn(
                  "text-2xl font-semibold mb-1 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  127
                </div>
                <p className={cn(
                  "text-xs transition-colors duration-300",
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                )}>
                  +3 from last week
                </p>
              </div>
              
              <div className={cn(
                "rounded-xl p-6 border transition-all duration-300 shadow-sm",
                isDarkMode 
                  ? "bg-blue-gray-800 border-blue-gray-700" 
                  : "bg-white border-gray-200"
              )}>
                <h3 className={cn(
                  "text-sm font-medium mb-2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Active Courses
                </h3>
                <div className={cn(
                  "text-2xl font-semibold mb-1 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {courses.filter(c => c.status === 'active').length}
                </div>
                <p className={cn(
                  "text-xs transition-colors duration-300",
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                )}>
                  {courses.length} total courses
                </p>
              </div>
              
              <div className={cn(
                "rounded-xl p-6 border transition-all duration-300 shadow-sm",
                isDarkMode 
                  ? "bg-blue-gray-800 border-blue-gray-700" 
                  : "bg-white border-gray-200"
              )}>
                <h3 className={cn(
                  "text-sm font-medium mb-2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Pending Reviews
                </h3>
                <div className={cn(
                  "text-2xl font-semibold mb-1 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  8
                </div>
                <p className="text-xs text-orange-500">2 urgent</p>
              </div>
              
              <div className={cn(
                "rounded-xl p-6 border transition-all duration-300 shadow-sm",
                isDarkMode 
                  ? "bg-blue-gray-800 border-blue-gray-700" 
                  : "bg-white border-gray-200"
              )}>
                <h3 className={cn(
                  "text-sm font-medium mb-2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Average Grade
                </h3>
                <div className={cn(
                  "text-2xl font-semibold mb-1 transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  85%
                </div>
                <p className="text-xs text-green-600">+2% from last month</p>
              </div>
            </div>

            {/* My Courses Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={cn(
                  "text-lg font-semibold transition-colors duration-300",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  My Courses
                </h2>
                <Button 
                  onClick={() => setShowCourseCreator(true)}
                  variant="outline"
                  className="gap-2 h-10 px-4"
                >
                  Create Course
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className={cn(
                    "rounded-xl p-6 border transition-all duration-300 shadow-sm hover:shadow-md",
                    isDarkMode 
                      ? "bg-blue-gray-800 border-blue-gray-700 hover:border-blue-gray-600" 
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={cn(
                        "font-medium text-base transition-colors duration-300",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {course.title}
                      </h3>
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        course.status === 'active' 
                          ? "bg-green-100 text-green-700" :
                        course.status === 'completed' 
                          ? "bg-gray-100 text-gray-700" : 
                          "bg-yellow-100 text-yellow-700"
                      )}>
                        {course.status}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm mb-4 line-clamp-2 transition-colors duration-300",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className={cn(
                          "text-xs font-medium transition-colors duration-300",
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        )}>
                          Students
                        </p>
                        <p className={cn(
                          "font-medium transition-colors duration-300",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {course.students}
                        </p>
                      </div>
                      <div>
                        <p className={cn(
                          "text-xs font-medium transition-colors duration-300",
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        )}>
                          Completion
                        </p>
                        <p className={cn(
                          "font-medium transition-colors duration-300",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {course.completionRate}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={cn(
                        "text-xs transition-colors duration-300",
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      )}>
                        Updated {course.lastUpdated}
                      </span>
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
      default:
        return (
          <div className="space-y-6">
            <h1 className={cn(
              "text-xl font-semibold transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Welcome back, Sarah
            </h1>
            <p className={cn(
              "text-sm transition-colors duration-300",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Here's what's happening in your classes today.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-navy-900" : "bg-gray-50"
    )}>
      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden flex items-center justify-between p-4 border-b transition-colors duration-300",
        isDarkMode 
          ? "bg-blue-gray-800 border-blue-gray-700" 
          : "bg-white border-gray-200"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "transition-colors duration-300",
            isDarkMode ? "text-gray-300" : "text-gray-700"
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-semibold transition-colors duration-300",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Rafiq - Teacher Dashboard
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Avatar>
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:m-4 lg:rounded-xl lg:shadow-lg"
        )}>
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 lg:mr-4 lg:my-4">
          <main className={cn(
            "p-6 lg:rounded-xl lg:shadow-sm transition-colors duration-300",
            isDarkMode 
              ? "lg:bg-blue-gray-800 lg:border lg:border-blue-gray-700" 
              : "lg:bg-white lg:border lg:border-gray-200"
          )}>
            {renderContent()}
          </main>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}