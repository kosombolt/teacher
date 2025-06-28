import React, { useState } from 'react';
import { Users, Search, Filter, Mail, MessageSquare, MoreVertical, UserPlus, Download, Eye, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { cn } from '../utils/cn';

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
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma.brown@email.com',
    enrollmentDate: '2024-08-20',
    lastActive: '2024-12-15',
    coursesEnrolled: 4,
    completionRate: 78,
    totalWatchTime: '32h 10m',
    status: 'suspended',
    subscription: 'premium'
  }
];

export function StudentManager() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSubscription, setFilterSubscription] = useState<string>('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Apply all filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    const matchesSubscription = filterSubscription === 'all' || student.subscription === filterSubscription;
    const matchesTab = activeTab === 'all' || student.status === activeTab;
    
    return matchesSearch && matchesStatus && matchesSubscription && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'suspended': return 'error';
      default: return 'secondary';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'free': return 'secondary';
      case 'premium': return 'default';
      case 'enterprise': return 'warning';
      default: return 'secondary';
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterSubscription('all');
  };

  const hasActiveFilters = searchQuery || filterStatus !== 'all' || filterSubscription !== 'all';

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on students:`, selectedStudents);
    // Implement bulk actions
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h1>
          <p className="text-gray-600 dark:text-neutral-400">Manage your students and track their progress</p>
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
        <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</div>
            <div className="text-xs text-success-600">+12 this month</div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {students.filter(s => s.status === 'active').length}
            </div>
            <div className="text-xs text-success-600">85% active rate</div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Avg Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(students.reduce((sum, s) => sum + s.completionRate, 0) / students.length)}%
            </div>
            <div className="text-xs text-success-600">+5% vs last month</div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">Premium Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {students.filter(s => s.subscription !== 'free').length}
            </div>
            <div className="text-xs text-success-600">68% conversion</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Students ({students.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({students.filter(s => s.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({students.filter(s => s.status === 'inactive').length})</TabsTrigger>
            <TabsTrigger value="suspended">Suspended ({students.filter(s => s.status === 'suspended').length})</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                variant="modern"
                className="w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={cn(
                "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              )}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <select
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className={cn(
                "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              )}
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>

            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400 mb-4">
            <span>Showing {filteredStudents.length} of {students.length} students</span>
            {searchQuery && (
              <Badge variant="outline" className="gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterStatus !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Status: {filterStatus}
                <button onClick={() => setFilterStatus('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterSubscription !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Plan: {filterSubscription}
                <button onClick={() => setFilterSubscription('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        <TabsContent value={activeTab}>
          {/* Bulk Actions */}
          {selectedStudents.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-150 dark:border-neutral-700 mb-4">
              <span className="text-sm text-gray-700 dark:text-neutral-300">{selectedStudents.length} students selected</span>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('email')}>
                <Mail className="h-4 w-4 mr-1" />
                Send Email
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('message')}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Send Message
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          )}

          {/* Students Table */}
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {hasActiveFilters ? 'No students match your filters' : 'No students found'}
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-4">
                {hasActiveFilters 
                  ? 'Try adjusting your search criteria or filters'
                  : 'Start by inviting your first students'
                }
              </p>
              {hasActiveFilters ? (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              ) : (
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Students
                </Button>
              )}
            </div>
          ) : (
            <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-150 dark:border-neutral-700">
                      <tr className="text-left">
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStudents(filteredStudents.map(s => s.id));
                              } else {
                                setSelectedStudents([]);
                              }
                            }}
                            className={cn(
                              "w-5 h-5 rounded-lg border-2 border-gray-300 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-smooth",
                              "hover:border-primary-500 hover:shadow-soft hover:scale-110 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                              "checked:bg-gradient-to-r checked:from-primary-500 checked:to-secondary-500 checked:border-primary-500",
                              "dark:border-neutral-600 dark:bg-neutral-800/80 dark:hover:border-primary-400 dark:focus:border-primary-400",
                              "cursor-pointer"
                            )}
                          />
                        </th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Student</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Status</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Subscription</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Courses</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Completion</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Watch Time</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Last Active</th>
                        <th className="p-4 text-sm font-medium text-gray-600 dark:text-neutral-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-150 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
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
                              className={cn(
                                "w-5 h-5 rounded-lg border-2 border-gray-300 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-smooth",
                                "hover:border-primary-500 hover:shadow-soft hover:scale-110 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                                "checked:bg-gradient-to-r checked:from-primary-500 checked:to-secondary-500 checked:border-primary-500",
                                "dark:border-neutral-600 dark:bg-neutral-800/80 dark:hover:border-primary-400 dark:focus:border-primary-400",
                                "cursor-pointer"
                              )}
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
                                <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                                <div className="text-sm text-gray-600 dark:text-neutral-400">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={getSubscriptionColor(student.subscription)}>
                              {student.subscription}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">{student.coursesEnrolled}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                                  style={{ width: `${student.completionRate}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-900 dark:text-white">{student.completionRate}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-white">{student.totalWatchTime}</td>
                          <td className="p-4 text-gray-600 dark:text-neutral-400 text-sm">{student.lastActive}</td>
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}