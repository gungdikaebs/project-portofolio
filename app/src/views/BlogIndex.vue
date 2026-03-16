<template>
    <main class="pt-32 pb-24 min-h-screen">
        <!-- Background Elements -->
        <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">
            <!-- Header -->
            <div class="mb-16">
                <router-link to="/" class="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-8 group font-mono text-sm uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Portfolio
                </router-link>
                
                <h1 class="font-heading font-bold text-5xl md:text-7xl text-white mb-6">
                    All <span class="text-accent">Articles.</span>
                </h1>
                <p class="text-secondary text-lg max-w-2xl leading-relaxed">
                    Explore all my thoughts, tutorials, and insights about web development and software engineering.
                </p>
            </div>

            <!-- Blog Grid -->
            <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="i in 6" :key="i" class="animate-pulse flex flex-col gap-6">
                    <div class="w-full aspect-[16/10] bg-white/5 rounded-2xl"></div>
                    <div class="w-1/3 h-4 bg-white/5 rounded"></div>
                    <div class="w-full h-8 bg-white/5 rounded"></div>
                    <div class="w-3/4 h-8 bg-white/5 rounded"></div>
                </div>
            </div>

            <div v-else-if="blogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                <article v-for="post in blogs" :key="post.id"
                    class="blog-card group relative flex flex-col gap-6">

                    <!-- Image Container -->
                    <router-link :to="'/blog/' + post.slug"
                        class="block w-full aspect-[16/10] rounded-2xl overflow-hidden relative cursor-pointer bg-surface">
                        <!-- Image -->
                        <div class="w-full h-full relative overflow-hidden">
                            <img v-if="post.coverImage" :src="getImageUrl(post.coverImage)" :alt="post.title"
                                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div v-else class="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center border border-white/5">
                                <span class="text-white/10 font-heading text-4xl font-bold opacity-30">BLOG</span>
                            </div>
                        </div>

                        <!-- Hover Overlay -->
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </div>
                        </div>
                    </router-link>

                    <!-- Content -->
                    <div class="flex flex-col gap-4">
                        <div class="flex justify-between items-center text-sm font-mono text-secondary">
                            <span class="text-accent/80 border border-accent/20 px-3 py-1 rounded-full bg-accent/5" v-if="post.category">{{ post.category.name }}</span>
                            <span v-else class="text-white/30 truncate">Uncategorized</span>
                            <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
                        </div>
                        
                        <h3 class="font-heading font-bold text-2xl text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            <router-link :to="'/blog/' + post.slug">{{ post.title }}</router-link>
                        </h3>
                        
                        <p class="text-secondary leading-relaxed line-clamp-3">
                            {{ post.excerpt }}
                        </p>
                    </div>
                </article>
            </div>
            
            <div v-else class="py-32 text-center border border-white/5 bg-surface/30 rounded-3xl">
                <p class="text-secondary font-mono text-lg">No articles published yet.</p>
                <router-link to="/" class="inline-block mt-6 text-accent hover:text-white transition-colors">Go back home</router-link>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useBlog } from '../composables/useBlog'

const { blogs, loading, fetchBlogs } = useBlog()

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(async () => {
    window.scrollTo(0, 0); // Reset scroll position
    await fetchBlogs()
    nextTick(() => {
        // Entrance animation
        const cards = document.querySelectorAll('.blog-card')
        if (cards.length > 0) {
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            )
        }
    })
})
</script>
