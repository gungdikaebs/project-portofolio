<template>
    <section id="skills" ref="sectionEl" class="relative overflow-hidden border-y border-white/5 bg-surface/30 py-[var(--section-space)]">
        <div class="section-shell relative z-10">
            <div class="mb-14 grid gap-6 md:mb-18 md:grid-cols-2 md:items-end">
                <div><span class="section-kicker">Capabilities / Toolkit</span><h2 class="mt-4 font-heading text-4xl font-bold text-primary md:text-6xl">Tools I work<br>with<span class="text-accent">.</span></h2></div>
                <p class="max-w-lg text-base leading-relaxed text-secondary md:justify-self-end">Languages, frameworks, and tools I use to take web products from interface to deployment.</p>
            </div>

            <div v-if="loading" class="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading skills"><div v-for="item in 4" :key="item" class="h-64 animate-pulse bg-surface"></div></div>
            <div v-else-if="displayCategories.length" class="skills-grid grid gap-px overflow-hidden border border-white/10 bg-white/10">
                <article v-for="(category, index) in displayCategories" :key="category.id" class="skill-group min-h-64 bg-background p-6 md:p-7">
                    <div class="mb-8 flex items-baseline justify-between"><h3 class="font-heading text-lg font-bold text-primary">{{ category.name }}</h3><span class="font-mono text-[0.65rem] text-secondary">{{ categoryNumber(index) }}</span></div>
                    <ul class="space-y-3.5">
                        <li v-for="skill in category.skills" :key="skill.id || skill.name" class="group flex min-h-7 items-center gap-3 text-sm text-secondary transition-colors hover:text-primary">
                            <span class="grid h-5 w-5 shrink-0 place-items-center text-secondary transition-colors group-hover:text-accent">
                                <span v-if="skill.svgContent || isSvg(skill.icon)" v-html="skill.svgContent || skill.icon" class="flex h-full w-full items-center justify-center [&>svg]:h-full [&>svg]:w-full"></span>
                                <span v-else class="h-1 w-1 rounded-full bg-current"></span>
                            </span>
                            {{ normalizeName(skill.name) }}
                        </li>
                    </ul>
                </article>
            </div>
            <p v-else class="border-y border-white/10 py-12 text-secondary">Skills will appear here after they are added from the admin.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSkills } from '../composables/useSkills'
import { motion, reduceMotion } from '../animations/motion'

gsap.registerPlugin(ScrollTrigger)
const sectionEl = ref<HTMLElement | null>(null)
const { categories, loading, fetchSkills } = useSkills()
let context: gsap.Context | null = null
const normalizeName = (name: string) => ({ 'Vue JS': 'Vue.js', 'Nest JS': 'NestJS', Github: 'GitHub' } as Record<string, string>)[name] || name
const isSvg = (icon: string) => typeof icon === 'string' && icon.toLowerCase().includes('<svg')
const displayCategories = computed(() => categories.value.map((category: any) => ({
    ...category,
    skills: [...(category.skills || [])].sort((a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0)),
})))
const categoryNumber = (index: number) => index < 9 ? `0${index + 1}` : String(index + 1)

onMounted(async () => {
    await fetchSkills(); await nextTick()
    if (!reduceMotion()) context = gsap.context(() => {
        gsap.from('.skill-group', { clipPath: 'inset(0 100% 0 0)', duration: motion.duration.slow, stagger: motion.stagger.base, ease: motion.ease.emphasis, scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' } })
    }, sectionEl.value || undefined)
    ScrollTrigger.refresh()
})
onUnmounted(() => context?.revert())
</script>

<style scoped>
.skills-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); }
</style>
