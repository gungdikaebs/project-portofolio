<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import Hero from './components/Hero.vue'
import AssetSection from './sections/AssetSection.vue'

// Lenis Setup
let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis({
    autoRaf: true,
  })
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
  }
})
</script>

<template>
  <main>
    <Hero />
    <AssetSection />
  </main>
</template>

<style scoped>
/* App specific styles if needed */
</style>
