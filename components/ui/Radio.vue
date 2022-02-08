<template>
  <div class="radio">
    <div class="desktop">{{ title }}</div>
    <div class="radio__content">
      <div
        @click="$emit('update-sorting', Sort.Most)"
        :class="`radio__button ${active === Sort.Most ? 'radio__button--active' : ''}`"
      >
        <div class="input"></div>
        <span class="label">Meest verkocht</span>
      </div>
      <div
        @click="$emit('update-sorting', Sort.New)"
        :class="`radio__button ${active === Sort.New ? 'radio__button--active' : ''}`"
      >
        <div class="input"></div>
        <span class="label">Nieuw</span>
      </div>
      <div
        @click="$emit('update-sorting', Sort.Action)"
        :class="`radio__button ${active === Sort.Action ? 'radio__button--active' : ''}`"
      >
        <div class="input"></div>
        <span class="label">Actie</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Sort } from '~~/types'

const props = defineProps({
  active: {
    type: Number,
    required: true
  }
})

const emits = [
  'update-sorting'
]

watch(() => props.active, () => {
  title.value = props.active == Sort.Most
    ? 'Meest verkocht'
    : props.active == Sort.New
      ? 'Nieuw'
      : 'Actie'
})

const title = ref('Meest verkocht')
</script>