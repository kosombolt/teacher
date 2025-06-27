import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy, 
  Play, 
  Users, 
  Clock, 
  BarChart3,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Settings
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { QuizCreator } from './QuizCreator';
import { QuizAnalytics } from './QuizAnalytics';
import { QuestionBank } from './QuestionBank';
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
  availability: {
    startDate: string;
    endDate: string;
  };
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Cell Structure and Function',
    description: 'Test your knowledge of cellular components and their functions',
    subject: 'Biology',
    topic: 'Cell Biology',
    difficulty: 'medium',
    type: 'graded',
    questions: 15,
    timeLimit: 30,
    totalPoints: 100,
    attempts: 45,
    completions: 42,
    avgScore: 85,
    status: 'published',
    createdAt: '2025-01-10',
    dueDate: '2025-01-25',
    availability: {
      startDate: '2025-01-15',
      endDate: '2025-01-25'
    }
  },
  {
    id: '2',
    title: 'Chemical Bonding Practice',
    description: 'Practice quiz on ionic and covalent bonds',
    subject: 'Chemistry',
    topic: 'Chemical Bonds',
    difficulty: 'easy',
    type: 'practice',
    questions: 10,
    timeLimit: 20,
    totalPoints: 50,
    attempts: 28,
    completions: 25,
    avgScore: 78,
    status: 'published',
    createdAt: '2025-01-08',
    availability: {
      startDate: '2025-01-08',
      endDate: '2025-02-08'
    }
  },
  {
    id: '3',
    title: 'Physics Motion Laws',
    description: 'Comprehensive test on Newton\'s laws of motion',
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'hard',
    type: 'graded',
    questions: 20,
    timeLimit: 45,
    totalPoints: 150,
    attempts: 0,
    completions: 0,
    avgScore: 0,
    status: 'draft',
    createdAt: '2025-01-12',
    dueDate: '2025-01-30',
    availability: {
      startDate: '2025-01-20',
      endDate: '2025-01-30'
    }
  }
];

export function QuizManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showQuizCreator, setShowQuizCreator] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || quiz.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || quiz.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const subjects = Array.from(new Set(quizzes.map(q => q.subject)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400';
      case 'archived': return 'bg-slate-500/20 text-slate-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const handleCreateQuiz = (quizData: any) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: (quizzes.length + 1).toString(),
      attempts: 0,
      completions: 0,
      avgScore: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    setQuizzes(prev => [...prev, newQuiz]);
    setShowQuizCreator(false);
  };

  const handleDuplicateQuiz = (quiz: Quiz) => {
    const duplicatedQuiz: Quiz = {
      ...quiz,
      id: (quizzes.length + 1).toString(),
      title: `${quiz.title} (Copy)`,
      attempts: 0,
      completions: 0,
      avgScore: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setQuizzes(prev => [...prev, duplicatedQuiz]);
  };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
  };

  if (showQuizCreator) {
    return (
      <QuizCreator 
        onSave={handleCreateQuiz}
        onCancel={() => setShowQuizCreator(false)}
      />
    );
  }

  if (showQuestionBank) {
    return (
      <QuestionBank 
        onBack={() => setShowQuestionBank(false)}
      />
    );
  }

  if (showAnalytics && selectedQuiz) {
    return (
      <QuizAnalytics 
        quiz={selectedQuiz}
        onBack={() => {
          setShowAnalytics(false);
          setSelectedQuiz(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Quiz Management</h1>
          <p className="text-gray-600 dark:text-slate-400">Create, manage, and analyze your quizzes and assessments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowQuestionBank(true)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Question Bank
          </Button>
          <Button 
            onClick={() => setShowQuizCreator(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{quizzes.length}</div>
            <div className="text-xs text-gray-600 dark:text-slate-400">
              {quizzes.filter(q => q.status === 'published').length} published
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Total Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {quizzes.reduce((sum, q) => sum + q.attempts, 0)}
            </div>
            <div className="text-xs text-green-400">+15% this week</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {Math.round((quizzes.reduce((sum, q) => sum + q.completions, 0) / 
                Math.max(quizzes.reduce((sum, q) => sum + q.attempts, 0), 1)) * 100)}%
            </div>
            <div className="text-xs text-green-400">Above average</div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {Math.round(quizzes.filter(q => q.completions > 0)
                .reduce((sum, q) => sum + q.avgScore, 0) / 
                Math.max(quizzes.filter(q => q.completions > 0).length, 1))}%
            </div>
            <div className="text-xs text-green-400">+3% improvement</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-400" />
              <Input
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1">
                        {quiz.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2">
                        {quiz.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setShowAnalytics(true);
                        }}
                        className="h-8 w-8"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getStatusColor(quiz.status)}>
                      {quiz.status}
                    </Badge>
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-gray-700 dark:text-slate-300">
                      {quiz.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-slate-400">Questions</p>
                      <p className="font-medium text-gray-900 dark:text-slate-100">{quiz.questions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-slate-400">Time Limit</p>
                      <p className="font-medium text-gray-900 dark:text-slate-100">{quiz.timeLimit}m</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-slate-400">Attempts</p>
                      <p className="font-medium text-gray-900 dark:text-slate-100">{quiz.attempts}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-slate-400">Avg Score</p>
                      <p className="font-medium text-gray-900 dark:text-slate-100">{quiz.avgScore}%</p>
                    </div>
                  </div>

                  {quiz.status === 'published' && quiz.completions > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-slate-400">
                        <span>Completion Rate</span>
                        <span>{Math.round((quiz.completions / quiz.attempts) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${(quiz.completions / quiz.attempts) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-slate-700">
                    <div className="text-xs text-gray-600 dark:text-slate-400">
                      <p>{quiz.subject} • {quiz.topic}</p>
                      <p>Created {quiz.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleDuplicateQuiz(quiz)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.filter(q => q.status === 'published').map((quiz) => (
              <Card key={quiz.id} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{quiz.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500/20 text-green-400">Published</Badge>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                      <span className="text-sm text-gray-700 dark:text-slate-300">{quiz.attempts}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.filter(q => q.status === 'draft').map((quiz) => (
              <Card key={quiz.id} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{quiz.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-yellow-500/20 text-yellow-400">Draft</Badge>
                    <Button size="sm" className="gap-1">
                      <Play className="h-3 w-3" />
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 dark:text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">No Archived Quizzes</h3>
            <p className="text-gray-600 dark:text-slate-400">Archived quizzes will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}