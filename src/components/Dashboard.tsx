import React from 'react';
import { TrendingUp, TrendingDown, Users, Play, DollarSign, Eye, Clock, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';

const viewsData = [
  { month: 'Jan', views: 12500, engagement: 78, revenue: 2400 },
  { month: 'Feb', views: 15200, engagement: 82, revenue: 2800 },
  { month: 'Mar', views: 18900, engagement: 85, revenue: 3200 },
  { month: 'Apr', views: 22100, engagement: 88, revenue: 3800 },
  { month: 'May', views: 19800, engagement: 84, revenue: 3500 },
  { month: 'Jun', views: 25600, engagement: 91, revenue: 4200 },
];

const topCourses = [
  { title: 'Advanced React Development', views: 8500, engagement: 92, revenue: 1200 },
  { title: 'Python for Beginners', views: 7200, engagement: 88, revenue: 980 },
  { title: 'Data Science Fundamentals', views: 6800, engagement: 85, revenue: 1100 },
  { title: 'Web Design Masterclass', views: 5900, engagement: 79, revenue: 850 },
  { title: 'JavaScript ES6+', views: 5400, engagement: 83, revenue: 720 },
];

const trafficSources = [
  { name: 'Direct', value: 35, color: '#8B5CF6' },
  { name: 'Search', value: 28, color: '#EC4899' },
  { name: 'Social Media', value: 22, color: '#06B6D4' },
  { name: 'Referrals', value: 15, color: '#F59E0B' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Channel Dashboard</h1>
          <p className="text-slate-400">Track your course performance and student engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400">Live</Badge>
          <span className="text-sm text-slate-400">Last updated: 2 minutes ago</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">124.5K</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+15.2%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Watch Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">2,847h</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+8.7%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Students</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">1,247</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+12.3%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-400">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">$18,420</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400">+22.1%</span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="Views"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#EC4899" 
                    strokeWidth={3}
                    name="Engagement %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#06B6D4" 
                    strokeWidth={3}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {trafficSources.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-slate-400">{item.name}</span>
                  <span className="text-xs text-slate-300 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Courses */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Top Performing Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded flex items-center justify-center">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-100">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{course.views.toLocaleString()} views</span>
                      <span>{course.engagement}% engagement</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">${course.revenue}</div>
                  <div className="text-xs text-slate-400">This month</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}