<template>
  <div
    :class="`phonesfilter ${props.viewState ? 'phonesfilter--visible' : ''} ${domclass ? domclass : ''}`"
    ref="filterDomRef"
  >
    <h2 class="phonesfilter__title mobile">Filteren en Sorteren</h2>
    <UiIcon :icon="`cross`" :domclass="`rounded`" />
    <UiButton text="Alle filters verwijderen" domclass="link mobile" @click="resetFilters()" />
    <div class="phonesfilter__sort">
      <p>Sorteren</p>
      <UiRadio :active="sortMethod" @update-sorting="updateSorting($event)" />
    </div>
    <div class="phonesfilter__filter">
      <p class="mobile">Filteren</p>
      <div class="phonesfilter__dropdown dropdown" v-for="(filter, index) in filters" :key="index">
        <UiDropdown :filter="filter" :resetFilter="resetFilter" />
      </div>
    </div>
  </div>
  <div class="phonesfilter--background spread mobile"></div>
  <UiButton :text="`Toon ${phones.length} telefoons`" domclass="button__prim mobile" />
</template>

<script lang="ts" setup>
import { store } from '~~/store'
import { State, Sort } from '~~/types'

const props = defineProps({
  viewState: {
    type: Number,
    required: true
  },
  domclass: {
    type: String
  }
})

const emits = defineEmits([
  'toggle-filter'
])

const phones = computed(() => store.phones.get.getFilteredPhoneList())
const filters = computed(() => store.phones.get.getFilters())

const filterDomRef = ref()
const resetFilter = ref()
const sortMethod = ref(Sort.Most)

watch(() => props.viewState, () => {
  props.viewState
    ? document.addEventListener('click', handleClickOutside)
    : document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  if (!filterDomRef.value || !filterDomRef.value.contains(event.target)) {
    emits('toggle-filter', State.Closed)
  }
}

const resetFilters = () => {
  resetFilter.value = !resetFilter.value
  store.phones.do.filter('reset')
}

const updateSorting = (method) => {
  store.phones.do.sort(method)
  sortMethod.value = method
}
</script>