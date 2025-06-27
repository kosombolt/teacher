/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enhanced primary palette with better contrast ratios
        primary: {
          50: '#f0f4ff',   // WCAG AAA compliant backgrounds
          100: '#e0e7ff',  // Light mode card backgrounds
          200: '#c7d2fe',  // Subtle borders and dividers
          300: '#a5b4fc',  // Disabled states
          400: '#818cf8',  // Interactive elements
          500: '#6366f1',  // Primary brand color
          600: '#4f46e5',  // Primary hover states
          700: '#4338ca',  // Primary active states
          800: '#3730a3',  // High contrast text
          900: '#312e81',  // Maximum contrast text
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        // Enhanced neutral palette for better light mode support
        neutral: {
          25: '#fcfcfd',   // Pure white alternative
          50: '#f8fafc',   // Lightest background
          100: '#f1f5f9',  // Card backgrounds
          150: '#e8f0f7',  // Subtle dividers
          200: '#e2e8f0',  // Borders
          300: '#cbd5e1',  // Disabled text
          400: '#94a3b8',  // Placeholder text
          500: '#64748b',  // Secondary text
          600: '#475569',  // Primary text (light mode)
          700: '#334155',  // Headings (light mode)
          800: '#1e293b',  // High contrast text
          900: '#0f172a',  // Maximum contrast
        },
        // Light mode specific grays with better contrast
        gray: {
          25: '#fefefe',   // Almost white
          50: '#f9fafb',   // Background
          75: '#f4f6f8',   // Subtle background
          100: '#f3f4f6',  // Card background
          150: '#eaecf0',  // Dividers
          200: '#e5e7eb',  // Borders
          300: '#d1d5db',  // Disabled elements
          400: '#9ca3af',  // Placeholder text
          500: '#6b7280',  // Secondary text
          600: '#4b5563',  // Primary text
          700: '#374151',  // Headings
          800: '#1f2937',  // High contrast
          900: '#111827',  // Maximum contrast
        },
        // Enhanced semantic colors with WCAG compliance
        success: {
          50: '#f0fdf4',   // Success backgrounds
          100: '#dcfce7',  // Success light
          500: '#22c55e',  // Success primary
          600: '#16a34a',  // Success hover
          700: '#15803d',  // Success active
          800: '#166534',  // Success text
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
        },
        // Light mode specific surface colors
        surface: {
          primary: '#ffffff',     // Main backgrounds
          secondary: '#f8fafc',   // Secondary backgrounds
          tertiary: '#f1f5f9',    // Tertiary backgrounds
          elevated: '#ffffff',    // Elevated surfaces (cards)
          overlay: 'rgba(0, 0, 0, 0.05)', // Light overlays
        }
      },
      // Enhanced shadow system for better depth perception
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.04)',           // Subtle elements
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',         // Cards
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',      // Elevated cards
        'large': '0 8px 24px rgba(0, 0, 0, 0.12)',       // Modals
        'xl': '0 12px 32px rgba(0, 0, 0, 0.16)',         // High elevation
        'glow': '0 0 20px rgba(99, 102, 241, 0.15)',     // Focus states
        'glow-light': '0 0 12px rgba(99, 102, 241, 0.08)', // Subtle glow
        // Dark mode shadows
        'dark-soft': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'dark-medium': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'dark-large': '0 8px 24px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      // Enhanced animation system
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-out': 'fadeOut 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-out': 'scaleOut 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        'theme-transition': 'themeTransition 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        themeTransition: {
          '0%': { opacity: '0.8' },
          '50%': { opacity: '0.9' },
          '100%': { opacity: '1' },
        },
      },
      // Enhanced transition system
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      // Enhanced spacing system
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      }
    },
  },
  plugins: [],
};