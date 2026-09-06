<template>
  <span
    v-if="svgContent"
    class="inline-flex items-center justify-center shrink-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:transition-colors"
    :class="props.class"
    v-html="svgContent"
    aria-hidden="true"
  ></span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    svgContent?: string | null
    class?: string
  }>(),
  {
    svgContent: null,
    class: 'h-4 w-4'
  }
)
</script>
