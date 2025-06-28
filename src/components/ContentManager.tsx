import React, { useState } from 'react';
import { BookOpen, Video, FileText, Search, Filter, MoreVertical, Play, Eye, Edit, Trash2, Download, Share, Settings } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { cn } from '../utils/cn';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document';
  duration?: string;
  size: string;
  views: number;
  status: 'published' | 'draft' | 'processing';
  uploadDate: string;
  thumbnail?: string;
  description: string;
  category: string;
}

interface ContentManagerProps {
  onStartCourse: () => void;
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    type: 'video',
    duration: '24:15',
    size: '156 MB',
    views: 2847,
    status: 'published',
    uploadDate: '2025-01-10',
    description: 'Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks.',
    category: 'React Development'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    type: 'video',
    duration: '31:42',
    size: '203 MB',
    views: 1923,
    status: 'published',
    uploadDate: '2025-01-08',
    description: 'Deep dive into closures, prototypes, and asynchronous programming in JavaScript.',
    category: 'JavaScript'
  },
  {
    id: '3',
    title: 'Course Materials - Week 1',
    type: 'document',
    size: '2.4 MB',
    views: 456,
    status: 'published',
    uploadDate: '2025-01-05',
    description: 'Supplementary materials and exercises for the first week of the course.',
    category: 'Course Materials'
  },
  {
    id: '4',
    title: 'Building REST APIs with Node.js',
    type: 'video',
    duration: '45:30',
    size: '298 MB',
    views: 0,
    status: 'processing',
    uploadDate: '2025-01-12',
    description: 'Complete guide to building RESTful APIs using Node.js and Express.',
    category: 'Backend Development'
  },
  {
    id: '5',
    title: 'CSS Grid Layout Guide',
    type: 'document',
    size: '1.8 MB',
    views: 1234,
    status: 'draft',
    uploadDate: '2025-01-11',
    description: 'Comprehensive guide to CSS Grid layout with practical examples.',
    category: 'CSS'
  }
];

export function ContentManager({ onStartCourse }: ContentManagerProps) {
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // Get unique categories for filter
  const categories = Array.from(new Set(content.map(item => item.category)));

  // Apply all filters
  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  });

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadFiles(prev => [...prev, ...newFiles]);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    // Implement bulk actions
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'processing': return 'default';
      default: return 'secondary';
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterType('all');
    setFilterCategory('all');
  };

  const hasActiveFilters = searchQuery || filterStatus !== 'all' || filterType !== 'all' || filterCategory !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Manager</h1>
          <p className="text-gray-600 dark:text-neutral-400">Manage your videos, documents, and course materials</p>
        </div>
        <Button 
          onClick={onStartCourse}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Start Course
        </Button>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-neutral-400" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={cn(
              "px-3 py-2 rounded-xl border transition-all duration-200",
              "bg-white border-gray-300 text-gray-900 hover:border-gray-400",
              "dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:hover:border-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500"
            )}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="processing">Processing</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={cn(
              "px-3 py-2 rounded-xl border transition-all duration-200",
              "bg-white border-gray-300 text-gray-900 hover:border-gray-400",
              "dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:hover:border-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500"
            )}
          >
            <option value="all">All Types</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={cn(
              "px-3 py-2 rounded-xl border transition-all duration-200",
              "bg-white border-gray-300 text-gray-900 hover:border-gray-400",
              "dark:bg-neutral-800 dark:border-neutral-600 dark:text-white dark:hover:border-neutral-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500"
            )}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
            <span>Showing {filteredContent.length} of {content.length} items</span>
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
            {filterType !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Type: {filterType}
                <button onClick={() => setFilterType('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filterCategory !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Category: {filterCategory}
                <button onClick={() => setFilterCategory('all')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-150 dark:border-neutral-700">
          <span className="text-sm text-gray-700 dark:text-neutral-300">{selectedItems.length} items selected</span>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction('publish')}>
            Publish
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction('delete')}>
            Delete
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction('download')}>
            Download
          </Button>
        </div>
      )}

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {hasActiveFilters ? 'No content matches your filters' : 'No content found'}
          </h3>
          <p className="text-gray-600 dark:text-neutral-400 mb-4">
            {hasActiveFilters 
              ? 'Try adjusting your search criteria or filters'
              : 'Start by uploading your first piece of content'
            }
          </p>
          {hasActiveFilters ? (
            <Button onClick={clearAllFilters} variant="outline">
              Clear All Filters
            </Button>
          ) : (
            <Button onClick={onStartCourse}>
              <BookOpen className="h-4 w-4 mr-2" />
              Start Course
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} variant="elevated" className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-soft overflow-hidden">
              <div className="aspect-video bg-gray-100 dark:bg-neutral-700 flex items-center justify-center relative">
                {item.type === 'video' ? (
                  <Video className="h-12 w-12 text-gray-400 dark:text-neutral-400" />
                ) : (
                  <FileText className="h-12 w-12 text-gray-400 dark:text-neutral-400" />
                )}
                {item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(prev => [...prev, item.id]);
                      } else {
                        setSelectedItems(prev => prev.filter(id => id !== item.id));
                      }
                    }}
                    className="rounded"
                  />
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">{item.title}</h3>
                  <Button variant="ghost" size="icon" className="text-gray-400 dark:text-neutral-400">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2 mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-neutral-500 mb-3">
                  <span>{item.size}</span>
                  <span>{item.views.toLocaleString()} views</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-neutral-500">
                    {item.uploadDate}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Content</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="single" className="w-full">
            <TabsList>
              <TabsTrigger value="single">Single Upload</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Upload your content
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept="video/*,.pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button onClick={() => document.getElementById('file-upload')?.click()}>
                  Choose Files
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="bulk" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Bulk Upload
                </h3>
                <p className="text-gray-600 dark:text-neutral-400 mb-4">
                  Upload multiple files at once with automatic processing
                </p>
                <Button>
                  Select Multiple Files
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {uploadFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Files to Upload:</h4>
              {uploadFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-neutral-700 rounded">
                  <span className="text-sm text-gray-700 dark:text-neutral-300">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUploadFiles(prev => prev.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Handle upload
                  setIsUploadOpen(false);
                  setUploadFiles([]);
                }}>
                  Upload All
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}