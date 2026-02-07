<template>
    <AdminLayout>
        <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 class="text-4xl font-bold text-white font-display tracking-tight">Academic & Certs</h2>
                <p class="text-gray-500 mt-2 text-lg">Manage your education history and professional certifications.</p>
            </div>

            <button @click="openModal"
                class="px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-all text-sm font-bold shadow-lg shadow-white/5 flex items-center gap-2">
                <span>+</span> Add {{ activeTabName }}
            </button>
        </div>

        <!-- Tabs -->
        <div class="flex items-center gap-6 border-b border-white/10 mb-8 overflow-x-auto">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                class="pb-4 text-sm font-medium transition-all relative whitespace-nowrap"
                :class="activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'">
                {{ tab.label }}
                <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full">
                </div>
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <!-- Dynamic Content -->
        <div v-else class="space-y-6">

            <!-- Education List -->
            <div v-if="activeTab === 'education'" class="space-y-4">
                <div v-for="item in educationList" :key="item.id" @click="editItem(item)"
                    class="group bg-[#11141A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer relative">
                    <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click.stop="deleteItem(item.id, 'education')"
                            class="text-gray-500 hover:text-red-400 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M3 6h18"></path>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <h3 class="text-xl font-bold text-white">{{ item.degree }}</h3>
                    <p class="text-purple-400 font-medium mb-2">{{ item.institution }}</p>
                    <p class="text-xs text-gray-500 font-mono mb-4">{{ item.startYear }} — {{ item.endYear || 'Present'
                        }}</p>
                    <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                </div>
                <div v-if="educationList.length === 0" class="text-center py-10 text-gray-500">No education added yet.
                </div>
            </div>

            <!-- Certification List -->
            <div v-if="activeTab === 'certifications'" class="space-y-4">
                <div v-for="item in certificationList" :key="item.id" @click="editItem(item)"
                    class="group bg-[#11141A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer relative">
                    <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click.stop="deleteItem(item.id, 'certifications')"
                            class="text-gray-500 hover:text-red-400 p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M3 6h18"></path>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <h3 class="text-xl font-bold text-white">{{ item.name }}</h3>
                    <p class="text-cyan-400 font-medium mb-2">{{ item.issuer }}</p>
                    <p class="text-xs text-gray-500 font-mono mb-4">{{ item.year }}</p>
                    <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                    <a v-if="item.credentialUrl" :href="item.credentialUrl" target="_blank" @click.stop
                        class="inline-block mt-3 text-xs text-white border-b border-white/30 hover:border-white pb-0.5">View
                        Credential</a>
                </div>
                <div v-if="certificationList.length === 0" class="text-center py-10 text-gray-500">No certifications
                    added yet.</div>
            </div>

        </div>

        <!-- Unified Modal -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade">
            <div
                class="bg-[#11141A] w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20">
                </div>

                <h3 class="text-xl font-bold text-white mb-6 font-display">{{ isEditing ? 'Edit' : 'Add' }} {{
                    activeTabName }}</h3>

                <form @submit.prevent="saveItem" class="space-y-5 max-h-[70vh] overflow-y-auto pr-2">

                    <!-- Education Form -->
                    <template v-if="activeTab === 'education'">
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Degree</label>
                            <input v-model="form.degree" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Institution</label>
                            <input v-model="form.institution" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Start
                                    Year</label>
                                <input v-model.number="form.startYear" type="number" required
                                    class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">End
                                    Year (opt)</label>
                                <input v-model.number="form.endYear" type="number"
                                    class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                            </div>
                        </div>
                    </template>

                    <!-- Certification Form -->
                    <template v-if="activeTab === 'certifications'">
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Certificate
                                Name</label>
                            <input v-model="form.name" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Issuer</label>
                            <input v-model="form.issuer" type="text" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Year</label>
                                <input v-model.number="form.year" type="number" required
                                    class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                            </div>
                        </div>
                        <div>
                            <label
                                class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Credential
                                URL</label>
                            <input v-model="form.credentialUrl" type="url"
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                    </template>

                    <!-- Common Description -->
                    <div>
                        <label
                            class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                        <textarea v-model="form.description" rows="4" required
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"></textarea>
                    </div>

                    <div class="flex gap-3 mt-6">
                        <button type="button" @click="showModal = false"
                            class="flex-1 py-3 text-gray-400 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                        <button type="submit"
                            class="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                            :disabled="isSubmitting">
                            {{ isSubmitting ? 'Saving...' : 'Save' }}
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import api from '../../services/api';

const activeTab = ref('education');
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);

const tabs = [
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' }
];

const activeTabName = computed(() => {
    return tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1) || 'Item'; // Remove 's' for singular
});

// Data Lists
const educationList = ref<any[]>([]);
const certificationList = ref<any[]>([]);

// Unified Form State
const form = ref<any>({});

const fetchData = async () => {
    loading.value = true;
    try {
        if (activeTab.value === 'education') {
            const res = await api.get('/education');
            educationList.value = res.data;
        } else {
            const res = await api.get('/certifications');
            certificationList.value = res.data;
        }
    } catch (error) {
        console.error('Fetch error', error);
    } finally {
        loading.value = false;
    }
};

watch(activeTab, fetchData);

const openModal = () => {
    isEditing.value = false;
    form.value = {
        description: '', // Common field
    };
    showModal.value = true;
};

const editItem = (item: any) => {
    isEditing.value = true;
    form.value = { ...item };
    showModal.value = true;
};

const saveItem = async () => {
    isSubmitting.value = true;
    try {
        const endpoint = `/${activeTab.value}`;
        const payload = { ...form.value };

        if (isEditing.value) {
            await api.patch(`${endpoint}/${form.value.id}`, payload);
        } else {
            await api.post(endpoint, payload);
        }

        showModal.value = false;
        fetchData();
    } catch (error) {
        console.error('Save error', error);
        alert('Failed to save item');
    } finally {
        isSubmitting.value = false;
    }
};

const deleteItem = async (id: string, type: string) => {
    if (!confirm("Are you sure?")) return;
    try {
        await api.delete(`/${type}/${id}`);
        fetchData();
    } catch (err) {
        alert("Failed to delete");
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
/* Custom scrollbar for form */
form::-webkit-scrollbar {
    width: 6px;
}

form::-webkit-scrollbar-track {
    background: transparent;
}

form::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
}
</style>
