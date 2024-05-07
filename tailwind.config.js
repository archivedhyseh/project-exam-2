/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
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
      sm: '540px',
      md: '780px',
      lg: '960px',
      xl: '1280px',
      '2xl': '1600px',
    },
  },
  plugins: [],
}
