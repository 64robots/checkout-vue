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