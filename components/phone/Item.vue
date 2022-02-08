<template>
  <li class="phones__item phone">
    <div class="phones__content">
      <PhoneColorPicker v-if="phone.colors.length" :colors="phone.colors" />
      <div class="image">
        <!-- too much requests to kpn server
        <img :src="`https://www.kpn.com/shop/cdn/products/_/product_${phone.id}_main.png`" />-->
        <img :src="`https://www.kpn.com/shop/cdn/products/_/product_6043820_main.png`" />
      </div>
      <h3 class="phones__item--sub-title sub-title">{{ phone.manufacturer }}</h3>
      <h2 class="phones__item--title title">{{ phone.model }}</h2>
      <div v-if="phone.attributes?.promotion_bg_color" class="promotion__sticker">
        <img src="https://www.kpn.com/shop/cms/assets/stickers/smartpakker.png" />
      </div>
      <div
        v-if="phone.attributes?.promotion_label"
        class="promotion__label"
      >{{ phone.attributes.promotion_label }}</div>
      <div class="link__wrapper--right">
        <NuxtLink :to="phone.slug">Bekijk toestel</NuxtLink>
      </div>
    </div>
  </li>
</template>
<script lang="ts" setup>
const props = defineProps({
  phone: {
    type: Object
  }
})
</script>