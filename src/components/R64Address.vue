<template>
    <div>
        <div class="mt-6">
            <label class="block" :for="makeId('address_line_1')">Street</label>
            <R64Input v-model="address.line_1" :id="makeId('address_line_1')" class="w-full mt-2"/>
        </div>
        <div class="mt-6">
            <label class="block" :for="makeId('address_line_2')">Apartment, suite, etc... (Optional)</label>
            <R64Input v-model="address.line_2" :id="makeId('address_line_2')" class="w-full mt-2"/>
        </div>
        <div class="mt-6 flex">
            <div>
                <label class="block" :for="makeId('adddress_zipcode')">Zipcode</label>
                <R64Input v-model="address.zipcode" :id="makeId('adddress_zipcode')" class="w-full mt-2"/>
            </div>
            <div class="ml-2">
                <label class="block" :for="makeId('address_city')">City</label>
                <R64Input v-model="address.city" :id="makeId('address_city')" class="w-full mt-2"/>
            </div>
            <div class="ml-2">
                <label class="block" :for="makeId('address_region')">State</label>
                <R64Input v-model="address.region" :id="makeId('address_region')" class="w-full mt-2"/>
            </div>
        </div>
        <div class="mt-6">
            <label class="block" :for="makeId('address_phone')">Phone (Optional)</label>
            <R64Input v-model="address.phone" :id="makeId('address_phone')" class="w-full mt-2"/>
        </div>
    </div>
</template>

<script>
import R64Input from './R64Input'

export default {
    model: {
        prop: 'address'
    },
    props: {
        prefix: {
            type: String,
            default: 'shipping'
        },
        address: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        R64Input
    },
    methods: {
        makeId (value) {
            return `${this.prefix}_${value}`
        }
    }
}
</script>
