import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { TrendingUp, TrendingDown, Users, BookOpen, Clock, Award } from 'lucide-react';

const performanceData = [
  { month: 'Jan', completion: 65, engagement: 78, grades: 82 },
  { month: 'Feb', completion: 72, engagement: 85, grades: 79 },
  { month: 'Mar', completion: 78, engagement: 82, grades: 85 },
  { month: 'Apr', completion: 85, engagement: 88, grades: 87 },
  { month: 'May', completion: 82, engagement: 90, grades: 89 },
  { month: 'Jun', completion: 88, engagement: 92, grades: 91 },
];

const engagementData = [
  { name: 'Videos Watched', value: 45, color: '#8B5CF6' },
  { name: 'Assignments Completed', value: 32, color: '#EC4899' },
  { name: 'Discussions', value: 18, color: '#06B6D4' },
  { name: 'Quizzes Taken', value: 25, color: '#F59E0B' },
];

const topPerformers = [
  { name: 'Alice Johnson', grade: 95, improvement: '+5%' },
  { name: 'Bob Smith', grade: 92, improvement: '+3%' },
  { name: 'Carol Davis', grade: 89, improvement: '+7%' },
  { name: 'David Wilson', grade: 87, improvement: '+2%' },
  { name: 'Emma Brown', grade: 85, improvement: '+4%' },
];

export function CourseAnalytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Total Enrollment</CardTitle>
              <Users className="h-4 w-4 text-violet-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">1,247</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+12%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Avg Completion</CardTitle>
              <BookOpen className="h-4 w-4 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">78%</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+5%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Avg Study Time</CardTitle>
              <Clock className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">4.2h</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingDown className="h-3 w-3 text-red-400" />
              <span className="text-red-400">-8%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Avg Grade</CardTitle>
              <Award className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">87%</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+3%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    name="Completion Rate"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#EC4899" 
                    strokeWidth={2}
                    name="Engagement"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="grades" 
                    stroke="#06B6D4" 
                    strokeWidth={2}
                    name="Average Grades"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Top Performers This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-100">{student.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-slate-300">
                    {student.grade}%
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400">
                    {student.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}