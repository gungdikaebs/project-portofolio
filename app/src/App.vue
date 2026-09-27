<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Lenis from 'lenis'
import Navbar from './components/Navbar.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { reduceMotion } from './animations/motion'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const progressBar = ref<HTMLElement | null>(null)
const showNavbar = computed(() => {
  // Hide navbar on login and admin routes
  return route.path !== '/login' && !route.path.startsWith('/admin')
})

// Lenis Setup
let lenis: Lenis | null = null
const updateLenis = (time: number) => lenis?.raf(time * 1000)

let scrollTriggerInstance: ScrollTrigger | null = null

const initScrollProgress = () => {
  if (reduceMotion() || !progressBar.value) return

  scrollTriggerInstance?.kill()
  scrollTriggerInstance = ScrollTrigger.create({
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (progressBar.value) {
        gsap.set(progressBar.value, { scaleX: self.progress })
      }
    }
  })
}

onMounted(() => {
  if (reduceMotion()) return

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  })

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Use GSAP's ticker to drive Lenis updates
  gsap.ticker.add(updateLenis)

  // Disable GSAP lag smoothing to ensure smooth scrolling
  gsap.ticker.lagSmoothing(0)

  initScrollProgress()
})

watch(() => route.path, async () => {
  await nextTick()
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
  }
  ScrollTrigger.refresh()
  initScrollProgress()
})

onUnmounted(() => {
  gsap.ticker.remove(updateLenis)
  scrollTriggerInstance?.kill()
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
})
</script>

<template>
  <main class="relative bg-background min-h-screen" :class="{ 'public-portfolio': showNavbar }">
    <!-- Top Scroll Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-white/5">
      <div ref="progressBar" class="h-full bg-accent origin-left scale-x-0 will-change-transform"></div>
    </div>

    <!-- Film Grain Texture Overlay -->
    <div class="noise-overlay" aria-hidden="true"></div>

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
