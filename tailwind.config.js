module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FDDF23',
        secondary: 'rgb(234 179 8)', 
        tertiary: 'var(--color-tertiary)',
        quaternary: 'var(--color-quaternary)',
        text: 'var(--color-text)',
      },
      keyframes: {
        border: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        }
      },
      animation: {
        border: 'border 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

