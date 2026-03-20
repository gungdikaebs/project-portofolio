<template>
    <AdminLayout>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold text-white font-display">{{ isEditing ? 'Edit Blog Post' : 'New Blog Post' }}</h2>
                <p class="text-gray-400 mt-2">Write and share your thoughts.</p>
            </div>
            <button @click="router.back()" class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Cancel
            </button>
        </div>

        <form @submit.prevent="submitForm" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Main Info -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 class="text-xl font-bold text-white mb-4">Post Content</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Title -->
                        <div class="col-span-2">
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Title</label>
                            <input v-model="form.title" @input="generateSlug" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                placeholder="e.g. How to Build A Vue App">
                        </div>

                        <!-- Slug -->
                        <div class="col-span-2">
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Slug (URL)</label>
                            <input v-model="form.slug" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-gray-400 focus:outline-none focus:border-white/30 transition-all font-mono text-sm">
                        </div>

                        <!-- Category -->
                        <div class="col-span-2">
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Category</label>
                            <select v-model="form.categoryId"
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/30 transition-all">
                                <option value="" disabled>Select a category</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                        </div>

                        <!-- Content -->
                        <div class="col-span-2">
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Content (HTML)</label>
                            <textarea v-model="form.content" rows="12" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all font-mono text-sm"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Media & Status -->
            <div class="space-y-6">
                <!-- Status Card -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 class="text-xl font-bold text-white mb-4">Publishing</h3>

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</label>
                        <select v-model="form.isPublished"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/30 transition-all">
                            <option :value="false">Draft</option>
                            <option :value="true">Published</option>
                        </select>
                    </div>

                    <!-- Actions -->
                    <div class="pt-4 flex flex-col gap-3">
                        <button type="submit" :disabled="saving"
                            class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">
                            {{ saving ? 'Saving...' : 'Save Post' }}
                        </button>
                    </div>
                </div>

                <!-- Cover Image Upload -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 class="text-xl font-bold text-white mb-2">Cover Image</h3>

                    <div class="aspect-video rounded-xl bg-[#0B0D10] border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                        @click="triggerFileInput">
                        <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover absolute inset-0 z-0">

                        <div class="z-10 bg-black/50 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <span class="text-white text-xs">Change Image</span>
                        </div>

                        <div v-if="!previewImage" class="text-gray-500 text-center p-4">
                            <span class="block text-2xl mb-2">📷</span>
                            <span class="text-xs">Click to upload</span>
                        </div>
                    </div>
                    <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload">
                </div>
            </div>
        </form>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminLayout from '../../layouts/AdminLayout.vue';
import api from '../../services/api';
import { blogService, blogCategoriesService } from '../../services/blog.service';

const route = useRoute();
const router = useRouter();

const isEditing = computed(() => route.params.id !== undefined);
const saving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const categories = ref<any[]>([]);

const form = ref({
    title: '',
    slug: '',
    content: '',
    categoryId: '',
    coverImage: '',
    isPublished: false,
});

const previewImage = computed(() => {
    if (!form.value.coverImage) return null;
    if (form.value.coverImage.startsWith('http')) return form.value.coverImage;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${form.value.coverImage}`;
});

const generateSlug = () => {
    if (!isEditing.value || !form.value.slug) {
        form.value.slug = form.value.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
};

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;

    const file = target.files[0];
    const formData = new FormData();
    if (file) formData.append('file', file);

    try {
        const res = await api.post('/media/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        form.value.coverImage = res.data.fileUrl;
    } catch (error) {
        console.error('Upload failed', error);
        alert('Failed to upload image');
    }
};

const fetchCategories = async () => {
    try {
        const res = await blogCategoriesService.getCategories();
        categories.value = res.data;
    } catch (error) {
        console.error('Failed to fetch categories', error);
    }
};

const fetchBlog = async (id: string) => {
    try {
        // We use api.get because blogService.getBlog uses slug in public, but admin needs by ID.
        // Actually, blog controller often uses id. Let's use api.get to be safe or check the backend.
        const res = await api.get(`/blog/${id}`);
        const data = res.data;
        form.value = {
            title: data.title,
            slug: data.slug,
            content: data.content,
            categoryId: data.categoryId || '',
            coverImage: data.coverImage || '',
            isPublished: data.isPublished,
        };
    } catch (error) {
        console.error('Failed to fetch blog', error);
        alert('Failed to load blog post');
        router.push('/admin/blog');
    }
};

const submitForm = async () => {
    saving.value = true;
    try {
        const payload = { ...form.value };
        
        // Remove empty categoryId to let Prisma handle null relations properly if needed
        if (!payload.categoryId) delete (payload as any).categoryId;

        if (isEditing.value) {
            await blogService.updateBlog(route.params.id as string, payload);
        } else {
            await blogService.createBlog(payload);
        }

        router.push('/admin/blog');
    } catch (error) {
        console.error('Save failed', error);
        alert('Failed to save blog post');
    } finally {
        saving.value = false;
    }
};

onMounted(() => {
    fetchCategories();
    if (isEditing.value) {
        fetchBlog(route.params.id as string);
    }
});
</script>
