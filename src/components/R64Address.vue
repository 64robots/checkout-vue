<template>
  <div>
    <div class="mt-6">
      <R64FormInput
        v-model="address.line1"
        label="Street"
        name="address_line1"
        :required="required[makeId('address_line1')]"
      />
    </div>
    <div class="mt-6">
      <R64FormInput
        v-model="address.line2"
        label="Apartment, suite, etc ..."
        name="address_line2"
        :required="required[makeId('address_line2')]"
      />
    </div>
    <div class="mt-6 flex">
      <div class="w-full">
        <R64FormInput
          v-model="address.zipcode"
          label="Zipcode"
          name="address_zipcode"
          :required="required[makeId('address_zipcode')]"
        />
      </div>
      <div class="w-full ml-2">
        <R64FormInput
          v-model="address.city"
          label="City"
          name="address_city"
          :required="required[makeId('address_city')]"
        />
      </div>
      <div class="w-full ml-2">
        <R64FormInput
          v-model="address.state"
          label="State"
          name="address_region"
          :required="required[makeId('address_region')]"
        />
      </div>
    </div>
    <div class="mt-6">
      <R64FormInput
        v-model="address.phone"
        label="Phone"
        name="address_phone"
        :required="required[makeId('address_phone')]"
      />
    </div>
  </div>
</template>

<script>
import R64FormInput from './R64FormInput'

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
    },
    required: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    R64FormInput
  },
  methods: {
    makeId (value) {
      return `${this.prefix}_${value}`
    }
  }
}
</script>