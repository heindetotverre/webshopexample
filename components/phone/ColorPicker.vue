<template>
  <div class="color-picker"></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  colors: {
    type: Array,
    required: true
  }
})
</script>