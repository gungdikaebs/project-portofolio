<template>
    <section id="home" class="hero-section min-h-screen flex items-center pt-20 relative overflow-hidden">
        <!-- Modern Grid Background -->
        <div class="absolute inset-0 -z-10 h-full w-full"
            style="background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px; mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%);">
        </div>

        <!-- Firefly Particles Canvas -->
        <canvas ref="canvas" class="absolute inset-0 z-0 pointer-events-none opacity-60"></canvas>

        <div class="w-full max-w-[1350px] mx-auto px-6 flex items-center min-h-[80vh] relative z-20">
            <div class="flex flex-col gap-8 max-w-5xl">

                <!-- Heading with Premium Masked Reveal -->
                <h1
                    class="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-primary">
                    <div class="overflow-hidden">
                        <span ref="line1" class="block" style="opacity: 0;">Building Digital</span>
                    </div>
                    <!-- Combined Line for Better Flow -->
                    <div class="overflow-hidden flex flex-wrap gap-x-4">
                        <span ref="line2" class="block" style="opacity: 0;">Experiences That</span>
                        <span ref="line3" class="block text-accent" style="opacity: 0;">Matter.</span>
                    </div>
                </h1>

                <!-- Caption -->
                <div class="overflow-hidden">
                    <p ref="caption"
                        class="font-body text-base md:text-lg lg:text-xl text-secondary max-w-xl md:max-w-2xl leading-relaxed translate-y-[100%] opacity-0">
                        Frontend developer focused on modern web architectures,
                        fluid motion, and performance-driven user experiences.
                    </p>
                </div>

                <!-- CTA -->
                <div ref="cta" class="flex flex-wrap items-center gap-4 md:gap-6 mt-4 opacity-0 translate-y-10">
                    <a href="#projects" style="color: black !important;"
                        class="magnetic-btn px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold bg-accent rounded-full hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(106,227,255,0.3)] hover:scale-105 active:scale-95 inline-block">
                        <span class="btn-content inline-block">View Selected Work</span>
                    </a>
                    <a href="#contact"
                        class="magnetic-btn px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium text-primary border border-surface rounded-full hover:border-accent hover:text-accent transition-colors active:scale-95 inline-block">
                        <span class="btn-content inline-block">Contact Me</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div ref="scrollIndicator"
            class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
            <span class="text-xs font-medium text-secondary tracking-widest uppercase">Scroll</span>
            <div class="w-[30px] h-[50px] border-2 border-secondary/50 rounded-full flex justify-center p-2">
                <div class="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { animateTextReveal } from '../animations/textReveal'
import { initMagneticButtons } from '../animations/magnetic'

const line1 = ref(null)
const line2 = ref(null)
const line3 = ref(null)
const caption = ref(null)
const cta = ref(null)
const scrollIndicator = ref(null)
const canvas = ref<HTMLCanvasElement | null>(null)

// Particle System
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Particle[] = []

class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
    fadeSpeed: number

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 2 + 0.5 // Small glowing dots
        this.speedX = Math.random() * 0.5 - 0.25 // Slow drift X
        this.speedY = Math.random() * 0.5 - 0.25 // Slow drift Y
        this.opacity = Math.random() * 0.5 + 0.2
        this.fadeSpeed = Math.random() * 0.005 + 0.002
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity += this.fadeSpeed

        // Pulse effect
        if (this.opacity > 0.8 || this.opacity < 0.2) {
            this.fadeSpeed = -this.fadeSpeed
        }

        // Wrap around screen
        if (this.x > canvasWidth) this.x = 0
        if (this.x < 0) this.x = canvasWidth
        if (this.y > canvasHeight) this.y = 0
        if (this.y < 0) this.y = canvasHeight
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(106, 227, 255, ${this.opacity})` // Accent cyan color
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(106, 227, 255, 0.8)`
        ctx.fill()
    }
}

const initParticles = () => {
    if (!canvas.value) return
    ctx = canvas.value.getContext('2d')
    if (!ctx) return

    const resize = () => {
        if (canvas.value) {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight
        }
    }

    window.addEventListener('resize', resize)
    resize()

    // Create particles
    const particleCount = 40 // Not too crowded
    for (let i = 0; i < particleCount; i++) {
        if (canvas.value) {
            particles.push(new Particle(canvas.value.width, canvas.value.height))
        }
    }

    const animate = () => {
        if (!ctx || !canvas.value) return
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

        particles.forEach(p => {
            p.update(canvas.value!.width, canvas.value!.height)
            p.draw(ctx!)
        })

        animationFrameId = requestAnimationFrame(animate)
    }

    animate()
}

onMounted(() => {
    // 1. Complex Text Reveal (New Implementation)
    // We delay the second line slightly to create a sequence
    if (line1.value) animateTextReveal(line1.value, 0)
    if (line2.value) animateTextReveal(line2.value, 0.2)
    if (line3.value) animateTextReveal(line3.value, 0.4)

    // 2. Rest of the Entrance (Caption, CTA, Scroll)
    // Synchronized to start after the text reveal finishes (approx 1s + stagger)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 }, delay: 1.2 })

    tl.to(caption.value, {
        y: '0%',
        opacity: 1,
        duration: 1
    })
        .to(cta.value, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.6')
        .to(scrollIndicator.value, {
            opacity: 1,
            duration: 1
        }, '-=0.5')

    // 3. Init Magnetic Buttons
    initMagneticButtons('.magnetic-btn')

    // 4. Init Particles
    initParticles()

    // 5. Parallax Scroll Effects
    // Text Parallax (Lines move at different speeds)
    gsap.to(line1.value, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })

    gsap.to(line2.value, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })

    gsap.to(line3.value, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })

    gsap.to(caption.value, {
        yPercent: 50, // Moves down slightly
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: '40% top', // Fades out quicker
            scrub: true
        }
    })

    // Particle Background Parallax
    gsap.to(canvas.value, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })
})

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
    // Remove resize listener not strictly necessary as component is unmounted, but good practice if extracted
})
</script>

<style scoped>
/* Scoped styles removed in favor of utility classes */
</style>
