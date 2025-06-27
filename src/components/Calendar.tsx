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
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold text-slate-100">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button onClick={previousMonth} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Lesson
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 border border-slate-700 text-center text-xs font-medium text-slate-400">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="border-r border-slate-700 py-2 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 border-x border-b border-slate-700">
        {days.map((day, dayIdx) => (
          <div
            key={dayIdx}
            className={cn(
              "min-h-[120px] border-b border-r border-slate-700 p-2 hover:bg-slate-800 transition-colors duration-200 last:border-r-0",
              !isSameMonth(day, currentMonth) && "bg-slate-900 text-slate-600"
            )}
          >
            <div className="flex justify-between items-center mb-1">
              <span
                className={cn(
                  "text-sm font-medium text-slate-200",
                  isToday(day) && "bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                )}
              >
                {day.getDate()}
              </span>
            </div>
            <div className="space-y-1">
              {getEventsForDay(day).slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="text-xs p-1 bg-violet-500/20 text-violet-300 rounded-md truncate font-medium"
                >
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}