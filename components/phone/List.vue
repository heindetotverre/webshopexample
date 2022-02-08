<template>
  <div class="phones">
    <UiButton
      icon="sort"
      text="Filter en sorteren"
      domclass="button__prim mobile"
      @click.stop="toggleFilter()"
    />
    <ul class="phones__list">
      <PhoneItem v-for="(phone, index) in phones" :key="index" :phone="phone" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Phone } from '~~/types'

const props = defineProps({
  phones: {
    type: Array as PropType<Array<Phone>>,
    required: true
  }
})

const emits = defineEmits([
  'toggle-filter'
])

const toggleFilter = () => {
  emits('toggle-filter')
}
</script>