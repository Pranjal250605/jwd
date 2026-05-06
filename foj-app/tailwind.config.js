/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        'surface-container': "var(--color-surface-container)",
        'surface-container-low': "var(--color-surface-container-low)",
        'surface-container-high': "var(--color-surface-container-high)",
        'surface-container-highest': "var(--color-surface-container-highest)",
        'surface-container-lowest': "var(--color-surface-container-lowest)",
        primary: "var(--color-primary)",
        'primary-container': "var(--color-primary-container)",
        'on-primary': "var(--color-on-primary)",
        'on-primary-container': "var(--color-on-primary-container)",
        'on-surface': "var(--color-on-surface)",
        'on-surface-variant': "var(--color-on-surface-variant)",
        'outline-variant': "var(--color-outline-variant)",
        'outline': "var(--color-outline)",
        tertiary: "var(--color-tertiary)",
        'tertiary-container': "var(--color-tertiary-container)",
        'on-tertiary': "var(--color-on-tertiary)",
        'on-tertiary-container': "var(--color-on-tertiary-container)",
        secondary: "var(--color-secondary)",
        'secondary-container': "var(--color-secondary-container)",
        'on-secondary': "var(--color-on-secondary)",
        'on-secondary-container': "var(--color-on-secondary-container)",
      },
      fontFamily: {
        display: ['"Noto Serif JP"', 'serif'],
        headline: ['"Noto Serif JP"', 'serif'],
        sans: ['"Public Sans"', 'sans-serif'],
        body: ['Manrope', '"Public Sans"', 'sans-serif'],
        label: ['"Public Sans"', 'Manrope', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
