<template>
    <div>
    <main class="min-h-screen pt-32 pb-28">
        <div class="section-shell">
            <header class="border-t border-white/25 pt-5 pb-16 md:pb-24">
                <div class="flex items-center justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-secondary"><span>Index / 02</span><router-link to="/" class="hover:text-primary">← Back to portfolio</router-link></div>
                <h1 class="mt-12 max-w-4xl font-heading text-[clamp(3.7rem,9vw,8rem)] font-bold leading-[0.94] tracking-[-0.07em] text-primary">All <span class="font-normal italic">articles.</span></h1>
                <p class="mt-8 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">Notes on web development, lessons from shipped work, and tools I am currently exploring.</p>
            </header>

            <div v-if="loading" class="border-t border-white/25 pt-8">
                <EditorialLoader label="article index" message="Gathering the latest writing." />
            </div>
            <div v-else-if="blogs.length" class="border-t border-white/25">
                <article v-for="(post, index) in blogs" :key="post.id" class="group grid gap-6 border-b border-white/25 py-10 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] md:gap-12 md:py-12">
                    <router-link :to="'/blog/' + post.slug" class="relative block aspect-[16/10] overflow-hidden border border-white/10 bg-surface" :aria-label="`Read ${post.title}`">
                        <img v-if="post.coverImage && !failedImages.has(post.id)" :src="getImageUrl(post.coverImage)" :alt="post.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" @error="markImageFailed(post.id)" />
                        <div v-else class="flex h-full flex-col justify-between p-6 md:p-8" aria-hidden="true"><span class="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-secondary">Journal / {{ formatIndex(index) }}</span><span class="max-w-[15ch] font-heading text-2xl font-semibold leading-tight text-primary md:text-3xl">{{ post.title }}</span></div>
                    </router-link>
                    <div class="flex min-w-0 flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-secondary"><span>{{ formatIndex(index) }} / {{ post.category?.name || 'Journal' }}</span><time>{{ formatDate(post.publishedAt || post.createdAt) }}</time></div>
                            <h2 class="mt-7 max-w-[16ch] font-heading text-[clamp(2rem,4vw,4rem)] font-bold leading-[1.06] tracking-[-0.055em] text-primary"><router-link :to="'/blog/' + post.slug" class="hover:underline hover:decoration-white/40 hover:underline-offset-8">{{ post.title }}</router-link></h2>
                            <p v-if="post.excerpt" class="mt-6 max-w-xl text-base leading-relaxed text-secondary">{{ post.excerpt }}</p>
                        </div>
                        <router-link :to="'/blog/' + post.slug" class="mt-9 inline-flex min-h-11 w-fit items-center gap-3 border-b border-white/50 text-sm text-primary transition-colors hover:border-white">Read article <span aria-hidden="true">↗</span></router-link>
                    </div>
                </article>
            </div>
            <div v-else class="border-t border-white/25 py-20 text-secondary">No articles published yet.</div>
        </div>
    </main>
    <Footer />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBlog } from '../composables/useBlog'
import Footer from '../components/Footer.vue'
import EditorialLoader from '../components/EditorialLoader.vue'

const { blogs, loading, fetchBlogs } = useBlog()
const failedImages = ref(new Set<string>())
const markImageFailed = (id: string) => { failedImages.value = new Set([...failedImages.value, id]) }

const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
}
const formatIndex = (index: number) => index < 9 ? `0${index + 1}` : String(index + 1)

onMounted(fetchBlogs)
</script>
