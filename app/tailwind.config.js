/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'card-border-color-start': '#636465',
      'card-border-color-end': '#2F3031',
      'bg-color': '#1D1D1D',
      'fg-color': '#262828',
      'highlight-color': '#6ED4E8',
      'footer-color': '#212322',
      'like-btn': '#303132',
      'main-text': '#FEFEFE',
      'secondary-text': '#747474',
      'solana-start': '#9845FE',
      'solana-end': '#19FA9A',
    },
    extend: {
      boxShadow: {
        md: '0 0 15px 0 rgb(110 212 232 / .5)',
      },
    },
  },
  plugins: [require('daisyui', '@tailwindcss/forms')],
};
