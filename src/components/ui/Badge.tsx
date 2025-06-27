import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      {
        'border-transparent bg-violet-500 text-white': variant === 'default',
        'border-transparent bg-slate-700 text-slate-300': variant === 'secondary',
        'text-slate-300 border-slate-600': variant === 'outline',
      },
      className
    )}>
      {children}
    </div>
  );
}