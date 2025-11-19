/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#cce4f6',
          200: '#99c9ed',
          500: '#0f91d2',
          600: '#0c6fa3',
          900: '#06344a',
        },
        success: '#22c55e',
        warning: '#fbbf24',
        danger: '#ef4444',
      },
      boxShadow: {
        glass: '0 10px 25px rgba(15,145,210,0.12)',
      },
    },
  },
  plugins: [],
};

