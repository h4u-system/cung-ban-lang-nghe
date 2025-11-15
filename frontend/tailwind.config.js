// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Đã giữ nguyên Primary, Success, Warning, Danger
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        success: {
          50: '#e8f5e9',
          500: '#4caf50',
          600: '#43a047',
        },
        warning: {
          50: '#fff3e0',
          500: '#ff9800',
          600: '#fb8c00',
        },
        danger: {
          50: '#ffebee',
          500: '#f44336',
          600: '#e53935',
        },
        
        // Bổ sung các màu còn thiếu (gray, blue, indigo, etc.) được dùng trong các file khác:
        gray: {
          50: '#f9fafb', // FIX: Bổ sung bg-gray-50 (dùng trong index.css)
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827', // FIX: Bổ sung text-gray-900 (dùng trong index.css)
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        indigo: {
          50: '#eef2ff',
          500: '#6366f1',
          800: '#3730a3',
        },
        amber: {
          50: '#fffdf4',
          400: '#fbbf24',
          800: '#92400e',
        },
        red: {
          50: '#fef2f2',
          200: '#fecaca',
          600: '#dc2626',
          700: '#b91c1c',
        },
        green: {
          50: '#f0fdf4',
          500: '#22c55e',
          700: '#047857'
        },
        purple: {
          400: '#c084fc',
          600: '#9333ea',
        },
        orange: {
          400: '#fb923c',
          600: '#ea580c',
        }
      },
      fontFamily: {
        // Đã giữ nguyên cấu hình Inter font
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'bubble': '18px',
        '2xl': '1rem', // FIX: Bổ sung rounded-2xl để khớp với .card trong index.css
      },
      boxShadow: {
        'chat': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'emergency': '0 8px 30px rgba(244, 67, 54, 0.3)',
        // FIX: Bổ sung các shadows mặc định được sử dụng trong index.css và các components
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)', // FIX: shadow-lg
        'xl': '0 20px 25px rgba(0, 0, 0, 0.15)', // FIX: shadow-xl
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce': 'bounce 1s infinite',
        'scale-in': 'scaleIn 0.3s ease-out', // FIX: Bổ sung animate-scale-in
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // FIX: Bổ sung keyframe scaleIn
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}