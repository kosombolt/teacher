import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Target, 
  TrendingUp, 
  Download, 
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  CheckCircle,
  AlertCircle,
  Award,
  Eye
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { cn } from '../utils/cn';

interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'practice' | 'graded';
  questions: number;
  timeLimit: number;
  totalPoints: number;
  attempts: number;
  completions: number;
  avgScore: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  dueDate?: string;
}

interface QuizAnalyticsProps {
  quiz: Quiz;
  onBack: () => void;
}

const performanceData = [
  { date: '2025-01-01', attempts: 5, avgScore: 78, completions: 4 },
  { date: '2025-01-02', attempts: 8, avgScore: 82, completions: 7 },
  { date: '2025-01-03', attempts: 12, avgScore: 75, completions: 10 },
  { date: '2025-01-04', attempts: 15, avgScore: 88, completions: 14 },
  { date: '2025-01-05', attempts: 10, avgScore: 85, completions: 9 },
  { date: '2025-01-06', attempts: 18, avgScore: 79, completions: 16 },
  { date: '2025-01-07', attempts: 22, avgScore: 91, completions: 20 },
];

const questionAnalysis = [
  { question: 'Q1: Cell membrane function', correct: 85, incorrect: 15, avgTime: 45 },
  { question: 'Q2: Mitochondria structure', correct: 72, incorrect: 28, avgTime: 52 },
  { question: 'Q3: DNA replication', correct: 68, incorrect: 32, avgTime: 78 },
  { question: 'Q4: Protein synthesis', correct: 91, incorrect: 9, avgTime: 38 },
  { question: 'Q5: Cell division', correct: 76, incorrect: 24, avgTime: 65 },
];

const scoreDistribution = [
  { range: '90-100%', count: 12, color: '#22C55E' },
  { range: '80-89%', count: 18, color: '#84CC16' },
  { range: '70-79%', count: 8, color: '#EAB308' },
  { range: '60-69%', count: 4, color: '#F97316' },
  { range: '0-59%', count: 2, color: '#EF4444' },
];

const studentPerformance = [
  { name: 'Alice Johnson', score: 95, time: 28, attempts: 1, status: 'completed' },
  { name: 'Bob Smith', score: 87, time: 32, attempts: 2, status: 'completed' },
  { name: 'Carol Davis', score: 92, time: 25, attempts: 1, status: 'completed' },
  { name: 'David Wilson', score: 78, time: 35, attempts: 3, status: 'completed' },
  { name: 'Emma Brown', score: 0, time: 0, attempts: 0, status: 'not_started' },
  { name: 'Frank Miller', score: 65, time: 40, attempts: 2, status: 'completed' },
  { name: 'Grace Lee', score: 88, time: 30, attempts: 1, status: 'completed' },
];

export function QuizAnalytics({ quiz, onBack }: QuizAnalyticsProps) {
  const [dateRange, setDateRange] = useState('7d');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'not_started': return 'secondary';
      default: return 'secondary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600 dark:text-success-400';
    if (score >= 80) return 'text-warning-600 dark:text-warning-400';
    if (score >= 70) return 'text-orange-600 dark:text-orange-400';
    if (score > 0) return 'text-error-600 dark:text-error-400';
    return 'text-gray-500 dark:text-neutral-500';
  };

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quizzes
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.title}</h1>
              <p className="text-gray-600 dark:text-neutral-400">Quiz Analytics & Performance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={cn(
                "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              )}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Total Attempts</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.attempts}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-success-600" />
                <span className="text-success-600">+12%</span>
                <span className="text-gray-500 dark:text-neutral-500">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-success-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((quiz.completions / quiz.attempts) * 100)}%
              </div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">
                {quiz.completions} of {quiz.attempts} completed
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Average Score</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.avgScore}%</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-success-600" />
                <span className="text-success-600">+5%</span>
                <span className="text-gray-500 dark:text-neutral-500">improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Avg Time</CardTitle>
                <Clock className="h-4 w-4 text-cyan-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24m</div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">
                of {quiz.timeLimit}m limit
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Question Analysis</TabsTrigger>
            <TabsTrigger value="students">Student Performance</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trends */}
              <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-600" />
                        <XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-neutral-400" />
                        <YAxis stroke="#6b7280" className="dark:stroke-neutral-400" />
                        <Line 
                          type="monotone" 
                          dataKey="attempts" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          name="Attempts"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgScore" 
                          stroke="#EC4899" 
                          strokeWidth={2}
                          name="Avg Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={scoreDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="count"
                        >
                          {scoreDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {scoreDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-600 dark:text-neutral-400">{item.range}</span>
                        <span className="text-xs text-gray-900 dark:text-white ml-auto">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Information */}
            <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Quiz Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Subject:</span>
                        <span className="text-gray-900 dark:text-white">{quiz.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Topic:</span>
                        <span className="text-gray-900 dark:text-white">{quiz.topic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Difficulty:</span>
                        <Badge variant={
                          quiz.difficulty === 'easy' ? 'success' :
                          quiz.difficulty === 'medium' ? 'warning' : 'error'
                        }>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Type:</span>
                        <Badge variant="outline">{quiz.type}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quiz Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Questions:</span>
                        <span className="text-gray-900 dark:text-white">{quiz.questions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Time Limit:</span>
                        <span className="text-gray-900 dark:text-white">{quiz.timeLimit} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Total Points:</span>
                        <span className="text-gray-900 dark:text-white">{quiz.totalPoints}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Status:</span>
                        <Badge variant={
                          quiz.status === 'published' ? 'success' :
                          quiz.status === 'draft' ? 'warning' : 'secondary'
                        }>
                          {quiz.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Performance Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Pass Rate:</span>
                        <span className="text-success-600">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Retake Rate:</span>
                        <span className="text-warning-600">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Avg Attempts:</span>
                        <span className="text-gray-900 dark:text-white">1.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-neutral-400">Time Efficiency:</span>
                        <span className="text-gray-900 dark:text-white">80%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Question Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questionAnalysis.map((question, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">{question.question}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={question.correct >= 70 ? 'success' : 'warning'}>
                            {question.correct}% correct
                          </Badge>
                          <Badge variant="outline" className="text-gray-700 dark:text-neutral-300">
                            {question.avgTime}s avg
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-neutral-400">
                          <span>Correct Answers</span>
                          <span>{question.correct}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${question.correct}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                          <div>
                            <p className="text-gray-600 dark:text-neutral-400">Difficulty</p>
                            <p className="text-gray-900 dark:text-white">
                              {question.correct >= 80 ? 'Easy' : 
                               question.correct >= 60 ? 'Medium' : 'Hard'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-neutral-400">Avg Time</p>
                            <p className="text-gray-900 dark:text-white">{question.avgTime}s</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-neutral-400">Status</p>
                            <p className={question.correct >= 70 ? 'text-success-600' : 'text-error-600'}>
                              {question.correct >= 70 ? 'Good' : 'Needs Review'}
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

          <TabsContent value="students" className="space-y-6">
            <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Individual Student Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-neutral-700">
                      <tr className="text-left">
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-neutral-400">Student</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-neutral-400">Score</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-neutral-400">Time Taken</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-neutral-400">Attempts</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-neutral-400">Status</th>
                        <th className="p-3 text-sm font-medium text-gray-600 dark:text-neutral-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentPerformance.map((student, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
                          <td className="p-3">
                            <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "font-medium",
                                getScoreColor(student.score)
                              )}>
                                {student.score > 0 ? `${student.score}%` : '-'}
                              </span>
                              {student.score >= 70 && student.score > 0 && (
                                <Badge variant="success" className="text-xs">
                                  Pass
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-gray-900 dark:text-white">
                            {student.time > 0 ? `${student.time}m` : '-'}
                          </td>
                          <td className="p-3 text-gray-900 dark:text-white">{student.attempts}</td>
                          <td className="p-3">
                            <Badge variant={getStatusColor(student.status)}>
                              {student.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-success-50 dark:bg-success-500/10 border border-success-200 dark:border-success-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-success-600" />
                        <span className="font-medium text-success-700 dark:text-success-400">Strong Performance</span>
                      </div>
                      <p className="text-sm text-success-700 dark:text-success-300">
                        85% of students scored above the passing grade. Question 4 had the highest success rate.
                      </p>
                    </div>

                    <div className="p-3 bg-warning-50 dark:bg-warning-500/10 border border-warning-200 dark:border-warning-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-warning-600" />
                        <span className="font-medium text-warning-700 dark:text-warning-400">Areas for Improvement</span>
                      </div>
                      <p className="text-sm text-warning-700 dark:text-warning-300">
                        Question 3 (DNA replication) had the lowest success rate. Consider reviewing this topic.
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-700 dark:text-blue-400">Time Management</span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Students are using 80% of the allocated time on average. Time limit appears appropriate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Review Question 3</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Consider adding more practice materials for DNA replication concepts
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Add Visual Aids</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Include diagrams or videos for complex biological processes
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Create Practice Quiz</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Offer a practice version focusing on challenging topics
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Follow-up Assessment</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Schedule a brief follow-up quiz on DNA replication
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}