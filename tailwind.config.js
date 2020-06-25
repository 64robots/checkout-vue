module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.js'
  ],
  prefix: 'c-',
  theme: {
    customForms: theme => ({
      default: {
        radio: {
          icon: '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="#006ED4"/></svg>',
          color: theme('colors.white'),
          height: '20px',
          width: '20px',
          borderWidth: '2px',
          borderColor: '#737373'
        },
        checkbox: {
          icon: '<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0H2a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V2a2 2 0 00-2-2zM7 14L2 9l1.41-1.41L7 11.17l7.59-7.59L16 5l-9 9z" fill="#006ED4"/></svg>',
          color: theme('colors.white'),
          height: '18px',
          width: '18px',
          borderWidth: '2px',
          borderColor: '#737373'
        }
      },
    }),
    rotate: {
      '1/2': '180deg',
    },
    extend: {
      maxWidth: {
        '7xl': '90rem'
      },
      colors: {
        c: {
          'gray-100': '#F5F5F5',
          'gray-200': '#ECECEC',
          'gray-300': '#DCDCDC',
          'gray-400': '#CCCCCC',
          'gray-500': '#AFAFAF',
          'gray-600': '#737373',
          'gray-700': '#202020',
          blue: '#006ED4'
        },
      },
      opacity: {
        '40': '0.4'
      }
    },
  },
  variants: {},
  plugins: [
    function ({addUtilities, config, e}) {
      const rotateUtilities = Object.keys(config('theme.rotate')).map((key) => {
        const value = config('theme.rotate')[key]
        return {
          [`.${e(`rotate-${key}`)}`]: {
            transform: `rotate(${value})`
          },
          [`.${e(`-rotate-${key}`)}`]: {
            transform: `rotate(-${value})`
          },
        }
      })

      addUtilities(rotateUtilities)
    },
    require('@tailwindcss/custom-forms')
  ],
}
