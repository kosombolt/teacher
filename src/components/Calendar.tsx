import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';
import { getDaysInMonth, addMonths, isToday, isSameMonth, formatDate } from '../utils/date';

interface CalendarEvent {
  id: number;
  name: string;
  time: string;
}

interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}

const mockEvents: CalendarDay[] = [
  {
    date: new Date(2025, 0, 15),
    events: [
      { id: 1, name: "Biology - Cell Structure", time: "9:00 AM" },
      { id: 2, name: "Math - Algebra", time: "11:00 AM" },
    ],
  },
  {
    date: new Date(2025, 0, 16),
    events: [
      { id: 3, name: "Chemistry Lab", time: "10:00 AM" },
    ],
  },
];

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const getEventsForDay = (date: Date) => {
    const dayData = mockEvents.find(event => 
      event.date.toDateString() === date.toDateString()
    );
    return dayData?.events || [];
  };

  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      {/* Enhanced Header with better contrast */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 transition-colors duration-300">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button onClick={previousMonth} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button className="gap-2 shadow-medium hover:shadow-large">
            <PlusCircle className="h-4 w-4" />
            New Lesson
          </Button>
        </div>
      </div>

      {/* Enhanced Calendar Header with better text contrast */}
      <div className="grid grid-cols-7 border border-gray-200 dark:border-slate-700 text-center text-xs font-medium text-gray-600 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/50 transition-colors duration-300">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="border-r border-gray-200 dark:border-slate-700 py-3 last:border-r-0 transition-colors duration-300">
            {day}
          </div>
        ))}
      </div>

      {/* Enhanced Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 border-x border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
        {days.map((day, dayIdx) => (
          <div
            key={dayIdx}
            className={cn(
              "min-h-[120px] border-b border-r border-gray-200 dark:border-slate-700 p-2 transition-all duration-300 last:border-r-0",
              // Enhanced hover states and current month styling
              isSameMonth(day, currentMonth) 
                ? "bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800" 
                : "bg-gray-50 dark:bg-slate-900 text-gray-400 dark:text-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800",
              // Enhanced focus states
              "focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
            )}
          >
            <div className="flex justify-between items-center mb-1">
              <span
                className={cn(
                  "text-sm font-medium transition-all duration-300",
                  // Enhanced today indicator with better contrast
                  isToday(day) 
                    ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-medium font-bold" 
                    : isSameMonth(day, currentMonth)
                      ? "text-gray-900 dark:text-slate-200"
                      : "text-gray-400 dark:text-slate-600",
                  // Enhanced hover effects
                  !isToday(day) && "hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full w-7 h-7 flex items-center justify-center"
                )}
              >
                {day.getDate()}
              </span>
            </div>
            
            {/* Enhanced Events with better styling */}
            <div className="space-y-1">
              {getEventsForDay(day).slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "text-xs p-1.5 rounded-md truncate font-medium transition-all duration-300 cursor-pointer",
                    // Enhanced event styling with better contrast
                    "bg-violet-100 dark:bg-violet-500/20 text-violet-800 dark:text-violet-300",
                    "hover:bg-violet-200 dark:hover:bg-violet-500/30 hover:shadow-soft",
                    "border border-violet-200 dark:border-violet-500/30"
                  )}
                  title={`${event.name} at ${event.time}`}
                >
                  <div className="font-semibold truncate">{event.name}</div>
                  <div className="text-xs opacity-75">{event.time}</div>
                </div>
              ))}
              
              {/* Show indicator for additional events */}
              {getEventsForDay(day).length > 2 && (
                <div className="text-xs text-gray-500 dark:text-slate-400 font-medium px-1">
                  +{getEventsForDay(day).length - 2} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}