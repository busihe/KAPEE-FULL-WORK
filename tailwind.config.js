/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0d6efd', // primary accent
          dark: '#0a58ca',
          light: '#e7f1ff',
          primary: '#4f46e5', // indigo-600
          secondary: '#f43f5e', // rose-600
          animation: {
          'fade-in-down': 'fadeInDown 0.4s ease-out both',
                  },
          keyframes: {
          fadeInDown: {
                '0%': { opacity: 0, transform: 'translateY(-10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
        },
      },
      boxShadow: {
        card: '0 6px 20px rgba(0,0,0,.06)',
      },
    },
  },
  plugins: [],
};
