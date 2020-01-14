const injectStripe = (url) => {
	return new Promise((resolve) => {
		const object = document.createElement('script')
		const scriptTag = document.getElementsByTagName('script')[0]
		object.src = `//${url}`
		object.addEventListener('load', () => {
			resolve()
		})
		scriptTag.parentNode.insertBefore(object, scriptTag)
	})			
}

const createStripe = (stripeKey) => {
	return window['Stripe'] && window['Stripe'](stripeKey)
}

const createStripeElements = (stripeKey) => {
	return createStripe(stripeKey).elements()
}

export { injectStripe, createStripe, createStripeElements }