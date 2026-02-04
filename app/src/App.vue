<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import Hero from './sections/Hero.vue'
import Navbar from './components/Navbar.vue'
import About from './sections/About.vue'

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
    <Navbar />
    <Hero />
    <About />
  </main>
</template>

<style scoped>
/* App specific styles if needed */
</style>
