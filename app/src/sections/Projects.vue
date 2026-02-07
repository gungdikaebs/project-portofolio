<template>
    <section id="projects" class="py-32 relative overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <!-- Dot Grid Texture -->
            <div
                class="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-20">
            </div>

            <div class="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]">
            </div>
            <div class="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]">
            </div>
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">

            <!-- Section Header -->
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div>
                    <h2 class="font-heading font-bold text-5xl md:text-7xl text-primary mb-6 reveal-text">
                        Selected <br /> <span class="text-accent">Works.</span>
                    </h2>
                    <p class="text-secondary text-lg max-w-xl reveal-text leading-relaxed">
                        A curated selection of projects that demonstrate my passion for
                        building robust, interactive, and scalable digital products.
                    </p>
                </div>

                <!-- Desktop Only View All Button (Top Right) -->
                <div class="hidden md:block reveal-text">
                    <router-link to="/projects"
                        class="group relative inline-flex items-center gap-3 px-8 py-4 bg-surface border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(106,227,255,0.1)]">
                        <div
                            class="absolute inset-0 bg-accent/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                        </div>
                        <span
                            class="relative z-10 font-heading font-bold text-white group-hover:text-accent transition-colors">View
                            All Projects</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="relative z-10 text-white group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </router-link>
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                <article v-for="(project, index) in projects" :key="project.id"
                    class="project-card group relative flex flex-col gap-6">

                    <!-- Image Container -->
                    <router-link :to="'/project/' + project.id"
                        class="block w-full aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer bg-surface">
                        <!-- Image -->
                        <div class="w-full h-full relative overflow-hidden">
                            <img v-if="project.imageUrl" :src="getImageUrl(project.imageUrl)" :alt="project.title"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div v-else class="w-full h-full bg-surface flex items-center justify-center relative">
                                <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
                                <span class="text-white/20 font-heading text-2xl">{{ project.title }}</span>
                            </div>
                        </div>

                        <!-- Hover Overlay -->
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <div
                                class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" class="text-white">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </div>
                        </div>
                    </router-link>

                    <!-- Content -->
                    <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3
                                    class="font-heading font-bold text-3xl text-primary group-hover:text-accent transition-colors duration-300">
                                    {{ project.title }}
                                </h3>
                                <div class="flex items-center gap-3 mt-2 text-secondary text-sm font-mono">
                                    <!-- Use Project Skills as Category substitute or generic -->
                                    <span>Web Development</span>
                                    <!-- Optional Year hardcoded or from logic if needed -->
                                </div>
                            </div>
                        </div>
                        <p class="text-secondary leading-relaxed line-clamp-2">
                            {{ project.description }}
                        </p>

                        <!-- Tech Tags -->
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span v-for="tech in getTechStack(project).slice(0, 3)" :key="tech"
                                class="text-xs font-mono text-white/50 border border-white/10 px-2 py-1 rounded hover:text-accent hover:border-accent/30 transition-colors cursor-default">
                                {{ tech }}
                            </span>
                            <span v-if="getTechStack(project).length > 3"
                                class="text-xs font-mono text-white/50 px-2 py-1">
                                +{{ getTechStack(project).length - 3 }}
                            </span>
                        </div>
                    </div>
                </article>
            </div>

            <!-- Mobile Only View All Button -->
            <div class="md:hidden mt-16 flex justify-center">
                <router-link to="/projects"
                    class="inline-flex items-center gap-2 px-8 py-3 bg-surface border border-white/10 rounded-full text-white font-bold hover:bg-white/5 transition-colors">
                    View All Projects
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </router-link>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useProjects } from '../composables/useProjects'

gsap.registerPlugin(ScrollTrigger)

const { projects, loading, fetchProjects } = useProjects()

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
};

const getTechStack = (project: any) => {
    if (!project.skills) return [];
    return project.skills.map((s: any) => s.skill.name);
};

// Ref for animation refresh
const refreshAnimations = () => {
    ScrollTrigger.refresh()

    // 1. Text Reveals
    const texts = document.querySelectorAll('.reveal-text')
    texts.forEach((text, i) => {
        gsap.fromTo(text,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%'
                },
                delay: i * 0.1
            }
        )
    })

    // 2. Project Card Animation & Parallax
    const cards = document.querySelectorAll('.project-card')

    // Grid Parallax - Move uneven columns differently
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
            cards.forEach((card, i) => {
                // Odd items (Right column in 2-col grid)
                const isEven = i % 2 !== 0

                // Initial Offset for right column (Masonry feel)
                if (isEven) {
                    gsap.set(card, { y: 60 })
                }

                // Entrance
                gsap.fromTo(card,
                    { y: isEven ? 160 : 100, opacity: 0 },
                    {
                        y: isEven ? 60 : 0, // Return to offset or 0
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%'
                        }
                    }
                )

                // Parallax Scroll (Right column moves faster/slower)
                if (isEven) {
                    gsap.to(card, {
                        y: -40, // Moves up relative to its offset
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    })
                }
            })
        },
        "(max-width: 767px)": function () {
            // Simple entrance for mobile
            cards.forEach((card) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%'
                        }
                    }
                )
            })
        }
    })
}

onMounted(async () => {
    await fetchProjects()
    nextTick(() => {
        refreshAnimations()
    })
})
</script>
