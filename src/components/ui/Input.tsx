import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-xl border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-soft focus:shadow-medium',
        'border-neutral-300 bg-white placeholder:text-neutral-500 text-neutral-900 focus:border-primary-500',
        'dark:border-neutral-600 dark:bg-neutral-800 dark:placeholder:text-neutral-400 dark:text-white dark:focus:border-primary-400',
        className
      )}
      {...props}
    />
  );
}