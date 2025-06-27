import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-lg border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'border-gray-300 bg-white placeholder:text-gray-500 text-gray-900 focus:border-indigo-500',
        'dark:border-blue-gray-600 dark:bg-blue-gray-800 dark:placeholder:text-gray-400 dark:text-white dark:focus:border-indigo-400',
        className
      )}
      {...props}
    />
  );
}