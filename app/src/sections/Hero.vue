<template>
    <section class="hero-section min-h-screen flex items-center pt-20 relative overflow-hidden">
        <!-- Modern Grid Background -->
        <div class="absolute inset-0 -z-10 h-full w-full"
            style="background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 40px 40px; mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%);">
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 flex items-center min-h-[80vh] relative z-20">
            <div class="flex flex-col gap-8 max-w-5xl">

                <!-- Heading with Premium Masked Reveal -->
                <h1
                    class="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-primary">
                    <div class="overflow-hidden">
                        <span ref="line1" class="block translate-y-[120%] opacity-0">Building Digital</span>
                    </div>
                    <!-- Combined Line for Better Flow -->
                    <div class="overflow-hidden">
                        <span ref="line2" class="block translate-y-[120%] opacity-0">
                            Experiences That <span class="text-accent">Matter.</span>
                        </span>
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
                    <a href="#works" style="color: black !important;"
                        class="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold bg-accent rounded-full hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(106,227,255,0.3)] hover:scale-105 active:scale-95">
                        View Selected Work
                    </a>
                    <a href="#contact"
                        class="px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium text-primary border border-surface rounded-full hover:border-accent hover:text-accent transition-colors active:scale-95">
                        Contact Me
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
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const line1 = ref(null)
const line2 = ref(null)
const caption = ref(null)
const cta = ref(null)
const scrollIndicator = ref(null)

onMounted(() => {
    // 1. Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

    tl.to([line1.value, line2.value], {
        y: '0%',
        opacity: 1,
        stagger: 0.2,
        duration: 1.2
    })
        .to(caption.value, {
            y: '0%',
            opacity: 1,
            duration: 1
        }, '-=0.8')
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
})
</script>

<style scoped>
/* Scoped styles removed in favor of utility classes */
</style>
