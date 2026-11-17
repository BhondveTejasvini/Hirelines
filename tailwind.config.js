/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#1c1514', // Custom warm espresso tint for cards
          900: '#140f0e', // Deep warm espresso background
          950: '#0a0807', // Deepest background charcoal-black
        },
        indigo: {
          600: '#b43b2d', // Replaced with rich terracotta / brown-red primary
          500: '#c84b3d', // Lighter terracotta hover state
          900: '#4a1b15',
          950: '#2c0f0c',
        },
        emerald: {
          400: '#fbbf24', // Accent shifted to warm amber for high match scores
          500: '#f59e0b',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        cyan: {
          400: '#f6ad55', // Soft warm gold secondary accent
        },
      },
    },
  },
  plugins: [],
}