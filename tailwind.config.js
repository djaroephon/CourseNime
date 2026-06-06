/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue"
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          primary: '#FF6B6B', // Soft Red/Pink
          secondary: '#4ECDC4', // Teal/Cyan
          accent: '#FFE66D', // Yellow
          dark: '#292F36',
          light: '#F7FFF7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif']
      }
    },
  },
  plugins: [],
}
