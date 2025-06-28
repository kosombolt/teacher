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
  Settings,
  X
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
  },
  {
    id: '4',
    title: 'Organic Chemistry Basics',
    description: 'Introduction to organic chemistry principles',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'medium',
    type: 'practice',
    questions: 12,
    timeLimit: 25,
    totalPoints: 60,
    attempts: 15,
    completions: 12,
    avgScore: 82,
    status: 'archived',
    createdAt: '2024-12-20',
    availability: {
      startDate: '2024-12-20',
      endDate: '2025-01-20'
    }
  }
];

export function QuizManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showQuizCreator, setShowQuizCreator] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Get unique subjects for filter
  const subjects = Array.from(new Set(quizzes.map(q => q.subject)));

  // Apply all filters
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || quiz.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || quiz.status === filterStatus;
    const matchesDifficulty = filterDifficulty === 'all' || quiz.difficulty === filterDifficulty;
    const matchesType = filterType === 'all' || quiz.type === filterType;
    const matchesTab = activeTab === 'all' || quiz.status === activeTab;
    
    return matchesSearch && matchesSubject && matchesStatus && matchesDifficulty && matchesType && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'secondary';
      default: return 'secondary';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'secondary';
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

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterSubject('all');
    setFilterStatus('all');
    setFilterDifficulty('all');
    setFilterType('all');
  };

  const hasActiveFilters = searchQuery || filterSubject !== 'all' || filterStatus !== 'all' || 
                          filterDifficulty !== 'all' || filterType !== 'all';

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Quiz Management
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 transition-colors duration-300">
            Create, manage, and analyze your quizzes and assessments
          </p>
        </div>
        <div className="flex items-center gap-3">
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
            className="gap-2 shadow-medium hover:shadow-large"
          >
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="elevated" className="transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">
              Total Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {quizzes.length}
            </div>
            <div className="text-xs text-gray-600 dark:text-neutral-400">
              {quizzes.filter(q => q.status === 'published').length} published
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {quizzes.reduce((sum, q) => sum + q.attempts, 0)}
            </div>
            <div className="text-xs text-success-600 dark:text-success-400">
              +15% this week
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round((quizzes.reduce((sum, q) => sum + q.completions, 0) / 
                Math.max(quizzes.reduce((sum, q) => sum + q.attempts, 0), 1)) * 100)}%
            </div>
            <div className="text-xs text-success-600 dark:text-success-400">
              Above average
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="transition-all duration-300 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-neutral-400">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(quizzes.filter(q => q.completions > 0)
                .reduce((sum, q) => sum + q.avgScore, 0) / 
                Math.max(quizzes.filter(q => q.completions > 0).length, 1))}%
            </div>
            <div className="text-xs text-success-600 dark:text-success-400">
              +3% improvement
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="all">All Quizzes ({quizzes.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({quizzes.filter(q => q.status === 'published').length})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({quizzes.filter(q => q.status === 'draft').length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({quizzes.filter(q => q.status === 'archived').length})</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Input
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                variant="modern"
                className="w-64"
              />
            </div>
            
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className={cn(
                "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              )}
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className={cn(
                "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              )}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={cn(
                "h-11 px-4 py-3 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm text-gray-900 font-medium transition-all duration-300 ease-smooth",
                "hover:border-gray-300/80 hover:shadow-soft hover:scale-[1.01] focus:border-primary-500/60 focus:shadow-medium focus:scale-[1.01]",
                "dark:border-neutral-600/60 dark:bg-neutral-800/80 dark:text-white dark:hover:border-neutral-500/80 dark:focus:border-primary-400/60",
                "focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              )}
            >
              <option value="all">All Types</option>
              <option value="practice">Practice</option>
              <option value="graded">Graded</option>
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
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400 mb-4 flex-wrap">
            <span>Showing {filteredQuizzes.length} of {quizzes.length} quizzes</span>
            {searchQuery && (
              <Badge variant="outline" className="gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterSubject !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Subject: {filterSubject}
                <button onClick={() => setFilterSubject('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterDifficulty !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Difficulty: {filterDifficulty}
                <button onClick={() => setFilterDifficulty('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterType !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Type: {filterType}
                <button onClick={() => setFilterType('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        <TabsContent value={activeTab}>
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {hasActiveFilters ? 'No quizzes match your filters' : 'No quizzes found'}
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 mb-4">
                {hasActiveFilters 
                  ? 'Try adjusting your search criteria or filters'
                  : 'Start by creating your first quiz'
                }
              </p>
              {hasActiveFilters ? (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              ) : (
                <Button onClick={() => setShowQuizCreator(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <Card 
                  key={quiz.id} 
                  variant="elevated"
                  interactive
                  className="transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {quiz.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
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
                      <Badge variant={getStatusColor(quiz.status)}>
                        {quiz.status}
                      </Badge>
                      <Badge variant={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-gray-700 dark:text-neutral-300">
                        {quiz.type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-neutral-400">Questions</p>
                        <p className="font-medium text-gray-900 dark:text-white">{quiz.questions}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-neutral-400">Time Limit</p>
                        <p className="font-medium text-gray-900 dark:text-white">{quiz.timeLimit}m</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-neutral-400">Attempts</p>
                        <p className="font-medium text-gray-900 dark:text-white">{quiz.attempts}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-neutral-400">Avg Score</p>
                        <p className="font-medium text-gray-900 dark:text-white">{quiz.avgScore}%</p>
                      </div>
                    </div>

                    {quiz.status === 'published' && quiz.completions > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-neutral-400">
                          <span>Completion Rate</span>
                          <span>{Math.round((quiz.completions / quiz.attempts) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(quiz.completions / quiz.attempts) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-neutral-700">
                      <div className="text-xs text-gray-600 dark:text-neutral-400">
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}