import React, { useState, useRef, useEffect } from 'react';
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
  disabled?: boolean;
  error?: boolean;
}

export function Select({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  className, 
  disabled = false,
  error = false 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
          setFocusedIndex(-1);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current) {
      const focusedElement = optionsRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          // Base styles with enhanced accessibility
          "flex h-10 w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-300 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Enhanced hover and focus states
          "hover:shadow-soft focus:shadow-medium",
          // Default styling with better contrast
          "border border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:border-primary-500",
          "dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:hover:border-neutral-500 dark:focus:border-primary-400",
          // Error states
          error && "border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-400",
          // Open state styling
          isOpen && "border-primary-500 ring-2 ring-primary-500/20 dark:border-primary-400",
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedOption?.icon && (
            <div className="flex-shrink-0">
              {selectedOption.icon}
            </div>
          )}
          <span className={cn(
            "truncate",
            selectedOption 
              ? "text-gray-900 dark:text-white" 
              : "text-gray-500 dark:text-neutral-400"
          )}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 flex-shrink-0 transition-transform duration-300 ease-smooth",
          "text-gray-500 dark:text-neutral-400",
          isOpen && "rotate-180 text-primary-500 dark:text-primary-400"
        )} />
      </button>

      {/* Enhanced Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1">
          <div 
            ref={optionsRef}
            className={cn(
              "max-h-60 overflow-auto rounded-xl border shadow-xl",
              "bg-white dark:bg-neutral-800",
              "border-gray-200 dark:border-neutral-700",
              "animate-scale-in origin-top"
            )}
            role="listbox"
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setFocusedIndex(-1);
                }}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-all duration-200 ease-smooth",
                  "hover:bg-gray-100 dark:hover:bg-neutral-700",
                  "focus:bg-gray-100 dark:focus:bg-neutral-700 focus:outline-none",
                  // Selected state
                  value === option.value && [
                    "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400",
                    "hover:bg-primary-100 dark:hover:bg-primary-900/40"
                  ],
                  // Focused state (keyboard navigation)
                  focusedIndex === index && [
                    "bg-gray-100 dark:bg-neutral-700",
                    value === option.value && "bg-primary-100 dark:bg-primary-900/40"
                  ],
                  // First and last item border radius
                  index === 0 && "rounded-t-xl",
                  index === options.length - 1 && "rounded-b-xl"
                )}
                role="option"
                aria-selected={value === option.value}
              >
                {/* Icon */}
                {option.icon && (
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-medium truncate",
                    value === option.value 
                      ? "text-primary-600 dark:text-primary-400" 
                      : "text-gray-900 dark:text-white"
                  )}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className={cn(
                      "text-xs truncate mt-0.5",
                      value === option.value
                        ? "text-primary-500 dark:text-primary-500"
                        : "text-gray-500 dark:text-neutral-400"
                    )}>
                      {option.description}
                    </div>
                  )}
                </div>
                
                {/* Check icon for selected option */}
                {value === option.value && (
                  <Check className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}