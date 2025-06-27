import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Select({ options, value, onChange, placeholder, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all duration-300",
          "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
          "dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:hover:border-neutral-500 dark:focus:border-primary-400",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon}
          <span className={selectedOption ? "text-neutral-900 dark:text-white" : "text-neutral-500"}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-60 overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-xl">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700",
                  value === option.value && "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                )}
              >
                {option.icon}
                <div className="flex-1">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-neutral-500">{option.description}</div>
                  )}
                </div>
                {value === option.value && (
                  <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}