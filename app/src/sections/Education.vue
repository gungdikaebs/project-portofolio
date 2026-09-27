<template>
    <section id="education" ref="sectionEl" class="py-[var(--section-space)] relative overflow-hidden">
        <div class="section-shell relative z-10">

            <!-- Scroll Line Divider -->
            <div class="scroll-divider-wrapper mb-16 h-px w-full overflow-hidden bg-white/5 md:mb-20">
                <div class="education-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-white/20 to-white/5 origin-left"></div>
            </div>

            <!-- Header -->
            <div class="mb-16">
                <span class="section-kicker mb-5 block">06 / Education</span>
                <h2 class="font-heading font-bold text-4xl md:text-6xl text-primary mb-4 reveal-text">
                    Learning, in practice<span class="text-accent">.</span>
                </h2>
                <p class="max-w-2xl text-base leading-relaxed text-secondary">Formal learning and credentials that support the work I do.</p>
            </div>

            <!-- Education Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div v-for="edu in education" :key="edu.id"
                    class="edu-card spotlight-card bg-surface border border-white/10 p-8 relative overflow-hidden group hover:border-accent/30 transition-colors duration-300"
                    @mousemove="handleCardMouseMove">

                    <div class="relative z-10">
                        <span
                            class="mb-5 inline-block font-mono text-xs uppercase tracking-[0.12em] text-secondary">
                            {{ edu.startYear }} - {{ edu.endYear ? edu.endYear : 'Present' }}
                        </span>

                        <h3 class="font-heading font-bold text-2xl text-white mb-2">
                            {{ normalizeDegree(edu.degree) }}
                        </h3>

                        <h4 class="text-sm font-mono text-secondary mb-4 flex items-center gap-2">
                            <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
                            {{ edu.institution }}
                        </h4>

                        <p class="text-secondary text-sm leading-relaxed whitespace-pre-line">
                            {{ edu.description }}
                        </p>
                    </div>
                </div>

            </div>

            <!-- Certifications Section -->
            <div v-if="certifications.length > 0" class="mt-20 w-full relative">
                <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h3 class="font-heading font-bold text-3xl text-primary">Certifications</h3>
                        <p class="mt-3 max-w-2xl text-secondary">
                            Certificates and courses recorded in this portfolio.
                        </p>
                    </div>
                    <span class="font-mono text-xs uppercase tracking-[0.14em] text-secondary">Newest first</span>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <article v-for="cert in visibleCertifications" :key="cert.id"
                        class="cert-card bg-surface border border-white/10 p-7 relative overflow-hidden group hover:border-white/35 transition-colors duration-300 flex min-h-[300px] flex-col justify-between">

                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <span
                                    class="font-mono text-secondary text-sm">
                                    {{ cert.year }}
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
                            <a :href="getCredentialUrl(cert.credentialUrl)" target="_blank" rel="noopener noreferrer"
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
                    </article>
                </div>

                <div v-if="certifications.length > initialCertificationLimit" class="mt-10 flex justify-center">
                    <button type="button" @click="toggleCertifications" :aria-expanded="showAllCertifications"
                        class="inline-flex items-center gap-3 rounded-full border border-white/10 bg-surface px-7 py-3.5 font-heading font-bold text-white transition-all hover:border-accent/40 hover:text-accent">
                        {{ showAllCertifications ? 'Show Fewer' : `Show All ${certifications.length} Certificates` }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="transition-transform" :class="showAllCertifications ? 'rotate-180' : ''">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick, computed } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEducation } from '../composables/useEducation'

gsap.registerPlugin(ScrollTrigger)

const { education, certifications, fetchData } = useEducation()

const sectionEl = ref<HTMLElement | null>(null)
const showAllCertifications = ref(false)
const initialCertificationLimit = 6
let animationContext: gsap.Context | null = null

const visibleCertifications = computed(() => showAllCertifications.value
    ? certifications.value
    : certifications.value.slice(0, initialCertificationLimit))

const normalizeDegree = (degree: string) => degree.replace(/System Information/gi, 'Information Systems')

// Removed unused formatYear

const getCredentialUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    // If it's a file path from backend upload
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${url}`;
}

const handleCardMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

const refreshAnimations = () => {
    ScrollTrigger.refresh()

    animationContext?.revert()
    animationContext = gsap.context(() => {
        // Line divider animation
        const line = sectionEl.value?.querySelector('.education-scroll-line')
        if (line) {
            gsap.fromTo(line,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: sectionEl.value, start: 'top 85%' }
                }
            )
        }

        gsap.from('.edu-card', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.edu-card',
                start: 'top 85%'
            }
        })

        gsap.from('.cert-card', {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cert-card',
                start: 'top 88%'
            }
        })
    }, sectionEl.value || undefined)
}

const toggleCertifications = async () => {
    showAllCertifications.value = !showAllCertifications.value
    await nextTick()
    refreshAnimations()
}

onMounted(async () => {
    await fetchData()
    nextTick(() => {
        refreshAnimations()
    })
})

onUnmounted(() => {
    animationContext?.revert()
})
</script>
