<template>
    <div class="min-h-screen relative pt-32 pb-20 overflow-hidden">

        <!-- Background Elements -->
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-20">
            </div>
            <div class="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]">
            </div>
            <div class="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]">
            </div>
        </div>

        <div v-if="loading" class="min-h-[50vh] flex flex-col items-center justify-center">
            <div class="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
            <p class="text-secondary font-mono text-sm">Loading Project...</p>
        </div>

        <div v-else-if="project" class="w-full max-w-[1100px] mx-auto px-6 relative z-10">

            <!-- Breadcrumb / Back -->
            <router-link to="/projects"
                class="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="group-hover:-translate-x-1 transition-transform">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Projects
            </router-link>

            <!-- Header -->
            <div class="mb-16">
                <!-- Meta -->
                <div class="flex flex-wrap gap-4 items-center mb-6 text-sm font-mono text-accent">
                    <span class="px-3 py-1 border border-accent/20 bg-accent/5 rounded-full">{{ getCategory()
                    }}</span>
                    <span class="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>{{ project.year }}</span>
                    <template v-if="project.role">
                        <span class="w-1 h-1 bg-white/20 rounded-full"></span>
                        <span>{{ project.role }}</span>
                    </template>
                </div>

                <h1 class="font-heading font-bold text-4xl md:text-6xl text-white mb-8 leading-tight">
                    {{ project.title }}
                </h1>

                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-3">
                    <span v-for="tech in getTechStack(project)" :key="tech"
                        class="px-3 py-1.5 bg-surface border border-white/10 rounded-lg text-sm text-secondary hover:text-white hover:border-white/30 transition-colors">
                        {{ tech }}
                    </span>
                </div>
            </div>

            <!-- Main Image -->
            <div class="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 relative group">
                <img :src="getImageUrl(project.imageUrl)" :alt="project.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 gap-12 lg:gap-20" :class="hasProjectLinks ? 'md:grid-cols-3' : ''">

                <!-- Description -->
                <div class="space-y-12" :class="hasProjectLinks ? 'md:col-span-2' : ''">
                    <section v-for="section in caseStudySections" :key="section.label">
                        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">{{ section.label }}</p>
                        <h2 class="mt-4 font-heading text-2xl font-bold text-white">{{ section.title }}</h2>
                        <p class="mt-4 text-secondary text-lg leading-relaxed whitespace-pre-line">{{ section.content }}</p>
                    </section>
                </div>

                <!-- Sidebar / Links -->
                <div v-if="hasProjectLinks">
                    <h2 class="font-heading font-bold text-2xl text-white mb-6">Visit</h2>
                    <div class="space-y-4">
                        <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center justify-between p-4 bg-surface border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/5 transition-all group">
                            <span class="font-medium text-white">Live Demo</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-secondary group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                        <a v-if="project.sourceCodeUrl" :href="project.sourceCodeUrl" target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center justify-between p-4 bg-surface border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/5 transition-all group">
                            <span class="font-medium text-white">Source Code</span>
                            <span class="text-secondary transition-colors group-hover:text-accent" aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Project Gallery -->
            <section v-if="project.galleryImages?.length" class="mt-24 border-t border-white/10 pt-16">
                <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Product Preview</p>
                        <h2 class="font-heading text-3xl font-bold text-white md:text-4xl">Selected Screens</h2>
                    </div>
                    <span class="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-secondary">
                        {{ project.galleryImages.length }} screenshots
                    </span>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <button v-for="(image, index) in project.galleryImages" :key="image.id || image.imageUrl"
                        type="button" @click="openGallery(Number(index))"
                        class="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface text-left transition-colors hover:border-accent/40"
                        :class="index === 0 && project.galleryImages.length > 2 ? 'md:col-span-2' : ''"
                        :aria-label="`Open screenshot ${Number(index) + 1} of ${project.galleryImages.length}`">
                        <div class="aspect-video overflow-hidden">
                            <img :src="getImageUrl(image.imageUrl)"
                                :alt="image.altText || `${project.title} screenshot ${Number(index) + 1}`"
                                loading="lazy" decoding="async"
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]">
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent"></div>
                        <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                            <div>
                                <p class="font-mono text-xs text-accent">SCREEN {{ formatScreenNumber(index) }}</p>
                                <p v-if="image.caption" class="mt-2 font-medium text-white">{{ image.caption }}</p>
                            </div>
                            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                                +
                            </span>
                        </div>
                    </button>
                </div>
            </section>

        </div>

        <!-- Loading / Not Found Fallback -->
        <div v-else class="min-h-[50vh] flex flex-col items-center justify-center">
            <h2 class="font-heading font-bold text-2xl text-white mb-4">Project Not Found</h2>
            <router-link to="/projects" class="text-accent hover:underline">Back to Projects</router-link>
        </div>

        <Teleport to="body">
            <div v-if="currentGalleryImage" @click.self="closeGallery"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
                role="dialog" aria-modal="true" aria-label="Project screenshot viewer">
                <button type="button" @click="closeGallery"
                    class="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-2xl text-white transition-colors hover:border-accent hover:text-accent md:right-8 md:top-8"
                    aria-label="Close screenshot viewer">×</button>

                <button v-if="project?.galleryImages?.length > 1" type="button" @click="showPreviousImage"
                    class="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white transition-colors hover:border-accent hover:text-accent md:left-8"
                    aria-label="Previous screenshot">←</button>

                <figure class="flex max-h-full w-full max-w-6xl flex-col items-center">
                    <img :src="getImageUrl(currentGalleryImage.imageUrl)"
                        :alt="currentGalleryImage.altText || `${project.title} project screenshot`"
                        class="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl">
                    <figcaption class="mt-4 max-w-3xl text-center">
                        <p v-if="currentGalleryImage.caption" class="text-sm text-white md:text-base">{{ currentGalleryImage.caption }}</p>
                        <p class="mt-2 font-mono text-xs text-secondary">
                            {{ (selectedGalleryIndex ?? 0) + 1 }} / {{ project.galleryImages.length }}
                        </p>
                    </figcaption>
                </figure>

                <button v-if="project?.galleryImages?.length > 1" type="button" @click="showNextImage"
                    class="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white transition-colors hover:border-accent hover:text-accent md:right-8"
                    aria-label="Next screenshot">→</button>
            </div>
        </Teleport>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '../composables/useProjects'

const route = useRoute()
const { project, loading, fetchProject } = useProjects()
const selectedGalleryIndex = ref<number | null>(null)

const currentGalleryImage = computed(() => {
    if (selectedGalleryIndex.value === null) return null
    return project.value?.galleryImages?.[selectedGalleryIndex.value] || null
})

const hasProjectLinks = computed(() => Boolean(project.value?.projectUrl || project.value?.sourceCodeUrl))

const caseStudySections = computed(() => {
    if (!project.value) return []
    return [
        { label: 'Overview', title: 'The project', content: project.value.description },
        { label: 'Challenge', title: 'The problem to solve', content: project.value.challenge },
        { label: 'Contribution', title: 'What I worked on', content: project.value.contribution },
        { label: 'Result', title: 'The outcome', content: project.value.result },
    ].filter(section => typeof section.content === 'string' && section.content.trim())
})

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    baseUrl = baseUrl.replace(/^["']|["']$/g, '');
    baseUrl = baseUrl.replace(/\/+$/, '');
    const safePath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${safePath}`;
}

const getTechStack = (proj: any) => {
    if (!proj || !proj.skills) return [];
    return proj.skills.map((s: any) => s.skill.name);
}

const getCategory = () => {
    return project.value?.category || '';
}

const formatScreenNumber = (index: string | number) => {
    const value = Number(index) + 1
    return value < 10 ? `0${value}` : `${value}`
}

const openGallery = (index: number) => {
    selectedGalleryIndex.value = index
    document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
    selectedGalleryIndex.value = null
    document.body.style.overflow = ''
}

const showPreviousImage = () => {
    const images = project.value?.galleryImages || []
    if (images.length === 0 || selectedGalleryIndex.value === null) return
    selectedGalleryIndex.value = (selectedGalleryIndex.value - 1 + images.length) % images.length
}

const showNextImage = () => {
    const images = project.value?.galleryImages || []
    if (images.length === 0 || selectedGalleryIndex.value === null) return
    selectedGalleryIndex.value = (selectedGalleryIndex.value + 1) % images.length
}

const handleGalleryKeydown = (event: KeyboardEvent) => {
    if (selectedGalleryIndex.value === null) return
    if (event.key === 'Escape') closeGallery()
    if (event.key === 'ArrowLeft') showPreviousImage()
    if (event.key === 'ArrowRight') showNextImage()
}

onMounted(async () => {
    window.addEventListener('keydown', handleGalleryKeydown)
    const id = route.params.id as string
    if (id) {
        await fetchProject(id)
    }
    window.scrollTo(0, 0)
})

// watch route to refetch if params change (e.g. related projects)
watch(() => route.params.id, async (newId) => {
    closeGallery()
    if (newId) {
        await fetchProject(newId as string)
        window.scrollTo(0, 0)
    }
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleGalleryKeydown)
    document.body.style.overflow = ''
})
</script>
