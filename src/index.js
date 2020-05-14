import components from './components/index'

const install = function(Vue) {
  if (install.installed) return
  install.installed = true

  Object.keys(components).forEach(component => {
    Vue.component(component)
  })
}

const plugin = { install }

// Auto-install when vue is found
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin

export * from '@/components/index'
