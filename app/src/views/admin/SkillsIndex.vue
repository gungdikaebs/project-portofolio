<template>
    <AdminLayout>
        <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 class="text-4xl font-bold text-white font-display tracking-tight">Skills & Stack</h2>
                <p class="text-gray-500 mt-2 text-lg">Manage your technical expertise and grouping.</p>
            </div>

            <div class="flex gap-3">
                <button @click="openCategoryModal"
                    class="px-5 py-2.5 bg-[#1A1D24] text-white rounded-xl hover:bg-[#20242D] border border-white/10 transition-all text-sm font-medium flex items-center gap-2">
                    <span>+</span> New Category
                </button>
                <button @click="() => openSkillModal()"
                    class="px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-all text-sm font-bold shadow-lg shadow-white/5 flex items-center gap-2">
                    <span>+</span> Add Skill
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <!-- Content -->
        <div v-else class="space-y-12">

            <div v-for="category in categories" :key="category.id" class="animate-enter">

                <!-- Category Header -->
                <div class="flex items-end gap-4 mb-6 border-b border-white/5 pb-4">
                    <h3 class="text-2xl font-bold text-white font-display">{{ category.name }}</h3>
                    <span class="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-500 border border-white/5">{{
                        category.skills.length }}</span>
                </div>

                <!-- Skills Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">

                    <!-- Skill Card -->
                    <div v-for="skill in category.skills" :key="skill.id" @click="editSkill(skill)"
                        class="group relative bg-[#11141A] hover:bg-[#161920] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer flex flex-col items-center justify-between gap-4 aspect-square shadow-sm hover:shadow-xl hover:shadow-black/50">
                        <!-- SVG Icon -->
                        <div
                            class="flex-1 w-full flex items-center justify-center text-gray-400 group-hover:text-white transition-colors duration-300">
                            <div v-if="skill.svgContent" v-html="skill.svgContent" class="w-12 h-12 fill-current">
                            </div>
                            <span v-else
                                class="text-xs font-mono opacity-30 border border-dashed border-white/20 px-2 py-1 rounded">SVG</span>
                        </div>

                        <p
                            class="text-gray-400 group-hover:text-white font-medium text-sm text-center truncate w-full transition-colors">
                            {{ skill.name }}
                        </p>

                        <!-- Quick Actions -->
                        <button @click.stop="deleteSkill(skill.id)"
                            class="absolute top-3 right-3 p-1.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all bg-[#0B0D10] hover:bg-white/5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Add to Category Button -->
                    <button @click="() => openSkillModal(category.id)"
                        class="group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-all aspect-square text-gray-600 hover:text-white">
                        <div
                            class="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <span class="text-2xl leading-none mb-1">+</span>
                        </div>
                        <span class="text-xs font-medium">Add to collection</span>
                    </button>

                </div>
            </div>

        </div>

        <!-- Skill Modal -->
        <div v-if="showSkillModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade">
            <div @click.stop
                class="bg-[#11141A] w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">

                <!-- Glow effect -->
                <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20">
                </div>

                <h3 class="text-xl font-bold text-white mb-6 font-display">{{ isEditing ? 'Edit Skill' : 'New Skill' }}
                </h3>

                <form @submit.prevent="saveSkill" class="space-y-5">
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Skill
                            Name</label>
                        <input v-model="skillForm.name" type="text" required placeholder="e.g. Vue.js"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all">
                    </div>

                    <div>
                        <label
                            class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
                        <div class="relative">
                            <select v-model="skillForm.categoryId" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/30 transition-all">
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">SVG
                            Content</label>
                        <textarea v-model="skillForm.svgContent" rows="4"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-white/30 transition-all text-gray-400 resize-none"
                            placeholder='<svg viewBox="0 0 24 24" ...> ... </svg>'></textarea>
                        <p class="text-[10px] text-gray-600 mt-2">Paste raw SVG code here. Remove width/height
                            attributes for best results.</p>
                    </div>

                    <div class="flex gap-3 mt-8">
                        <button type="button" @click="showSkillModal = false"
                            class="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Cancel
                        </button>
                        <button type="submit"
                            class="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                            :disabled="isSubmitting">
                            {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Skill' : 'Create Skill') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Category Modal -->
        <div v-if="showCategoryModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade">
            <div @click.stop
                class="bg-[#11141A] w-full max-w-sm rounded-2xl border border-white/10 p-6 shadow-2xl relative">
                <h3 class="text-xl font-bold text-white mb-6 font-display">New Category</h3>

                <form @submit.prevent="createCategory" class="space-y-5">
                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Category
                            Name</label>
                        <input v-model="categoryName" type="text" required placeholder="e.g. Backend & DevOps"
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-all">
                    </div>

                    <div class="flex gap-3 mt-8">
                        <button type="button" @click="showCategoryModal = false"
                            class="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                            Cancel
                        </button>
                        <button type="submit"
                            class="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                            :disabled="isSubmitting">
                            {{ isSubmitting ? 'Creating...' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import api from '../../services/api';

interface Skill {
    id: string;
    name: string;
    categoryId: string;
    svgContent: string | null;
}

interface Category {
    id: string;
    name: string;
    skills: Skill[];
}

const loading = ref(true);
const categories = ref<Category[]>([]);
const isSubmitting = ref(false);

// Skill Modal State
const showSkillModal = ref(false);
const isEditing = ref(false);
const skillForm = ref({
    id: '',
    name: '',
    categoryId: '',
    svgContent: ''
});

// Category Modal State
const showCategoryModal = ref(false);
const categoryName = ref('');

const fetchSkills = async () => {
    loading.value = true;
    try {
        const res = await api.get('/skills/categories');
        categories.value = res.data;
    } catch (error) {
        console.error('Failed to fetch skills', error);
    } finally {
        loading.value = false;
    }
};

const openCategoryModal = () => {
    categoryName.value = '';
    showCategoryModal.value = true;
};

const createCategory = async () => {
    if (!categoryName.value) return;
    isSubmitting.value = true;
    try {
        await api.post('/skills/categories', { name: categoryName.value });
        showCategoryModal.value = false;
        fetchSkills();
    } catch (err) {
        alert("Failed to create category");
    } finally {
        isSubmitting.value = false;
    }
};

const openSkillModal = (preselectCategoryId?: string) => {
    isEditing.value = false;
    skillForm.value = {
        id: '',
        name: '',
        categoryId: preselectCategoryId || (categories.value[0]?.id || ''),
        svgContent: ''
    };
    showSkillModal.value = true;
};

const editSkill = (skill: Skill) => {
    isEditing.value = true;
    skillForm.value = { ...skill };

    if (!skill.categoryId) {
        const parentCat = categories.value.find(c => c.skills.some(s => s.id === skill.id));
        if (parentCat) skillForm.value.categoryId = parentCat.id;
    }
    showSkillModal.value = true;
};

const saveSkill = async () => {
    isSubmitting.value = true;
    try {
        const payload = {
            name: skillForm.value.name,
            categoryId: skillForm.value.categoryId,
            svgContent: skillForm.value.svgContent || undefined
        };

        if (isEditing.value) {
            await api.patch(`/skills/${skillForm.value.id}`, payload);
        } else {
            await api.post('/skills', payload);
        }
        showSkillModal.value = false;
        fetchSkills();
    } catch (err) {
        console.error(err);
        alert('Failed to save skill');
    } finally {
        isSubmitting.value = false;
    }
};

const deleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
    } catch (err) {
        alert("Failed to delete skill");
    }
};

onMounted(() => {
    fetchSkills();
});
</script>

<style scoped>
.animate-enter {
    opacity: 0;
    animation: enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes enter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade {
    animation: fade 0.2s ease-out forwards;
}

@keyframes fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Stagger animation for list items */
.space-y-12>div:nth-child(1) {
    animation-delay: 0ms;
}

.space-y-12>div:nth-child(2) {
    animation-delay: 100ms;
}

.space-y-12>div:nth-child(3) {
    animation-delay: 200ms;
}

.space-y-12>div:nth-child(4) {
    animation-delay: 300ms;
}
</style>
