<template>
    <section id="projects" ref="sectionEl" class="relative overflow-hidden py-[var(--section-space)]">
        <div class="section-shell relative z-10">
            <header class="projects-heading mb-16 grid gap-7 border-t border-white/10 pt-6 md:mb-24 md:grid-cols-[0.7fr_1.3fr] md:items-end">
                <div><span class="section-kicker">Selected work / Case studies</span></div>
                <div>
                    <h2 class="text-balance font-heading text-5xl font-bold leading-[0.98] tracking-tight text-primary md:text-7xl">Selected work,<br>unpacked<span class="text-accent">.</span></h2>
                    <p class="mt-6 max-w-xl text-base leading-relaxed text-secondary md:text-lg">What I built, the stack behind it, and the decisions that shaped each project.</p>
                </div>
            </header>

            <div v-if="loading" class="space-y-20" aria-label="Loading projects" aria-live="polite">
                <div v-for="item in 3" :key="item" class="grid animate-pulse gap-7 md:grid-cols-[1.25fr_0.75fr]"><div class="aspect-[4/3] bg-white/5"></div><div class="space-y-5 py-4"><div class="h-4 w-1/4 bg-white/5"></div><div class="h-10 w-3/4 bg-white/5"></div><div class="h-20 bg-white/5"></div></div></div>
            </div>

            <div v-else-if="displayedProjects.length" class="projects-list">
                <article v-for="(project, index) in displayedProjects" :key="project.id" class="project-story group grid gap-7 border-t border-white/10 py-12 md:grid-cols-12 md:gap-10 md:py-20">
                    <router-link :to="'/project/' + project.id" class="project-media relative block aspect-[4/3] overflow-hidden bg-surface md:col-span-7" :class="index % 2 ? 'md:order-2' : ''">
                        <img v-if="project.imageUrl" :src="getImageUrl(project.imageUrl)" :alt="project.title" class="project-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                        <div v-else class="grid h-full place-items-center border border-white/5 text-2xl font-bold text-white/20">{{ project.title }}</div>
                        <span class="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-background/85 text-lg text-primary backdrop-blur transition-colors group-hover:bg-accent group-hover:text-background" aria-hidden="true">↗</span>
                    </router-link>

                    <div class="project-copy flex flex-col justify-between md:col-span-5" :class="index % 2 ? 'md:order-1 md:pr-8' : 'md:pl-8'">
                        <div>
                            <div class="mb-7 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em]"><span class="text-accent">{{ projectNumber(index) }}</span><span class="text-secondary">{{ project.category }} · {{ project.year }}</span></div>
                            <h3 class="text-balance font-heading text-3xl font-bold leading-tight text-primary md:text-5xl"><router-link :to="'/project/' + project.id" class="transition-colors hover:text-accent">{{ project.title }}</router-link></h3>
                            <div class="mt-7 border-l border-white/15 pl-5">
                                <span class="mb-2 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-secondary">Contribution</span>
                                <p class="line-clamp-3 leading-relaxed text-secondary">{{ project.contribution || project.description }}</p>
                            </div>
                        </div>
                        <div class="mt-8">
                            <ul v-if="getTechStack(project).length" class="mb-7 flex flex-wrap gap-x-4 gap-y-2" aria-label="Technologies"><li v-for="tech in getTechStack(project)" :key="tech" class="text-xs text-secondary">{{ normalizeTechName(tech) }}</li></ul>
                            <div class="flex flex-wrap gap-5 text-sm font-medium">
                                <router-link :to="'/project/' + project.id" class="text-primary underline decoration-white/20 underline-offset-8 transition-colors hover:text-accent">View Case Study</router-link>
                                <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank" rel="noopener noreferrer" class="text-secondary underline decoration-white/20 underline-offset-8 transition-colors hover:text-accent">Live Demo ↗</a>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="border-y border-white/10 py-16"><h3 class="font-heading text-2xl font-bold text-primary">No published projects yet.</h3><p class="mt-3 max-w-xl text-secondary">My public repositories are still available on GitHub.</p><a href="https://github.com/gungdikaebs" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex text-sm font-medium text-accent underline underline-offset-8">Visit GitHub ↗</a></div>

            <div v-if="displayedProjects.length" class="mt-12 flex justify-end"><router-link to="/projects" class="inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 px-6 text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent">View all projects <span aria-hidden="true">→</span></router-link></div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, computed, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useProjects } from '../composables/useProjects'
import { motion, reduceMotion } from '../animations/motion'

gsap.registerPlugin(ScrollTrigger)
const sectionEl = ref<HTMLElement | null>(null)
const { projects, loading, fetchProjects } = useProjects()
const displayedProjects = computed(() => { const featured = projects.value.filter((project: any) => project.featured); return (featured.length ? featured : projects.value).slice(0, 4) })
let context: gsap.Context | null = null

const getImageUrl = (path: string) => { if (!path || path.startsWith('http')) return path; const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/^['"]|['"]$/g, '').replace(/\/+$/, ''); return `${base}${path.startsWith('/') ? path : `/${path}`}` }
const getTechStack = (project: any) => project.skills?.map((item: any) => item.skill.name) || []
const normalizeTechName = (name: string) => ({ 'Vue JS': 'Vue.js', 'Nest JS': 'NestJS', Github: 'GitHub' } as Record<string, string>)[name] || name
const projectNumber = (index: number) => index < 9 ? `0${index + 1}` : String(index + 1)

const initAnimations = () => {
    if (reduceMotion()) return
    context = gsap.context(() => {
        gsap.from('.projects-heading > *', { y: motion.distance.base, opacity: 0, duration: motion.duration.slow, stagger: motion.stagger.base, ease: motion.ease.enter, scrollTrigger: { trigger: '.projects-heading', start: 'top 82%' } })
        gsap.utils.toArray<HTMLElement>('.project-story').forEach((story, index) => {
            const media = story.querySelector('.project-media'); const image = story.querySelector('.project-image'); const copy = story.querySelector('.project-copy')
            gsap.from(media, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: motion.ease.emphasis, scrollTrigger: { trigger: story, start: 'top 82%' } })
            gsap.from(copy, { x: index % 2 ? -motion.distance.base : motion.distance.base, opacity: 0, duration: motion.duration.slow, ease: motion.ease.enter, scrollTrigger: { trigger: story, start: 'top 78%' } })
            if (image) gsap.fromTo(image, { yPercent: -4, scale: 1.07 }, { yPercent: 4, scale: 1.07, ease: 'none', scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
    }, sectionEl.value || undefined)
}

onMounted(async () => { await fetchProjects(); await nextTick(); initAnimations(); ScrollTrigger.refresh() })
onUnmounted(() => context?.revert())
</script>
