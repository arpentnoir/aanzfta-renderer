// https://tailwindcss.com/docs/theme
const config = {
  content: [`./src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        'second-font-family': ['Helvetica', 'sans-serif']
      },
      colors: {
        primary: '#014b7e',
        'primary-dark': '#003a63',
        error: '#f44336'
      },
      screen: {
        xs: '0'
      }
    }
  }
};

module.exports = config;
