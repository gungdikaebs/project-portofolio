<template>
    <section id="skills" ref="sectionEl" class="relative overflow-hidden bg-surface/20 py-[var(--section-space)]">
        <div class="section-shell relative z-10">
            <!-- Scroll Line Divider -->
            <div class="scroll-divider-wrapper mb-12 h-px w-full overflow-hidden bg-primary/5 md:mb-16">
                <div class="skills-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-primary/20 to-primary/5 origin-left"></div>
            </div>

            <div class="skills-header mb-14 grid gap-6 md:mb-18 md:grid-cols-2 md:items-end">
                <div>
                    <span class="section-kicker">05 / Toolkit</span>
                    <h2 class="mt-4 font-heading text-4xl font-bold text-primary md:text-6xl">Tools behind<br>the work<span class="text-accent">.</span></h2>
                </div>
                <p class="max-w-lg text-base leading-relaxed text-secondary md:justify-self-end">Vue, Laravel, and MySQL are my core stack. I use Docker to keep development repeatable and choose other tools to fit the problem.</p>
            </div>

            <div v-if="loading" class="space-y-5" aria-busy="true">
                <EditorialLoader label="toolkit" variant="section" message="Organising the tools behind the work." />
                <div class="grid gap-px bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="item in 4" :key="item" class="editorial-skeleton h-64 bg-surface" :style="{ '--editorial-delay': `${item * 0.12}s` }"></div>
                </div>
            </div>
            <div v-else-if="displayCategories.length" class="skills-grid grid gap-px overflow-hidden border border-primary/10 bg-primary/10">
                <article v-for="(category, index) in displayCategories" :key="category.id"
                    class="skill-group spotlight-card min-h-64 bg-background p-6 transition-colors duration-300 hover:bg-surface/50 md:p-8"
                    @mousemove="handleCardMouseMove">
                    <div class="mb-8 flex items-baseline justify-between">
                        <h3 class="font-heading text-lg font-bold text-primary">{{ category.name }}</h3>
                        <span class="font-mono text-[0.65rem] tracking-[0.14em] text-accent">0{{ index + 1 }}</span>
                    </div>
                    <ul class="space-y-4">
                        <li v-for="skill in category.skills" :key="skill.id || skill.name" class="group/item flex min-h-7 items-center gap-3 text-sm text-secondary transition-colors hover:text-primary">
                            <span class="grid h-6 w-6 shrink-0 place-items-center border border-primary/10 bg-surface/80 text-secondary transition-colors duration-200 group-hover/item:border-accent/40 group-hover/item:text-accent">
                                <span v-if="skill.svgContent || isSvg(skill.icon)" v-html="skill.svgContent || skill.icon" class="flex h-3.5 w-3.5 items-center justify-center [&>svg]:h-full [&>svg]:w-full"></span>
                                <span v-else class="h-1.5 w-1.5 rounded-full bg-current"></span>
                            </span>
                            <span class="transition-transform duration-200 group-hover/item:translate-x-1">{{ normalizeName(skill.name) }}</span>
                        </li>
                    </ul>
                </article>
            </div>
            <p v-else class="border-y border-primary/10 py-12 text-secondary">Skills will appear here after they are added from the admin.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSkills } from '../composables/useSkills'
import { motion, reduceMotion } from '../animations/motion'
import EditorialLoader from '../components/EditorialLoader.vue'

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

const handleCardMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

onMounted(async () => {
    await fetchSkills(); await nextTick()
    if (!reduceMotion()) context = gsap.context(() => {
        // Line divider animation
        const line = sectionEl.value?.querySelector('.skills-scroll-line')
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

        gsap.from('.skills-header > *', {
            y: motion.distance.base,
            opacity: 0,
            duration: motion.duration.slow,
            stagger: motion.stagger.base,
            ease: motion.ease.enter,
            scrollTrigger: { trigger: '.skills-header', start: 'top 82%' }
        })

        gsap.from('.skill-group', {
            clipPath: 'inset(0 100% 0 0)',
            duration: motion.duration.slow,
            stagger: motion.stagger.base,
            ease: motion.ease.emphasis,
            scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' }
        })
    }, sectionEl.value || undefined)
    ScrollTrigger.refresh()
})
onUnmounted(() => context?.revert())
</script>

<style scoped>
.skills-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); }
</style>
