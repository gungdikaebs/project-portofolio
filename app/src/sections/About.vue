<template>
    <section id="about" class="relative flex items-center overflow-hidden py-[var(--section-space)]">

        <div class="section-shell relative z-10">
            <!-- Scroll Line Divider -->
            <div class="scroll-divider-wrapper mb-12 h-px w-full overflow-hidden bg-white/5 md:mb-16">
                <div class="about-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-white/20 to-white/5 origin-left"></div>
            </div>

            <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">

                <!-- Left Column: Creative Visual -->
                <div class="about-image-wrapper relative order-2 md:order-1">
                    <!-- Main Image Frame with Parallax -->
                    <div ref="imageFrame"
                        class="relative aspect-[4/5] max-h-[42rem] w-full overflow-hidden border border-white/10 bg-surface">
                        <!-- Profile Image or Placeholder -->
                        <img v-if="profile && profile.imageUrl"
                            :src="getFileUrl(profile.imageUrl)" alt="Gung Dika, Full-Stack Developer"
                            class="w-full h-full object-cover grayscale" />
                        <div v-else
                            class="w-full h-full bg-surface border border-white/5 flex items-center justify-center text-secondary relative">
                            <span class="z-20">[Profile Image Placeholder]</span>
                            <!-- Animated Pattern Background -->
                            <div
                                class="absolute inset-0 opacity-20 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]">
                            </div>
                        </div>
                    </div>

                    <p v-if="profile?.location" class="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-secondary">Based in {{ profile.location }}</p>
                </div>

                <!-- Right Column: Content -->
                <div class="about-content order-1 flex flex-col gap-8 md:order-2 md:gap-10">
                    <!-- Section Header with Masked Reveal -->
                    <div>
                        <span class="section-kicker mb-5 block">01 / About</span>
                        <h2 class="font-heading text-5xl font-bold leading-[1.05] tracking-[-0.055em] md:text-7xl">
                            <span class="block overflow-hidden"><span ref="headingLine1" class="block text-secondary">Hello, I'm</span></span>
                            <span class="block overflow-hidden"><span ref="headingLine2" class="block text-primary">Gung Dika<span class="text-accent">.</span></span></span>
                        </h2>
                    </div>

                    <!-- Bio Text -->
                    <div class="flex flex-col gap-6 text-secondary text-lg leading-relaxed font-body max-w-xl">
                        <p ref="para1">
                            <span v-if="loading">Loading bio...</span>
                            <span v-else-if="profile" class="whitespace-pre-line">{{ profile.bio }}</span>
                        </p>
                    </div>

                    <div v-if="profile?.availableForHi"
                        class="inline-flex w-fit items-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-accent">
                        <span class="h-2 w-2 rounded-full bg-accent"></span>
                        Available for developer opportunities
                    </div>

                    <!-- Interactive Stats with animated counter -->
                    <div v-if="profile && (profile.yearsExperience > 0 || profile.projectsDone > 0)" class="mt-4 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                        <div v-if="profile.yearsExperience > 0" class="stat-item">
                            <h3 class="font-heading font-bold text-5xl text-white flex items-baseline">
                                {{ profile.yearsExperience }}+
                            </h3>
                            <p class="text-xs text-secondary mt-2 tracking-widest uppercase font-mono">Years Experience</p>
                        </div>
                        <div v-if="profile.projectsDone > 0" class="stat-item">
                            <h3 class="font-heading font-bold text-5xl text-accent flex items-baseline">
                                {{ profile.projectsDone }}+
                            </h3>
                            <p class="text-xs text-secondary mt-2 tracking-widest uppercase font-mono">Projects Done</p>
                        </div>
                    </div>

                    <!-- Download CV Button -->
                    <div ref="cvBtn" class="mt-8 border-white/5 border-t pt-10">
                        <a v-if="profile && profile.cvUrl" :href="getFileUrl(profile.cvUrl)" target="_blank" rel="noopener noreferrer"
                            class="magnetic-btn inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-accent transition-all duration-300 group">
                            <span class="group-hover:-translate-y-0.5 transition-transform">Download CV</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="group-hover:translate-y-0.5 transition-transform">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </a>
                        <span v-else class="text-gray-500 text-sm">CV available upon request</span>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useProfile } from '../composables/useProfile'
import { motion, reduceMotion } from '../animations/motion'
import { initMagneticButtons } from '../animations/magnetic'

gsap.registerPlugin(ScrollTrigger)

const { profile, loading, fetchProfile } = useProfile()

const getFileUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    return `${baseUrl}${path}`
}

const imageFrame = ref(null)
const headingLine1 = ref(null)
const headingLine2 = ref(null)
const para1 = ref(null)
const cvBtn = ref(null)
let animationContext: gsap.Context | null = null

onMounted(async () => {
    await fetchProfile()
    if (reduceMotion()) return

    animationContext = gsap.context(() => {
        // Top divider line animation
        const line = document.querySelector('.about-scroll-line')
        if (line) {
            gsap.fromTo(line,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.1,
                    ease: motion.ease.emphasis,
                    scrollTrigger: { trigger: '#about', start: 'top 85%' }
                }
            )
        }

        // Image entrance
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

        // Text Staggered Reveal
        const textTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 75%'
            }
        })

        textTl
            .from([headingLine1.value, headingLine2.value], {
                yPercent: 100,
                stagger: 0.15,
                duration: 1,
                ease: 'power4.out'
            })
            .from([para1.value], {
                y: 16,
                opacity: 0,
                duration: 0.8
            }, '-=0.5')
            .from('.stat-item', {
                y: 16,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5
            }, '-=0.5')
            .from(cvBtn.value, {
                y: 16,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, '-=0.3')

    }, '#about')

    initMagneticButtons('.magnetic-btn')
})

onUnmounted(() => animationContext?.revert())
</script>
