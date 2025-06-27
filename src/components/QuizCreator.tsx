import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Save, 
  Eye, 
  Settings, 
  Clock, 
  Users,
  Image,
  Video,
  Mic,
  ArrowLeft,
  ArrowRight,
  Copy,
  Move
} from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
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

export function QuizCreator({ onSave, onCancel }: QuizCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
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

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: '○' },
    { value: 'true-false', label: 'True/False', icon: '✓' },
    { value: 'short-answer', label: 'Short Answer', icon: '✎' },
    { value: 'essay', label: 'Essay', icon: '📝' }
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      ...currentQuestion,
      id: (questions.length + 1).toString()
    };
    setQuestions(prev => [...prev, newQuestion]);
    setCurrentQuestion({
      id: (questions.length + 2).toString(),
      type: 'multiple-choice',
      question: '',
      points: 5,
      options: ['', '', '', ''],
      correctAnswer: 0
    });
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

  const handleSave = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const finalQuizData = {
      ...quizData,
      questions: questions.length,
      totalPoints,
      questionData: questions
    };
    onSave(finalQuizData);
  };

  const renderQuestionEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Question {questions.length + 1}
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={currentQuestion.type}
            onChange={(e) => setCurrentQuestion(prev => ({ 
              ...prev, 
              type: e.target.value as Question['type'],
              options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : undefined,
              correctAnswer: e.target.value === 'true-false' ? 'true' : 0
            }))}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-100"
          >
            {questionTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Question Text
          </label>
          <Textarea
            value={currentQuestion.question}
            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Enter your question..."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Points
            </label>
            <Input
              type="number"
              value={currentQuestion.points}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
              min="1"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Time Limit (optional)
            </label>
            <Input
              type="number"
              value={currentQuestion.timeLimit || ''}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || undefined }))}
              placeholder="Minutes"
            />
          </div>
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
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
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Answer Options
            </label>
            <div className="space-y-2">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct-answer"
                    checked={currentQuestion.correctAnswer === index}
                    onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                    className="text-violet-500"
                  />
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(currentQuestion.options || [])];
                      newOptions[index] = e.target.value;
                      setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newOptions = currentQuestion.options?.filter((_, i) => i !== index);
                      setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newOptions = [...(currentQuestion.options || []), ''];
                  setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                }}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Option
              </Button>
            </div>
          </div>
        )}

        {currentQuestion.type === 'true-false' && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Correct Answer
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="true-false"
                  checked={currentQuestion.correctAnswer === 'true'}
                  onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 'true' }))}
                  className="text-violet-500"
                />
                <span className="text-slate-100">True</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="true-false"
                  checked={currentQuestion.correctAnswer === 'false'}
                  onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 'false' }))}
                  className="text-violet-500"
                />
                <span className="text-slate-100">False</span>
              </label>
            </div>
          </div>
        )}

        {(currentQuestion.type === 'short-answer' || currentQuestion.type === 'essay') && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Sample Answer / Grading Rubric
            </label>
            <Textarea
              value={currentQuestion.correctAnswer as string || ''}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
              placeholder="Enter sample answer or grading criteria..."
              className="min-h-[80px]"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Explanation (Optional)
          </label>
          <Textarea
            value={currentQuestion.explanation || ''}
            onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
            placeholder="Explain the correct answer..."
            className="min-h-[60px]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
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
  );

  const renderQuestionsList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Questions ({questions.length})
        </h3>
        <Button onClick={() => setCurrentStep(2)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-600 rounded-lg">
          <h4 className="text-lg font-medium text-slate-100 mb-2">No Questions Added</h4>
          <p className="text-slate-400 mb-4">Start building your quiz by adding questions</p>
          <Button onClick={() => setCurrentStep(2)}>Add First Question</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((question, index) => (
            <Card key={question.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {questionTypes.find(t => t.value === question.type)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {question.points} pts
                      </Badge>
                    </div>
                    <h4 className="font-medium text-slate-100 mb-1">
                      Question {index + 1}
                    </h4>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {question.question || 'No question text'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Move className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:text-red-300"
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
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Create New Quiz</h1>
            <p className="text-slate-400">Build engaging assessments for your students</p>
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
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep >= step 
                    ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white" 
                    : "bg-slate-700 text-slate-400"
                )}>
                  {step}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  currentStep >= step ? "text-slate-100" : "text-slate-400"
                )}>
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Add Questions"}
                  {step === 3 && "Settings & Review"}
                </span>
                {step < 3 && (
                  <ArrowRight className="h-4 w-4 text-slate-600 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100">Quiz Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Quiz Title
                      </label>
                      <Input
                        value={quizData.title}
                        onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter quiz title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Subject
                      </label>
                      <Input
                        value={quizData.subject}
                        onChange={(e) => setQuizData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="e.g., Biology, Math, History"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Topic
                      </label>
                      <Input
                        value={quizData.topic}
                        onChange={(e) => setQuizData(prev => ({ ...prev, topic: e.target.value }))}
                        placeholder="e.g., Cell Structure, Algebra"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={quizData.difficulty}
                        onChange={(e) => setQuizData(prev => ({ ...prev, difficulty: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Quiz Type
                      </label>
                      <select
                        value={quizData.type}
                        onChange={(e) => setQuizData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100"
                      >
                        <option value="practice">Practice Quiz</option>
                        <option value="graded">Graded Assessment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Time Limit (minutes)
                      </label>
                      <Input
                        type="number"
                        value={quizData.timeLimit}
                        onChange={(e) => setQuizData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 0 }))}
                        min="1"
                        max="180"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={quizData.description}
                    onChange={(e) => setQuizData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this quiz covers..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} className="gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Add Questions
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && renderQuestionEditor()}

            {currentStep === 3 && (
              <Tabs defaultValue="questions" className="w-full">
                <TabsList>
                  <TabsTrigger value="questions">Questions Review</TabsTrigger>
                  <TabsTrigger value="settings">Quiz Settings</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="mt-6">
                  {renderQuestionsList()}
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-100">Quiz Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Number of Attempts
                          </label>
                          <Input
                            type="number"
                            value={quizData.attempts}
                            onChange={(e) => setQuizData(prev => ({ ...prev, attempts: parseInt(e.target.value) || 1 }))}
                            min="1"
                            max="10"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
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
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-100">Randomize Questions</p>
                            <p className="text-sm text-slate-400">Shuffle question order for each student</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={quizData.randomizeQuestions}
                            onChange={(e) => setQuizData(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-100">Auto Grade</p>
                            <p className="text-sm text-slate-400">Automatically grade objective questions</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={quizData.grading.autoGrade}
                            onChange={(e) => setQuizData(prev => ({ 
                              ...prev, 
                              grading: { ...prev.grading, autoGrade: e.target.checked }
                            }))}
                            className="rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-100">Show Correct Answers</p>
                            <p className="text-sm text-slate-400">Display correct answers after submission</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={quizData.grading.showCorrectAnswers}
                            onChange={(e) => setQuizData(prev => ({ 
                              ...prev, 
                              grading: { ...prev.grading, showCorrectAnswers: e.target.checked }
                            }))}
                            className="rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-100">Availability Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Start Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={quizData.availability.startDate}
                          onChange={(e) => setQuizData(prev => ({ 
                            ...prev, 
                            availability: { ...prev.availability, startDate: e.target.value }
                          }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          End Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={quizData.availability.endDate}
                          onChange={(e) => setQuizData(prev => ({ 
                            ...prev, 
                            availability: { ...prev.availability, endDate: e.target.value }
                          }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Access Code (Optional)
                      </label>
                      <Input
                        value={quizData.availability.accessCode}
                        onChange={(e) => setQuizData(prev => ({ 
                          ...prev, 
                          availability: { ...prev.availability, accessCode: e.target.value }
                        }))}
                        placeholder="Enter access code for restricted access"
                      />
                    </div>
                  </div>
                </TabsContent>

                <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(2)}
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