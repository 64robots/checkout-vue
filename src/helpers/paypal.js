const injectPaypal = (clientId) => {
  return new Promise((resolve) => {
    if (document.getElementById('paypal_script')) {
      resolve()
      return 
    }

    const object = document.createElement('script')
    object.id = 'paypal_script'
    const scriptTag = document.getElementsByTagName('script')[0]
    object.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&intent=authorize&debug=true&currency=USD`
    object.addEventListener('load', () => {
      resolve()
    })
    scriptTag.parentNode.insertBefore(object, scriptTag)
  })      
}

const createPaypal = (elementId, options = {}) => {
  return window.paypal.Buttons({
    style: {
      layout: 'horizontal',
    },
    ...options,
  }).render(elementId)
}

export { injectPaypal, createPaypal }