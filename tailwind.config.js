const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
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
            },
        }),
        rotate: {
            '1/2': '180deg',
        },
        extend: {
            backgroundColor: theme => ({
                ...theme('colors'),
                'c-black': '#202020',
                'c-light-gray': '#ECECEC',
                'c-gray': '#CCCCCC',
                'c-blue': '#006ED4'
            }),
            textColor: theme => ({
                ...theme('colors'),
                'c-black': '#202020',
                'c-blue': '#006ED4'
            }),
            borderColor: theme => ({
                ...theme('colors'),
                'c-gray': '#CCCCCC',
                'c-grayer': '#AFAFAF'
            }),
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
