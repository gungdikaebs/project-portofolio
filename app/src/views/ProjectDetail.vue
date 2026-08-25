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
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

                <!-- Description -->
                <div class="md:col-span-2 space-y-12">
                    <section>
                        <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">01 — Overview</p>
                        <h2 class="mb-5 font-heading text-2xl font-bold text-white">What I built</h2>
                        <p class="text-secondary text-lg leading-relaxed whitespace-pre-line">
                            {{ project.description }}
                        </p>
                    </section>

                    <section v-if="project.challenge">
                        <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">02 — Challenge</p>
                        <h2 class="mb-5 font-heading text-2xl font-bold text-white">The problem and constraints</h2>
                        <p class="text-secondary text-lg leading-relaxed whitespace-pre-line">{{ project.challenge }}</p>
                    </section>

                    <section v-if="project.solution">
                        <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">03 — Approach</p>
                        <h2 class="mb-5 font-heading text-2xl font-bold text-white">Solution and technical decisions</h2>
                        <p class="text-secondary text-lg leading-relaxed whitespace-pre-line">{{ project.solution }}</p>
                    </section>

                    <section v-if="project.impact" class="rounded-2xl border border-accent/15 bg-accent/5 p-7 md:p-9">
                        <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">04 — Outcome</p>
                        <h2 class="mb-5 font-heading text-2xl font-bold text-white">Impact and learnings</h2>
                        <p class="text-secondary text-lg leading-relaxed whitespace-pre-line">{{ project.impact }}</p>
                    </section>
                </div>

                <!-- Sidebar / Links -->
                <div>
                    <div v-if="project.role" class="mb-10 border-l-2 border-accent pl-5">
                        <p class="mb-2 font-mono text-xs uppercase tracking-wider text-secondary">My contribution</p>
                        <p class="font-medium leading-relaxed text-white">{{ project.role }}</p>
                    </div>

                    <h2 class="font-heading font-bold text-2xl text-white mb-6">Explore</h2>
                    <div class="space-y-4">
                        <a v-if="project.projectUrl" :href="project.projectUrl" target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center justify-between p-4 bg-surface border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/5 transition-all group">
                            <span class="font-medium text-white">Live Preview</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-secondary group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                        <a v-if="project.repositoryUrl" :href="project.repositoryUrl" target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center justify-between p-4 bg-surface border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/5 transition-all group">
                            <span class="font-medium text-white">View Source Code</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="text-secondary group-hover:text-accent transition-colors">
                                <path d="m16 18 6-6-6-6" />
                                <path d="m8 6-6 6 6 6" />
                            </svg>
                        </a>
                        <p v-if="!project.projectUrl && !project.repositoryUrl"
                            class="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-secondary">
                            This project is currently documented as a private case study.
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <!-- Loading / Not Found Fallback -->
        <div v-else class="min-h-[50vh] flex flex-col items-center justify-center">
            <h2 class="font-heading font-bold text-2xl text-white mb-4">Project Not Found</h2>
            <router-link to="/projects" class="text-accent hover:underline">Back to Projects</router-link>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProjects } from '../composables/useProjects'

const route = useRoute()
const { project, loading, fetchProject } = useProjects()

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
    return project.value?.category || 'Web Development';
}

onMounted(async () => {
    const id = route.params.id as string
    if (id) {
        await fetchProject(id)
    }
    window.scrollTo(0, 0)
})

// watch route to refetch if params change (e.g. related projects)
watch(() => route.params.id, async (newId) => {
    if (newId) {
        await fetchProject(newId as string)
        window.scrollTo(0, 0)
    }
})
</script>
