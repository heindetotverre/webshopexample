<template>
  <div class="main">
    <div class="message rounded green-line-top">
      2,50 korting op Unlimited Data, bij elke telefoon of
      <a href="#">Sim Only</a>.
    </div>
    <h1 class="phones__title title">
      Kies uit
      <span class="emphasis">{{ phones.length }} telefoons</span>
    </h1>
    <PhoneFilter
      v-if="renderType === Type.Desktop"
      :viewState="filterViewState"
      domclass="desktop"
      @toggle-filter="toggleFilter()"
    />
    <PhoneFilterList v-if="renderType === Type.Desktop" />
    <PhoneList :phones="phones" @toggle-filter="toggleFilter()" />
    <PhoneFilter
      v-if="renderType === Type.Mobile"
      :viewState="filterViewState"
      domclass="spread slide-in mobile"
      @toggle-filter="toggleFilter()"
    />
  </div>
</template>

<script lang="ts" setup>
import { store } from '~/store'
import { State, Type } from '~~/types'

definePageMeta({
  layout: "default",
})

const config = useRuntimeConfig()

await store.phones.do.fetchPhoneList()

const phones = computed(() => store.phones.get.getFilteredPhoneList())

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onDeactivated(() => {
  window.removeEventListener('resize', checkWidth)
})

const filterViewState = ref(State.Closed)
const renderType = ref(Type.Desktop)

const checkWidth = () => {
  store.phones.do.filter('reset')
  window.screen.width < config.MOBILE_TURNOVER
    ? renderType.value = Type.Mobile
    : renderType.value = Type.Desktop
}

const toggleFilter = () => {
  filterViewState.value = filterViewState.value === State.Closed
    ? State.Open
    : State.Closed
}

</script>