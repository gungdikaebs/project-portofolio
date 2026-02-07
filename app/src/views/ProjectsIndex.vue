<template>
    <div class="pt-32 pb-20 min-h-screen">
        <div class="w-full max-w-[1350px] mx-auto px-6">
            <h1 class="font-heading font-bold text-5xl md:text-6xl text-primary mb-12">
                All <span class="text-accent">Projects.</span>
            </h1>


            <!-- Loading State -->
            <div v-if="loading" class="min-h-[50vh] flex flex-col items-center justify-center">
                <div class="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
                <p class="text-secondary font-mono text-sm">Loading Projects...</p>
            </div>

            <!-- Projects Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article v-for="project in projects" :key="project.id"
                    class="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-300 flex flex-col h-full">
                    <router-link :to="'/project/' + project.id"
                        class="block aspect-video overflow-hidden relative bg-white/5">
                        <img v-if="project.imageUrl" :src="getImageUrl(project.imageUrl)" :alt="project.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <span class="text-white/20 font-heading text-xl">{{ project.title }}</span>
                        </div>
                    </router-link>
                    <div class="p-6 flex flex-col flex-1">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <span class="text-accent text-xs font-mono uppercase tracking-wider mb-2 block">{{
                                    getCategory(project) }}</span>
                                <h2
                                    class="font-heading font-bold text-2xl text-white group-hover:text-accent transition-colors">
                                    {{ project.title }}</h2>
                            </div>
                            <span class="text-secondary text-sm font-mono border border-white/10 px-2 py-1 rounded">{{
                                getYear(project.startDate) }}</span>
                        </div>
                        <p class="text-secondary text-sm mb-6 line-clamp-3 flex-1">{{ project.description }}</p>
                        <router-link :to="'/project/' + project.id"
                            class="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-accent transition-colors mt-auto">
                            Read Case Study <span class="transition-transform group-hover:translate-x-1">→</span>
                        </router-link>
                    </div>
                </article>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Footer from '../components/Footer.vue'
import { useProjects } from '../composables/useProjects'

const { projects, loading, fetchProjects } = useProjects()

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
}

const getCategory = (proj: any) => {
    // If backend doesn't return category field yet, return a default or map from skills
    // Assuming backend might have it or we use a fallback
    return proj.category || 'Web Development';
}

const getYear = (dateString: string) => {
    if (!dateString) return new Date().getFullYear();
    return new Date(dateString).getFullYear();
}

onMounted(() => {
    fetchProjects()
})
</script>
