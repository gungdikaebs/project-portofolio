<template>
    <main class="min-h-screen pt-32">
        <div class="section-shell pb-28">
            <header class="border-t border-primary/25 pt-5 pb-16 md:pb-24">
                <div class="flex items-center justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-secondary">
                    <span>Projects / Archive</span><span>Selected work and experiments</span>
                </div>
                <h1 class="mt-12 max-w-4xl font-heading text-[clamp(3.7rem,9vw,8rem)] font-bold leading-[0.94] tracking-[-0.07em] text-primary">Selected <span class="font-normal italic">projects.</span></h1>
                <p class="mt-8 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">Explore the work behind each project: the brief, my contribution, and the choices made along the way.</p>
            </header>

            <div v-if="loading" class="border-t border-primary/20 pt-8">
                <EditorialLoader label="project archive" message="Gathering selected work." />
            </div>
            <div v-else-if="projects.length" class="border-t border-primary/25">
                <article v-for="(project, index) in projects" :key="project.id" class="group grid gap-7 border-b border-primary/25 py-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:gap-12 md:py-14">
                    <router-link :to="'/project/' + project.id" class="relative block aspect-[4/3] overflow-hidden border border-primary/10 bg-surface" :aria-label="`Open ${project.title} case study`">
                        <img v-if="project.imageUrl && !failedImages.has(project.id)" :src="getImageUrl(project.imageUrl)" :alt="project.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" @error="markImageFailed(project.id)" />
                        <div v-else class="flex h-full w-full flex-col justify-between p-6 md:p-8" aria-hidden="true">
                            <span class="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-secondary">Project archive / {{ formatIndex(index) }}</span>
                            <span class="max-w-[13ch] font-heading text-3xl font-semibold leading-tight tracking-tight text-primary md:text-4xl">{{ project.title }}</span>
                        </div>
                        <span class="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-primary/30 bg-background/80 text-primary" aria-hidden="true">↗</span>
                    </router-link>
                    <div class="flex min-w-0 flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-secondary">
                                <span>{{ formatIndex(index) }} / {{ getCategory(project) }}</span><span>{{ project.year }}</span>
                            </div>
                            <h2 class="mt-7 max-w-[14ch] font-heading text-[clamp(2.2rem,4.2vw,4.5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-primary"><router-link :to="'/project/' + project.id" class="hover:underline hover:decoration-primary/40 hover:underline-offset-8">{{ project.title }}</router-link></h2>
                            <p class="mt-6 max-w-xl text-base leading-relaxed text-secondary">{{ project.contribution || project.description }}</p>
                        </div>
                        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
                            <router-link :to="'/project/' + project.id" class="inline-flex min-h-11 items-center gap-3 border-b border-primary/50 text-primary transition-colors hover:border-primary">Explore project <span aria-hidden="true">↗</span></router-link>
                            <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 text-secondary transition-colors hover:text-primary" :aria-label="`Open ${project.title} live demo (opens in a new tab)`">Live demo <span aria-hidden="true">↗</span></a>
                            <a v-if="isUsableSourceUrl(project.sourceCodeUrl)" :href="project.sourceCodeUrl" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 text-secondary transition-colors hover:text-primary" :aria-label="`View ${project.title} source code (opens in a new tab)`"><GitHubIcon class="h-4 w-4" /> View code <span aria-hidden="true">↗</span></a>
                        </div>
                    </div>
                </article>
            </div>
            <div v-else class="border-t border-primary/25 py-20 text-secondary">No projects published yet.</div>
        </div>
        <Footer />
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Footer from '../components/Footer.vue'
import { useProjects } from '../composables/useProjects'
import GitHubIcon from '../components/GitHubIcon.vue'
import EditorialLoader from '../components/EditorialLoader.vue'

const { projects, loading, fetchProjects } = useProjects()
const failedImages = ref(new Set<string>())

const markImageFailed = (id: string) => {
    failedImages.value = new Set([...failedImages.value, id])
}

const isUsableSourceUrl = (value?: string | null) => {
    if (!value) return false
    try {
        const url = new URL(value)
        return (url.protocol === 'http:' || url.protocol === 'https:') && url.pathname.replace(/\//g, '').length > 0
    } catch { return false }
}

const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    baseUrl = baseUrl.replace(/^["']|["']$/g, '').replace(/\/+$/, '')
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

const getCategory = (project: { category?: string }) => project.category || 'Project'
const formatIndex = (index: number) => index < 9 ? `0${index + 1}` : String(index + 1)

onMounted(fetchProjects)
</script>
