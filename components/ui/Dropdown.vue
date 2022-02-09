<template>
  <div
    :class="`trigger ${openstate ? 'trigger--triggered' : ''}`"
    @click="triggerDropdown()"
  >{{ filter.title }}</div>
  <div v-if="openstate" class="dropdown__content">
    <div
      class="form__group form__group--checkbox"
      v-for="(filterValue, index) of filtersToRender()"
      :key="index"
    >
      <div
        :class="`checkbox ${disabled(getItemCountOfValue(count(filterValue))) ? 'checkbox--disbled' : ''}`"
      >
        <input
          :id="createId(filter.title, index)"
          type="checkbox"
          class="checkbox--input"
          v-model="checkboxValue[createId(filter.title, index)]"
        />
        <label
          class="checkbox--label"
          @click="store.phones.do.filter({ key: filter.filterKey, value: filterValue })"
          :for="createId(filter.title, index)"
        >{{ filterValue }} ({{ getItemCountOfValue(count(filterValue)) }})</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { store } from '~~/store'

const config = useRuntimeConfig()

const props = defineProps({
  filter: {
    type: Object,
    required: true
  },
  resetFilter: {
    type: Boolean
  }
})

const openstate = ref(true),
  checkboxValue = ref({})

watch(() => props.resetFilter, () => {
  checkboxValue.value = {}
})

onMounted(() => {
  triggerDropdown()
})

const count = (filter) => {
  return { key: props.filter.filterKey, value: filter }
}

const createId = (title, index) => {
  return `checkbox_${title}_${index}`
}

const disabled = (count) => {
  return !count
}

const filtersToRender = () => {
  if (props.filter.filterKey === 'colors') {
    return [...props.filter.filteredItems.slice(0, 5), 'Overige']
  }
  return props.filter.filteredItems
}

const getItemCountOfValue = (filter) => {
  if (filter.key === 'colors') {
    return store.phones.get.getFilteredPhoneList().filter(p => p.colors.includes(filter.value)).length
  }
  return filter.key === 'manufacturer'
    ? store.phones.get.getPhoneList().filter(p => p[filter.key] === filter.value).length
    : store.phones.get.getFilteredPhoneList().filter(p => p[filter.key] === filter.value).length
}

const triggerDropdown = () => {
  if (window.screen.width > config.MOBILE_TURNOVER) {
    openstate.value = true
  } else {
    openstate.value = !openstate.value
  }
}

</script>