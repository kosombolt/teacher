import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Users, 
  Settings,
  Upload,
  MessageSquare,
  DollarSign,
  Palette,
  Bell,
  HelpCircle,
  Calendar,
  FileText,
  ClipboardList,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { cn } from '../utils/cn';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  section?: string;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const sidebarItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "main" },
  { id: "content", label: "Content", icon: Video, section: "main" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "main" },
  { id: "students", label: "Students", icon: Users, badge: "247", section: "main" },
  { id: "calendar", label: "Calendar", icon: Calendar, section: "main" },
  { id: "quizzes", label: "Quizzes", icon: ClipboardList, section: "main" },
  { id: "comments", label: "Comments", icon: MessageSquare, badge: "12", section: "engagement" },
  { id: "monetization", label: "Monetization", icon: DollarSign, section: "business" },
  { id: "customization", label: "Customization", icon: Palette, section: "business" },
  { id: "notifications", label: "Notifications", icon: Bell, section: "settings" },
  { id: "settings", label: "Settings", icon: Settings, section: "settings" },
  { id: "help", label: "Help & Support", icon: HelpCircle, section: "settings" },
];

export function Sidebar({ activeTab, onTabChange, isDarkMode, onToggleTheme }: SidebarProps) {
  const groupedItems = sidebarItems.reduce((acc, item) => {
    const section = item.section || 'main';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const sectionTitles = {
    main: 'Main',
    engagement: 'Engagement',
    business: 'Business',
    settings: 'Settings'
  };

  return (
    <div className={cn(
      "flex flex-col h-full border-r transition-colors duration-300 lg:rounded-xl lg:border",
      isDarkMode 
        ? "bg-blue-gray-800 border-blue-gray-700" 
        : "bg-white border-gray-200"
    )}>
      {/* Logo */}
      <div className={cn(
        "p-6 border-b transition-colors duration-300",
        isDarkMode ? "border-blue-gray-700" : "border-gray-200"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
            <Video className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className={cn(
              "font-semibold text-base transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Rafiq
            </h1>
            <p className={cn(
              "text-xs transition-colors duration-300",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Teacher Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={cn(
        "p-4 border-b transition-colors duration-300",
        isDarkMode ? "border-blue-gray-700" : "border-gray-200"
      )}>
        <Button className="w-full gap-2 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 h-10">
          <Upload className="h-4 w-4" />
          Upload Content
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-6">
            <h3 className={cn(
              "text-xs font-medium uppercase tracking-wider mb-3 transition-colors duration-300",
              isDarkMode ? "text-gray-500" : "text-gray-500"
            )}>
              {sectionTitles[section as keyof typeof sectionTitles]}
            </h3>
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 font-medium group",
                      activeTab === item.id
                        ? isDarkMode
                          ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                          : "bg-indigo-50 text-indigo-600 border border-indigo-200"
                        : isDarkMode
                          ? "text-gray-300 hover:bg-blue-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs font-medium transition-colors duration-300",
                          activeTab === item.id 
                            ? isDarkMode
                              ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                              : "bg-indigo-100 text-indigo-600 border-indigo-200"
                            : isDarkMode
                              ? "bg-blue-gray-700 text-gray-300 border-blue-gray-600"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Theme Toggle & Profile */}
      <div className={cn(
        "p-4 border-t space-y-3 transition-colors duration-300",
        isDarkMode ? "border-blue-gray-700" : "border-gray-200"
      )}>
        <Button
          onClick={onToggleTheme}
          variant="ghost"
          className={cn(
            "w-full gap-2 justify-start transition-colors duration-300",
            isDarkMode 
              ? "text-gray-300 hover:bg-blue-gray-700 hover:text-white" 
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 cursor-pointer",
          isDarkMode 
            ? "bg-blue-gray-700/50 hover:bg-blue-gray-700" 
            : "bg-gray-100/50 hover:bg-gray-100"
        )}>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-medium">
              ST
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-medium truncate transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Sarah Thompson
            </p>
            <p className={cn(
              "text-xs truncate transition-colors duration-300",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Course Creator
            </p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}