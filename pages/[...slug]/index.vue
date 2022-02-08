<template>
  <div>
    <PhoneProduct />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "default",
})

console.log(useRoute().params)

</script>