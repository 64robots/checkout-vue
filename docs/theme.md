# Theme

Each component uses `theme` mixin. This allows us to use default styling or override it using `theme props`.

### Theme mixin
```javascript
export default {
  props: {
    font: {
      type: String,
      default: 'c-font-sans',
    },
    btnPrimary: {
      type: String,
      default: 'c-bg-c-blue c-text-white c-font-bold',
    },
    btnSecondary: {
      type: String,
      default: 'c-bg-white c-text-c-blue c-border c-border-c-blue'
    },
    btnSecondaryTransparent: {
      type: String,
      default: 'c-bg-transparent c-text-c-blue c-border c-border-c-blue',
    },
    textPrimary: {
      type: String,
      default: 'c-text-c-blue',
    },
    iconColor: {
      type: String,
      default: 'c-text-c-blue',
    },
  },
}
```
For styling we use [Tailwindcss](https://tailwindcss.com). We namespace all tailwind classes using `c-` prefix. It's useful when the checkout package is layered over an existing app that already uses Tailwind.

### Theme props
| Property                  |
| --------------------------|
| font                      |
| btn-primary               |
| btn-secondary             |
| btn-secondary-transparent |
| text-primary              | 
| icon-color                |