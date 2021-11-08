const defaultTheme = require('tailwindcss/defaultTheme');
const blogConfig = require('./blog.config');

const fontFamily = { ...defaultTheme.fontFamily };
delete fontFamily.serif;
fontFamily.sans.unshift(blogConfig.fontName);


const { containerMaxWidth } = blogConfig;
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  corePlugins: {
    container: false
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-bootstrap-grid')({
      gridGutters: {
        0: 0,
        1: '.25rem',
        2: '.5rem',
        3: '1rem',
        4: '1.5rem',
        5: '3rem'
      },
      containerMaxWidths: {
        sm: containerMaxWidth,
        md: containerMaxWidth,
        lg: containerMaxWidth,
        xl: containerMaxWidth,
        '2xl': containerMaxWidth
      }
    })
  ],

  theme: {
    fontFamily,
    extend: {
      typography: {
        light: { /* styles for light typography are defined in prose.scss to keep them all in one place */ }
      }
    }
  },

  variants: {
    extend: {
      typography: ['dark']
    }
  },

  purge: {
    content: [
      'content/**/*.md'
    ]
  }
};
