/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    screens: {
      'xs': '475px',     // Extra small (nuevo breakpoint)
      'sm': '640px',     // Small
      'md': '768px',     // Medium
      'lg': '1024px',    // Large
      'xl': '1280px',    // Extra large
      '2xl': '1536px',   // 2X large
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        'xxs': '0.625rem', // 10px - útil para móvil
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}