const colors = require('tailwindcss/colors');

const brandColor = colors.sky;

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: colors.gray,
        // Add a new "brand" color to all Tailwind utilities, so that we can easily change it.
        brand: brandColor
      },
      // Modify the default ring color so that it matches the brand color:
      ringColor: {
        DEFAULT: brandColor['500']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
