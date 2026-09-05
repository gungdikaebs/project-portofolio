<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import gsap from 'gsap'
import { motion, reduceMotion } from '../animations/motion'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')
const backdrop = ref<HTMLElement | null>(null)
const sidebar = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLButtonElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let observer: IntersectionObserver | null = null
let sectionObserver: MutationObserver | null = null
const onScroll = () => { isScrolled.value = window.scrollY > 20 }

const navLinks = [
    { href: '#home', label: 'Home' }, { href: '/projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' }, { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' }, { href: '#education', label: 'Education' },
    { href: '/blog', label: 'Blog' },
]

const closeMenu = async (restoreFocus = true) => {
    if (!isMobileMenuOpen.value) return
    const finish = () => {
        isMobileMenuOpen.value = false
        document.body.style.overflow = ''
        if (restoreFocus) nextTick(() => menuButton.value?.focus())
    }
    if (reduceMotion()) return finish()
    gsap.timeline({ onComplete: finish })
        .to('.sidebar-link, .sidebar-footer', { opacity: 0, y: 10, duration: motion.duration.fast })
        .to(sidebar.value, { xPercent: 100, duration: motion.duration.base, ease: motion.ease.exit }, '-=0.18')
        .to(backdrop.value, { opacity: 0, duration: motion.duration.fast }, '-=0.32')
}

const openMenu = async () => {
    isMobileMenuOpen.value = true
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
    if (reduceMotion()) return
    gsap.timeline({ defaults: { ease: motion.ease.enter } })
        .fromTo(backdrop.value, { opacity: 0 }, { opacity: 1, duration: motion.duration.fast })
        .fromTo(sidebar.value, { xPercent: 100 }, { xPercent: 0, duration: motion.duration.base }, 0)
        .fromTo('.sidebar-link', { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: motion.stagger.tight, duration: motion.duration.fast }, 0.14)
        .fromTo('.sidebar-footer', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: motion.duration.fast }, 0.24)
}

const toggleMenu = () => isMobileMenuOpen.value ? closeMenu() : openMenu()

const handleKeydown = (event: KeyboardEvent) => {
    if (!isMobileMenuOpen.value) return
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return }
    if (event.key !== 'Tab' || !sidebar.value) return
    const focusable = Array.from(sidebar.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    const first = focusable[0]; const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}

const handleNavClick = async (href: string) => {
    if (isMobileMenuOpen.value) await closeMenu(false)
    if (!href.startsWith('#')) { await router.push(href); return }
    if (route.path !== '/') await router.push('/')
    await nextTick()
    requestAnimationFrame(() => document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' }))
}

const isActive = (href: string) => {
    if (href.startsWith('#')) return route.path === '/' && activeSection.value === href.slice(1)
    const section = href.slice(1)
    return route.path.startsWith(href) || (route.path === '/' && activeSection.value === section)
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', handleKeydown); onScroll()
    observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) activeSection.value = entry.target.id }), { rootMargin: '-25% 0px -65%', threshold: 0 })
    const observeSections = () => document.querySelectorAll('main section[id]').forEach((section) => observer?.observe(section))
    observeSections()
    sectionObserver = new MutationObserver(observeSections)
    sectionObserver.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })
})

watch(() => route.fullPath, () => { if (isMobileMenuOpen.value) closeMenu(false) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', handleKeydown); observer?.disconnect(); sectionObserver?.disconnect(); document.body.style.overflow = '' })
</script>

<template>
    <header class="fixed left-0 top-0 z-50 w-full border-b transition-[height,background-color,border-color] duration-300" :class="isScrolled ? 'h-18 border-white/5 bg-background/90 backdrop-blur-lg' : 'h-22 border-transparent bg-transparent'">
        <div class="section-shell flex h-full items-center justify-between">
            <router-link to="/" class="relative z-[60] font-heading text-xl font-bold tracking-tight text-primary transition-colors hover:text-accent">Gung Dika<span class="text-accent">.</span></router-link>
            <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
                <a v-for="link in navLinks" :key="link.href" :href="link.href" @click.prevent="handleNavClick(link.href)"
                    class="relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors" :class="isActive(link.href) ? 'text-primary' : 'text-secondary hover:text-primary'" :aria-current="isActive(link.href) ? 'page' : undefined">
                    {{ link.label }}<span class="absolute bottom-1.5 left-3 right-3 h-px origin-left bg-accent transition-transform" :class="isActive(link.href) ? 'scale-x-100' : 'scale-x-0'"></span>
                </a>
                <a href="#contact" @click.prevent="handleNavClick('#contact')" class="ml-3 inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-bold text-background transition-colors hover:bg-primary">Contact</a>
            </nav>
            <button ref="menuButton" type="button" @click="toggleMenu" class="relative z-[60] grid min-h-11 min-w-11 place-items-center rounded-full border border-white/10 text-primary lg:hidden" aria-label="Open navigation menu" aria-controls="mobile-menu" :aria-expanded="isMobileMenuOpen">
                <span class="sr-only">Menu</span><span class="flex w-5 flex-col gap-1.5"><span class="h-px w-full bg-current"></span><span class="h-px w-3 self-end bg-current"></span></span>
            </button>
        </div>

        <Teleport to="body">
            <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[70]">
                <div ref="backdrop" @click="closeMenu()" class="absolute inset-0 bg-black/70"></div>
                <div ref="sidebar" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" class="absolute right-0 top-0 flex h-[100svh] w-full max-w-[28rem] flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-background px-6 pb-7 pt-5 sm:px-8">
                    <div class="flex min-h-14 shrink-0 items-center justify-between border-b border-white/10">
                        <span class="section-kicker">Navigation</span>
                        <button ref="closeButton" type="button" @click="closeMenu()" class="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/10 text-2xl text-primary hover:text-accent" aria-label="Close navigation menu">×</button>
                    </div>
                    <nav class="my-auto flex flex-col py-6" aria-label="Mobile navigation">
                        <a v-for="(link, index) in navLinks" :key="link.href" :href="link.href" @click.prevent="handleNavClick(link.href)" class="sidebar-link group flex min-h-13 items-center justify-between border-b border-white/8 py-2 font-heading text-[clamp(1.45rem,7vw,2.1rem)] font-bold transition-colors" :class="isActive(link.href) ? 'text-primary' : 'text-secondary hover:text-primary'">
                            <span>{{ link.label }}</span><span class="font-body text-[0.65rem] font-medium text-secondary">0{{ index + 1 }}</span>
                        </a>
                    </nav>
                    <div class="sidebar-footer shrink-0 border-t border-white/10 pt-5">
                        <a href="#contact" @click.prevent="handleNavClick('#contact')" class="flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 font-bold text-background">Start a conversation</a>
                        <div class="mt-5 flex items-center justify-between text-xs text-secondary"><span>© 2026 Gung Dika</span><span class="flex gap-4"><a href="https://github.com/gungdikaebs" target="_blank" rel="noopener noreferrer" class="hover:text-primary">GitHub</a><a href="https://www.linkedin.com/in/gungdikaebs/" target="_blank" rel="noopener noreferrer" class="hover:text-primary">LinkedIn</a></span></div>
                    </div>
                </div>
            </div>
        </Teleport>
    </header>
</template>
