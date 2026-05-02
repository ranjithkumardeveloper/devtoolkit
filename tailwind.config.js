/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Modern Indigo
          dark: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#94a3b8', // Cool Slate
          dark: '#64748b',
        },
        accent: '#8b5cf6',
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
        card: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        border: {
          light: '#e2e8f0',
          dark: '#334155',
        },
      },
    },
  },
  plugins: [],
}
