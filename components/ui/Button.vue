<template>
  <button :href="link" :class="`button ${domclass ? domclass : ''}`">
    <span>{{ text }}</span>
  </button>
</template>
<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String
  },
  icon: {
    type: String
  },
  link: {
    type: String
  },
  domclass: {
    type: String
  }
})
</script>