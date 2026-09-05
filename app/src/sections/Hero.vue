<template>
    <section id="home" ref="sectionEl" class="hero-section relative flex min-h-[92svh] items-center overflow-hidden pt-24 md:min-h-screen">
        <div class="hero-grid absolute inset-0 -z-10" aria-hidden="true"></div>
        <canvas ref="canvas" class="absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true"></canvas>

        <div class="section-shell relative z-10 py-12 md:py-20">
            <div class="max-w-[74rem]">
                <div ref="availability" class="mb-6 md:mb-8">
                    <span class="inline-flex items-center gap-2 rounded-full border border-accent/20 px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.15em] text-accent">
                        <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
                        Open to developer opportunities
                    </span>
                </div>

                <h1 class="text-balance font-heading text-[clamp(2.75rem,11vw,6.9rem)] font-bold leading-[0.98] tracking-[-0.055em] text-primary">
                    <span class="block overflow-hidden"><span ref="line1" class="block">Full-Stack Developer</span></span>
                    <span class="block overflow-hidden"><span ref="line2" class="block text-secondary">from interface to</span></span>
                    <span class="block overflow-hidden"><span ref="line3" class="block">reliable systems<span class="text-accent">.</span></span></span>
                </h1>

                <div ref="supporting" class="mt-7 grid max-w-4xl gap-5 border-l border-white/15 pl-5 md:mt-9 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:pl-7">
                    <p class="max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
                        I build web products across Vue interfaces, NestJS APIs, and PostgreSQL databases—with a focus on code that stays clear and maintainable.
                    </p>
                    <p class="text-xs uppercase tracking-[0.14em] text-secondary">Bali, Indonesia<br><span class="text-primary">Available full-time</span></p>
                </div>

                <div ref="cta" class="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
                    <a href="#projects" class="magnetic-btn inline-flex min-h-12 items-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-primary md:px-7"><span class="btn-content">Explore My Work</span></a>
                    <a href="https://github.com/gungdikaebs" target="_blank" rel="noopener noreferrer" class="magnetic-btn inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent md:px-7"><span class="btn-content">View GitHub</span></a>
                    <a href="#contact" class="ml-1 inline-flex min-h-11 items-center text-sm font-medium text-secondary underline decoration-white/20 underline-offset-8 transition-colors hover:text-primary">Contact me</a>
                </div>
            </div>
        </div>

        <div ref="scrollIndicator" class="absolute bottom-7 right-[var(--page-gutter)] hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em] text-secondary md:flex" aria-hidden="true">
            <span>Scroll to explore</span><span class="block h-px w-12 bg-white/20"><span class="scroll-pulse block h-px w-1/2 bg-accent"></span></span>
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
const cta = ref<HTMLElement | null>(null)
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
            timeline.from(lines, { yPercent: 115, duration: motion.duration.slow, stagger: motion.stagger.base })
                .from(availability.value, { y: -motion.distance.small, opacity: 0, duration: motion.duration.base }, 0.12)
                .from(supporting.value, { y: motion.distance.base, opacity: 0, duration: motion.duration.slow }, 0.38)
                .from(cta.value, { y: motion.distance.small, opacity: 0, duration: motion.duration.base }, 0.58)
                .from(scrollIndicator.value, { opacity: 0, duration: motion.duration.base }, 0.72)
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
.scroll-pulse { animation: scan 1.8s ease-in-out infinite alternate; }
@keyframes scan { to { transform: translateX(100%); } }
@media (max-width: 390px) { h1 { font-size: clamp(2.55rem, 12vw, 3.05rem); } }
</style>
