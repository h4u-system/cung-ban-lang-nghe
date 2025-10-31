/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
          500: '#4caf50',
          600: '#43a047',
        },
        warning: {
          500: '#ff9800',
          600: '#fb8c00',
        },
        danger: {
          500: '#f44336',
          600: '#e53935',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'bubble': '18px',
      },
      boxShadow: {
        'chat': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'emergency': '0 4px 20px rgba(244, 67, 54, 0.3)',
      },
    },
  },
  plugins: [],
}