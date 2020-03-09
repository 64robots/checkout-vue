export default {
  methods: {
    focusError(component = this) {
      if (component.error) {
        component.$refs.input.focus()
        return true;
      }

      let focused = false;

      component.$children.some((child) => {
        focused = this.focusError(child)
        return focused
      })

      return focused
    },
  },
}