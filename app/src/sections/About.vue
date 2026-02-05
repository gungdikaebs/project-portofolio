<template>
    <section id="about" class="min-h-screen flex items-center py-20 relative overflow-hidden">

        <!-- Background Parallax Text (Watermark) -->
        <div ref="watermark"
            class="absolute top-20 left-0 w-full text-[20vw] font-bold font-heading text-white/[0.02] leading-none select-none pointer-events-none z-0 whitespace-nowrap">
            ABOUT ME
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                <!-- Left Column: Creative Visual -->
                <div class="about-image-wrapper relative group perspective-1000">
                    <!-- Main Image Frame with Parallax -->
                    <div ref="imageFrame"
                        class="w-full aspect-[4/5] bg-surface rounded-none overflow-hidden relative shadow-2xl transform transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10"></div>
                        <!-- Placeholder for real image -->
                        <div
                            class="w-full h-full bg-surface border border-white/5 flex items-center justify-center text-secondary relative">
                            <span class="z-20">[Profile Image Placeholder]</span>
                            <!-- Animated Pattern Background -->
                            <div
                                class="absolute inset-0 opacity-20 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]">
                            </div>
                        </div>
                    </div>

                    <!-- Floating Badge -->
                    <div ref="floatingBadge"
                        class="absolute -bottom-10 -right-10 bg-surface/80 backdrop-blur-md border border-white/10 p-6 rounded-none shadow-xl z-20 hidden md:block">
                        <p class="font-heading font-bold text-accent text-xl">Based in</p>
                        <p class="text-white text-lg">Bali, Indonesia 🌴</p>
                    </div>

                    <!-- Decorative Border Frame -->
                    <div
                        class="absolute -top-4 -left-4 w-full h-full border border-accent/30 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
                    </div>
                </div>

                <!-- Right Column: Content -->
                <div class="about-content flex flex-col gap-10">
                    <!-- Section Header with Masked Reveal -->
                    <div>
                        <div class="overflow-hidden">
                            <h2 ref="headingLine1"
                                class="font-heading font-bold text-5xl md:text-7xl text-primary translate-y-full opacity-0">
                                Full-Stack
                            </h2>
                        </div>
                        <div class="overflow-hidden">
                            <h2 ref="headingLine2"
                                class="font-heading font-bold text-5xl md:text-7xl text-white translate-y-full opacity-0">
                                Web Developer<span class="text-accent">.</span>
                            </h2>
                        </div>
                    </div>

                    <!-- Bio Text -->
                    <div class="flex flex-col gap-6 text-secondary text-lg leading-relaxed font-body max-w-xl">
                        <p ref="para1" class="opacity-0 translate-y-4">
                            I'm not just writing code; I'm crafting <span class="text-white">digital experiences</span>.
                            My approach combines technical precision with artistic direction to build
                            interfaces that feel natural and engaging.
                        </p>
                        <p ref="para2" class="opacity-0 translate-y-4">
                            Specializing in the <span class="text-accent">Vue.js ecosystem</span>,
                            I bridge the gap between complex backend logic and silky-smooth frontend animations.
                        </p>
                    </div>

                    <!-- Interactive Stats -->
                    <!-- <div class="grid grid-cols-2 gap-12 mt-4 border-t border-white/5 pt-10">
                        <div class="stat-item opacity-0 translate-y-4">
                            <h3 class="font-heading font-bold text-5xl text-white flex items-baseline">
                                <span ref="stat1">0</span>+
                            </h3>
                            <p class="text-sm text-secondary mt-2 tracking-widest uppercase">Years Experience</p>
                        </div>
                        <div class="stat-item opacity-0 translate-y-4">
                            <h3 class="font-heading font-bold text-5xl text-accent flex items-baseline">
                                <span ref="stat2">0</span>+
                            </h3>
                            <p class="text-sm text-secondary mt-2 tracking-widest uppercase">Projects Done</p>
                        </div>
                    </div> -->

                    <!-- Download CV Button -->
                    <div class="mt-8 reveal-btn opacity-0 translate-y-4 border-white/5 border-t pt-10">
                        <a href="/cv.pdf" download
                            class="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-accent transition-all duration-300 group">
                            <span class="group-hover:-translate-y-0.5 transition-transform">Download CV</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="group-hover:translate-y-0.5 transition-transform">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const watermark = ref(null)
const imageFrame = ref(null)
const floatingBadge = ref(null)
const headingLine1 = ref(null)
const headingLine2 = ref(null)
const para1 = ref(null)
const para2 = ref(null)
const stat1 = ref(null)
const stat2 = ref(null)

onMounted(() => {
    // 1. Parallax Watermark
    gsap.to(watermark.value, {
        xPercent: 20,
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    })

    // 2. Image Reveal & Parallax
    // Combine Entrance with Scroll Parallax
    const imageTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1
        }
    })

    // Entrance
    gsap.fromTo(imageFrame.value,
        { scale: 0.9, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-image-wrapper',
                start: 'top 70%'
            }
        }
    )

    // Parallax Movement (Image moves slower than scroll)
    imageTl.to(imageFrame.value, {
        y: 50,
        ease: 'none'
    })

    // Floating Badge Parallax (Moves faster/independently)
    gsap.fromTo(floatingBadge.value,
        { y: 50, opacity: 0 },
        {
            y: -30, // Moves up as we scroll down
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-image-wrapper',
                start: 'top 70%',
                end: 'bottom top',
                scrub: 1.5
            }
        }
    )

    // 3. Text Staggered Reveal
    const textTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 75%'
        }
    })

    textTl
        .to([headingLine1.value, headingLine2.value], {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: 'power4.out'
        })
        .to([para1.value, para2.value], {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8
        }, '-=0.5')
        .to('.stat-item', {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5
        }, '-=0.5')
        .to('.reveal-btn', {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
        }, '-=0.3')

    // 4. Number Counter Animation
    ScrollTrigger.create({
        trigger: '.stat-item',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(stat1.value, {
                innerText: 3,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power1.inOut'
            })
            gsap.to(stat2.value, {
                innerText: 50,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: 'power1.inOut'
            })
        }
    })
})
</script>
