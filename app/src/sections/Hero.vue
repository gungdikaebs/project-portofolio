<template>
    <section id="home" ref="sectionEl"
        class="hero-section relative flex min-h-[92svh] items-center overflow-hidden pt-24 md:min-h-screen">
        <div class="hero-grid absolute inset-0 -z-10" aria-hidden="true"></div>
        <canvas ref="canvas" class="absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true"></canvas>

        <div class="section-shell relative z-10 py-12 md:py-20">
            <div class="max-w-[74rem]">
                <div ref="availability" class="mb-6 md:mb-8">
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-accent/20 px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-accent">
                        <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
                        Open to developer opportunities
                    </span>
                </div>

                <h1
                    class="text-balance font-heading text-[clamp(2.75rem,11vw,6.9rem)] font-bold leading-[0.98] tracking-[-0.055em] text-primary">
                    <span class="block overflow-hidden"><span ref="line1" class="block">Full-Stack
                            Developer</span></span>
                    <span class="block overflow-hidden"><span ref="line2" class="block text-secondary">from interface
                            to</span></span>
                    <span class="block overflow-hidden"><span ref="line3" class="block">reliable systems<span
                                class="text-accent">.</span></span></span>
                </h1>

                <div ref="supporting"
                    class="mt-7 grid max-w-4xl gap-5 border-l border-white/15 pl-5 md:mt-9 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:pl-7">
                    <p class="max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
                        I build web products across Vue interfaces, NestJS APIs, and PostgreSQL databases—with a focus
                        on code that stays clear and maintainable.
                    </p>
                    <p class="text-xs uppercase tracking-[0.14em] text-secondary">Bali, Indonesia<br><span
                            class="text-primary">Available full-time</span></p>
                </div>

                <div class="mt-8 flex flex-col gap-5 md:mt-10">
                    <div ref="ctaRow" class="flex flex-wrap items-center gap-3 md:gap-4">
                        <a href="#projects"
                            class="magnetic-btn group inline-flex min-h-12 items-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-primary md:px-7"><span
                                class="btn-content inline-flex items-center gap-1.5">
                                <span>Explore My Work</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="transition-transform duration-300 ease-out group-hover:translate-x-1">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </span></a>
                        <a href="https://github.com/gungdikaebs" target="_blank" rel="noopener noreferrer"
                            class="magnetic-btn group inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent md:px-7"><span
                                class="btn-content inline-flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-12">
                                    <path
                                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
                                    </path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                                <span>View GitHub</span>
                            </span></a>
                    </div>

                    <!-- Contact & Social Icons -->
                    <div ref="socialRow" class="flex flex-wrap items-center gap-4 text-secondary">
                        <div class="flex items-center gap-2.5">
                            <a href="https://www.linkedin.com/in/gungdikaebs/" target="_blank" rel="noopener noreferrer"
                                class="magnetic-btn group/icon relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-secondary transition-[border-color,background-color,color] duration-200 hover:border-accent/40 hover:bg-surface hover:text-accent"
                                aria-label="LinkedIn" title="LinkedIn">
                                <span class="btn-content flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-4 w-4 transition-transform duration-200 group-hover/icon:scale-110 group-hover/icon:-translate-y-0.5">
                                        <path
                                            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                        </path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </span>
                                <!-- Tooltip -->
                                <span
                                    class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-[#11141A] px-2 py-0.5 font-mono text-[10px] text-primary opacity-0 shadow-lg transition-all duration-200 group-hover/icon:-translate-y-1 group-hover/icon:opacity-100 z-20">
                                    LinkedIn
                                </span>
                            </a>
                            <a href="https://www.instagram.com/gungdikaebs/" target="_blank" rel="noopener noreferrer"
                                class="magnetic-btn group/icon relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-secondary transition-[border-color,background-color,color] duration-200 hover:border-accent/40 hover:bg-surface hover:text-accent"
                                aria-label="Instagram" title="Instagram">
                                <span class="btn-content flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-4 w-4 transition-transform duration-200 group-hover/icon:scale-110 group-hover/icon:-translate-y-0.5">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </span>
                                <!-- Tooltip -->
                                <span
                                    class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-[#11141A] px-2 py-0.5 font-mono text-[10px] text-primary opacity-0 shadow-lg transition-all duration-200 group-hover/icon:-translate-y-1 group-hover/icon:opacity-100 z-20">
                                    Instagram
                                </span>
                            </a>
                            <a href="mailto:gungdika85@gmail.com"
                                class="magnetic-btn group/icon relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-secondary transition-[border-color,background-color,color] duration-200 hover:border-accent/40 hover:bg-surface hover:text-accent"
                                aria-label="Email" title="Email">
                                <span class="btn-content flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="h-4 w-4 transition-transform duration-200 group-hover/icon:scale-110 group-hover/icon:-translate-y-0.5">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </span>
                                <!-- Tooltip -->
                                <span
                                    class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-[#11141A] px-2 py-0.5 font-mono text-[10px] text-primary opacity-0 shadow-lg transition-all duration-200 group-hover/icon:-translate-y-1 group-hover/icon:opacity-100 z-20">
                                    Email
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div ref="scrollIndicator"
            class="absolute bottom-7 right-[var(--page-gutter)] hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em] text-secondary md:flex"
            aria-hidden="true">
            <span>Scroll to explore</span><span class="block h-px w-12 bg-white/20"><span
                    class="scroll-pulse block h-px w-1/2 bg-accent"></span></span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { initMagneticButtons } from '../animations/magnetic'
import { motion, reduceMotion } from '../animations/motion'

const sectionEl = ref<HTMLElement | null>(null)
const line1 = ref<HTMLElement | null>(null)
const line2 = ref<HTMLElement | null>(null)
const line3 = ref<HTMLElement | null>(null)
const availability = ref<HTMLElement | null>(null)
const supporting = ref<HTMLElement | null>(null)
const ctaRow = ref<HTMLElement | null>(null)
const socialRow = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let context: gsap.Context | null = null
let animationFrameId = 0
let removeResize: (() => void) | null = null

type Particle = { x: number; y: number; radius: number; speed: number; alpha: number }

const initParticles = () => {
    const element = canvas.value
    const ctx = element?.getContext('2d')
    if (!element || !ctx || reduceMotion()) return
    let particles: Particle[] = []
    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2)
        element.width = window.innerWidth * ratio
        element.height = window.innerHeight * ratio
        element.style.width = `${window.innerWidth}px`
        element.style.height = `${window.innerHeight}px`
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        particles = Array.from({ length: window.innerWidth < 768 ? 12 : 24 }, () => ({
            x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
            radius: Math.random() * 1.1 + 0.35, speed: Math.random() * 0.12 + 0.04,
            alpha: Math.random() * 0.35 + 0.1,
        }))
    }
    const render = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        particles.forEach((particle) => {
            particle.y -= particle.speed
            if (particle.y < -4) particle.y = window.innerHeight + 4
            ctx.beginPath(); ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(106, 227, 255, ${particle.alpha})`; ctx.fill()
        })
        animationFrameId = requestAnimationFrame(render)
    }
    resize(); window.addEventListener('resize', resize, { passive: true })
    removeResize = () => window.removeEventListener('resize', resize)
    render()
}

onMounted(() => {
    const lines = [line1.value, line2.value, line3.value]
    if (!reduceMotion()) {
        context = gsap.context(() => {
            const timeline = gsap.timeline({ defaults: { ease: motion.ease.emphasis } })
            timeline.from(lines, { yPercent: 115, duration: motion.duration.slow, stagger: motion.stagger.base, clearProps: 'transform' })
                .from(availability.value, { y: -motion.distance.small, opacity: 0, duration: motion.duration.base, clearProps: 'all' }, 0.12)
                .from(supporting.value, { y: motion.distance.base, opacity: 0, duration: motion.duration.slow, clearProps: 'all' }, 0.38)
                .from(ctaRow.value, { y: motion.distance.small, opacity: 0, duration: motion.duration.base, clearProps: 'all' }, 0.58)
                .from(socialRow.value, { y: 14, opacity: 0, duration: motion.duration.base, clearProps: 'all' }, 0.68)
                .from(scrollIndicator.value, { opacity: 0, duration: motion.duration.base, clearProps: 'all' }, 0.82)
        }, sectionEl.value || undefined)
        initMagneticButtons('.magnetic-btn')
    }
    initParticles()
})

onUnmounted(() => { context?.revert(); cancelAnimationFrame(animationFrameId); removeResize?.() })
</script>

<style scoped>
.hero-grid {
    background-image: linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, black 0%, rgb(0 0 0 / 0.85) 55%, transparent 100%);
}

.scroll-pulse {
    animation: scan 1.8s ease-in-out infinite alternate;
}

@keyframes scan {
    to {
        transform: translateX(100%);
    }
}

@media (max-width: 390px) {
    h1 {
        font-size: clamp(2.55rem, 12vw, 3.05rem);
    }
}
</style>
