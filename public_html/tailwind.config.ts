import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1800px',
      },
      letterSpacing: {
        '0.014em': '0.014em',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        brand: '#0319DB',
        primary: '#01019B',
        'primary-light': '#00A3FF',
        gray: {
          primary: '#6D6E71',
          secondary: '#4F5665',
        },
        lilac: '#B8C0D9',
      },
      backgroundImage: {
        btn: 'linear-gradient(90deg, #01A1FD 0%, #007AE5 7%, #0055CD 15%, #0036BA 24%, #001EAB 33%, #000DA0 42%, #00039A 53%, #000098 65%)',
      },
    },
  },
  plugins: [
    ({ addComponents }: Config['PluginAPI']) => {
      addComponents({
        '.container-center': {
          '@apply max-w-7xl 3xl:max-w-[1600px] mx-auto px-4 lg:px-10': {},
        },
        '.absolute-center': {
          '@apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2':
            {},
        },
        '.btn-primary': {
          '@apply bg-btn text-white': {},
        },
      });
    },
    require('@tailwindcss/typography')
  ],
};
export default config;
