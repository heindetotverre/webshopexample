<template>
  <div class="filter__list">
    <div>{{ brandfilters() }}</div>
    <div>{{ otherFilters() }}</div>
    <UiButton
      text="Alle filters verwijderen"
      domclass="link"
      @click="store.phones.do.filter('reset')"
    />
  </div>
</template>

<script lang="ts" setup>
import { store } from '~~/store'

const filters = computed(() => store.phones.get.getActiveFilters())

const brandfilters = () => {
  return Object.entries(filters.value)
}

const otherFilters = () => {
  return Object.keys(filters.value)
}
</script>