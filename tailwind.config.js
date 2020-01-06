const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
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
            },
        },
    },
    variants: {},
    plugins: [],
}
