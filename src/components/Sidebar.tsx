import React from 'react';
import { 
  Settings,
  HelpCircle,
  User,
  Bot,
  ClipboardList
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
  onProfileClick?: () => void;
}

// Only secondary items that are NOT in the top navigation
const sidebarItems: SidebarItem[] = [
  { id: "students", label: "Students", icon: User, badge: "247", section: "tools" },
  { id: "quizzes", label: "Quizzes", icon: ClipboardList, section: "tools" },
  { id: "assistant", label: "AI Assistant", icon: Bot, section: "communication" },
  { id: "settings", label: "Settings", icon: Settings, section: "account" },
  { id: "help", label: "Help & Support", icon: HelpCircle, section: "account" },
];

export function Sidebar({ activeTab, onTabChange, isDarkMode, onProfileClick }: SidebarProps) {
  const groupedItems = sidebarItems.reduce((acc, item) => {
    const section = item.section || 'main';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const sectionTitles = {
    tools: 'Teaching Tools',
    communication: 'Communication',
    account: 'Account'
  };

  return (
    <div className={cn(
      "flex flex-col h-full border transition-all duration-300 rounded-2xl backdrop-blur-sm",
      isDarkMode 
        ? "bg-neutral-800/95 border-neutral-700" 
        : "bg-white/95 border-gray-200 shadow-sm",
      "shadow-soft"
    )}>
      {/* Header */}
      <div className={cn(
        "p-6 border-b transition-colors duration-300",
        isDarkMode ? "border-neutral-700" : "border-gray-200"
      )}>
        <h2 className={cn(
          "font-semibold text-lg",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          Quick Access
        </h2>
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-neutral-400" : "text-gray-600"
        )}>
          Secondary tools and settings
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-6">
            <h3 className={cn(
              "text-xs font-medium uppercase tracking-wider mb-3 transition-colors duration-300",
              isDarkMode ? "text-neutral-500" : "text-gray-500"
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
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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

      {/* Profile */}
      <div className={cn(
        "p-4 border-t transition-colors duration-300",
        isDarkMode ? "border-neutral-700" : "border-gray-200"
      )}>
        <button
          onClick={onProfileClick}
          className={cn(
            "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-medium",
            isDarkMode 
              ? "bg-neutral-700/50 hover:bg-neutral-700" 
              : "bg-gray-100/50 hover:bg-gray-100"
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium">
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
              isDarkMode ? "text-neutral-400" : "text-gray-600"
            )}>
              Course Creator
            </p>
          </div>
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
        </button>
      </div>
    </div>
  );
}