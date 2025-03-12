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
          DEFAULT: '#FF5A5F',
          dark: '#E5484D',
          light: '#FF8086',
        },
        secondary: {
          DEFAULT: '#0A0B0D',
          dark: '#000000',
          light: '#1F2125',
        },
        accent: {
          DEFAULT: '#7C5DFA',
          dark: '#6B4EE6',
          light: '#9277FF',
        },
        background: {
          DEFAULT: '#0F1114',
          dark: '#090A0C',
          light: '#1A1D21',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2832&auto=format&fit=crop')",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 90, 95, 0.7)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 90, 95, 0.9)' },
        }
      },
    },
  },
  plugins: [],
}
