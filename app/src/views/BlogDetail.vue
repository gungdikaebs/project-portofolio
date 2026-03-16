<template>
    <main class="pt-32 pb-32 min-h-screen relative">
        <!-- Background Elements -->
        <div class="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[0%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-[100%] blur-[120px]"></div>
        </div>

        <div v-if="loading" class="w-full max-w-[800px] mx-auto px-6 relative z-10 pt-10">
            <div class="animate-pulse flex flex-col gap-8">
                <div class="w-32 h-6 bg-white/5 rounded"></div>
                <div class="w-full h-16 bg-white/5 rounded"></div>
                <div class="w-3/4 h-16 bg-white/5 rounded"></div>
                <div class="w-full aspect-[21/9] bg-white/5 rounded-2xl mt-8"></div>
                <div class="flex flex-col gap-4 mt-12">
                    <div class="w-full h-4 bg-white/5 rounded" v-for="i in 10" :key="i"></div>
                </div>
            </div>
        </div>

        <article v-else-if="blog" class="w-full max-w-[800px] mx-auto px-6 relative z-10">
            <!-- Header -->
            <header class="mb-14 reveal-content">
                <router-link to="/blog" class="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-10 group font-mono text-sm uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    All Articles
                </router-link>

                <div class="flex items-center gap-4 text-sm font-mono text-secondary mb-6">
                    <span class="text-accent/80 border border-accent/20 px-3 py-1 rounded-full bg-accent/5" v-if="blog.category">{{ blog.category.name }}</span>
                    <span>{{ formatDate(blog.publishedAt || blog.createdAt) }}</span>
                </div>

                <h1 class="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
                    {{ blog.title }}
                </h1>
            </header>

            <!-- Cover Image -->
            <div class="w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden bg-surface mb-16 reveal-content border border-white/10">
                <img v-if="blog.coverImage" :src="getImageUrl(blog.coverImage)" :alt="blog.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center">
                    <span class="text-white/10 font-heading text-6xl font-bold opacity-30">BLOG</span>
                </div>
            </div>

            <!-- Content HTML -->
            <div class="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:text-white prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10 reveal-content custom-prose" v-html="blog.content">
            </div>
            
            <!-- Footer -->
            <div class="mt-24 pt-8 border-t border-white/10 flex justify-between items-center reveal-content">
                <router-link to="/blog" class="text-secondary hover:text-white transition-colors font-mono text-sm uppercase">← Back to Articles</router-link>
            </div>
        </article>

        <div v-else class="w-full max-w-[800px] mx-auto px-6 relative z-10 pt-32 text-center">
            <h1 class="text-4xl font-heading font-bold text-white mb-6">Article Not Found</h1>
            <p class="text-secondary mb-8">The article you are looking for does not exist or has been removed.</p>
            <router-link to="/blog" class="inline-flex items-center justify-center bg-accent text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors">
                Back to Blog
            </router-link>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { useBlog } from '../composables/useBlog'

const route = useRoute()
const { blog, loading, fetchBlogBySlug } = useBlog()

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(async () => {
    window.scrollTo(0, 0); // Reset scroll position
    const slug = route.params.slug as string;
    
    await fetchBlogBySlug(slug)
    
    nextTick(() => {
        // Entrance animation
        const elements = document.querySelectorAll('.reveal-content')
        if (elements.length > 0) {
            gsap.fromTo(elements,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                }
            )
        }
    })
})
</script>

<style>
/* Custom typography styles to override/extend Tailwind prose */
.custom-prose p {
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin-bottom: 1.5em;
}
.custom-prose h2, .custom-prose h3, .custom-prose h4 {
    margin-top: 2em;
    margin-bottom: 0.75em;
    color: var(--color-text-primary);
}
.custom-prose strong {
    color: var(--color-text-primary);
}
.custom-prose blockquote {
    border-left-color: var(--color-accent);
    background: rgba(255, 255, 255, 0.02);
    padding: 1rem 1.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    color: var(--color-text-primary);
    font-style: italic;
}
.custom-prose pre {
    background-color: var(--color-surface);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.custom-prose code {
    color: var(--color-accent);
    background: rgba(106, 227, 255, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-weight: 400;
}
.custom-prose pre code {
    background: transparent;
    color: inherit;
    padding: 0;
}
</style>
