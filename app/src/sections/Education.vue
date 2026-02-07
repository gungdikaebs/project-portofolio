<template>
    <section id="education" class="py-20 relative overflow-hidden">
        <!-- Background Shapes -->
        <div class="absolute top-[10%] left-[-5%] opacity-[0.03] pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" stroke="white" stroke-width="0.5">
                <circle cx="50" cy="50" r="40" />
            </svg>
        </div>
        <div class="absolute bottom-[20%] right-[-5%] opacity-5 pointer-events-none rotate-45">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="white" stroke-width="0.5">
                <rect x="20" y="20" width="60" height="60" />
            </svg>
        </div>

        <!-- Background Watermark -->
        <div class="absolute top-[5%] right-[0] select-none pointer-events-none z-0">
            <span
                class="text-[10rem] md:text-[12rem] font-heading font-bold text-white/[0.02] leading-none">LEARNING</span>
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">

            <!-- Header -->
            <div class="mb-16">
                <h2 class="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 reveal-text">
                    Education & <span class="text-accent">Certifications.</span>
                </h2>
                <div class="h-1 w-20 bg-accent/50 rounded-full mt-6"></div>
            </div>

            <!-- Education Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div v-for="(edu, index) in education" :key="edu.id"
                    class="edu-card bg-surface border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">

                    <!-- Decorative Background -->
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="text-accent">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                    </div>

                    <div class="relative z-10">
                        <span
                            class="font-mono text-accent text-sm border border-accent/20 px-3 py-1 bg-accent/5 inline-block mb-4 rounded-full">
                            {{ formatYear(edu.startDate) }} - {{ edu.endDate ? formatYear(edu.endDate) : 'Present' }}
                        </span>

                        <h3 class="font-heading font-bold text-2xl text-white mb-2">
                            {{ edu.degree }}
                        </h3>

                        <h4 class="text-lg text-primary mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {{ edu.institution }}
                        </h4>

                        <p class="text-secondary leading-relaxed whitespace-pre-line">
                            {{ edu.description }}
                        </p>
                    </div>
                </div>

            </div>

            <!-- Certifications Section (Horizontal Scroll) -->
            <div v-if="certifications.length > 0" ref="certContainer"
                class="mt-20 w-full relative h-screen flex flex-col justify-center overflow-hidden">
                <div class="container mx-auto px-6 mb-10">
                    <div class="flex items-center gap-4">
                        <h3 class="font-heading font-bold text-3xl text-primary">Certifications</h3>
                        <div class="h-[1px] flex-1 bg-white/10"></div>
                    </div>
                    <!-- Progress Bar -->
                    <div class="w-full h-1 bg-white/5 mt-4 rounded-full overflow-hidden">
                        <div ref="progressBar" class="h-full bg-accent origin-left scale-x-0 w-full"></div>
                    </div>
                </div>

                <div ref="certTrack" class="flex gap-8 px-6 w-max items-center h-[400px]">
                    <div v-for="(cert, index) in certifications" :key="cert.id"
                        class="cert-card bg-surface border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-colors duration-300 flex flex-col justify-between w-[400px] h-[350px] shrink-0">

                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <span
                                    class="font-mono text-secondary text-sm border border-white/10 px-3 py-1 rounded-full bg-white/5">
                                    {{ formatYear(cert.date) }}
                                </span>
                                <!-- Optional Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="text-secondary group-hover:text-accent transition-colors">
                                    <path d="M12 15l-2 5l9-9l-9 9l2-5"></path>
                                </svg>
                            </div>

                            <h4 class="font-heading font-bold text-xl text-white mb-1">
                                {{ cert.name }}
                            </h4>
                            <p class="text-accent text-sm mb-4 font-mono">{{ cert.issuer }}</p>

                            <p class="text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                {{ cert.description }}
                            </p>
                        </div>

                        <!-- Optional Credential Attachment -->
                        <div v-if="cert.credentialUrl" class="border-t border-white/5 pt-4">
                            <a :href="getCredentialUrl(cert.credentialUrl)" target="_blank"
                                class="inline-flex items-center gap-2 text-sm text-white hover:text-accent transition-colors group/link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z">
                                    </path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                View Certificate
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick, watch } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEducation } from '../composables/useEducation'

gsap.registerPlugin(ScrollTrigger)

const { education, certifications, loading, fetchData } = useEducation()

const certContainer = ref<HTMLElement | null>(null)
const certTrack = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
let scrollTween: gsap.core.Timeline | null = null

const formatYear = (dateString: string) => {
    if (!dateString) return 'Present';
    if (dateString === 'Present') return 'Present';
    return new Date(dateString).getFullYear();
}

const getCredentialUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    // If it's a file path from backend upload
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${url}`;
}

const refreshAnimations = () => {
    ScrollTrigger.refresh()

    // 1. Vertical Education Animation
    gsap.from('.edu-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#education',
            start: 'top 80%'
        }
    })

    // 2. Horizontal Scroll for Certifications
    if (certContainer.value && certTrack.value && certifications.value.length > 0) {

        // Kill old scroll trigger if exists to prevent duplication on re-render
        if (scrollTween) {
            scrollTween.kill()
            // access internal scrollTrigger instance if needed to kill it specifically, though killing tween usually enough if it owns the trigger
        }

        const getScrollAmount = () => {
            if (!certTrack.value) return 0
            return -(certTrack.value.scrollWidth - window.innerWidth + window.innerWidth * 0.2 + 300)
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: certContainer.value,
                start: 'top top',
                end: () => `+=${Math.abs(getScrollAmount())}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        })

        tl.to(certTrack.value, {
            x: () => getScrollAmount(),
            ease: 'none',
        })

        if (progressBar.value) {
            tl.to(progressBar.value, {
                scaleX: 1,
                ease: 'none'
            }, 0)
        }

        scrollTween = tl
    }
}

onMounted(async () => {
    await fetchData()
    nextTick(() => {
        refreshAnimations()
    })
})

onUnmounted(() => {
    if (scrollTween) scrollTween.kill()
    ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>
