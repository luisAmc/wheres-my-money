const colors = require('tailwindcss/colors');

const brandColor = colors.sky;

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Use the expanded colors
        ...colors,

        gray: colors.stone,

        // Add a new "brand" color to all Tailwind utilities, so that we can easily change it.
        brand: brandColor
      },
      // Modify the default ring color so that it matches the brand color:
      ringColor: {
        DEFAULT: brandColor['500']
      }
    }
  },
  plugins: []
};
