import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Clock, 
  Users,
  Image,
  Video,
  Mic,
  ArrowLeft,
  ArrowRight,
  Copy,
  Move,
  X,
  AlertCircle,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Select } from './ui/Select';
import { cn } from '../utils/cn';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  points: number;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  };
  timeLimit?: number;
}

interface QuizCreatorProps {
  onSave: (quizData: any) => void;
  onCancel: () => void;
}

const questionTypeOptions = [
  { 
    value: 'multiple-choice', 
    label: 'Multiple Choice', 
    icon: <div className="w-4 h-4 rounded-full border-2 border-current" />,
    description: 'Students select one correct answer from multiple options'
  },
  { 
    value: 'true-false', 
    label: 'True/False', 
    icon: <CheckCircle className="h-4 w-4" />,
    description: 'Students choose between true or false'
  },
  { 
    value: 'short-answer', 
    label: 'Short Answer', 
    icon: <div className="w-4 h-4 border-b-2 border-current" />,
    description: 'Students provide a brief written response'
  },
  { 
    value: 'essay', 
    label: 'Essay', 
    icon: <BookOpen className="h-4 w-4" />,
    description: 'Students write a detailed response'
  }
];

const difficultyOptions = [
  { value: 'easy', label: 'Easy', description: 'Basic level questions' },
  { value: 'medium', label: 'Medium', description: 'Intermediate level questions' },
  { value: 'hard', label: 'Hard', description: 'Advanced level questions' }
];

const typeOptions = [
  { value: 'practice', label: 'Practice Quiz', description: 'For student practice and learning' },
  { value: 'graded', label: 'Graded Assessment', description: 'Counts towards final grade' }
];

export function QuizCreator({ onSave, onCancel }: QuizCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    subject: '',
    topic: '',
    difficulty: 'medium',
    type: 'graded',
    timeLimit: 30,
    totalPoints: 0,
    attempts: 1,
    randomizeQuestions: false,
    showResults: 'after_submission',
    availability: {
      startDate: '',
      endDate: '',
      accessCode: ''
    },
    grading: {
      autoGrade: true,
      passingScore: 70,
      showCorrectAnswers: true
    }
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '1',
    type: 'multiple-choice',
    question: '',
    points: 5,
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!quizData.title.trim()) newErrors.title = 'Quiz title is required';
      if (!quizData.subject.trim()) newErrors.subject = 'Subject is required';
      if (!quizData.topic.trim()) newErrors.topic = 'Topic is required';
      if (quizData.timeLimit < 1) newErrors.timeLimit = 'Time limit must be at least 1 minute';
    }

    if (step === 2) {
      if (!currentQuestion.question.trim()) newErrors.question = 'Question text is required';
      if (currentQuestion.points < 1) newErrors.points = 'Points must be at least 1';
      
      if (currentQuestion.type === 'multiple-choice') {
        const validOptions = currentQuestion.options?.filter(opt => opt.trim()) || [];
        if (validOptions.length < 2) newErrors.options = 'At least 2 options are required';
        if (typeof currentQuestion.correctAnswer !== 'number' || currentQuestion.correctAnswer < 0) {
          newErrors.correctAnswer = 'Please select the correct answer';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addQuestion = () => {
    if (!validateStep(2)) return;

    const newQuestion: Question = {
      ...currentQuestion,
      id: (questions.length + 1).toString()
    };
    setQuestions(prev => [...prev, newQuestion]);
    
    // Reset current question
    setCurrentQuestion({
      id: (questions.length + 2).toString(),
      type: 'multiple-choice',
      question: '',
      points: 5,
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setErrors({});
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    setQuestions(prev => prev.map((q, i) => i === index ? updatedQuestion : q));
  };

  const deleteQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const duplicateQuestion = (index: number) => {
    const questionToDuplicate = questions[index];
    const duplicatedQuestion: Question = {
      ...questionToDuplicate,
      id: (questions.length + 1).toString(),
      question: `${questionToDuplicate.question} (Copy)`
    };
    setQuestions(prev => [...prev, duplicatedQuestion]);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSave = () => {
    if (questions.length === 0) {
      setErrors({ questions: 'At least one question is required' });
      return;
    }

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const finalQuizData = {
      ...quizData,
      questions: questions.length,
      totalPoints,
      questionData: questions,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    onSave(finalQuizData);
  };

  const addOption = () => {
    if (currentQuestion.options && currentQuestion.options.length < 6) {
      setCurrentQuestion(prev => ({
        ...prev,
        options: [...(prev.options || []), '']
      }));
    }
  };

  const removeOption = (index: number) => {
    if (currentQuestion.options && currentQuestion.options.length > 2) {
      const newOptions = currentQuestion.options.filter((_, i) => i !== index);
      setCurrentQuestion(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: typeof prev.correctAnswer === 'number' && prev.correctAnswer >= index 
          ? Math.max(0, prev.correctAnswer - 1) 
          : prev.correctAnswer
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-neutral-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Quiz</h1>
            <p className="text-gray-600 dark:text-neutral-400">Build engaging assessments for your students</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Quiz
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  currentStep >= step 
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-medium" 
                    : "bg-gray-200 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400"
                )}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  currentStep >= step ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-neutral-400"
                )}>
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Add Questions"}
                  {step === 3 && "Settings & Review"}
                </span>
                {step < 3 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 dark:text-neutral-600 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft">
          <CardContent className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quiz Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Quiz Title *
                    </label>
                    <Input
                      value={quizData.title}
                      onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter quiz title..."
                      error={!!errors.title}
                      variant="modern"
                    />
                    {errors.title && (
                      <p className="text-error-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      value={quizData.subject}
                      onChange={(e) => setQuizData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g., Biology, Math, History"
                      error={!!errors.subject}
                      variant="modern"
                    />
                    {errors.subject && (
                      <p className="text-error-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Topic *
                    </label>
                    <Input
                      value={quizData.topic}
                      onChange={(e) => setQuizData(prev => ({ ...prev, topic: e.target.value }))}
                      placeholder="e.g., Cell Structure, Algebra"
                      error={!!errors.topic}
                      variant="modern"
                    />
                    {errors.topic && (
                      <p className="text-error-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.topic}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Difficulty Level
                    </label>
                    <Select
                      options={difficultyOptions}
                      value={quizData.difficulty}
                      onChange={(value) => setQuizData(prev => ({ ...prev, difficulty: value }))}
                      placeholder="Select difficulty"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Quiz Type
                    </label>
                    <Select
                      options={typeOptions}
                      value={quizData.type}
                      onChange={(value) => setQuizData(prev => ({ ...prev, type: value }))}
                      placeholder="Select type"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Time Limit (minutes) *
                    </label>
                    <Input
                      type="number"
                      value={quizData.timeLimit}
                      onChange={(e) => setQuizData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="180"
                      error={!!errors.timeLimit}
                      variant="modern"
                      leftIcon={<Clock className="h-4 w-4" />}
                    />
                    {errors.timeLimit && (
                      <p className="text-error-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.timeLimit}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={quizData.description}
                    onChange={(e) => setQuizData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this quiz covers..."
                    className="min-h-[100px]"
                    variant="modern"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext} className="gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Add Questions
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Question {questions.length + 1}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Select
                      options={questionTypeOptions}
                      value={currentQuestion.type}
                      onChange={(value) => setCurrentQuestion(prev => ({ 
                        ...prev, 
                        type: value as Question['type'],
                        options: value === 'multiple-choice' ? ['', '', '', ''] : undefined,
                        correctAnswer: value === 'true-false' ? 'true' : value === 'multiple-choice' ? 0 : ''
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Question Text *
                    </label>
                    <Textarea
                      value={currentQuestion.question}
                      onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                      placeholder="Enter your question..."
                      className="min-h-[100px]"
                      error={!!errors.question}
                      variant="modern"
                    />
                    {errors.question && (
                      <p className="text-error-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.question}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Points *
                      </label>
                      <Input
                        type="number"
                        value={currentQuestion.points}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                        min="1"
                        max="100"
                        error={!!errors.points}
                        variant="modern"
                      />
                      {errors.points && (
                        <p className="text-error-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.points}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Time Limit (optional)
                      </label>
                      <Input
                        type="number"
                        value={currentQuestion.timeLimit || ''}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || undefined }))}
                        placeholder="Minutes"
                        variant="modern"
                      />
                    </div>
                  </div>

                  {/* Media Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Add Media (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Image className="h-4 w-4" />
                        Image
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Video className="h-4 w-4" />
                        Video
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Mic className="h-4 w-4" />
                        Audio
                      </Button>
                    </div>
                  </div>

                  {/* Question Type Specific Fields */}
                  {currentQuestion.type === 'multiple-choice' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Answer Options *
                      </label>
                      <div className="space-y-2">
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="correct-answer"
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                              className="text-primary-500 focus:ring-primary-500"
                            />
                            <Input
                              value={option}
                              onChange={(e) => updateOption(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                              className="flex-1"
                              variant="modern"
                            />
                            {currentQuestion.options && currentQuestion.options.length > 2 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOption(index)}
                                className="text-error-500 hover:text-error-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        {errors.options && (
                          <p className="text-error-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.options}
                          </p>
                        )}
                        {errors.correctAnswer && (
                          <p className="text-error-500 text-sm flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.correctAnswer}
                          </p>
                        )}
                        {currentQuestion.options && currentQuestion.options.length < 6 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addOption}
                            className="gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Add Option
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {currentQuestion.type === 'true-false' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Correct Answer *
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="true-false"
                            checked={currentQuestion.correctAnswer === 'true'}
                            onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 'true' }))}
                            className="text-primary-500 focus:ring-primary-500"
                          />
                          <span className="text-gray-900 dark:text-white">True</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="true-false"
                            checked={currentQuestion.correctAnswer === 'false'}
                            onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 'false' }))}
                            className="text-primary-500 focus:ring-primary-500"
                          />
                          <span className="text-gray-900 dark:text-white">False</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'essay') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Sample Answer / Grading Rubric
                      </label>
                      <Textarea
                        value={currentQuestion.correctAnswer as string || ''}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                        placeholder="Enter sample answer or grading criteria..."
                        className="min-h-[80px]"
                        variant="modern"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Explanation (Optional)
                    </label>
                    <Textarea
                      value={currentQuestion.explanation || ''}
                      onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                      placeholder="Explain the correct answer..."
                      className="min-h-[60px]"
                      variant="modern"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-neutral-700">
                  <Button variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={addQuestion}>
                      Add Question
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Review & Settings
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <Tabs defaultValue="questions" className="w-full">
                <TabsList>
                  <TabsTrigger value="questions">Questions Review</TabsTrigger>
                  <TabsTrigger value="settings">Quiz Settings</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Questions ({questions.length})
                      </h3>
                      <Button onClick={() => setCurrentStep(2)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Question
                      </Button>
                    </div>

                    {errors.questions && (
                      <p className="text-error-500 text-sm flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.questions}
                      </p>
                    )}

                    {questions.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Questions Added</h4>
                        <p className="text-gray-600 dark:text-neutral-400 mb-4">Start building your quiz by adding questions</p>
                        <Button onClick={() => setCurrentStep(2)}>Add First Question</Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {questions.map((question, index) => (
                          <Card key={question.id} className="bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {questionTypeOptions.find(t => t.value === question.type)?.label}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {question.points} pts
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                    Question {index + 1}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
                                    {question.question || 'No question text'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 ml-4">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => duplicateQuestion(index)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-error-500 hover:text-error-600"
                                    onClick={() => deleteQuestion(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quiz Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                            Number of Attempts
                          </label>
                          <Input
                            type="number"
                            value={quizData.attempts}
                            onChange={(e) => setQuizData(prev => ({ ...prev, attempts: parseInt(e.target.value) || 1 }))}
                            min="1"
                            max="10"
                            variant="modern"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                            Passing Score (%)
                          </label>
                          <Input
                            type="number"
                            value={quizData.grading.passingScore}
                            onChange={(e) => setQuizData(prev => ({ 
                              ...prev, 
                              grading: { ...prev.grading, passingScore: parseInt(e.target.value) || 70 }
                            }))}
                            min="0"
                            max="100"
                            variant="modern"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Randomize Questions</p>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">Shuffle question order for each student</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={quizData.randomizeQuestions}
                            onChange={(e) => setQuizData(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                            className="rounded text-primary-500 focus:ring-primary-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Auto Grade</p>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">Automatically grade objective questions</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={quizData.grading.autoGrade}
                            onChange={(e) => setQuizData(prev => ({ 
                              ...prev, 
                              grading: { ...prev.grading, autoGrade: e.target.checked }
                            }))}
                            className="rounded text-primary-500 focus:ring-primary-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Show Correct Answers</p>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">Display correct answers after submission</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={quizData.grading.showCorrectAnswers}
                            onChange={(e) => setQuizData(prev => ({ 
                              ...prev, 
                              grading: { ...prev.grading, showCorrectAnswers: e.target.checked }
                            }))}
                            className="rounded text-primary-500 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Availability Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                          Start Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={quizData.availability.startDate}
                          onChange={(e) => setQuizData(prev => ({ 
                            ...prev, 
                            availability: { ...prev.availability, startDate: e.target.value }
                          }))}
                          variant="modern"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                          End Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={quizData.availability.endDate}
                          onChange={(e) => setQuizData(prev => ({ 
                            ...prev, 
                            availability: { ...prev.availability, endDate: e.target.value }
                          }))}
                          variant="modern"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                        Access Code (Optional)
                      </label>
                      <Input
                        value={quizData.availability.accessCode}
                        onChange={(e) => setQuizData(prev => ({ 
                          ...prev, 
                          availability: { ...prev.availability, accessCode: e.target.value }
                        }))}
                        placeholder="Enter access code for restricted access"
                        variant="modern"
                      />
                    </div>
                  </div>
                </TabsContent>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-neutral-700">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Questions
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview Quiz
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save & Publish
                    </Button>
                  </div>
                </div>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}