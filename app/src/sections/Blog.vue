<template>
    <section id="blog" class="py-20 relative overflow-hidden">
        <!-- Rich Background Elements -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <!-- Top-left glow -->
            <div class="absolute top-[15%] left-[-10%] w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]"></div>
            <!-- Bottom-right glow -->
            <div class="absolute bottom-[5%] right-[-8%] w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px]"></div>

            <!-- Grid pattern -->
            <div class="absolute inset-0 opacity-[0.03]"
                style="background-image: linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, #000 40%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, #000 40%, transparent 100%);">
            </div>

            <!-- Decorative SVG shapes -->
            <div class="absolute top-[8%] right-[5%] opacity-[0.03] rotate-12">
                <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="white" stroke-width="0.5">
                    <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
                </svg>
            </div>
            <div class="absolute bottom-[15%] left-[3%] opacity-[0.03] -rotate-6">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="white" stroke-width="0.5">
                    <circle cx="50" cy="50" r="40" />
                    <circle cx="50" cy="50" r="25" />
                </svg>
            </div>

            <!-- Watermark -->
            <div class="absolute top-[2%] right-[-2%] select-none z-0">
                <span class="text-[10rem] md:text-[14rem] font-heading font-bold text-white/[0.015] leading-none">BLOG</span>
            </div>
        </div>

        <!-- Top border line -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">
            <!-- Section Header -->
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h2 class="font-heading font-bold text-5xl md:text-7xl text-primary mb-6 reveal-blog-text">
                        Latest <br /> <span class="text-accent">Articles.</span>
                    </h2>
                    <p class="text-secondary text-lg max-w-xl reveal-blog-text leading-relaxed">
                        Thoughts, learnings, and insights about web development, design, and technology.
                    </p>
                </div>

                <!-- Desktop View All Button -->
                <div class="hidden md:block reveal-blog-text">
                    <router-link to="/blog"
                        class="group relative inline-flex items-center gap-3 px-8 py-4 bg-surface border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(106,227,255,0.1)]">
                        <div class="absolute inset-0 bg-accent/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        <span class="relative z-10 font-heading font-bold text-white group-hover:text-accent transition-colors">Read All Articles</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 text-white group-hover:text-accent transition-colors group-hover:translate-x-1 duration-300">
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
                    <div class="w-full aspect-[16/10] bg-white/5 rounded-2xl"></div>
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
                        class="block w-full aspect-[16/10] rounded-2xl overflow-hidden relative cursor-pointer bg-surface border border-white/5 hover:border-accent/20 transition-colors duration-500">
                        <!-- Image -->
                        <div class="w-full h-full relative overflow-hidden">
                            <img v-if="post.coverImage" :src="getImageUrl(post.coverImage)" :alt="post.title"
                                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            <div v-else class="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center">
                                <span class="text-white/10 font-heading text-4xl font-bold opacity-30">BLOG</span>
                            </div>
                        </div>

                        <!-- Hover Overlay -->
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <div class="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="text-white">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </div>
                    </router-link>

                    <!-- Content -->
                    <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-center text-sm font-mono text-secondary">
                            <span class="text-accent/80 border border-accent/20 px-3 py-1 rounded-full bg-accent/5" v-if="post.category">{{ post.category.name }}</span>
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
            
            <div v-else class="py-20 text-center border border-white/5 bg-surface/30 rounded-3xl">
                <p class="text-secondary font-mono">No articles published yet.</p>
            </div>

            <!-- Mobile Only View All Button -->
            <div class="md:hidden mt-12 flex justify-center">
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

const initAnimations = () => {
    ScrollTrigger.refresh()

    // Section header text reveal with stagger
    const texts = document.querySelectorAll('.reveal-blog-text')
    texts.forEach((text, i) => {
        gsap.fromTo(text,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#blog',
                    start: 'top 80%'
                },
                delay: i * 0.15
            }
        )
    })

    // Blog cards — staggered entrance with scale
    const cards = document.querySelectorAll('.blog-card')
    if (cards.length > 0) {
        gsap.fromTo(cards,
            { y: 80, opacity: 0, scale: 0.95 },
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

    // Parallax floating backgrounds
    gsap.to('#blog .absolute.top-\\[15\\%\\]', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
            trigger: '#blog',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    })

    gsap.to('#blog .absolute.bottom-\\[5\\%\\]', {
        y: 40,
        ease: 'none',
        scrollTrigger: {
            trigger: '#blog',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        }
    })
}

onMounted(async () => {
    await fetchBlogs()
    nextTick(() => {
        initAnimations()
    })
})
</script>
