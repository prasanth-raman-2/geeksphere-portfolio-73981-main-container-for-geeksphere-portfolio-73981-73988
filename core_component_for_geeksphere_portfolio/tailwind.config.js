import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'geek-primary': '#1a1a1a',
        'geek-secondary': '#2ecc71',
        'geek-accent': '#3498db',
        'geek-text': '#ecf0f1'
      },
      fontFamily: {
        'code': ['Fira Code', 'monospace'],
        'display': ['Space Grotesk', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.geek-text'),
            a: {
              color: theme('colors.geek-secondary'),
              '&:hover': {
                color: theme('colors.geek-accent'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.geek-secondary'),
            },
            code: {
              color: theme('colors.geek-accent'),
              backgroundColor: '#2a2a2a',
              borderRadius: '0.25rem',
              padding: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [forms, typography],
}
