/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f7', 100: '#d5dfeb', 200: '#aabfd6', 300: '#7492b5',
          400: '#456894', 500: '#2c4a72', 600: '#1f3557', 700: '#172742',
          800: '#111d31', 900: '#0c1524', 950: '#070d17',
        },
        cream: {
          50: '#fdfbf6', 100: '#faf5ea', 200: '#f3e9d5', 300: '#e8d8b8',
          400: '#d9c092', 500: '#c8a56c', 600: '#ab8850', 700: '#8a6b3f',
          800: '#6b5333', 900: '#4d3c26',
        },
        burgundy: {
          50: '#fbf1f2', 100: '#f6dee0', 200: '#ebbdc2', 300: '#db8f98',
          400: '#c65f6c', 500: '#ab3e4d', 600: '#8c2f3c', 700: '#6f2531',
          800: '#571e28', 900: '#3f161d',
        },
        racing: {
          50: '#f0f5f1', 100: '#dbe8de', 200: '#b6d0bd', 300: '#88b195',
          400: '#5b8e6c', 500: '#3f7150', 600: '#2f5a3f', 700: '#264733',
          800: '#1e3729', 900: '#152720',
        },
        brass: {
          50: '#fdf9ee', 100: '#f9efd2', 200: '#f1dda3', 300: '#e6c46c',
          400: '#dbab42', 500: '#c9922c', 600: '#a87323', 700: '#85571f',
          800: '#6b4520', 900: '#59391e',
        },
      },
      fontFamily: {
        display: ['"Libre Baskerville"', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { prose: '68ch' },
      boxShadow: {
        plate: '0 1px 0 0 rgba(255,255,255,0.12) inset, 0 12px 28px -12px rgba(7,13,23,0.55)',
      },
      backgroundImage: {
        'blueprint-grid':
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      backgroundSize: { blueprint: '28px 28px' },
      transitionTimingFunction: { editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    },
  },
  plugins: [],
}
