<script>
import cart from '../../api/cart'
import cartItem from '../../api/cartItem'

export default {
    props: {
        cartToken: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            loading: false,
            hasError: false,
            cart: null
        }
    },

    methods: {
        async addToCart (productId, quantity = 1) {
            try {
                this.loading = true
                this.hasError = false

                if (this.cartToken === null) {
                    const { data } = await cart.create(productId)
                    this.cart = data
                } else {
                    const { data } = await cartItem.create(this.cartToken, {
                        product_id: productId,
                        quantity: quantity
                    })
                    this.cart = data
                }

            } catch (e) {
                this.hasError = true
            }

            this.loading = false

            if (!this.hasError) {
                this.$emit('cart:update', this.cart)
            }
            return this.cart
        }
    },

    render () {
        return this.$scopedSlots.default({
            addToCart: this.addToCart,
            loading: this.loading,
            hasError: this.hasError,
            cart: this.cart
        })
    }
}
</script>
