/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: 'sc-',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      main: ['"Moderat-Light"', 'sans-serif'],
      mainMedium: ['"Moderat"', 'sans-serif'],
      mono: ['"SF Mono"', 'monospace'],
    },
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      colors: {
        border: 'hsl(var(--sc-border))',
        input: 'hsl(var(--sc-input))',
        ring: 'hsl(var(--sc-ring))',
        background: 'hsl(var(--sc-background))',
        foreground: 'hsl(var(--sc-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--sc-primary))',
          foreground: 'hsl(var(--sc-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--sc-secondary))',
          foreground: 'hsl(var(--sc-secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--sc-destructive))',
          foreground: 'hsl(var(--sc-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--sc-muted))',
          foreground: 'hsl(var(--sc-muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--sc-accent))',
          foreground: 'hsl(var(--sc-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--sc-popover))',
          foreground: 'hsl(var(--sc-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--sc-card))',
          foreground: 'hsl(var(--sc-card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--sc-radius)',
        md: 'calc(var(--sc-radius) - 2px)',
        sm: 'calc(var(--sc-radius) - 4px)',
      },
      keyframes: {
        'hover-move': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'spring-back': {
          '0%': { transform: 'translateX(0px)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        'spring-more': {
          '0%': { transform: 'translateX(0px)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(7px)' },
          '100%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        'hover-move': 'hover-move 0.5s ease-in-out forwards',
        'spring-back': 'spring-back 0.5s ease-in-out forwards',
        'spring-more': 'spring-more 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
