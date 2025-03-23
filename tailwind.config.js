/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'socialist-red': '#E41E2B',
          'socialist-dark': '#8B0000',
          'socialist-light': '#FF4D4D',
          'paper-white': '#F5F5F5',
          'ink-dark': '#1A1A1A',
        },
        fontFamily: {
          'serif': ['Merriweather', 'Georgia', 'serif'],
          'sans': ['Libre Franklin', 'Helvetica', 'Arial', 'sans-serif'],
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '65ch',
            },
          },
        },
      },
    },
    plugins: [],
  }