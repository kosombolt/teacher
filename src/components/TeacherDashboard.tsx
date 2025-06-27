import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleTabChange = (tab: string) => {
    setIsLoading(true);
    setActiveTab(tab);
    setIsSidebarOpen(false);
    
    // Simulate loading for smooth transitions
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  };

  if (showCourseStudio) {
    return <CourseStudio onBack={() => setShowCourseStudio(false)} />;
  }

  if (showCourseCreator) {
    return (
      <div className={cn(
        "min-h-screen p-6 transition-all duration-500 ease-smooth",
        isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
      )}>
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className={cn(
              "text-xl font-semibold transition-colors duration-300",
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
    const content = (() => {
      switch (activeTab) {
        case "dashboard":
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="animate-slide-up">
                  <h1 className={cn(
                    "text-2xl font-semibold mb-2 transition-colors duration-300",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    Welcome back, Sarah
                  </h1>
                  <p className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  )}>
                    Here's what's happening in your classes today.
                  </p>
                </div>
                <div className="flex items-center gap-3 animate-slide-up">
                  <Button 
                    onClick={() => setShowCourseStudio(true)}
                    className="gap-2 h-10 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-medium hover:shadow-large transition-all duration-300"
                  >
                    <Video className="h-4 w-4" />
                    Course Studio
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Students", value: "127", change: "+3 from last week", color: "primary" },
                  { title: "Active Courses", value: courses.filter(c => c.status === 'active').length.toString(), change: `${courses.length} total courses`, color: "secondary" },
                  { title: "Pending Reviews", value: "8", change: "2 urgent", color: "warning", urgent: true },
                  { title: "Average Grade", value: "85%", change: "+2% from last month", color: "success", positive: true }
                ].map((stat, index) => (
                  <div 
                    key={stat.title}
                    className={cn(
                      "rounded-2xl p-6 border transition-all duration-300 shadow-soft hover:shadow-medium animate-scale-in",
                      isDarkMode 
                        ? "bg-neutral-800 border-neutral-700 hover:border-neutral-600" 
                        : "bg-white border-neutral-200 hover:border-neutral-300"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className={cn(
                      "text-sm font-medium mb-3 transition-colors duration-300",
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      {stat.title}
                    </h3>
                    <div className={cn(
                      "text-2xl font-semibold mb-2 transition-colors duration-300",
                      isDarkMode ? "text-white" : "text-neutral-900"
                    )}>
                      {stat.value}
                    </div>
                    <p className={cn(
                      "text-xs transition-colors duration-300",
                      stat.urgent ? "text-warning-500" :
                      stat.positive ? "text-success-600" :
                      isDarkMode ? "text-neutral-500" : "text-neutral-500"
                    )}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* My Courses Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={cn(
                    "text-xl font-semibold transition-colors duration-300",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    My Courses
                  </h2>
                  <Button 
                    onClick={() => setShowCourseCreator(true)}
                    variant="outline"
                    className="gap-2 h-10 px-4 transition-all duration-300 hover:shadow-medium"
                  >
                    Create Course
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, index) => (
                    <div 
                      key={course.id} 
                      className={cn(
                        "rounded-2xl p-6 border transition-all duration-300 shadow-soft hover:shadow-medium group animate-scale-in",
                        isDarkMode 
                          ? "bg-neutral-800 border-neutral-700 hover:border-neutral-600" 
                          : "bg-white border-neutral-200 hover:border-neutral-300"
                      )}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className={cn(
                          "font-semibold text-base transition-colors duration-300 group-hover:text-primary-600",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {course.title}
                        </h3>
                        <span className={cn(
                          "px-3 py-1 text-xs font-medium rounded-full transition-all duration-300",
                          course.status === 'active' 
                            ? "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400" :
                          course.status === 'completed' 
                            ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400" : 
                            "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400"
                        )}>
                          {course.status}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm mb-6 line-clamp-2 transition-colors duration-300",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        {course.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                        <div>
                          <p className={cn(
                            "text-xs font-medium mb-1 transition-colors duration-300",
                            isDarkMode ? "text-neutral-500" : "text-neutral-500"
                          )}>
                            Students
                          </p>
                          <p className={cn(
                            "font-semibold transition-colors duration-300",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {course.students}
                          </p>
                        </div>
                        <div>
                          <p className={cn(
                            "text-xs font-medium mb-1 transition-colors duration-300",
                            isDarkMode ? "text-neutral-500" : "text-neutral-500"
                          )}>
                            Completion
                          </p>
                          <p className={cn(
                            "font-semibold transition-colors duration-300",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {course.completionRate}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={cn(
                          "text-xs transition-colors duration-300",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Updated {course.lastUpdated}
                        </span>
                        <Button size="sm" variant="outline" className="transition-all duration-300 hover:shadow-medium">
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
            <div className="space-y-6 animate-fade-in">
              <h1 className={cn(
                "text-2xl font-semibold transition-colors duration-300",
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Welcome back, Sarah
              </h1>
              <p className={cn(
                "text-sm transition-colors duration-300",
                isDarkMode ? "text-neutral-400" : "text-neutral-600"
              )}>
                Here's what's happening in your classes today.
              </p>
            </div>
          );
      }
    })();

    return (
      <div className={cn(
        "transition-opacity duration-300",
        isLoading ? "opacity-0" : "opacity-100"
      )}>
        {content}
      </div>
    );
  };

  return (
    <div className={cn(
      "min-h-screen transition-all duration-500 ease-smooth",
      isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
    )}>
      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden flex items-center justify-between p-4 border-b transition-all duration-300 backdrop-blur-sm",
        isDarkMode 
          ? "bg-neutral-800/90 border-neutral-700" 
          : "bg-white/90 border-neutral-200"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "transition-all duration-300",
            isDarkMode ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-neutral-900"
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-semibold transition-colors duration-300",
            isDarkMode ? "text-white" : "text-neutral-900"
          )}>
            Rafiq
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "transition-all duration-300",
              isDarkMode ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-neutral-900"
            )}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Avatar>
            <AvatarFallback className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium">
              ST
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-smooth lg:translate-x-0 lg:static lg:inset-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:m-4 lg:rounded-2xl lg:shadow-large"
        )}>
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 lg:mr-4 lg:my-4">
          <main className={cn(
            "p-6 lg:rounded-2xl lg:shadow-soft transition-all duration-300 min-h-[calc(100vh-2rem)]",
            isDarkMode 
              ? "lg:bg-neutral-800 lg:border lg:border-neutral-700" 
              : "lg:bg-white lg:border lg:border-neutral-200"
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