import type { Config } from 'tailwindcss';

const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/[locale]/(routes)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/[locale]/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: '#00B6C9',
            secondary: '#006c84',
            neutral: '#E8F1F4',
            black: '#171d27',
            warning: '#F4DD7D',
            danger: '#C44969',
            success: '#93D9A9',
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
      },
    }),
  ],
};

export default config;
