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
      "flex flex-col h-full border-r transition-all duration-300 lg:rounded-2xl lg:border backdrop-blur-sm",
      isDarkMode 
        ? "bg-neutral-800/95 border-neutral-700" 
        : "bg-white/95 border-neutral-200"
    )}>
      {/* Logo */}
      <div className={cn(
        "p-6 border-b transition-colors duration-300",
        isDarkMode ? "border-neutral-700" : "border-neutral-200"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-glow">
            <Video className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className={cn(
              "font-semibold text-lg transition-colors duration-300",
              isDarkMode ? "text-white" : "text-neutral-900"
            )}>
              Rafiq
            </h1>
            <p className={cn(
              "text-xs transition-colors duration-300",
              isDarkMode ? "text-neutral-400" : "text-neutral-600"
            )}>
              Teacher Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={cn(
        "p-4 border-b transition-colors duration-300",
        isDarkMode ? "border-neutral-700" : "border-neutral-200"
      )}>
        <Button className="w-full gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 h-10 shadow-medium hover:shadow-large transition-all duration-300">
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
              isDarkMode ? "text-neutral-500" : "text-neutral-500"
            )}>
              {sectionTitles[section as keyof typeof sectionTitles]}
            </h3>
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 font-medium group relative overflow-hidden",
                      isActive
                        ? isDarkMode
                          ? "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-400 border border-primary-500/30 shadow-glow"
                          : "bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600 border border-primary-200 shadow-medium"
                        : isDarkMode
                          ? "text-neutral-300 hover:bg-neutral-700 hover:text-white"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive ? "scale-110" : "group-hover:scale-105"
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs font-medium transition-all duration-300",
                          isActive 
                            ? isDarkMode
                              ? "bg-primary-500/20 text-primary-400 border-primary-500/30"
                              : "bg-primary-100 text-primary-600 border-primary-200"
                            : isDarkMode
                              ? "bg-neutral-700 text-neutral-300 border-neutral-600"
                              : "bg-neutral-100 text-neutral-600 border-neutral-200"
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
        isDarkMode ? "border-neutral-700" : "border-neutral-200"
      )}>
        <Button
          onClick={onToggleTheme}
          variant="ghost"
          className={cn(
            "w-full gap-2 justify-start transition-all duration-300 hover:shadow-medium",
            isDarkMode 
              ? "text-neutral-300 hover:bg-neutral-700 hover:text-white" 
              : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
          )}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-medium",
          isDarkMode 
            ? "bg-neutral-700/50 hover:bg-neutral-700" 
            : "bg-neutral-100/50 hover:bg-neutral-100"
        )}>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium">
              ST
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-medium truncate transition-colors duration-300",
              isDarkMode ? "text-white" : "text-neutral-900"
            )}>
              Sarah Thompson
            </p>
            <p className={cn(
              "text-xs truncate transition-colors duration-300",
              isDarkMode ? "text-neutral-400" : "text-neutral-600"
            )}>
              Course Creator
            </p>
          </div>
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}