/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#C0C0C0',
        surface: '#C0C0C0',
        surface2: '#FFFFFF',
        border: '#808080',
        'border-light': '#FFFFFF',
        primary: '#000080',
        'primary-hover': '#0000A0',
        accent: '#000080',
        'text-primary': '#000000',
        'text-muted': '#444444',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
