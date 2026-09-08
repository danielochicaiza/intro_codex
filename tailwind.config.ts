import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'Arial', 'sans-serif'],
      },
      colors: {
        ink: '#18243F',
        cream: '#FFF9F0',
        coral: '#FF765C',
        mint: '#D9F7E8',
        lilac: '#EAE4FF',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(37, 44, 76, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
