<template>
    <section v-if="loading || experience.length > 0" id="experience" ref="sectionEl" class="py-[var(--section-space)] relative overflow-hidden">
        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">

            <!-- Header -->
            <div class="mb-16 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-[0.7fr_1.3fr] md:items-end md:mb-20">
                <span class="section-kicker">Experience / Work history</span>
                <h2 class="font-heading font-bold text-4xl md:text-6xl text-primary leading-tight">Roles and<br>contributions<span class="text-accent">.</span></h2>
            </div>

            <!-- Experience Timeline -->
            <div v-if="loading" class="space-y-8" aria-label="Loading experience">
                <div v-for="item in 2" :key="item"
                    class="animate-pulse rounded-2xl border border-white/5 bg-surface/40 p-8">
                    <div class="mb-4 h-7 w-2/5 rounded bg-white/5"></div>
                    <div class="mb-6 h-5 w-1/4 rounded bg-white/5"></div>
                    <div class="h-4 w-full rounded bg-white/5"></div>
                </div>
            </div>

            <div v-else class="timeline relative ml-1 space-y-14 border-l border-white/10 lg:ml-[32%] lg:space-y-20">

                <article v-for="job in experience" :key="job.id" class="experience-item relative pl-7 lg:pl-12">
                    <!-- Timeline Dot -->
                    <div class="timeline-dot absolute -left-[5px] top-2 z-10 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent">
                    </div>

                    <div class="group relative">

                        <div class="mb-5 lg:absolute lg:right-[calc(100%+5rem)] lg:top-1 lg:mb-0 lg:w-64 lg:text-right">
                            <span class="inline-block whitespace-nowrap font-mono text-xs leading-relaxed uppercase tracking-[0.12em] text-accent">{{ formatDateRange(job.startDate, job.endDate) }}</span>
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
                            <div v-if="job.technologies?.length" class="flex flex-wrap gap-3">
                                <span v-for="tech in job.technologies" :key="tech"
                                    class="px-3 py-1 bg-white/5 rounded-full text-xs text-secondary border border-white/5">
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
      gsap.fromTo('.timeline', { '--timeline-progress': '0%' }, { '--timeline-progress': '100%', ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 65%', scrub: true } })
      items.forEach(item => {
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
.timeline::after { content: ''; position: absolute; inset: 0 auto auto -1px; width: 1px; height: var(--timeline-progress, 0%); background: var(--color-accent); }
</style>
