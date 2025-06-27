import React, { useState } from 'react';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  Users, 
  Play, 
  Clock, 
  Eye, 
  MessageSquare,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  BookOpen,
  FileText,
  Flag
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { cn } from '../utils/cn';

// Mock data for analytics
const overviewData = [
  { date: '2025-01-01', views: 1200, watchTime: 480, engagement: 78, students: 45, revenue: 2400 },
  { date: '2025-01-02', views: 1350, watchTime: 520, engagement: 82, students: 48, revenue: 2650 },
  { date: '2025-01-03', views: 1100, watchTime: 440, engagement: 75, students: 42, revenue: 2200 },
  { date: '2025-01-04', views: 1600, watchTime: 640, engagement: 85, students: 52, revenue: 3100 },
  { date: '2025-01-05', views: 1800, watchTime: 720, engagement: 88, students: 58, revenue: 3400 },
  { date: '2025-01-06', views: 1450, watchTime: 580, engagement: 80, students: 50, revenue: 2900 },
  { date: '2025-01-07', views: 1900, watchTime: 760, engagement: 92, students: 62, revenue: 3800 },
];

const studentPerformanceData = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@example.com',
    course: 'Biology Fundamentals',
    completion: 95, 
    lastActive: '2 hours ago', 
    avgScore: 92, 
    studyTime: '24h 30m',
    status: 'excellent',
    trend: 'up'
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@example.com',
    course: 'Chemistry Basics',
    completion: 78, 
    lastActive: '1 day ago', 
    avgScore: 85, 
    studyTime: '18h 45m',
    status: 'good',
    trend: 'up'
  },
  { 
    id: 3, 
    name: 'Carol Davis', 
    email: 'carol@example.com',
    course: 'Physics 101',
    completion: 45, 
    lastActive: '5 days ago', 
    avgScore: 68, 
    studyTime: '8h 15m',
    status: 'at-risk',
    trend: 'down'
  },
  { 
    id: 4, 
    name: 'David Wilson', 
    email: 'david@example.com',
    course: 'Biology Fundamentals',
    completion: 88, 
    lastActive: '3 hours ago', 
    avgScore: 89, 
    studyTime: '22h 10m',
    status: 'good',
    trend: 'stable'
  },
];

const courseInsightsData = [
  { course: 'Biology Fundamentals', completion: 85, dropoff: 15, avgScore: 88, students: 45 },
  { course: 'Chemistry Basics', completion: 72, dropoff: 28, avgScore: 82, students: 32 },
  { course: 'Physics 101', completion: 68, dropoff: 32, avgScore: 79, students: 28 },
  { course: 'Advanced Biology', completion: 91, dropoff: 9, avgScore: 92, students: 18 },
];

const engagementTrendsData = [
  { date: '2025-01-01', videosWatched: 45, assignmentsSubmitted: 23, discussions: 12, quizAttempts: 34 },
  { date: '2025-01-02', videosWatched: 52, assignmentsSubmitted: 28, discussions: 15, quizAttempts: 41 },
  { date: '2025-01-03', videosWatched: 38, assignmentsSubmitted: 19, discussions: 8, quizAttempts: 29 },
  { date: '2025-01-04', videosWatched: 61, assignmentsSubmitted: 35, discussions: 18, quizAttempts: 48 },
  { date: '2025-01-05', videosWatched: 58, assignmentsSubmitted: 32, discussions: 22, quizAttempts: 45 },
  { date: '2025-01-06', videosWatched: 49, assignmentsSubmitted: 26, discussions: 14, quizAttempts: 38 },
  { date: '2025-01-07', videosWatched: 67, assignmentsSubmitted: 39, discussions: 25, quizAttempts: 52 },
];

const contentEffectivenessData = [
  { lesson: 'Cell Structure Basics', retention: 92, feedback: 4.8, dropoff: 8, difficulty: 'easy' },
  { lesson: 'DNA Replication', retention: 68, feedback: 4.2, dropoff: 32, difficulty: 'hard' },
  { lesson: 'Protein Synthesis', retention: 85, feedback: 4.6, dropoff: 15, difficulty: 'medium' },
  { lesson: 'Cell Division', retention: 78, feedback: 4.4, dropoff: 22, difficulty: 'medium' },
  { lesson: 'Genetics Introduction', retention: 89, feedback: 4.7, dropoff: 11, difficulty: 'easy' },
];

const quizAnalyticsData = [
  { question: 'What is the powerhouse of the cell?', correct: 89, incorrect: 11, avgTime: 15 },
  { question: 'Which organelle contains DNA?', correct: 76, incorrect: 24, avgTime: 22 },
  { question: 'What process creates ATP?', correct: 62, incorrect: 38, avgTime: 35 },
  { question: 'Name the cell membrane function', correct: 84, incorrect: 16, avgTime: 28 },
];

const feedbackData = [
  { course: 'Biology Fundamentals', rating: 4.8, reviews: 45, sentiment: 'positive' },
  { course: 'Chemistry Basics', rating: 4.5, reviews: 32, sentiment: 'positive' },
  { course: 'Physics 101', rating: 4.2, reviews: 28, sentiment: 'mixed' },
  { course: 'Advanced Biology', rating: 4.9, reviews: 18, sentiment: 'positive' },
];

const comparisonData = [
  { metric: 'Student Enrollment', current: 127, previous: 108, change: 17.6 },
  { metric: 'Course Completion', current: 78, previous: 73, change: 6.8 },
  { metric: 'Average Score', current: 85, previous: 82, change: 3.7 },
  { metric: 'Study Time (hours)', current: 24.5, previous: 22.1, change: 10.9 },
];

export function Analytics() {
  const [dateRange, setDateRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const filteredStudents = studentPerformanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'good': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'at-risk': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(
            "text-2xl font-bold",
            isDarkMode ? "text-white" : "text-neutral-900"
          )}>
            Analytics Dashboard
          </h1>
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-neutral-400" : "text-neutral-600"
          )}>
            Comprehensive insights into student performance and course effectiveness
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={cn(
              "px-3 py-2 rounded-xl border text-sm",
              isDarkMode 
                ? "bg-neutral-800 border-neutral-600 text-white" 
                : "bg-white border-neutral-300 text-neutral-900"
            )}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Views", value: "10.4K", change: "+12.5%", icon: Eye, color: "blue" },
              { title: "Watch Time", value: "4,140h", change: "+8.2%", icon: Clock, color: "purple" },
              { title: "Avg Engagement", value: "82%", change: "+5.1%", icon: MessageSquare, color: "pink" },
              { title: "Active Students", value: "357", change: "+15.3%", icon: Users, color: "cyan" }
            ].map((metric, index) => (
              <Card key={metric.title} className="hover:scale-105 transition-transform duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      {metric.title}
                    </CardTitle>
                    <metric.icon className={cn(
                      "h-4 w-4",
                      metric.color === "blue" && "text-blue-400",
                      metric.color === "purple" && "text-purple-400",
                      metric.color === "pink" && "text-pink-400",
                      metric.color === "cyan" && "text-cyan-400"
                    )} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "text-2xl font-bold",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-green-400">{metric.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="date" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="watchTime" 
                      stroke="#ec4899" 
                      fill="#ec4899"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonData.map((item, index) => (
              <Card key={item.metric}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-neutral-300" : "text-neutral-700"
                    )}>
                      {item.metric}
                    </h4>
                    <Badge className={cn(
                      item.change > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </Badge>
                  </div>
                  <div className={cn(
                    "text-2xl font-bold",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    {item.current}
                  </div>
                  <div className={cn(
                    "text-xs",
                    isDarkMode ? "text-neutral-500" : "text-neutral-500"
                  )}>
                    vs {item.previous} last period
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                isDarkMode ? "text-neutral-400" : "text-neutral-500"
              )} />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className={cn(
                "px-3 py-2 rounded-xl border",
                isDarkMode 
                  ? "bg-neutral-800 border-neutral-600 text-white" 
                  : "bg-white border-neutral-300 text-neutral-900"
              )}
            >
              <option value="all">All Courses</option>
              <option value="Biology Fundamentals">Biology Fundamentals</option>
              <option value="Chemistry Basics">Chemistry Basics</option>
              <option value="Physics 101">Physics 101</option>
            </select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Student Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Student Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={cn(
                    "border-b",
                    isDarkMode ? "border-neutral-700" : "border-neutral-200"
                  )}>
                    <tr className="text-left">
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Student
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Course
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Completion
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Avg Score
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Study Time
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Status
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr 
                        key={student.id} 
                        className={cn(
                          "border-b hover:bg-opacity-50 transition-colors",
                          isDarkMode 
                            ? "border-neutral-700 hover:bg-neutral-700" 
                            : "border-neutral-200 hover:bg-neutral-50"
                        )}
                      >
                        <td className="p-3">
                          <div>
                            <div className={cn(
                              "font-medium",
                              isDarkMode ? "text-white" : "text-neutral-900"
                            )}>
                              {student.name}
                            </div>
                            <div className={cn(
                              "text-sm",
                              isDarkMode ? "text-neutral-400" : "text-neutral-600"
                            )}>
                              {student.email}
                            </div>
                          </div>
                        </td>
                        <td className={cn(
                          "p-3 text-sm",
                          isDarkMode ? "text-neutral-300" : "text-neutral-700"
                        )}>
                          {student.course}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-16 h-2 rounded-full",
                              isDarkMode ? "bg-neutral-700" : "bg-neutral-200"
                            )}>
                              <div 
                                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                                style={{ width: `${student.completion}%` }}
                              />
                            </div>
                            <span className={cn(
                              "text-sm",
                              isDarkMode ? "text-neutral-300" : "text-neutral-700"
                            )}>
                              {student.completion}%
                            </span>
                          </div>
                        </td>
                        <td className={cn(
                          "p-3 text-sm font-medium",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {student.avgScore}%
                        </td>
                        <td className={cn(
                          "p-3 text-sm",
                          isDarkMode ? "text-neutral-300" : "text-neutral-700"
                        )}>
                          {student.studyTime}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                            {getTrendIcon(student.trend)}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Course Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseInsightsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="course" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="completion" fill="#8b5cf6" />
                    <Bar dataKey="avgScore" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courseInsightsData.map((course, index) => (
              <Card key={course.course}>
                <CardContent className="p-4">
                  <h4 className={cn(
                    "font-medium mb-3",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    {course.course}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={cn(
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Completion
                      </span>
                      <span className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.completion}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={cn(
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Avg Score
                      </span>
                      <span className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.avgScore}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={cn(
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Students
                      </span>
                      <span className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.students}
                      </span>
                    </div>
                  </div>
                  {course.dropoff > 25 && (
                    <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-xs text-red-600 dark:text-red-400">
                          High dropoff rate: {course.dropoff}%
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Student Engagement Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="date" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="videosWatched" stroke="#8b5cf6" strokeWidth={2} name="Videos Watched" />
                    <Line type="monotone" dataKey="assignmentsSubmitted" stroke="#ec4899" strokeWidth={2} name="Assignments" />
                    <Line type="monotone" dataKey="discussions" stroke="#06b6d4" strokeWidth={2} name="Discussions" />
                    <Line type="monotone" dataKey="quizAttempts" stroke="#f59e0b" strokeWidth={2} name="Quiz Attempts" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Content Effectiveness Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentEffectivenessData.map((lesson, index) => (
                  <div 
                    key={lesson.lesson}
                    className={cn(
                      "p-4 rounded-xl border",
                      isDarkMode 
                        ? "bg-neutral-800/50 border-neutral-700" 
                        : "bg-neutral-50 border-neutral-200"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {lesson.lesson}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge className={cn(
                          lesson.difficulty === 'easy' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          lesson.difficulty === 'medium' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {lesson.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={cn(
                            "text-sm",
                            isDarkMode ? "text-neutral-300" : "text-neutral-700"
                          )}>
                            {lesson.feedback}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className={cn(
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          Retention Rate
                        </p>
                        <p className={cn(
                          "text-lg font-semibold",
                          lesson.retention >= 80 ? "text-green-500" : 
                          lesson.retention >= 60 ? "text-yellow-500" : "text-red-500"
                        )}>
                          {lesson.retention}%
                        </p>
                      </div>
                      <div>
                        <p className={cn(
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          Drop-off Rate
                        </p>
                        <p className={cn(
                          "text-lg font-semibold",
                          lesson.dropoff <= 20 ? "text-green-500" : 
                          lesson.dropoff <= 40 ? "text-yellow-500" : "text-red-500"
                        )}>
                          {lesson.dropoff}%
                        </p>
                      </div>
                      <div>
                        <p className={cn(
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          Status
                        </p>
                        <p className={cn(
                          "text-lg font-semibold",
                          lesson.retention >= 80 ? "text-green-500" : "text-red-500"
                        )}>
                          {lesson.retention >= 80 ? "Excellent" : "Needs Review"}
                        </p>
                      </div>
                    </div>

                    {lesson.retention < 70 && (
                      <div className="mt-3 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">
                            Consider reviewing this lesson content or adding supplementary materials
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Quiz Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizAnalyticsData.map((question, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border",
                      isDarkMode 
                        ? "bg-neutral-800/50 border-neutral-700" 
                        : "bg-neutral-50 border-neutral-200"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        Q{index + 1}: {question.question}
                      </h4>
                      <Badge className={cn(
                        question.correct >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        question.correct >= 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      )}>
                        {question.correct}% correct
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={cn(
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          Correct Answers
                        </span>
                        <span className="text-green-500">{question.correct}%</span>
                      </div>
                      <div className={cn(
                        "w-full h-2 rounded-full",
                        isDarkMode ? "bg-neutral-700" : "bg-neutral-200"
                      )}>
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${question.correct}%` }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                        <div>
                          <p className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Difficulty
                          </p>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {question.correct >= 80 ? 'Easy' : 
                             question.correct >= 60 ? 'Medium' : 'Hard'}
                          </p>
                        </div>
                        <div>
                          <p className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Avg Time
                          </p>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {question.avgTime}s
                          </p>
                        </div>
                        <div>
                          <p className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Status
                          </p>
                          <p className={cn(
                            "font-medium",
                            question.correct >= 70 ? "text-green-500" : "text-red-500"
                          )}>
                            {question.correct >= 70 ? 'Good' : 'Review Needed'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Course Ratings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData.map((course, index) => (
                    <div key={course.course} className="flex items-center justify-between">
                      <div>
                        <h4 className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {course.course}
                        </h4>
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          {course.reviews} reviews
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {course.rating}
                          </span>
                        </div>
                        <Badge className={cn(
                          course.sentiment === 'positive' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        )}>
                          {course.sentiment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Recent Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { student: "Alice J.", comment: "Excellent explanations and clear examples!", rating: 5 },
                    { student: "Bob S.", comment: "Could use more practice exercises.", rating: 4 },
                    { student: "Carol D.", comment: "Great course structure and pacing.", rating: 5 },
                    { student: "David W.", comment: "Very helpful for understanding concepts.", rating: 4 }
                  ].map((feedback, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 rounded-lg border",
                        isDarkMode 
                          ? "bg-neutral-800/50 border-neutral-700" 
                          : "bg-neutral-50 border-neutral-200"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn(
                          "font-medium text-sm",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {feedback.student}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-3 w-3",
                                i < feedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        "{feedback.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}