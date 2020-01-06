const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        rotate: {
            '1/2': '180deg',
        },
        extend: {
            backgroundColor: theme => ({
                ...theme('colors'),
                'c-black': '#202020',
                'c-gray': '#ECECEC',
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
        }
    ],
}
