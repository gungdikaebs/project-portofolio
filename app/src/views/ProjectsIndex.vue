<template>
    <div class="pt-32 pb-20 min-h-screen">
        <div class="w-full max-w-[1350px] mx-auto px-6">
            <h1 class="font-heading font-bold text-5xl md:text-6xl text-primary mb-12">
                All <span class="text-accent">Projects.</span>
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article v-for="project in projects" :key="project.id"
                    class="group bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-300">
                    <router-link :to="'/project/' + project.id" class="block aspect-video overflow-hidden">
                        <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div v-else class="w-full h-full bg-white/5 flex items-center justify-center">
                            <span class="text-white/20 font-heading text-xl">{{ project.title }}</span>
                        </div>
                    </router-link>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <span class="text-accent text-xs font-mono uppercase tracking-wider mb-2 block">{{
                                    project.category }}</span>
                                <h2
                                    class="font-heading font-bold text-2xl text-white group-hover:text-accent transition-colors">
                                    {{ project.title }}</h2>
                            </div>
                            <span class="text-secondary text-sm font-mono border border-white/10 px-2 py-1 rounded">{{
                                project.year }}</span>
                        </div>
                        <p class="text-secondary text-sm mb-6 line-clamp-3">{{ project.description }}</p>
                        <router-link :to="'/project/' + project.id"
                            class="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-accent transition-colors">
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
import Footer from '../components/Footer.vue'

// Reusing mock data for now, ideally this comes from a store or prop
const projects = [
    {
        id: 1,
        title: 'Taman Sari Kost',
        category: 'Full-Stack Web App',
        year: '2024',
        description: 'A comprehensive boarding house management system designed to streamline operations. From tenant onboarding to automated billing, this platform bridges the gap between property owners and residents.',
        techStack: ['Laravel', 'Vue.js', 'MySQL', 'Docker', 'Tailwind'],
        liveUrl: 'https://tamansarikost.com',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'HR Screening System',
        category: 'Internal Tool',
        year: '2023',
        description: 'An intelligent candidate screening platform that automates the initial recruitment phase. Features include resume parsing, automated scoring, and a centralized dashboard for HR teams.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop'
    }
]
</script>
