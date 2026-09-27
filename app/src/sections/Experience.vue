<template>
    <section v-if="loading || experience.length > 0" id="experience" ref="sectionEl" class="py-[var(--section-space)] relative overflow-hidden">
        <div class="section-shell relative z-10">

            <!-- Header -->
            <div class="mb-16 grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:items-end md:mb-20">
                <div class="scroll-divider-wrapper mb-6 h-px w-full overflow-hidden bg-white/5 md:col-span-2">
                    <div class="experience-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-white/20 to-white/5 origin-left"></div>
                </div>
                <span class="section-kicker">04 / Experience</span>
                <div><h2 class="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-primary md:text-6xl">Where I've contributed<span class="text-accent">.</span></h2>
                <p class="mt-5 max-w-2xl text-base leading-relaxed text-secondary">Roles, responsibilities, and the work behind them.</p></div>
            </div>

            <!-- Experience Timeline -->
            <div v-if="loading" class="space-y-8" aria-label="Loading experience">
                <div v-for="item in 2" :key="item"
                    class="animate-pulse border border-white/5 bg-surface/40 p-8">
                    <div class="mb-4 h-7 w-2/5 rounded bg-white/5"></div>
                    <div class="mb-6 h-5 w-1/4 rounded bg-white/5"></div>
                    <div class="h-4 w-full rounded bg-white/5"></div>
                </div>
            </div>

            <div v-else class="timeline relative ml-1 space-y-14 border-l border-white/10 lg:ml-[32%] lg:space-y-20">
                <!-- Active Scroll-driven Progress Line (GPU accelerated) -->
                <div ref="timelineProgressBar"
                    class="timeline-progress-line absolute -left-[1px] top-0 h-full w-[2px] bg-accent origin-top scale-y-0 will-change-transform"
                    aria-hidden="true"></div>

                <article v-for="job in experience" :key="job.id" class="experience-item relative pl-7 lg:pl-12">
                    <!-- Timeline Dot with pulsing ring -->
                    <div class="timeline-dot absolute -left-[5px] top-2 z-10 h-2.5 w-2.5 rounded-full border-2 border-background bg-secondary transition-all duration-300">
                    </div>

                    <div class="group relative">

                        <div class="mb-5 lg:absolute lg:right-[calc(100%+5rem)] lg:top-1 lg:mb-0 lg:w-64 lg:text-right">
                            <span class="job-date inline-block whitespace-nowrap font-mono text-xs leading-relaxed uppercase tracking-[0.14em] text-secondary transition-colors duration-300">{{ formatDateRange(job.startDate, job.endDate) }}</span>
                        </div>

                        <!-- Role & Company -->
                        <div class="max-w-3xl">
                            <h3
                                class="font-heading font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-accent transition-colors">
                                {{ job.role }}
                            </h3>
                            <h4 class="font-body text-lg text-primary mb-6">{{ job.company }}</h4>

                            <ul class="mb-7 space-y-3 text-secondary leading-relaxed">
                                <li v-for="(point, pointIndex) in descriptionPoints(job.description)" :key="pointIndex" class="flex gap-3"><span class="mt-[0.7em] h-px w-3 shrink-0 bg-white/30"></span><span>{{ point }}</span></li>
                            </ul>

                            <!-- Tech Stack Used -->
                            <div v-if="job.technologies?.length" class="flex flex-wrap gap-2.5">
                                <span v-for="tech in job.technologies" :key="tech"
                                    class="border border-white/10 bg-surface px-3 py-1 text-xs text-secondary transition-colors hover:border-accent/40 hover:text-accent">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                    </div>
                </article>

            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useExperience } from '../composables/useExperience'
import { motion, reduceMotion } from '../animations/motion'

gsap.registerPlugin(ScrollTrigger)

const { experience, loading, fetchExperience } = useExperience()
const sectionEl = ref<HTMLElement | null>(null)
const timelineProgressBar = ref<HTMLElement | null>(null)
let context: gsap.Context | null = null

const descriptionPoints = (description: string) => {
    const clean = (description || '').trim()
    if (!clean) return []
    const parts = clean.split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9])/).map((point) => point.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
    if (parts.length <= 4) return parts
    return [...parts.slice(0, 3), parts.slice(3).join(' ')]
}

const formatDateRange = (start: string, end: string | null) => {
    if (!start) return '';
    const formatMonthYear = (date: string) => new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(new Date(date));

    const startLabel = formatMonthYear(start);
    const endLabel = !end || end === 'Present' ? 'Present' : formatMonthYear(end);

    return `${startLabel} — ${endLabel}`;
}

const refreshAnimations = () => {
    ScrollTrigger.refresh()
    if (reduceMotion()) return
    const items = document.querySelectorAll('.experience-item')
    context = gsap.context(() => {
        // Section divider line draw
        const line = sectionEl.value?.querySelector('.experience-scroll-line')
        if (line) {
            gsap.fromTo(line,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.1,
                    ease: motion.ease.emphasis,
                    scrollTrigger: { trigger: sectionEl.value, start: 'top 85%' }
                }
            )
        }

        // Timeline line progress scrub
        if (timelineProgressBar.value) {
            gsap.fromTo(timelineProgressBar.value,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.timeline',
                        start: 'top 75%',
                        end: 'bottom 65%',
                        scrub: 0.3
                    }
                }
            )
        }

        // Individual item & dot triggers on scroll
        items.forEach(item => {
            const dot = item.querySelector('.timeline-dot')
            const date = item.querySelector('.job-date')

            gsap.fromTo(item,
                { x: motion.distance.base, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: motion.duration.slow,
                    ease: motion.ease.enter,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%'
                    }
                }
            )

            if (dot) {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    onEnter: () => {
                        gsap.to(dot, { backgroundColor: '#E2E0D9', scale: 1.2, duration: 0.3 })
                        if (date) gsap.to(date, { color: '#E2E0D9', duration: 0.3 })
                    },
                    onLeaveBack: () => {
                        gsap.to(dot, { backgroundColor: '#9AA0AA', scale: 1, duration: 0.3 })
                        if (date) gsap.to(date, { color: '#9AA0AA', duration: 0.3 })
                    }
                })
            }
        })
    }, sectionEl.value || undefined)
}

onMounted(async () => {
    await fetchExperience()
    nextTick(() => {
        refreshAnimations()
    })
})

onUnmounted(() => context?.revert())
</script>

<style scoped>
/* Timeline styles handled via GSAP */
</style>
