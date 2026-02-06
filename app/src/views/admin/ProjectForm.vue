<template>
    <AdminLayout>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold text-white font-display">{{ isEditing ? 'Edit Project' : 'New Project' }}
                </h2>
                <p class="text-gray-400 mt-2">Showcase your best work.</p>
            </div>
            <button @click="router.back()" class="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Cancel
            </button>
        </div>

        <form @submit.prevent="submitForm" class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Left Column: Main Info -->
            <div class="lg:col-span-2 space-y-6">

                <!-- General Info Card -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 class="text-xl font-bold text-white mb-4">General Information</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Title -->
                        <div class="col-span-2">
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Project
                                Title</label>
                            <input v-model="form.title" @input="generateSlug" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                placeholder="e.g. E-Commerce Dashboard">
                        </div>

                        <!-- Slug -->
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Slug
                                (URL)</label>
                            <input v-model="form.slug" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-gray-400 focus:outline-none focus:border-white/30 transition-all font-mono text-sm">
                        </div>

                        <!-- Year -->
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Year</label>
                            <input v-model.number="form.year" type="number" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>

                        <!-- Category -->
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Category</label>
                            <input v-model="form.category" type="text" required placeholder="e.g. Web App, Mobile App"
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>

                        <!-- Project URL -->
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Live
                                URL</label>
                            <input v-model="form.projectUrl" type="url"
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                placeholder="https://...">
                        </div>

                        <!-- Description -->
                        <div class="col-span-2">
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea v-model="form.description" rows="5" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Skills Selection -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5">
                    <h3 class="text-xl font-bold text-white mb-4">Tech Stack</h3>

                    <div v-if="loadingSkills" class="text-sm text-gray-500">Loading skills...</div>

                    <div v-else class="space-y-4">
                        <div v-for="category in skillCategories" :key="category.id">
                            <h4 class="text-sm font-bold text-gray-400 mb-2 uppercase">{{ category.name }}</h4>
                            <div class="flex flex-wrap gap-2">
                                <button type="button" v-for="skill in category.skills" :key="skill.id"
                                    @click="toggleSkill(skill.id)"
                                    class="px-3 py-1.5 rounded-lg text-sm border transition-all flex items-center gap-2"
                                    :class="form.skillIds.includes(skill.id)
                                        ? 'bg-blue-600 border-blue-500 text-white'
                                        : 'bg-[#0B0D10] border-white/10 text-gray-400 hover:border-white/30'">
                                    {{ skill.name }}
                                </button>
                            </div>
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
                        <label
                            class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</label>
                        <select v-model="form.status"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/30 transition-all">
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                        </select>
                    </div>

                    <div class="flex items-center gap-3 pt-2">
                        <input v-model="form.featured" type="checkbox" id="featured"
                            class="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-[#0B0D10]">
                        <label for="featured" class="text-sm text-white select-none cursor-pointer">Mark as
                            Featured</label>
                    </div>

                    <!-- Actions -->
                    <div class="pt-4 flex flex-col gap-3">
                        <button type="submit" :disabled="saving"
                            class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50">
                            {{ saving ? 'Saving...' : 'Save Project' }}
                        </button>
                    </div>
                </div>

                <!-- Thumbnail Upload -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 class="text-xl font-bold text-white mb-2">Thumbnail</h3>

                    <div class="aspect-video rounded-xl bg-[#0B0D10] border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                        @click="triggerFileInput">
                        <img v-if="previewImage" :src="previewImage"
                            class="w-full h-full object-cover absolute inset-0 z-0">

                        <div
                            class="z-10 bg-black/50 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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

const route = useRoute();
const router = useRouter();

const isEditing = computed(() => route.params.id !== undefined);
const loadingSkills = ref(true);
const saving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const skillCategories = ref<any[]>([]);

const form = ref({
    title: '',
    slug: '',
    description: '',
    category: '',
    year: new Date().getFullYear(),
    projectUrl: '',
    imageUrl: '',
    status: 'DRAFT',
    featured: false,
    skillIds: [] as string[]
});

const previewImage = computed(() => {
    if (!form.value.imageUrl) return null;
    if (form.value.imageUrl.startsWith('http')) return form.value.imageUrl;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${form.value.imageUrl}`;
});

const generateSlug = () => {
    if (!isEditing.value || !form.value.slug) { // Auto-gen mainly for new projects
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
    if (file) {
        formData.append('file', file);
    }

    try {
        const res = await api.post('/media/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        // Assuming backend returns { fileUrl: '/uploads/...' }
        form.value.imageUrl = res.data.fileUrl; // This might be relative
    } catch (error) {
        console.error('Upload failed', error);
        alert('Failed to upload image');
    }
};

const fetchSkills = async () => {
    loadingSkills.value = true;
    try {
        const res = await api.get('/skills/categories');
        skillCategories.value = res.data;
    } catch (error) {
        console.error('Failed to fetch skills', error);
    } finally {
        loadingSkills.value = false;
    }
};

const toggleSkill = (id: string) => {
    const index = form.value.skillIds.indexOf(id);
    if (index === -1) {
        form.value.skillIds.push(id);
    } else {
        form.value.skillIds.splice(index, 1);
    }
};

const fetchProject = async (id: string) => {
    try {
        const res = await api.get(`/projects/${id}`);
        const data = res.data;
        form.value = {
            title: data.title,
            slug: data.slug,
            description: data.description,
            category: data.category,
            year: data.year,
            projectUrl: data.projectUrl,
            imageUrl: data.imageUrl,
            status: data.status,
            featured: data.featured,
            skillIds: data.skills.map((s: any) => s.skillId) // Flatten nested relation
        };
    } catch (error) {
        console.error('Failed to fetch project', error);
        alert('Failed to load project data');
        router.push('/admin/projects');
    }
};

const submitForm = async () => {
    // Validations
    if (!form.value.imageUrl) return alert("Thumbnail image is required");

    saving.value = true;
    try {
        const payload = { ...form.value };

        if (isEditing.value) {
            await api.patch(`/projects/${route.params.id}`, payload);
        } else {
            await api.post('/projects', payload);
        }

        router.push('/admin/projects');
    } catch (error) {
        console.error('Save failed', error);
        alert('Failed to save project');
    } finally {
        saving.value = false;
    }
};

onMounted(() => {
    fetchSkills();
    if (isEditing.value) {
        fetchProject(route.params.id as string);
    }
});
</script>
