<template>
  <div v-if="Object.keys(filters).length" class="filter__list">
    <div>{{ filters }}</div>
    <UiButton text="Alle filters verwijderen" domclass="link" @click="reset()" />
  </div>
</template>

<script lang="ts" setup>
import { store } from '~~/store'

const emits = defineEmits([
  'clearDropdownFilterValues'
])

const filters = computed(() => store.phones.get.getActiveFilters())

const reset = () => {
  emits('clearDropdownFilterValues')
}
</script>