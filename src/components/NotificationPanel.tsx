import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  BookOpen, 
  MessageSquare,
  TrendingUp,
  Clock,
  Settings
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ComponentType<{ className?: string }>;
}

interface NotificationPanelProps {
  onClose: () => void;
  isDarkMode: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'New Student Enrollment',
    message: 'Alice Johnson enrolled in "Introduction to Biology"',
    timestamp: '2 minutes ago',
    isRead: false,
    icon: Users,
    action: {
      label: 'View Student',
      onClick: () => console.log('View student')
    }
  },
  {
    id: '2',
    type: 'info',
    title: 'Quiz Completed',
    message: '15 students completed the "Cell Structure" quiz',
    timestamp: '1 hour ago',
    isRead: false,
    icon: CheckCircle,
    action: {
      label: 'View Results',
      onClick: () => console.log('View results')
    }
  },
  {
    id: '3',
    type: 'warning',
    title: 'Low Engagement Alert',
    message: 'Chemistry course engagement dropped by 12%',
    timestamp: '3 hours ago',
    isRead: false,
    icon: TrendingUp,
    action: {
      label: 'View Analytics',
      onClick: () => console.log('View analytics')
    }
  },
  {
    id: '4',
    type: 'info',
    title: 'New Comment',
    message: 'Bob Smith commented on "Photosynthesis" lesson',
    timestamp: '5 hours ago',
    isRead: true,
    icon: MessageSquare,
    action: {
      label: 'Reply',
      onClick: () => console.log('Reply to comment')
    }
  },
  {
    id: '5',
    type: 'success',
    title: 'Course Published',
    message: 'Your "Advanced Chemistry" course is now live',
    timestamp: '1 day ago',
    isRead: true,
    icon: BookOpen,
    action: {
      label: 'View Course',
      onClick: () => console.log('View course')
    }
  }
];

export function NotificationPanel({ onClose, isDarkMode }: NotificationPanelProps) {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (notification: Notification) => {
    if (notification.icon) {
      const IconComponent = notification.icon;
      return <IconComponent className="h-5 w-5" />;
    }

    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-success-600 dark:text-success-400';
      case 'warning':
        return 'text-warning-600 dark:text-warning-400';
      case 'error':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-primary-600 dark:text-primary-400';
    }
  };

  const markAllAsRead = () => {
    // Implementation to mark all notifications as read
    console.log('Mark all as read');
  };

  const clearAll = () => {
    // Implementation to clear all notifications
    console.log('Clear all notifications');
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 z-50">
      <div className={cn(
        "rounded-2xl border shadow-xl backdrop-blur-sm transition-all duration-300",
        "animate-scale-in origin-top-right",
        isDarkMode 
          ? "bg-neutral-800/95 border-neutral-700 shadow-dark-large" 
          : "bg-white/95 border-gray-200 shadow-large"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b",
          isDarkMode ? "border-neutral-700" : "border-gray-200"
        )}>
          <div className="flex items-center gap-2">
            <Bell className={cn(
              "h-5 w-5",
              isDarkMode ? "text-white" : "text-gray-900"
            )} />
            <h3 className={cn(
              "font-semibold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Badge variant="error" size="sm">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className={cn(
            "flex items-center justify-between p-3 border-b",
            isDarkMode ? "border-neutral-700" : "border-gray-200"
          )}>
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs text-error-500 hover:text-error-600"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className={cn(
                "h-12 w-12 mx-auto mb-3",
                isDarkMode ? "text-neutral-600" : "text-gray-400"
              )} />
              <h4 className={cn(
                "font-medium mb-1",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                No notifications
              </h4>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-neutral-400" : "text-gray-600"
              )}>
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-neutral-700">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50",
                    !notification.isRead && "bg-primary-50/50 dark:bg-primary-900/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                      notification.type === 'success' && "bg-success-100 dark:bg-success-900/30",
                      notification.type === 'warning' && "bg-warning-100 dark:bg-warning-900/30",
                      notification.type === 'error' && "bg-error-100 dark:bg-error-900/30",
                      notification.type === 'info' && "bg-primary-100 dark:bg-primary-900/30"
                    )}>
                      <div className={getNotificationColor(notification.type)}>
                        {getNotificationIcon(notification)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={cn(
                            "font-medium text-sm",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>
                            {notification.title}
                          </h4>
                          <p className={cn(
                            "text-sm mt-1",
                            isDarkMode ? "text-neutral-400" : "text-gray-600"
                          )}>
                            {notification.message}
                          </p>
                          <p className={cn(
                            "text-xs mt-2",
                            isDarkMode ? "text-neutral-500" : "text-gray-500"
                          )}>
                            {notification.timestamp}
                          </p>
                        </div>
                        
                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>

                      {/* Action Button */}
                      {notification.action && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={notification.action.onClick}
                          className="mt-2 text-xs h-7 px-2"
                        >
                          {notification.action.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={cn(
          "p-3 border-t",
          isDarkMode ? "border-neutral-700" : "border-gray-200"
        )}>
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={() => {
              onClose();
              // Navigate to notifications page
            }}
          >
            View all notifications
          </Button>
        </div>
      </div>
    </div>
  );
}