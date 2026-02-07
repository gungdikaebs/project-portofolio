<template>
    <AdminLayout>
        <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 class="text-4xl font-bold text-white font-display tracking-tight">Career Experience</h2>
                <p class="text-gray-500 mt-2 text-lg">Manage your professional work history.</p>
            </div>

            <button @click="openModal"
                class="px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-all text-sm font-bold shadow-lg shadow-white/5 flex items-center gap-2">
                <span>+</span> Add Experience
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <!-- Dynamic Content -->
        <div v-else class="space-y-6">

            <!-- Experience List -->
            <div class="space-y-4">
                <div v-for="item in experienceList" :key="item.id" @click="editItem(item)"
                    class="group bg-[#11141A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer relative">
                    <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button @click.stop="deleteItem(item.id)" class="text-gray-500 hover:text-red-400 p-2">
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
                    <h3 class="text-xl font-bold text-white">{{ item.role }}</h3>
                    <p class="text-blue-400 font-medium mb-2">{{ item.company }}</p>
                    <p class="text-xs text-gray-500 font-mono mb-4">
                        {{ formatDate(item.startDate) }} — {{ item.isCurrent ? 'Present' : formatDate(item.endDate) }}
                    </p>
                    <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                </div>
                <div v-if="experienceList.length === 0" class="text-center py-10 text-gray-500">No experience added yet.
                </div>
            </div>

        </div>

        <!-- Modal -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade">
            <div
                class="bg-[#11141A] w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20">
                </div>

                <h3 class="text-xl font-bold text-white mb-6 font-display">{{ isEditing ? 'Edit' : 'Add' }} Experience
                </h3>

                <form @submit.prevent="saveItem" class="space-y-5 max-h-[70vh] overflow-y-auto pr-2">

                    <div>
                        <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Role /
                            Position</label>
                        <input v-model="form.role" type="text" required
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                    </div>
                    <div>
                        <label
                            class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Company</label>
                        <input v-model="form.company" type="text" required
                            class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Start
                                Date</label>
                            <input v-model="form.startDate" type="date" required
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                        <div :class="{ 'opacity-50': form.isCurrent }">
                            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">End
                                Date</label>
                            <input v-model="form.endDate" type="date" :disabled="form.isCurrent"
                                class="w-full bg-[#0B0D10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all">
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <input v-model="form.isCurrent" type="checkbox" id="current"
                            class="w-4 h-4 rounded bg-[#0B0D10] border-gray-600">
                        <label for="current" class="text-sm text-gray-400 cursor-pointer select-none">I currently work
                            here</label>
                    </div>

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
import { ref, onMounted } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import api from '../../services/api';

const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);

const experienceList = ref<any[]>([]);
const form = ref<any>({});

const fetchData = async () => {
    loading.value = true;
    try {
        const res = await api.get('/experience');
        experienceList.value = res.data;
    } catch (error) {
        console.error('Fetch error', error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const openModal = () => {
    isEditing.value = false;
    form.value = {
        description: '',
        isCurrent: false
    };
    showModal.value = true;
};

const editItem = (item: any) => {
    isEditing.value = true;
    form.value = { ...item };

    // Format dates for input (YYYY-MM-DD)
    if (form.value.startDate) form.value.startDate = new Date(form.value.startDate).toISOString().split('T')[0];
    if (form.value.endDate) form.value.endDate = new Date(form.value.endDate).toISOString().split('T')[0];

    showModal.value = true;
};

const saveItem = async () => {
    isSubmitting.value = true;
    try {
        const payload = { ...form.value };
        if (payload.startDate) payload.startDate = new Date(payload.startDate).toISOString();
        if (payload.endDate) payload.endDate = new Date(payload.endDate).toISOString();
        if (payload.isCurrent) delete payload.endDate;

        if (isEditing.value) {
            await api.patch(`/experience/${form.value.id}`, payload);
        } else {
            await api.post('/experience', payload);
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

const deleteItem = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
        await api.delete(`/experience/${id}`);
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
