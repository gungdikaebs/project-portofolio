<template>
    <section v-if="loading || featuredBlogs.length > 0" id="blog" class="py-[var(--section-space)] relative overflow-hidden">
        <div class="section-shell relative z-10">

            <!-- Scroll Line Divider -->
            <div class="scroll-divider-wrapper mb-16 h-px w-full overflow-hidden bg-white/5 md:mb-20">
                <div class="blog-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-white/20 to-white/5 origin-left"></div>
            </div>

            <!-- Section Header -->
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <span class="section-kicker mb-5 block">07 / Blog</span>
                    <h2 class="font-heading font-bold text-5xl md:text-7xl text-primary mb-6 reveal-blog-text">
                        Latest <br /> <span class="text-accent">Articles.</span>
                    </h2>
                    <p class="text-secondary text-lg max-w-xl reveal-blog-text leading-relaxed">
                        Notes on problems I have worked through, tools I am learning, and decisions worth documenting.
                    </p>
                </div>

                <!-- Desktop View All Button -->
                <div class="hidden md:block reveal-blog-text">
                    <router-link to="/blog"
                        class="magnetic-btn group relative inline-flex items-center gap-3 px-8 py-4 bg-surface border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-accent/40">
                        <span class="relative z-10 font-heading font-bold text-sm text-white group-hover:text-accent transition-colors">Read All Articles</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 text-white group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </router-link>
                </div>
            </div>

            <!-- Blog Grid -->
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Skeleton Loader -->
                <div v-for="i in 3" :key="i" class="col-span-1 animate-pulse flex flex-col gap-6">
                    <div class="w-full aspect-[16/10] bg-white/5"></div>
                    <div class="flex flex-col gap-3">
                        <div class="w-1/3 h-4 bg-white/5 rounded"></div>
                        <div class="w-full h-8 bg-white/5 rounded mt-2"></div>
                        <div class="w-3/4 h-8 bg-white/5 rounded"></div>
                    </div>
                </div>
            </div>

            <div v-else-if="featuredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                <article v-for="post in featuredBlogs" :key="post.id"
                    class="blog-card group relative flex flex-col gap-6">

                    <!-- Image Container -->
                    <router-link :to="'/blog/' + post.slug"
                        class="block w-full aspect-[16/10] overflow-hidden relative cursor-pointer bg-surface border border-white/10 hover:border-white/35 transition-colors duration-500">
                        <!-- Image -->
                        <div class="w-full h-full relative overflow-hidden">
                            <img v-if="post.coverImage" :src="getImageUrl(post.coverImage)" :alt="post.title"
                                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div v-else class="w-full h-full bg-surface flex items-center justify-center">
                                <span class="text-white/10 font-heading text-4xl font-bold opacity-30">BLOG</span>
                            </div>
                        </div>

                        <span class="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-white/30 bg-background/80 text-primary" aria-hidden="true">↗</span>
                    </router-link>

                    <!-- Content -->
                    <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-center text-sm font-mono text-secondary">
                            <span class="text-secondary" v-if="post.category">{{ post.category.name }}</span>
                            <span v-else class="text-white/30 truncate">Uncategorized</span>
                            <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
                        </div>
                        
                        <h3 class="font-heading font-bold text-2xl text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            <router-link :to="'/blog/' + post.slug">{{ post.title }}</router-link>
                        </h3>
                        
                        <p class="text-secondary leading-relaxed line-clamp-3 text-sm">
                            {{ post.excerpt }}
                        </p>
                    </div>
                </article>
            </div>
            
            <!-- Mobile Only View All Button -->
            <div v-if="featuredBlogs.length > 0" class="md:hidden mt-12 flex justify-center">
                <router-link to="/blog"
                    class="inline-flex items-center gap-2 px-8 py-3 bg-surface border border-white/10 rounded-full text-white font-bold hover:bg-white/5 transition-colors">
                    Read All Articles
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
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useBlog } from '../composables/useBlog'

gsap.registerPlugin(ScrollTrigger)

const { featuredBlogs, loading, fetchBlogs } = useBlog()

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    baseUrl = baseUrl.replace(/\/+$/, '');
    const safePath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${safePath}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

import { initMagneticButtons } from '../animations/magnetic'

const initAnimations = () => {
    ScrollTrigger.refresh()

    // Line divider animation
    const line = document.querySelector('.blog-scroll-line')
    if (line) {
        gsap.fromTo(line,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '#blog', start: 'top 85%' }
            }
        )
    }

    // Section header text reveal with stagger
    const texts = document.querySelectorAll('.reveal-blog-text')
    texts.forEach((text, i) => {
        gsap.fromTo(text,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#blog',
                    start: 'top 82%'
                },
                delay: i * 0.12
            }
        )
    })

    // Blog cards — staggered entrance with scale
    const cards = document.querySelectorAll('.blog-card')
    if (cards.length > 0) {
        gsap.fromTo(cards,
            { y: 60, opacity: 0, scale: 0.96 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.blog-card',
                    start: 'top 85%'
                }
            }
        )
    }

    initMagneticButtons('.magnetic-btn')
}

onMounted(async () => {
    await fetchBlogs()
    nextTick(() => {
        initAnimations()
    })
})
</script>
