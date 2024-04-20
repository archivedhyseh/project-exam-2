/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      background: {
        DEFAULT: 'hsl(var(--background-base) / <alpha-value>)',
        body: 'hsl(var(--background-body) / <alpha-value>)',
        alt: 'hsl(var(--background-alt) / <alpha-value>)',
      },
      text: {
        DEFAULT: 'hsl(var(--text-base) / <alpha-value>)',
        muted: 'hsl(var(--text-muted) / <alpha-value>)',
      },
      black: {
        DEFAULT: 'hsl(var(--color-black-base) / <alpha-value>)',
        hover: 'hsl(var(--color-black-hover) / <alpha-value>)',
        alt: 'hsl(var(--color-black-alt) / <alpha-value>)',
      },
      white: {
        DEFAULT: 'hsl(var(--color-white-base) / <alpha-value>)',
        hover: 'hsl(var(--color-white-hover) / <alpha-value>)',
      },
      brand: {
        DEFAULT: 'hsl(var(--color-brand-base) / <alpha-value>)',
        hover: 'hsl(var(--color-brand-hover) / <alpha-value>)',
      },
      primary: {
        DEFAULT: 'hsl(var(--color-primary-base) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'hsl(var(--color-accent-base) / <alpha-value>)',
      },
      system: {
        danger: 'hsl(var(--color-danger) / <alpha-value>)',
        warning: 'hsl(var(--color-warning) / <alpha-value>)',
        success: 'hsl(var(--color-success) / <alpha-value>)',
      },
    },
    boxShadow: {
      DEFAULT: '0 8px 20px -5px rgba(0, 0, 0, 0.2)',
    },
    screens: {
      sm: '640px',
      md: '960px',
      lg: '1280px',
      xl: '1600px',
    },
  },
  plugins: [],
}
