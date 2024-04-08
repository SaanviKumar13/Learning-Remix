import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow:{'box-shadow':'0 1px 8px rgba(0, 0, 0, 0.2)'},
      fontFamily:{
        body:["Open Sans", "sans-serif"],
      },
      backgroundImage: {
        'waves': "url('/bg.png')",
      }
    },
  },
  plugins: [],
} satisfies Config

