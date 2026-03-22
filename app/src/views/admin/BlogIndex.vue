<template>
    <AdminLayout>
        <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 class="text-4xl font-bold text-white font-display tracking-tight">Blog Posts</h2>
                <p class="text-gray-500 mt-2 text-lg">Manage your blog articles.</p>
            </div>

            <router-link to="/admin/blog/create"
                class="px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-all text-sm font-bold shadow-lg shadow-white/5 flex items-center gap-2">
                <span>+</span> New Post
            </router-link>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <div v-else class="space-y-6">
            <div class="bg-[#11141A] rounded-2xl border border-white/5 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-white/5 bg-white/[0.02]">
                                <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Cover</th>
                                <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            <tr v-for="blog in blogs" :key="blog.id"
                                class="group hover:bg-white/[0.02] transition-colors">
                                <td class="py-4 px-6">
                                    <div class="h-12 w-16 bg-[#0B0D10] rounded-lg overflow-hidden border border-white/5 relative">
                                        <img v-if="blog.coverImage" :src="getImageUrl(blog.coverImage)" class="w-full h-full object-cover" alt="">
                                        <div v-else class="w-full h-full flex items-center justify-center text-gray-700 text-[10px]">No Img</div>
                                    </div>
                                </td>
                                <td class="py-4 px-6">
                                    <h3 class="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                                        {{ blog.title }}
                                    </h3>
                                    <span class="text-xs text-gray-600 font-mono">{{ blog.slug }}</span>
                                </td>
                                <td class="py-4 px-6 text-gray-400 text-sm">
                                    {{ blog.category?.name || '-' }}
                                </td>
                                <td class="py-4 px-6">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                                        :class="blog.status === 'PUBLISHED'
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                            : 'bg-gray-500/10 text-gray-400 border-gray-500/20'">
                                        {{ blog.status }}
                                    </span>
                                </td>
                                <td class="py-4 px-6 text-right">
                                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <router-link :to="`/admin/blog/${blog.id}/edit`"
                                            class="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                            </svg>
                                        </router-link>
                                        <button @click="deleteBlog(blog.id)"
                                            class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="blogs.length === 0">
                                <td colspan="5" class="py-12 text-center text-gray-500">
                                    No blog posts found. Start by creating one.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import { blogService } from '../../services/blog.service';

const loading = ref(true);
const blogs = ref<any[]>([]);

const fetchBlogs = async () => {
    loading.value = true;
    try {
        const res = await blogService.getBlogs();
        blogs.value = res.data;
    } catch (error) {
        console.error('Failed to fetch blogs', error);
    } finally {
        loading.value = false;
    }
};

const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
};

const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
        await blogService.deleteBlog(id);
        fetchBlogs();
    } catch (err) {
        alert("Failed to delete blog post");
    }
};

onMounted(() => {
    fetchBlogs();
});
</script>
