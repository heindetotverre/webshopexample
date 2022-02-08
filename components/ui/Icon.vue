<template>
  <span :class="`icon icon--${domclass}`"></span>
</template>
<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  domclass: {
    type: String
  }
})
</script>