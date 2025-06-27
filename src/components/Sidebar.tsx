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

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
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
    <div className="flex flex-col h-full bg-slate-800 border-r border-slate-700">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Video className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-100">Rafiq</h1>
            <p className="text-xs text-slate-400">Teacher Dashboard</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-slate-700">
        <Button className="w-full gap-2 bg-gradient-to-r from-violet-500 to-pink-500">
          <Upload className="h-4 w-4" />
          Upload Content
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
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
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 font-medium group",
                      activeTab === item.id
                        ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      activeTab === item.id ? "scale-110" : "group-hover:scale-105"
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={activeTab === item.id ? "secondary" : "outline"}
                        className={cn(
                          "text-xs font-medium",
                          activeTab === item.id 
                            ? "bg-white/20 text-white border-white/30" 
                            : "bg-slate-600 text-slate-300 border-slate-600"
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
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold">
              ST
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-100 truncate">Sarah Thompson</p>
            <p className="text-xs text-slate-400 truncate">Course Creator</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}