import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  interactive?: boolean;
}

export function Card({ className, children, variant = 'default', interactive = false }: CardProps) {
  return (
    <div className={cn(
      // Base card styles with enhanced transitions
      'rounded-2xl transition-all duration-300 ease-smooth',
      // Interactive states for better UX
      interactive && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform-gpu',
      {
        // Default card - Enhanced light mode appearance
        'bg-white border border-gray-200 shadow-soft hover:shadow-medium dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-dark-soft dark:hover:shadow-dark-medium': variant === 'default',
        
        // Elevated card - More prominent shadow
        'bg-white border border-gray-100 shadow-medium hover:shadow-large dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-dark-medium dark:hover:shadow-dark-large': variant === 'elevated',
        
        // Outlined card - Subtle border emphasis
        'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-soft dark:bg-neutral-800 dark:border-neutral-600 dark:hover:border-neutral-500': variant === 'outlined',
        
        // Ghost card - Minimal styling
        'bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800/50 dark:hover:bg-neutral-800': variant === 'ghost',
      },
      // Enhanced text color inheritance
      'text-gray-900 dark:text-white',
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn(
      'flex flex-col space-y-2 p-6 pb-4',
      // Enhanced spacing and typography
      className
    )}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3 className={cn(
      'text-lg font-semibold leading-tight tracking-tight',
      // Enhanced contrast for light mode
      'text-gray-900 dark:text-white',
      className
    )}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn(
      'p-6 pt-0',
      // Consistent text color
      'text-gray-700 dark:text-neutral-300',
      className
    )}>
      {children}
    </div>
  );
}