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
          // Base styles with premium feel
          "group relative flex h-11 w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Enhanced styling with glass morphism effect
          "bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-900",
          "hover:bg-white hover:border-gray-300/80 hover:shadow-lg hover:shadow-gray-200/50",
          "focus:bg-white focus:border-primary-400/60 focus:shadow-lg focus:shadow-primary-200/30",
          // Dark mode with enhanced glass effect
          "dark:bg-neutral-800/80 dark:border-neutral-600/60 dark:text-white",
          "dark:hover:bg-neutral-800 dark:hover:border-neutral-500/80 dark:hover:shadow-lg dark:hover:shadow-neutral-900/30",
          "dark:focus:border-primary-400/60 dark:focus:shadow-lg dark:focus:shadow-primary-900/30",
          // Error states with smooth transitions
          error && [
            "border-error-400/60 bg-error-50/50 text-error-700",
            "hover:border-error-500/80 hover:bg-error-50/80",
            "focus:border-error-500/80 focus:shadow-error-200/30",
            "dark:border-error-400/60 dark:bg-error-900/20 dark:text-error-300"
          ],
          // Open state with enhanced visual feedback
          isOpen && [
            "border-primary-400/80 bg-white shadow-xl shadow-primary-200/40 ring-4 ring-primary-100/50",
            "dark:border-primary-400/80 dark:bg-neutral-800 dark:shadow-xl dark:shadow-primary-900/40 dark:ring-4 dark:ring-primary-900/30"
          ],
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {selectedOption?.icon && (
            <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              {selectedOption.icon}
            </div>
          )}
          <span className={cn(
            "truncate transition-colors duration-300",
            selectedOption 
              ? "text-gray-900 dark:text-white font-medium" 
              : "text-gray-500 dark:text-neutral-400 font-normal"
          )}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 flex-shrink-0 transition-all duration-300 ease-out",
          "text-gray-400 dark:text-neutral-500",
          isOpen && "rotate-180 text-primary-500 dark:text-primary-400 scale-110",
          "group-hover:text-gray-600 dark:group-hover:text-neutral-300"
        )} />
      </button>

      {/* Enhanced Dropdown with smooth animations */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div className="fixed inset-0 z-40" />
          
          <div className="absolute top-full left-0 right-0 z-50 mt-2">
            <div 
              ref={optionsRef}
              className={cn(
                "max-h-64 overflow-auto rounded-2xl border shadow-2xl",
                // Glass morphism effect for dropdown
                "bg-white/95 backdrop-blur-xl border-gray-200/60",
                "dark:bg-neutral-800/95 dark:border-neutral-600/60",
                // Enhanced shadow and animation
                "shadow-xl shadow-gray-900/10 dark:shadow-black/30",
                "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
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
                    "group flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 ease-out",
                    "hover:bg-gray-50/80 dark:hover:bg-neutral-700/50",
                    "focus:bg-gray-50/80 dark:focus:bg-neutral-700/50 focus:outline-none",
                    // Selected state with enhanced styling
                    value === option.value && [
                      "bg-primary-50/80 text-primary-700 font-medium",
                      "hover:bg-primary-100/80 dark:bg-primary-900/30 dark:text-primary-300",
                      "dark:hover:bg-primary-900/40"
                    ],
                    // Focused state (keyboard navigation)
                    focusedIndex === index && [
                      "bg-gray-100/80 dark:bg-neutral-700/60",
                      value === option.value && "bg-primary-100/80 dark:bg-primary-900/40"
                    ],
                    // First and last item border radius
                    index === 0 && "rounded-t-2xl",
                    index === options.length - 1 && "rounded-b-2xl"
                  )}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {/* Icon with smooth scaling */}
                  {option.icon && (
                    <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                      {option.icon}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "font-medium truncate transition-colors duration-200",
                      value === option.value 
                        ? "text-primary-700 dark:text-primary-300" 
                        : "text-gray-900 dark:text-white"
                    )}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className={cn(
                        "text-xs truncate mt-0.5 transition-colors duration-200",
                        value === option.value
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-gray-500 dark:text-neutral-400"
                      )}>
                        {option.description}
                      </div>
                    )}
                  </div>
                  
                  {/* Check icon with smooth animation */}
                  {value === option.value && (
                    <Check className={cn(
                      "h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0",
                      "animate-in zoom-in-50 duration-200"
                    )} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}