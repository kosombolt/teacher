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
  Flag,
  RefreshCw,
  HelpCircle,
  Settings,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingDown,
  Brain,
  Lightbulb,
  Zap
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
  Legend,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { cn } from '../utils/cn';

// Enhanced mock data for comprehensive analytics
const overviewData = [
  { date: '2025-01-01', enrollments: 45, completion: 78, studyHours: 120, avgScore: 85, engagement: 82 },
  { date: '2025-01-02', enrollments: 48, completion: 82, studyHours: 135, avgScore: 87, engagement: 85 },
  { date: '2025-01-03', enrollments: 42, completion: 75, studyHours: 110, avgScore: 83, engagement: 79 },
  { date: '2025-01-04', enrollments: 52, completion: 85, studyHours: 145, avgScore: 89, engagement: 88 },
  { date: '2025-01-05', enrollments: 58, completion: 88, studyHours: 160, avgScore: 91, engagement: 92 },
  { date: '2025-01-06', enrollments: 50, completion: 80, studyHours: 130, avgScore: 86, engagement: 84 },
  { date: '2025-01-07', enrollments: 62, completion: 92, studyHours: 175, avgScore: 93, engagement: 95 },
];

const sparklineData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 100) + 50
}));

const studentPerformanceData = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@example.com',
    course: 'Biology Fundamentals',
    progress: 95, 
    lastActive: '2 hours ago', 
    score: 92, 
    timeEngaged: '24h 30m',
    status: 'excellent',
    trend: 'up',
    assignments: 8,
    quizzes: 12,
    discussions: 15
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@example.com',
    course: 'Chemistry Basics',
    progress: 78, 
    lastActive: '1 day ago', 
    score: 85, 
    timeEngaged: '18h 45m',
    status: 'good',
    trend: 'up',
    assignments: 6,
    quizzes: 9,
    discussions: 8
  },
  { 
    id: 3, 
    name: 'Carol Davis', 
    email: 'carol@example.com',
    course: 'Physics 101',
    progress: 45, 
    lastActive: '5 days ago', 
    score: 68, 
    timeEngaged: '8h 15m',
    status: 'at-risk',
    trend: 'down',
    assignments: 3,
    quizzes: 4,
    discussions: 2
  },
  { 
    id: 4, 
    name: 'David Wilson', 
    email: 'david@example.com',
    course: 'Biology Fundamentals',
    progress: 88, 
    lastActive: '3 hours ago', 
    score: 89, 
    timeEngaged: '22h 10m',
    status: 'good',
    trend: 'stable',
    assignments: 7,
    quizzes: 11,
    discussions: 12
  },
  { 
    id: 5, 
    name: 'Emma Brown', 
    email: 'emma@example.com',
    course: 'Advanced Chemistry',
    progress: 92, 
    lastActive: '1 hour ago', 
    score: 94, 
    timeEngaged: '28h 45m',
    status: 'excellent',
    trend: 'up',
    assignments: 9,
    quizzes: 14,
    discussions: 18
  }
];

const coursePerformanceData = [
  { 
    course: 'Biology Fundamentals', 
    completion: 85, 
    dropoff: 15, 
    avgScore: 88, 
    students: 45,
    modules: 12,
    difficulty: 'medium',
    satisfaction: 4.8,
    timeToComplete: '6 weeks'
  },
  { 
    course: 'Chemistry Basics', 
    completion: 72, 
    dropoff: 28, 
    avgScore: 82, 
    students: 32,
    modules: 10,
    difficulty: 'easy',
    satisfaction: 4.5,
    timeToComplete: '4 weeks'
  },
  { 
    course: 'Physics 101', 
    completion: 68, 
    dropoff: 32, 
    avgScore: 79, 
    students: 28,
    modules: 14,
    difficulty: 'hard',
    satisfaction: 4.2,
    timeToComplete: '8 weeks'
  },
  { 
    course: 'Advanced Biology', 
    completion: 91, 
    dropoff: 9, 
    avgScore: 92, 
    students: 18,
    modules: 16,
    difficulty: 'hard',
    satisfaction: 4.9,
    timeToComplete: '10 weeks'
  }
];

const engagementData = [
  { date: '2025-01-01', videos: 45, assignments: 23, discussions: 12, quizzes: 34, forums: 18 },
  { date: '2025-01-02', videos: 52, assignments: 28, discussions: 15, quizzes: 41, forums: 22 },
  { date: '2025-01-03', videos: 38, assignments: 19, discussions: 8, quizzes: 29, forums: 14 },
  { date: '2025-01-04', videos: 61, assignments: 35, discussions: 18, quizzes: 48, forums: 28 },
  { date: '2025-01-05', videos: 58, assignments: 32, discussions: 22, quizzes: 45, forums: 25 },
  { date: '2025-01-06', videos: 49, assignments: 26, discussions: 14, quizzes: 38, forums: 19 },
  { date: '2025-01-07', videos: 67, assignments: 39, discussions: 25, quizzes: 52, forums: 31 }
];

const contentAnalysisData = [
  { 
    lesson: 'Cell Structure Basics', 
    retention: 92, 
    feedback: 4.8, 
    dropoff: 8, 
    difficulty: 'easy',
    avgTime: '15 min',
    completions: 156,
    rewatches: 23
  },
  { 
    lesson: 'DNA Replication', 
    retention: 68, 
    feedback: 4.2, 
    dropoff: 32, 
    difficulty: 'hard',
    avgTime: '28 min',
    completions: 98,
    rewatches: 45
  },
  { 
    lesson: 'Protein Synthesis', 
    retention: 85, 
    feedback: 4.6, 
    dropoff: 15, 
    difficulty: 'medium',
    avgTime: '22 min',
    completions: 134,
    rewatches: 31
  },
  { 
    lesson: 'Cell Division', 
    retention: 78, 
    feedback: 4.4, 
    dropoff: 22, 
    difficulty: 'medium',
    avgTime: '25 min',
    completions: 112,
    rewatches: 28
  },
  { 
    lesson: 'Genetics Introduction', 
    retention: 89, 
    feedback: 4.7, 
    dropoff: 11, 
    difficulty: 'easy',
    avgTime: '18 min',
    completions: 145,
    rewatches: 19
  }
];

const assessmentData = [
  { 
    question: 'What is the powerhouse of the cell?', 
    correct: 89, 
    incorrect: 11, 
    avgTime: 15,
    difficulty: 'easy',
    topic: 'Cell Biology',
    attempts: 234
  },
  { 
    question: 'Which organelle contains DNA?', 
    correct: 76, 
    incorrect: 24, 
    avgTime: 22,
    difficulty: 'medium',
    topic: 'Cell Structure',
    attempts: 198
  },
  { 
    question: 'What process creates ATP?', 
    correct: 62, 
    incorrect: 38, 
    avgTime: 35,
    difficulty: 'hard',
    topic: 'Cellular Respiration',
    attempts: 167
  },
  { 
    question: 'Name the cell membrane function', 
    correct: 84, 
    incorrect: 16, 
    avgTime: 28,
    difficulty: 'medium',
    topic: 'Cell Biology',
    attempts: 212
  }
];

const feedbackData = [
  { 
    course: 'Biology Fundamentals', 
    rating: 4.8, 
    reviews: 45, 
    sentiment: 'positive',
    themes: ['Clear explanations', 'Good examples', 'Engaging content'],
    nps: 85
  },
  { 
    course: 'Chemistry Basics', 
    rating: 4.5, 
    reviews: 32, 
    sentiment: 'positive',
    themes: ['Well structured', 'Interactive labs', 'Helpful quizzes'],
    nps: 78
  },
  { 
    course: 'Physics 101', 
    rating: 4.2, 
    reviews: 28, 
    sentiment: 'mixed',
    themes: ['Challenging', 'Need more examples', 'Good theory'],
    nps: 65
  },
  { 
    course: 'Advanced Biology', 
    rating: 4.9, 
    reviews: 18, 
    sentiment: 'positive',
    themes: ['Excellent depth', 'Expert instruction', 'Comprehensive'],
    nps: 92
  }
];

const comparisonData = [
  { metric: 'Active Enrollments', current: 127, previous: 108, change: 17.6, target: 150 },
  { metric: 'Avg Completion Rate', current: 78, previous: 73, change: 6.8, target: 85 },
  { metric: 'Total Study Hours', current: 2847, previous: 2621, change: 8.6, target: 3000 },
  { metric: 'Mean Assessment Score', current: 85, previous: 82, change: 3.7, target: 88 }
];

const insightData = [
  {
    type: 'success',
    title: 'High Engagement Detected',
    description: 'Biology Fundamentals shows 15% increase in discussion participation',
    action: 'Consider applying similar engagement strategies to other courses',
    impact: 'high'
  },
  {
    type: 'warning',
    title: 'Content Bottleneck Identified',
    description: 'DNA Replication lesson has 32% drop-off rate',
    action: 'Review content difficulty and add supplementary materials',
    impact: 'medium'
  },
  {
    type: 'info',
    title: 'Assessment Optimization',
    description: 'Question difficulty distribution could be improved',
    action: 'Add more medium-difficulty questions to balance assessment',
    impact: 'low'
  }
];

export function Analytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const filteredStudents = studentPerformanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // Simulate data refresh
  };

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    // Implement export functionality
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on students:`, selectedStudents);
    // Implement bulk actions
  };

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
      case 'up': return <ArrowUp className="h-3 w-3 text-green-500" />;
      case 'down': return <ArrowDown className="h-3 w-3 text-red-500" />;
      default: return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default: return <Brain className="h-5 w-5 text-purple-500" />;
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
            Comprehensive educational insights and performance analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
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
          <div className="relative">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Real-time Status */}
      <div className={cn(
        "flex items-center justify-between p-3 rounded-xl border",
        isDarkMode 
          ? "bg-neutral-800/50 border-neutral-700" 
          : "bg-neutral-50 border-neutral-200"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className={cn(
            "text-sm",
            isDarkMode ? "text-neutral-300" : "text-neutral-700"
          )}>
            Live data • Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className={cn(
            isDarkMode ? "text-neutral-400" : "text-neutral-600"
          )}>
            Active users: 23
          </span>
          <span className={cn(
            isDarkMode ? "text-neutral-400" : "text-neutral-600"
          )}>
            Data points: 1.2M
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics with Sparklines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisonData.map((metric, index) => (
              <Card key={metric.metric} className="hover:scale-105 transition-transform duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      {metric.metric}
                    </CardTitle>
                    <div className="w-16 h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData.slice(-7)}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#8b5cf6" 
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "text-2xl font-bold mb-1",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    {metric.current.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      {metric.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      <span className={metric.change > 0 ? "text-green-400" : "text-red-400"}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Target: {metric.target}
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1 rounded-full"
                      style={{ width: `${(metric.current / metric.target) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Performance Trends
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="enrollments" 
                      stackId="1"
                      stroke="#8b5cf6" 
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      name="Enrollments"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completion" 
                      stackId="2"
                      stroke="#ec4899" 
                      fill="#ec4899"
                      fillOpacity={0.3}
                      name="Completion %"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stackId="3"
                      stroke="#06b6d4" 
                      fill="#06b6d4"
                      fillOpacity={0.3}
                      name="Engagement %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insightData.map((insight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className={cn(
                        "font-medium mb-1",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {insight.title}
                      </h4>
                      <p className={cn(
                        "text-sm mb-2",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        {insight.description}
                      </p>
                      <p className={cn(
                        "text-xs",
                        isDarkMode ? "text-neutral-500" : "text-neutral-500"
                      )}>
                        {insight.action}
                      </p>
                    </div>
                    <Badge className={cn(
                      insight.impact === 'high' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      insight.impact === 'medium' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                      {insight.impact}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Advanced Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                isDarkMode ? "text-neutral-400" : "text-neutral-500"
              )} />
              <Input
                placeholder="Search students by name or email..."
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
              <option value="Advanced Chemistry">Advanced Chemistry</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={cn(
                "px-3 py-2 rounded-xl border",
                isDarkMode 
                  ? "bg-neutral-800 border-neutral-600 text-white" 
                  : "bg-white border-neutral-300 text-neutral-900"
              )}
            >
              <option value="all">All Status</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="at-risk">At Risk</option>
            </select>
            <Button variant="outline" className="gap-2" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedStudents.length > 0 && (
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-xl border",
              isDarkMode 
                ? "bg-neutral-800/50 border-neutral-700" 
                : "bg-neutral-50 border-neutral-200"
            )}>
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-neutral-300" : "text-neutral-700"
              )}>
                {selectedStudents.length} students selected
              </span>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('message')}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Send Message
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('flag')}>
                <Flag className="h-4 w-4 mr-1" />
                Flag for Review
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                <Download className="h-4 w-4 mr-1" />
                Export Selected
              </Button>
            </div>
          )}

          {/* Student Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Student Performance Analytics
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
                      <th className="p-3">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudents(filteredStudents.map(s => s.id));
                            } else {
                              setSelectedStudents([]);
                            }
                          }}
                          className="rounded"
                        />
                      </th>
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
                        Progress
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Performance
                      </th>
                      <th className={cn(
                        "p-3 text-sm font-medium",
                        isDarkMode ? "text-neutral-400" : "text-neutral-600"
                      )}>
                        Engagement
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
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStudents(prev => [...prev, student.id]);
                              } else {
                                setSelectedStudents(prev => prev.filter(id => id !== student.id));
                              }
                            }}
                            className="rounded"
                          />
                        </td>
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
                            <div className={cn(
                              "text-xs",
                              isDarkMode ? "text-neutral-500" : "text-neutral-500"
                            )}>
                              Last active: {student.lastActive}
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
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className={cn(
                              "text-sm font-medium",
                              isDarkMode ? "text-white" : "text-neutral-900"
                            )}>
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-center">
                            <div className={cn(
                              "text-lg font-bold",
                              student.score >= 90 ? "text-green-500" :
                              student.score >= 80 ? "text-blue-500" :
                              student.score >= 70 ? "text-yellow-500" : "text-red-500"
                            )}>
                              {student.score}%
                            </div>
                            <div className={cn(
                              "text-xs",
                              isDarkMode ? "text-neutral-500" : "text-neutral-500"
                            )}>
                              Avg Score
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className={cn(
                                isDarkMode ? "text-neutral-400" : "text-neutral-600"
                              )}>
                                Time: {student.timeEngaged}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 text-xs">
                              <div className="text-center">
                                <div className={cn(
                                  "font-medium",
                                  isDarkMode ? "text-white" : "text-neutral-900"
                                )}>
                                  {student.assignments}
                                </div>
                                <div className={cn(
                                  "text-xs",
                                  isDarkMode ? "text-neutral-500" : "text-neutral-500"
                                )}>
                                  Assignments
                                </div>
                              </div>
                              <div className="text-center">
                                <div className={cn(
                                  "font-medium",
                                  isDarkMode ? "text-white" : "text-neutral-900"
                                )}>
                                  {student.quizzes}
                                </div>
                                <div className={cn(
                                  "text-xs",
                                  isDarkMode ? "text-neutral-500" : "text-neutral-500"
                                )}>
                                  Quizzes
                                </div>
                              </div>
                              <div className="text-center">
                                <div className={cn(
                                  "font-medium",
                                  isDarkMode ? "text-white" : "text-neutral-900"
                                )}>
                                  {student.discussions}
                                </div>
                                <div className={cn(
                                  "text-xs",
                                  isDarkMode ? "text-neutral-500" : "text-neutral-500"
                                )}>
                                  Posts
                                </div>
                              </div>
                            </div>
                          </div>
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
                              <MessageSquare className="h-4 w-4" />
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
          {/* Course Performance Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Course Performance Comparison
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coursePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="course" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completion" fill="#8b5cf6" name="Completion Rate %" />
                    <Bar dataKey="avgScore" fill="#ec4899" name="Average Score %" />
                    <Bar dataKey="satisfaction" fill="#06b6d4" name="Satisfaction (x20)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Course Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursePerformanceData.map((course, index) => (
              <Card key={course.course} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className={cn(
                      "font-semibold text-lg",
                      isDarkMode ? "text-white" : "text-neutral-900"
                    )}>
                      {course.course}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      {course.dropoff > 25 && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          High Dropoff
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Completion Rate
                          </span>
                          <span className={cn(
                            "font-medium",
                            course.completion >= 80 ? "text-green-500" : 
                            course.completion >= 60 ? "text-yellow-500" : "text-red-500"
                          )}>
                            {course.completion}%
                          </span>
                        </div>
                        <div className={cn(
                          "w-full h-2 rounded-full",
                          isDarkMode ? "bg-neutral-700" : "bg-neutral-200"
                        )}>
                          <div 
                            className={cn(
                              "h-2 rounded-full",
                              course.completion >= 80 ? "bg-green-500" : 
                              course.completion >= 60 ? "bg-yellow-500" : "bg-red-500"
                            )}
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Average Score
                          </span>
                          <span className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {course.avgScore}%
                          </span>
                        </div>
                        <div className={cn(
                          "w-full h-2 rounded-full",
                          isDarkMode ? "bg-neutral-700" : "bg-neutral-200"
                        )}>
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                            style={{ width: `${course.avgScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
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
                          Students Enrolled
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className={cn(
                            "font-bold",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {course.satisfaction}
                          </span>
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Satisfaction Rating
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.modules}
                      </div>
                      <div className={cn(
                        isDarkMode ? "text-neutral-500" : "text-neutral-500"
                      )}>
                        Modules
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.timeToComplete}
                      </div>
                      <div className={cn(
                        isDarkMode ? "text-neutral-500" : "text-neutral-500"
                      )}>
                        Duration
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={cn(
                        "font-medium",
                        course.dropoff <= 15 ? "text-green-500" : 
                        course.dropoff <= 25 ? "text-yellow-500" : "text-red-500"
                      )}>
                        {course.dropoff}%
                      </div>
                      <div className={cn(
                        isDarkMode ? "text-neutral-500" : "text-neutral-500"
                      )}>
                        Drop-off
                      </div>
                    </div>
                  </div>

                  {course.dropoff > 25 && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-xs text-red-600 dark:text-red-400">
                          High drop-off rate detected. Consider reviewing course structure and difficulty.
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
          {/* Engagement Trends */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Student Engagement Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="date" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="videos" stroke="#8b5cf6" strokeWidth={2} name="Videos Watched" />
                    <Line type="monotone" dataKey="assignments" stroke="#ec4899" strokeWidth={2} name="Assignments" />
                    <Line type="monotone" dataKey="discussions" stroke="#06b6d4" strokeWidth={2} name="Discussions" />
                    <Line type="monotone" dataKey="quizzes" stroke="#f59e0b" strokeWidth={2} name="Quiz Attempts" />
                    <Line type="monotone" dataKey="forums" stroke="#10b981" strokeWidth={2} name="Forum Posts" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Video Engagement', value: '67', unit: 'avg/day', color: 'purple', icon: Play },
              { label: 'Assignment Completion', value: '89%', unit: 'rate', color: 'pink', icon: FileText },
              { label: 'Discussion Participation', value: '25', unit: 'posts/day', color: 'cyan', icon: MessageSquare },
              { label: 'Quiz Attempts', value: '52', unit: 'avg/day', color: 'yellow', icon: Target },
              { label: 'Forum Activity', value: '31', unit: 'posts/day', color: 'green', icon: Users }
            ].map((metric, index) => (
              <Card key={metric.label}>
                <CardContent className="p-4 text-center">
                  <metric.icon className={cn(
                    "h-8 w-8 mx-auto mb-2",
                    metric.color === 'purple' && "text-purple-500",
                    metric.color === 'pink' && "text-pink-500",
                    metric.color === 'cyan' && "text-cyan-500",
                    metric.color === 'yellow' && "text-yellow-500",
                    metric.color === 'green' && "text-green-500"
                  )} />
                  <div className={cn(
                    "text-2xl font-bold",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    {metric.value}
                  </div>
                  <div className={cn(
                    "text-xs",
                    isDarkMode ? "text-neutral-500" : "text-neutral-500"
                  )}>
                    {metric.unit}
                  </div>
                  <div className={cn(
                    "text-sm font-medium mt-1",
                    isDarkMode ? "text-neutral-300" : "text-neutral-700"
                  )}>
                    {metric.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* Content Effectiveness Heatmap */}
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
                {contentAnalysisData.map((lesson, index) => (
                  <div 
                    key={lesson.lesson}
                    className={cn(
                      "p-4 rounded-xl border transition-all duration-300 hover:shadow-lg",
                      isDarkMode 
                        ? "bg-neutral-800/50 border-neutral-700 hover:border-neutral-600" 
                        : "bg-neutral-50 border-neutral-200 hover:border-neutral-300"
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
                        <Badge className={getDifficultyColor(lesson.difficulty)}>
                          {lesson.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className={cn(
                            "text-sm font-medium",
                            isDarkMode ? "text-white" : "text-neutral-900"
                          )}>
                            {lesson.feedback}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Retention Rate
                          </span>
                          <span className={cn(
                            "font-medium",
                            lesson.retention >= 80 ? "text-green-500" : 
                            lesson.retention >= 60 ? "text-yellow-500" : "text-red-500"
                          )}>
                            {lesson.retention}%
                          </span>
                        </div>
                        <div className={cn(
                          "w-full h-2 rounded-full",
                          isDarkMode ? "bg-neutral-700" : "bg-neutral-200"
                        )}>
                          <div 
                            className={cn(
                              "h-2 rounded-full",
                              lesson.retention >= 80 ? "bg-green-500" : 
                              lesson.retention >= 60 ? "bg-yellow-500" : "bg-red-500"
                            )}
                            style={{ width: `${lesson.retention}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <div className={cn(
                          "text-lg font-bold",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {lesson.avgTime}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Avg Watch Time
                        </div>
                      </div>

                      <div className="text-center">
                        <div className={cn(
                          "text-lg font-bold",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {lesson.completions}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Completions
                        </div>
                      </div>

                      <div className="text-center">
                        <div className={cn(
                          "text-lg font-bold",
                          lesson.rewatches > 30 ? "text-yellow-500" : "text-green-500"
                        )}>
                          {lesson.rewatches}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Rewatches
                        </div>
                      </div>
                    </div>

                    {lesson.retention < 70 && (
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                          <div>
                            <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                              Improvement Suggestion:
                            </span>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                              Low retention detected. Consider breaking this lesson into smaller segments or adding interactive elements.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {lesson.rewatches > 30 && (
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              High Rewatch Rate:
                            </span>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                              Students are rewatching this content frequently. Consider if the material is too complex or if additional explanations are needed.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          {/* Assessment Performance */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Question-Level Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentData.map((question, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border",
                      isDarkMode 
                        ? "bg-neutral-800/50 border-neutral-700" 
                        : "bg-neutral-50 border-neutral-200"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-medium mb-1",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          Q{index + 1}: {question.question}
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <span className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Topic: {question.topic}
                          </span>
                          <span className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            {question.attempts} attempts
                          </span>
                        </div>
                      </div>
                      <Badge className={cn(
                        question.correct >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        question.correct >= 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      )}>
                        {question.correct}% correct
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={cn(
                            isDarkMode ? "text-neutral-400" : "text-neutral-600"
                          )}>
                            Success Rate
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
                      </div>

                      <div className="text-center">
                        <div className={cn(
                          "text-lg font-bold",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {question.avgTime}s
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Avg Time
                        </div>
                      </div>

                      <div className="text-center">
                        <div className={cn(
                          "text-lg font-bold",
                          question.correct >= 70 ? "text-green-500" : "text-red-500"
                        )}>
                          {question.correct >= 70 ? 'Good' : 'Review'}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          Status
                        </div>
                      </div>
                    </div>

                    {question.correct < 70 && (
                      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-xs text-red-600 dark:text-red-400">
                            Low success rate. Consider reviewing question clarity or providing additional study materials for this topic.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Difficulty Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'Easy', value: assessmentData.filter(q => q.difficulty === 'easy').length, color: '#22c55e' },
                          { name: 'Medium', value: assessmentData.filter(q => q.difficulty === 'medium').length, color: '#f59e0b' },
                          { name: 'Hard', value: assessmentData.filter(q => q.difficulty === 'hard').length, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { name: 'Easy', value: assessmentData.filter(q => q.difficulty === 'easy').length, color: '#22c55e' },
                          { name: 'Medium', value: assessmentData.filter(q => q.difficulty === 'medium').length, color: '#f59e0b' },
                          { name: 'Hard', value: assessmentData.filter(q => q.difficulty === 'hard').length, color: '#ef4444' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Performance by Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(new Set(assessmentData.map(q => q.topic))).map(topic => {
                    const topicQuestions = assessmentData.filter(q => q.topic === topic);
                    const avgCorrect = topicQuestions.reduce((sum, q) => sum + q.correct, 0) / topicQuestions.length;
                    
                    return (
                      <div key={topic}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={cn(
                            isDarkMode ? "text-neutral-300" : "text-neutral-700"
                          )}>
                            {topic}
                          </span>
                          <span className={cn(
                            "font-medium",
                            avgCorrect >= 80 ? "text-green-500" :
                            avgCorrect >= 60 ? "text-yellow-500" : "text-red-500"
                          )}>
                            {Math.round(avgCorrect)}%
                          </span>
                        </div>
                        <div className={cn(
                          "w-full h-2 rounded-full",
                          isDarkMode ? "bg-neutral-700" : "bg-neutral-200"
                        )}>
                          <div 
                            className={cn(
                              "h-2 rounded-full",
                              avgCorrect >= 80 ? "bg-green-500" :
                              avgCorrect >= 60 ? "bg-yellow-500" : "bg-red-500"
                            )}
                            style={{ width: `${avgCorrect}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {/* Course Ratings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={cn(
                  isDarkMode ? "text-white" : "text-neutral-900"
                )}>
                  Course Ratings & Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData.map((course, index) => (
                    <div key={course.course} className="flex items-center justify-between">
                      <div className="flex-1">
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
                          {course.reviews} reviews • NPS: {course.nps}
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
                  Feedback Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackData.map((course, index) => (
                    <div key={course.course}>
                      <h4 className={cn(
                        "font-medium mb-2",
                        isDarkMode ? "text-white" : "text-neutral-900"
                      )}>
                        {course.course}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.themes.map((theme, themeIndex) => (
                          <Badge key={themeIndex} variant="outline" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Comments */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Recent Student Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { student: "Alice J.", course: "Biology Fundamentals", comment: "Excellent explanations and clear examples! The interactive elements really helped me understand complex concepts.", rating: 5, date: "2 hours ago" },
                  { student: "Bob S.", course: "Chemistry Basics", comment: "Could use more practice exercises, but overall very well structured course.", rating: 4, date: "1 day ago" },
                  { student: "Carol D.", course: "Physics 101", comment: "Great course structure and pacing. The lab simulations were particularly helpful.", rating: 5, date: "2 days ago" },
                  { student: "David W.", course: "Advanced Biology", comment: "Very comprehensive and detailed. Exactly what I was looking for to advance my knowledge.", rating: 5, date: "3 days ago" }
                ].map((feedback, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border",
                      isDarkMode 
                        ? "bg-neutral-800/50 border-neutral-700" 
                        : "bg-neutral-50 border-neutral-200"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className={cn(
                          "font-medium text-sm",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {feedback.student}
                        </span>
                        <span className={cn(
                          "text-sm ml-2",
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          • {feedback.course}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <span className={cn(
                          "text-xs",
                          isDarkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                          {feedback.date}
                        </span>
                      </div>
                    </div>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-neutral-300" : "text-neutral-700"
                    )}>
                      "{feedback.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI-Generated Insights */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                "flex items-center gap-2",
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                <Brain className="h-5 w-5 text-purple-500" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insightData.map((insight, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border transition-all duration-300 hover:shadow-lg",
                      isDarkMode 
                        ? "bg-neutral-800/50 border-neutral-700 hover:border-neutral-600" 
                        : "bg-neutral-50 border-neutral-200 hover:border-neutral-300"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-medium mb-2",
                          isDarkMode ? "text-white" : "text-neutral-900"
                        )}>
                          {insight.title}
                        </h4>
                        <p className={cn(
                          "text-sm mb-3",
                          isDarkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                          {insight.description}
                        </p>
                        <div className={cn(
                          "text-xs p-2 rounded-lg",
                          insight.type === 'success' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          insight.type === 'warning' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        )}>
                          <strong>Recommended Action:</strong> {insight.action}
                        </div>
                      </div>
                      <Badge className={cn(
                        insight.impact === 'high' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                        insight.impact === 'medium' ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      )}>
                        {insight.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Automated Reports */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-neutral-900"
              )}>
                Custom Report Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={cn(
                    "font-medium mb-3",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    Report Configuration
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-1",
                        isDarkMode ? "text-neutral-300" : "text-neutral-700"
                      )}>
                        Report Type
                      </label>
                      <select className={cn(
                        "w-full px-3 py-2 rounded-xl border",
                        isDarkMode 
                          ? "bg-neutral-800 border-neutral-600 text-white" 
                          : "bg-white border-neutral-300 text-neutral-900"
                      )}>
                        <option>Student Performance Summary</option>
                        <option>Course Effectiveness Report</option>
                        <option>Engagement Analysis</option>
                        <option>Assessment Performance</option>
                      </select>
                    </div>
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-1",
                        isDarkMode ? "text-neutral-300" : "text-neutral-700"
                      )}>
                        Time Period
                      </label>
                      <select className={cn(
                        "w-full px-3 py-2 rounded-xl border",
                        isDarkMode 
                          ? "bg-neutral-800 border-neutral-600 text-white" 
                          : "bg-white border-neutral-300 text-neutral-900"
                      )}>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Custom range</option>
                      </select>
                    </div>
                    <div>
                      <label className={cn(
                        "block text-sm font-medium mb-1",
                        isDarkMode ? "text-neutral-300" : "text-neutral-700"
                      )}>
                        Export Format
                      </label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                          CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('xlsx')}>
                          Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className={cn(
                    "font-medium mb-3",
                    isDarkMode ? "text-white" : "text-neutral-900"
                  )}>
                    Scheduled Reports
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: "Weekly Performance Summary", frequency: "Every Monday", format: "PDF" },
                      { name: "Monthly Engagement Report", frequency: "1st of each month", format: "Excel" },
                      { name: "Course Completion Analysis", frequency: "Bi-weekly", format: "PDF" }
                    ].map((report, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "p-3 rounded-lg border",
                          isDarkMode 
                            ? "bg-neutral-800/50 border-neutral-700" 
                            : "bg-neutral-50 border-neutral-200"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className={cn(
                              "font-medium text-sm",
                              isDarkMode ? "text-white" : "text-neutral-900"
                            )}>
                              {report.name}
                            </h5>
                            <p className={cn(
                              "text-xs",
                              isDarkMode ? "text-neutral-400" : "text-neutral-600"
                            )}>
                              {report.frequency} • {report.format}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule New Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}