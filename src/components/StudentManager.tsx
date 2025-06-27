import React, { useState } from 'react';
import { Users, Search, Filter, Mail, MessageSquare, MoreVertical, UserPlus, Download, Eye } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrollmentDate: string;
  lastActive: string;
  coursesEnrolled: number;
  completionRate: number;
  totalWatchTime: string;
  status: 'active' | 'inactive' | 'suspended';
  subscription: 'free' | 'premium' | 'enterprise';
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    enrollmentDate: '2024-12-15',
    lastActive: '2025-01-12',
    coursesEnrolled: 3,
    completionRate: 85,
    totalWatchTime: '24h 30m',
    status: 'active',
    subscription: 'premium'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    enrollmentDate: '2024-11-20',
    lastActive: '2025-01-10',
    coursesEnrolled: 2,
    completionRate: 72,
    totalWatchTime: '18h 45m',
    status: 'active',
    subscription: 'free'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    enrollmentDate: '2024-10-05',
    lastActive: '2025-01-08',
    coursesEnrolled: 5,
    completionRate: 92,
    totalWatchTime: '45h 20m',
    status: 'active',
    subscription: 'enterprise'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    enrollmentDate: '2024-09-12',
    lastActive: '2024-12-28',
    coursesEnrolled: 1,
    completionRate: 45,
    totalWatchTime: '8h 15m',
    status: 'inactive',
    subscription: 'free'
  }
];

export function StudentManager() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'inactive': return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'free': return 'bg-slate-500/20 text-slate-400';
      case 'premium': return 'bg-violet-500/20 text-violet-400';
      case 'enterprise': return 'bg-gold-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Student Management</h1>
          <p className="text-gray-600 dark:text-slate-400">Manage your students and track their progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Students
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{students.length}</div>
            <div className="text-xs text-green-400">+12 this month</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {students.filter(s => s.status === 'active').length}
            </div>
            <div className="text-xs text-green-400">85% active rate</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Avg Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {Math.round(students.reduce((sum, s) => sum + s.completionRate, 0) / students.length)}%
            </div>
            <div className="text-xs text-green-400">+5% vs last month</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Premium Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {students.filter(s => s.subscription !== 'free').length}
            </div>
            <div className="text-xs text-green-400">68% conversion</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          {/* Bulk Actions */}
          {selectedStudents.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mb-4">
              <span className="text-sm text-gray-700 dark:text-slate-300">{selectedStudents.length} students selected</span>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-1" />
                Send Email
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-1" />
                Send Message
              </Button>
            </div>
          )}

          {/* Students Table */}
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-slate-700">
                    <tr className="text-left">
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudents(filteredStudents.map(s => s.id));
                            } else {
                              setSelectedStudents([]);
                            }
                          }}
                        />
                      </th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Student</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Status</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Subscription</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Courses</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Completion</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Watch Time</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Last Active</th>
                      <th className="p-4 text-sm font-medium text-gray-600 dark:text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                        <td className="p-4">
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
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-slate-100">{student.name}</div>
                              <div className="text-sm text-gray-600 dark:text-slate-400">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getSubscriptionColor(student.subscription)}>
                            {student.subscription}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-900 dark:text-slate-300">{student.coursesEnrolled}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full"
                                style={{ width: `${student.completionRate}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-900 dark:text-slate-300">{student.completionRate}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-900 dark:text-slate-300">{student.totalWatchTime}</td>
                        <td className="p-4 text-gray-600 dark:text-slate-400 text-sm">{student.lastActive}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
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

        <TabsContent value="active">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardContent className="p-6">
              <p className="text-gray-600 dark:text-slate-400">Active students view - filtered content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <CardContent className="p-6">
              <p className="text-gray-600 dark:text-slate-400">Inactive students view - filtered content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}