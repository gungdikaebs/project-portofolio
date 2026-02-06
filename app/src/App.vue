<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Lenis from 'lenis'
import Navbar from './components/Navbar.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const showNavbar = computed(() => {
  // Hide navbar on login and admin routes
  return route.path !== '/login' && !route.path.startsWith('/admin')
})

// Lenis Setup
let lenis: Lenis | null = null

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP's ticker to drive Lenis updates
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  // Disable GSAP lag smoothing to ensure smooth scrolling
  gsap.ticker.lagSmoothing(0)
})
</script>

<template>
  <main>
    <Navbar v-if="showNavbar" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
/* App specific styles if needed */
</style>
