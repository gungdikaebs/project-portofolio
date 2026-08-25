<template>
    <section v-if="loading || experience.length > 0" id="experience" class="py-32 relative overflow-hidden">
        <!-- Background Blobs -->
        <div
            class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none">
        </div>
        <div
            class="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none">
        </div>

        <!-- Background Watermark -->
        <div class="absolute bottom-[5%] left-[-5%] select-none pointer-events-none z-0">
            <span
                class="text-[12rem] md:text-[15rem] font-heading font-bold text-white/[0.02] leading-none">HISTORY</span>
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">

            <!-- Header -->
            <div class="mb-20">
                <h2 class="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 reveal-text">
                    Experience & <span class="text-accent">Contributions.</span>
                </h2>
                <p class="mt-5 max-w-2xl text-lg leading-relaxed text-secondary">
                    Roles and collaborations where I translated product needs into maintainable software.
                </p>
                <div class="h-1 w-20 bg-accent/50 rounded-full mt-6"></div>
            </div>

            <!-- Experience Timeline -->
            <div v-if="loading" class="space-y-8" aria-label="Loading experience">
                <div v-for="item in 2" :key="item" class="animate-pulse rounded-2xl border border-white/5 bg-surface/40 p-8">
                    <div class="mb-4 h-7 w-2/5 rounded bg-white/5"></div>
                    <div class="mb-6 h-5 w-1/4 rounded bg-white/5"></div>
                    <div class="h-4 w-full rounded bg-white/5"></div>
                </div>
            </div>

            <div v-else class="relative border-l border-white/10 ml-4 md:ml-10 space-y-16">

                <div v-for="job in experience" :key="job.id" class="experience-item relative pl-8 md:pl-16">
                    <!-- Timeline Dot -->
                    <div
                        class="absolute -left-[5px] top-3 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_10px_rgba(106,227,255,0.5)] z-10">
                    </div>

                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 group">

                        <!-- Role & Company -->
                        <div class="max-w-2xl">
                            <h3
                                class="font-heading font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-accent transition-colors">
                                {{ job.role }}
                            </h3>
                            <h4 class="font-body text-xl text-primary mb-6">{{ job.company }}</h4>

                            <p class="text-secondary text-lg leading-relaxed mb-6 whitespace-pre-line">
                                {{ job.description }}
                            </p>

                            <!-- Tech Stack Used -->
                            <div v-if="job.technologies?.length" class="flex flex-wrap gap-3">
                                <span v-for="tech in job.technologies" :key="tech"
                                    class="px-3 py-1 bg-white/5 rounded-full text-xs text-secondary border border-white/5">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- Date -->
                        <div class="flex-shrink-0">
                            <span
                                class="font-mono text-accent text-sm md:text-base border border-accent/20 px-4 py-2 rounded-full bg-accent/5">
                                {{ formatDateRange(job.startDate, job.endDate) }}
                            </span>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useExperience } from '../composables/useExperience'

gsap.registerPlugin(ScrollTrigger)

const { experience, loading, fetchExperience } = useExperience()

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
    const items = document.querySelectorAll('.experience-item')
    items.forEach(item => {
        gsap.fromTo(item,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                }
            }
        )
    })
}

onMounted(async () => {
    await fetchExperience()
    nextTick(() => {
        refreshAnimations()
    })
})
</script>
