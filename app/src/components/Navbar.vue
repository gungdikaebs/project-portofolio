<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const backdrop = ref(null)
const sidebar = ref(null)

const toggleMenu = async () => {
    if (!isMobileMenuOpen.value) {
        // OPEN ANIMATION
        isMobileMenuOpen.value = true
        await nextTick() // Wait for DOM to exist

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.to(backdrop.value, { opacity: 1, duration: 0.5 })
            .to(sidebar.value, { x: '0%', duration: 0.5, ease: 'power4.out' }, '-=0.5')
            .to('.sidebar-link', {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.4
            }, '-=0.2')
            .to('.sidebar-footer', {
                y: 0,
                opacity: 1,
                duration: 0.4
            }, '-=0.2')

    } else {
        // CLOSE ANIMATION
        const tl = gsap.timeline({
            defaults: { ease: 'power3.in' },
            onComplete: () => { isMobileMenuOpen.value = false }
        })

        tl.to('.sidebar-link, .sidebar-footer', { opacity: 0, y: 10, duration: 0.3 })
            .to(sidebar.value, { x: '100%', duration: 0.4 }, '-=0.2')
            .to(backdrop.value, { opacity: 0, duration: 0.4 }, '-=0.3')
    }
}

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#project', label: 'Project' },
    { href: '#skills', label: 'Skills' },
]

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300" :class="[
        isScrolled ? 'bg-background/70 backdrop-blur-xl border-b border-surface/50 h-20' : 'bg-transparent h-24'
    ]">
        <div class="max-w-[1350px] mx-auto px-6 h-full flex items-center justify-between">

            <!-- Logo -->
            <a href="#"
                class="font-heading font-bold text-2xl tracking-tight text-primary hover:text-accent transition-colors z-[60] relative">
                Gung Dika<span class="text-accent">.</span>
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-10">
                <a v-for="link in navLinks" :key="link.href" :href="link.href"
                    class="group relative text-sm font-medium text-secondary hover:text-primary transition-colors py-2">
                    {{ link.label }}
                    <span
                        class="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </a>

                <!-- CTA Button -->
                <a href="#contact" style="color: black !important;"
                    class="px-5 py-2.5 text-sm font-bold bg-accent rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(106,227,255,0.3)]">
                    Let's Talk
                </a>
            </nav>

            <!-- Mobile Toggle -->
            <button @click="toggleMenu" class="md:hidden text-primary p-2 focus:outline-none z-[60] relative"
                aria-label="Toggle Menu">
                <div class="w-8 h-8 flex flex-col justify-center gap-[6px]">
                    <span class="w-full h-[2px] bg-current transition-all duration-300 origin-center"
                        :class="{ 'rotate-45 translate-y-[8px]': isMobileMenuOpen }"></span>
                    <span class="w-full h-[2px] bg-current transition-all duration-300"
                        :class="{ 'opacity-0': isMobileMenuOpen }"></span>
                    <span class="w-full h-[2px] bg-current transition-all duration-300 origin-center"
                        :class="{ '-rotate-45 -translate-y-[8px]': isMobileMenuOpen }"></span>
                </div>
            </button>
        </div>

        <!-- Mobile Menu Overlay (Sidebar) -->
        <Teleport to="body">
            <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[55]">
                <!-- Backdrop -->
                <div ref="backdrop" @click="toggleMenu" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0">
                </div>

                <!-- Sidebar -->
                <div ref="sidebar"
                    class="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#0B0D10] border-l border-white/5 shadow-2xl flex flex-col justify-between p-8 translate-x-full">

                    <!-- Top Section: Close Button -->
                    <div class="flex justify-end h-20 items-center">
                        <button @click="toggleMenu"
                            class="text-primary hover:text-accent transition-colors p-2 focus:outline-none group"
                            aria-label="Close Menu">
                            <!-- Animated X Icon -->
                            <div class="relative w-8 h-8 flex items-center justify-center">
                                <span
                                    class="absolute w-full h-[2px] bg-current rotate-45 group-hover:rotate-[135deg] transition-all duration-300"></span>
                                <span
                                    class="absolute w-full h-[2px] bg-current -rotate-45 group-hover:rotate-[45deg] transition-all duration-300"></span>
                            </div>
                        </button>
                    </div>

                    <!-- Navigation Links -->
                    <nav class="flex flex-col gap-6">
                        <a v-for="(link, index) in navLinks" :key="link.href" :href="link.href" @click="toggleMenu"
                            class="sidebar-link text-4xl font-heading font-bold text-secondary hover:text-primary transition-colors opacity-0 translate-y-4">
                            {{ link.label }}
                        </a>
                    </nav>

                    <!-- Bottom Section -->
                    <div class="flex flex-col gap-6 sidebar-footer opacity-0 translate-y-4">
                        <a href="#contact" @click="toggleMenu" style="color: black !important;"
                            class="w-full py-4 text-center text-base font-bold bg-accent rounded-full hover:bg-primary transition-colors shadow-lg">
                            Let's Talk
                        </a>

                        <div
                            class="flex justify-between items-center text-sm text-secondary border-t border-white/10 pt-6">
                            <span>© 2026 Gung Dika.</span>
                            <div class="flex gap-4">
                                <span class="text-primary font-bold cursor-pointer">ID</span>
                                <span class="hover:text-primary cursor-pointer transition-colors">EN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </header>
</template>

<style scoped>
/* No extra CSS needed, everything handled by Tailwind! */
</style>
