<template>
    <section id="projects" ref="sectionEl" class="relative overflow-hidden py-[var(--section-space)]">
        <div class="section-shell relative z-10">
            <header class="projects-heading mb-16 grid gap-7 border-t border-primary/10 pt-6 md:mb-20 md:grid-cols-[0.7fr_1.3fr] md:items-start">
                <div><span class="section-kicker">02 / Selected work</span></div>
                <div>
                    <h2
                        class="text-balance font-heading text-5xl font-bold leading-[0.98] tracking-tight text-primary md:text-7xl">
                        Work, in context.</h2>
                    <p class="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">Selected projects showing the interface, technical choices, and contribution behind each build.</p>
                </div>
            </header>

            <div v-if="loading" class="space-y-20" aria-busy="true">
                <EditorialLoader label="selected projects" variant="section" message="Preparing selected work." />
                <div v-for="item in 3" :key="item" class="grid gap-7 md:grid-cols-[1.25fr_0.75fr]">
                    <div class="editorial-skeleton aspect-[4/3] bg-primary/5" :style="{ '--editorial-delay': `${item * 0.12}s` }"></div>
                    <div class="space-y-5 py-4">
                        <div class="editorial-skeleton h-4 w-1/4 bg-primary/5" :style="{ '--editorial-delay': `${item * 0.12}s` }"></div>
                        <div class="editorial-skeleton h-10 w-3/4 bg-primary/5" :style="{ '--editorial-delay': `${item * 0.12 + 0.1}s` }"></div>
                        <div class="editorial-skeleton h-20 bg-primary/5" :style="{ '--editorial-delay': `${item * 0.12 + 0.2}s` }"></div>
                    </div>
                </div>
            </div>

            <div v-else-if="displayedProjects.length" class="projects-list space-y-4">
                <article v-for="(project, index) in displayedProjects" :key="project.id"
                    class="project-story group relative py-12 md:py-20"
                    @mousemove="handleMouseMove">
                    <!-- Scroll Line Divider -->
                    <div class="scroll-divider-wrapper mb-10 h-px w-full overflow-hidden bg-primary/5 md:mb-16">
                        <div class="project-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-primary/20 to-primary/5 origin-left"></div>
                    </div>

                    <div class="grid gap-7 md:grid-cols-12 md:gap-12 items-center">
                        <router-link :to="'/project/' + project.id"
                            class="project-media spotlight-card relative block aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-surface md:col-span-7 border border-primary/5 hover:border-accent/30 transition-colors duration-500"
                            :class="index % 2 ? 'md:order-2' : ''">
                            <img v-if="project.imageUrl" :src="getImageUrl(project.imageUrl)" :alt="project.title"
                                class="project-image absolute inset-0 -top-[10%] h-[120%] w-full object-cover transition-transform duration-700 ease-out will-change-transform" />
                            <div v-else
                                class="grid h-full place-items-center border border-primary/5 text-2xl font-bold text-primary/20">
                                {{ project.title }}</div>
                            <span
                                class="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-primary/10 bg-background/90 text-lg text-primary backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-background"
                                aria-hidden="true">
                                <span class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                            </span>
                        </router-link>

                        <div class="project-copy flex flex-col justify-between md:col-span-5"
                            :class="index % 2 ? 'md:order-1 md:pr-6' : 'md:pl-6'">
                            <div>
                                <div
                                    class="mb-6 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em]">
                                    <span class="inline-flex items-center gap-2 text-accent font-semibold">
                                        <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
                                        {{ projectNumber(index) }} / 0{{ displayedProjects.length }}
                                    </span>
                                    <span class="text-secondary">{{ project.category }} · {{ project.year }}</span>
                                </div>
                                <h3
                                    class="text-balance font-heading text-3xl font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-accent md:text-5xl">
                                    <router-link :to="'/project/' + project.id">
                                        {{ project.title }}
                                    </router-link>
                                </h3>
                                <div class="mt-6 border-l border-primary/15 pl-5">
                                    <span
                                        class="mb-2 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-secondary">Contribution</span>
                                    <p class="line-clamp-3 text-base leading-relaxed text-secondary">{{ project.contribution ||
                                        project.description }}</p>
                                </div>
                            </div>
                            <div class="mt-8">
                                <div v-if="getTechStack(project).length" class="mb-7">
                                    <span
                                        class="mb-3 block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-secondary">Technologies</span>
                                    <ul class="flex flex-wrap items-center gap-2" aria-label="Technologies used">
                                        <li v-for="tech in getTechStack(project)" :key="tech.id"
                                            class="group/tech relative">
                                            <div v-if="tech.svgContent"
                                                class="grid h-9 w-9 place-items-center rounded-lg border border-primary/10 bg-surface text-secondary transition-all duration-200 hover:scale-105 hover:border-accent/40 hover:text-accent"
                                                :title="tech.name" :aria-label="tech.name">
                                                <TechIcon :svg-content="tech.svgContent" class="h-4 w-4" />
                                            </div>
                                            <span v-else
                                                class="inline-block rounded-md border border-primary/10 bg-surface px-2.5 py-1 text-xs text-secondary">
                                                {{ tech.name }}
                                            </span>
                                            <span v-if="tech.svgContent"
                                                class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface border border-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary opacity-0 shadow-lg transition-opacity duration-150 group-hover/tech:opacity-100 z-20">
                                                {{ tech.name }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="flex flex-wrap items-center gap-6 text-sm font-medium">
                                    <router-link :to="'/project/' + project.id"
                                        class="inline-flex items-center gap-1.5 text-primary underline decoration-primary/20 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent">
                                        <span>Explore project</span>
                                        <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
                                    </router-link>
                                    <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-secondary underline decoration-primary/20 underline-offset-8 transition-colors hover:text-accent">Live
                                        Demo ↗</a>
                                    <a v-if="project.sourceCodeUrl" :href="project.sourceCodeUrl" target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex items-center gap-2 text-secondary underline decoration-primary/20 underline-offset-8 transition-colors hover:text-accent"
                                        :aria-label="`View ${project.title} source code on GitHub (opens in a new tab)`">
                                        <GitHubIcon class="h-4 w-4 shrink-0" />
                                        <span>View Code</span>
                                        <span aria-hidden="true">↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="border-y border-primary/10 py-16">
                <h3 class="font-heading text-2xl font-bold text-primary">No published projects yet.</h3>
                <p class="mt-3 max-w-xl text-secondary">My public repositories are still available on GitHub.</p><a
                    href="https://github.com/gungdikaebs" target="_blank" rel="noopener noreferrer"
                    class="mt-7 inline-flex text-sm font-medium text-accent underline underline-offset-8">Visit GitHub
                    ↗</a>
            </div>

            <div v-if="displayedProjects.length" class="mt-12 flex justify-end"><router-link to="/projects"
                    class="inline-flex min-h-12 items-center gap-3 rounded-full border border-primary/15 px-6 text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent">View
                    all projects <span aria-hidden="true">→</span></router-link></div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, computed, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useProjects } from '../composables/useProjects'
import { motion, reduceMotion } from '../animations/motion'
import TechIcon from '../components/TechIcon.vue'
import GitHubIcon from '../components/GitHubIcon.vue'
import EditorialLoader from '../components/EditorialLoader.vue'

gsap.registerPlugin(ScrollTrigger)
const sectionEl = ref<HTMLElement | null>(null)
const { projects, loading, fetchProjects } = useProjects()
const displayedProjects = computed(() => { const featured = projects.value.filter((project: any) => project.featured); return (featured.length ? featured : projects.value).slice(0, 4) })
let context: gsap.Context | null = null

interface TechItem {
    id: string
    name: string
    svgContent: string | null
}

const normalizeTechName = (name: string) => ({ 'Vue JS': 'Vue.js', 'Nest JS': 'NestJS', Github: 'GitHub' } as Record<string, string>)[name.trim()] || name.trim()

const getImageUrl = (path: string) => { if (!path || path.startsWith('http')) return path; const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/^['"]|['"]$/g, '').replace(/\/+$/, ''); return `${base}${path.startsWith('/') ? path : `/${path}`}` }
const getTechStack = (project: any): TechItem[] => {
    if (!project?.skills) return []
    return project.skills.map((item: any) => {
        if (typeof item === 'string') {
            const trimmed = item.trim()
            return { id: trimmed, name: normalizeTechName(trimmed), svgContent: null }
        }
        const skill = item.skill || item
        const rawName = (skill?.name || '').trim()
        return {
            id: skill?.id || rawName,
            name: normalizeTechName(rawName),
            svgContent: skill?.svgContent || null
        }
    }).filter((t: TechItem) => t.name)
}
const projectNumber = (index: number) => index < 9 ? `0${index + 1}` : String(index + 1)

const handleMouseMove = (e: MouseEvent) => {
    const card = (e.currentTarget as HTMLElement)?.querySelector('.spotlight-card') as HTMLElement
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

const initAnimations = () => {
    if (reduceMotion()) return
    context = gsap.context(() => {
        gsap.from('.projects-heading > *', {
            y: motion.distance.base,
            opacity: 0,
            duration: motion.duration.slow,
            stagger: motion.stagger.base,
            ease: motion.ease.enter,
            scrollTrigger: { trigger: '.projects-heading', start: 'top 82%' }
        })

        gsap.utils.toArray<HTMLElement>('.project-story').forEach((story, index) => {
            const media = story.querySelector('.project-media')
            const image = story.querySelector('.project-image')
            const copy = story.querySelector('.project-copy')
            const line = story.querySelector('.project-scroll-line')

            // Line draw animation on scroll
            if (line) {
                gsap.fromTo(line,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.1,
                        ease: motion.ease.emphasis,
                        scrollTrigger: { trigger: story, start: 'top 88%' }
                    }
                )
            }

            // Media clip entrance
            gsap.from(media, {
                clipPath: 'inset(0 0 100% 0)',
                duration: 1.1,
                ease: motion.ease.emphasis,
                scrollTrigger: { trigger: story, start: 'top 82%' }
            })

            // Copy stagger entrance
            gsap.from(copy, {
                x: index % 2 ? -motion.distance.base : motion.distance.base,
                opacity: 0,
                duration: motion.duration.slow,
                ease: motion.ease.enter,
                scrollTrigger: { trigger: story, start: 'top 78%' }
            })

            // Smooth tactile image parallax scrub
            if (image) {
                gsap.fromTo(image,
                    { yPercent: -10, scale: 1.12 },
                    {
                        yPercent: 10,
                        scale: 1.12,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: story,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.5
                        }
                    }
                )
            }
        })
    }, sectionEl.value || undefined)
}

onMounted(async () => { await fetchProjects(); await nextTick(); initAnimations(); ScrollTrigger.refresh() })
onUnmounted(() => context?.revert())
</script>
