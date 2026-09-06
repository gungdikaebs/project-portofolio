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
                        <div class="md:col-span-2">
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
                            <p class="mt-2 text-xs text-gray-600">Optional. Must start with http:// or https://.</p>
                        </div>

                        <!-- Source Code URL -->
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Source
                                Code URL</label>
                            <input v-model="form.sourceCodeUrl" type="url"
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                placeholder="https://github.com/...">
                            <p class="mt-2 text-xs text-gray-600">Optional. Repository link is kept separate from the live demo.</p>
                        </div>

                        <!-- Description -->
                        <div class="md:col-span-2">
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea v-model="form.description" rows="5" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Optional Case Study -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-6">
                    <div>
                        <h3 class="text-xl font-bold text-white">Case Study</h3>
                        <p class="mt-2 text-sm leading-relaxed text-gray-500">All fields in this section are optional. Empty sections will not appear on the public project page.</p>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Role</label>
                        <input v-model="form.role" type="text" maxlength="191"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                            placeholder="e.g. Full-Stack Developer">
                    </div>

                    <div v-for="field in caseStudyFields" :key="field.key">
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{{ field.label }}</label>
                        <textarea v-model="form[field.key]" rows="5"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                            :placeholder="field.placeholder"></textarea>
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
                                    :class="form.skillIds.indexOf(skill.id) !== -1
                                        ? 'bg-blue-600 border-blue-500 text-white'
                                        : 'bg-[#0B0D10] border-white/10 text-gray-400 hover:border-white/30'">
                                    {{ skill.name }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Gallery -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-6">
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 class="text-xl font-bold text-white">Project Gallery</h3>
                            <p class="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">
                                Add up to 8 screenshots. Use dummy data and hide personal, client, credential, or internal server information.
                            </p>
                        </div>
                        <button type="button" @click="triggerGalleryFileInput"
                            :disabled="uploadingGallery || form.galleryImages.length >= maxGalleryImages"
                            class="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-40">
                            {{ uploadingGallery ? 'Uploading...' : 'Add Screenshots' }}
                        </button>
                        <input ref="galleryFileInput" type="file" multiple accept="image/*" class="hidden"
                            @change="handleGalleryUpload">
                    </div>

                    <div v-if="form.galleryImages.length === 0"
                        class="rounded-xl border border-dashed border-white/10 bg-[#0B0D10] px-6 py-10 text-center text-sm text-gray-500">
                        No gallery screenshots yet. The project cover will still be displayed.
                    </div>

                    <div v-else class="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div v-for="(image, index) in form.galleryImages" :key="image.imageUrl"
                            class="overflow-hidden rounded-xl border border-white/10 bg-[#0B0D10]">
                            <div class="relative aspect-video bg-black/20">
                                <img :src="getFileUrl(image.imageUrl)" :alt="image.altText || `Gallery image ${index + 1}`"
                                    class="h-full w-full object-cover">
                                <span class="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-xs text-white">
                                    {{ index + 1 }}
                                </span>
                            </div>

                            <div class="space-y-4 p-4">
                                <div>
                                    <label class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">Alt text</label>
                                    <input v-model="image.altText" type="text" maxlength="191"
                                        class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                                        placeholder="e.g. Inventory dashboard overview">
                                </div>
                                <div>
                                    <label class="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">Caption</label>
                                    <input v-model="image.caption" type="text" maxlength="191"
                                        class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                                        placeholder="Briefly explain what this screen shows">
                                </div>

                                <div class="flex items-center justify-between border-t border-white/5 pt-3">
                                    <div class="flex gap-2">
                                        <button type="button" @click="moveGalleryImage(index, -1)" :disabled="index === 0"
                                            class="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:text-white disabled:opacity-30"
                                            aria-label="Move image earlier">←</button>
                                        <button type="button" @click="moveGalleryImage(index, 1)"
                                            :disabled="index === form.galleryImages.length - 1"
                                            class="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:text-white disabled:opacity-30"
                                            aria-label="Move image later">→</button>
                                    </div>
                                    <button type="button" @click="removeGalleryImage(index)"
                                        class="rounded-lg px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300">
                                        Remove
                                    </button>
                                </div>
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
                        <button type="button" @click="showPreview = true"
                            class="w-full py-3 border border-white/15 text-white font-bold rounded-xl hover:border-white/30 hover:bg-white/5 transition-colors">
                            Preview Draft
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

        <Teleport to="body">
            <div v-if="showPreview" @click.self="showPreview = false"
                class="fixed inset-0 z-[100] overflow-y-auto bg-black/90 p-4 backdrop-blur-md md:p-10"
                role="dialog" aria-modal="true" aria-label="Project draft preview">
                <div class="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#0B0D10] p-6 shadow-2xl md:p-10">
                    <div class="mb-8 flex items-center justify-between gap-4">
                        <span class="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Draft Preview</span>
                        <button type="button" @click="showPreview = false" class="text-2xl text-gray-400 hover:text-white" aria-label="Close preview">×</button>
                    </div>
                    <img v-if="previewImage" :src="previewImage" :alt="form.title || 'Project cover'" class="mb-8 aspect-video w-full rounded-2xl object-cover">
                    <p class="font-mono text-xs uppercase tracking-wider text-blue-400">{{ form.category || 'Category' }} · {{ form.year }}</p>
                    <h2 class="mt-4 text-4xl font-bold text-white">{{ form.title || 'Untitled project' }}</h2>
                    <p v-if="form.role" class="mt-3 text-sm text-gray-400">Role · {{ form.role }}</p>
                    <div class="mt-10 space-y-9">
                        <section v-for="section in previewSections" :key="section.label">
                            <h3 class="text-xl font-bold text-white">{{ section.label }}</h3>
                            <p class="mt-3 whitespace-pre-line leading-relaxed text-gray-400">{{ section.content }}</p>
                        </section>
                    </div>
                </div>
            </div>
        </Teleport>
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
const showPreview = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const galleryFileInput = ref<HTMLInputElement | null>(null);
const uploadingGallery = ref(false);
const maxGalleryImages = 8;

type GalleryImageForm = {
    imageUrl: string;
    altText: string;
    caption: string;
    sortOrder: number;
};

const skillCategories = ref<any[]>([]);

const form = ref({
    title: '',
    slug: '',
    description: '',
    role: '',
    challenge: '',
    contribution: '',
    result: '',
    category: '',
    year: new Date().getFullYear(),
    projectUrl: '',
    sourceCodeUrl: '',
    imageUrl: '',
    status: 'DRAFT',
    featured: false,
    skillIds: [] as string[],
    galleryImages: [] as GalleryImageForm[]
});

type CaseStudyField = 'challenge' | 'contribution' | 'result';

const caseStudyFields: { key: CaseStudyField; label: string; placeholder: string }[] = [
    { key: 'challenge', label: 'Challenge', placeholder: 'What problem or constraint needed to be solved?' },
    { key: 'contribution', label: 'Contribution', placeholder: 'What did you directly build or decide?' },
    { key: 'result', label: 'Result', placeholder: 'What verifiable outcome did the project produce?' },
];

const previewSections = computed(() => [
    { label: 'Overview', content: form.value.description.trim() },
    { label: 'Challenge', content: form.value.challenge.trim() },
    { label: 'Contribution', content: form.value.contribution.trim() },
    { label: 'Result', content: form.value.result.trim() },
].filter(section => section.content));

const getFileUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
};

const previewImage = computed(() => {
    if (!form.value.imageUrl) return null;
    return getFileUrl(form.value.imageUrl);
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

const triggerGalleryFileInput = () => {
    galleryFileInput.value?.click();
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

const handleGalleryUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    const remainingSlots = maxGalleryImages - form.value.galleryImages.length;

    if (files.length === 0 || remainingSlots <= 0) return;
    if (files.length > remainingSlots) {
        alert(`Only ${remainingSlots} more screenshot${remainingSlots === 1 ? '' : 's'} can be added.`);
    }

    uploadingGallery.value = true;
    try {
        const uploads = await Promise.all(files.slice(0, remainingSlots).map(async (file) => {
            const uploadData = new FormData();
            uploadData.append('file', file);
            const response = await api.post('/media/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data.fileUrl as string;
        }));

        const startOrder = form.value.galleryImages.length;
        form.value.galleryImages.push(...uploads.map((imageUrl, index) => ({
            imageUrl,
            altText: '',
            caption: '',
            sortOrder: startOrder + index,
        })));
    } catch (error) {
        console.error('Gallery upload failed', error);
        alert('One or more screenshots failed to upload. Please try again.');
    } finally {
        uploadingGallery.value = false;
        target.value = '';
    }
};

const removeGalleryImage = (index: number) => {
    form.value.galleryImages.splice(index, 1);
    form.value.galleryImages.forEach((image, imageIndex) => {
        image.sortOrder = imageIndex;
    });
};

const moveGalleryImage = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= form.value.galleryImages.length) return;

    const images = [...form.value.galleryImages];
    [images[index], images[nextIndex]] = [images[nextIndex]!, images[index]!];
    form.value.galleryImages = images.map((image, imageIndex) => ({
        ...image,
        sortOrder: imageIndex,
    }));
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
            role: data.role || '',
            challenge: data.challenge || '',
            contribution: data.contribution || '',
            result: data.result || '',
            category: data.category,
            year: data.year,
            projectUrl: data.projectUrl || '',
            sourceCodeUrl: data.sourceCodeUrl || '',
            imageUrl: data.imageUrl,
            status: data.status,
            featured: data.featured,
            skillIds: data.skills.map((s: any) => s.skillId), // Flatten nested relation
            galleryImages: (data.galleryImages || []).map((image: any, index: number) => ({
                imageUrl: image.imageUrl,
                altText: image.altText || '',
                caption: image.caption || '',
                sortOrder: image.sortOrder ?? index,
            }))
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
        const optionalText = (value: string) => value.trim() || null;
        const payload = {
            ...form.value,
            role: optionalText(form.value.role),
            challenge: optionalText(form.value.challenge),
            contribution: optionalText(form.value.contribution),
            result: optionalText(form.value.result),
            projectUrl: optionalText(form.value.projectUrl),
            sourceCodeUrl: optionalText(form.value.sourceCodeUrl),
            galleryImages: form.value.galleryImages.map((image, index) => ({
                ...image,
                sortOrder: index,
            }))
        };

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
