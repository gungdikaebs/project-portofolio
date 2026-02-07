<template>
    <AdminLayout>
        <div class="mb-10">
            <h2 class="text-4xl font-bold text-white font-display tracking-tight">Profile & Bio</h2>
            <p class="text-gray-500 mt-2 text-lg">Manage your personal information and CV.</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <form v-else @submit.prevent="saveProfile" class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Main Info -->
            <div class="lg:col-span-2 space-y-6">

                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-6">
                    <h3 class="text-xl font-bold text-white mb-4">Personal Details</h3>

                    <!-- Bio -->
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Short
                            Bio</label>
                        <textarea v-model="form.bio" rows="4" required
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                            placeholder="Frontend Developer..."></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Location -->
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Location</label>
                            <input v-model="form.location" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                                placeholder="Bali, Indonesia">
                        </div>

                        <!-- Years Exp -->
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Years
                                Exp</label>
                            <input v-model.number="form.yearsExperience" type="number" min="0" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>

                        <!-- Projects Done -->
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Projects
                                Completed</label>
                            <input v-model.number="form.projectsDone" type="number" min="0" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>

                        <!-- Availability -->
                        <div class="flex items-center gap-3 pt-6">
                            <div @click="form.availableForHi = !form.availableForHi"
                                class="w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300"
                                :class="form.availableForHi ? 'bg-green-500/20' : 'bg-gray-700'">
                                <div class="absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 shadow-sm"
                                    :class="form.availableForHi ? 'translate-x-6 bg-green-500' : 'bg-gray-400'"></div>
                            </div>
                            <span class="text-sm font-medium text-gray-300">Available for "Say Hi"</span>
                        </div>
                    </div>

                </div>

            </div>

            <!-- Right Column: CV & Actions -->
            <div class="space-y-6">

                <!-- CV Upload -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 class="text-xl font-bold text-white mb-2">Curriculum Vitae</h3>

                    <div v-if="form.cvUrl"
                        class="bg-[#0B0D10] p-4 rounded-xl border border-white/10 flex items-center justify-between group">
                        <div class="flex items-center gap-3 overflow-hidden">
                            <span class="text-2xl">📄</span>
                            <a :href="getFileUrl(form.cvUrl)" target="_blank"
                                class="text-xs text-blue-400 hover:underline truncate">View Current CV</a>
                        </div>
                        <button type="button" @click="form.cvUrl = ''" class="text-gray-500 hover:text-red-400">
                            ✕
                        </button>
                    </div>

                    <div v-else
                        class="h-32 rounded-xl bg-[#0B0D10] border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all"
                        @click="triggerFileInput">
                        <span class="text-2xl mb-2 group-hover:scale-110 transition-transform">📎</span>
                        <span class="text-xs text-gray-500">Upload PDF</span>
                    </div>
                    <input type="file" ref="fileInput" class="hidden" accept=".pdf,.doc,.docx"
                        @change="handleFileUpload">
                </div>

                <!-- Save Action -->
                <div class="bg-[#11141A] p-6 rounded-2xl border border-white/5">
                    <button type="submit" :disabled="saving"
                        class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 flex justify-center gap-2">
                        <span v-if="saving" class="animate-spin">⏳</span>
                        {{ saving ? 'Saving Changes...' : 'Save Profile' }}
                    </button>
                </div>

            </div>

        </form>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import api from '../../services/api';

const loading = ref(true);
const saving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const form = ref({
    bio: '',
    location: '',
    yearsExperience: 0,
    projectsDone: 0,
    cvUrl: '',
    availableForHi: true
});

const getFileUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
};


const fetchProfile = async () => {
    loading.value = true;
    try {
        const res = await api.get('/profile');
        const data = res.data;
        form.value = {
            bio: data.bio,
            location: data.location,
            yearsExperience: data.yearsExperience,
            projectsDone: data.projectsDone,
            cvUrl: data.cvUrl || '',
            availableForHi: data.availableForHi
        };
    } catch (error) {
        console.error('Failed to fetch profile', error);
    } finally {
        loading.value = false;
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
        form.value.cvUrl = res.data.fileUrl;
    } catch (error) {
        console.error('Upload failed', error);
        alert('Failed to upload CV');
    }
};

const saveProfile = async () => {
    saving.value = true;
    try {
        await api.patch('/profile', form.value);
        alert("Profile updated successfully!");
    } catch (err) {
        console.error(err);
        alert("Failed to update profile");
    } finally {
        saving.value = false;
    }
};

onMounted(() => {
    fetchProfile();
});
</script>
