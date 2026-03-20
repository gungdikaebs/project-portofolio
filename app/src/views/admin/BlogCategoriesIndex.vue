<template>
    <AdminLayout>
        <div class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 class="text-4xl font-bold text-white font-display tracking-tight">Blog Categories</h2>
                <p class="text-gray-500 mt-2 text-lg">Manage categories for your blog posts.</p>
            </div>
            
            <form @submit.prevent="createCategory" class="flex gap-2 w-full md:w-auto">
                <input v-model="newCategoryName" type="text" placeholder="New Category Name" required
                    class="px-4 py-2 bg-[#11141A] border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30" />
                <button type="submit"
                    class="px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-all text-sm font-bold shadow-lg shadow-white/5 flex items-center gap-2">
                    <span>+</span> Add
                </button>
            </form>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>

        <div v-else class="space-y-6">
            <div class="bg-[#11141A] rounded-2xl border border-white/5 overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-white/5 bg-white/[0.02]">
                            <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th class="py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        <tr v-for="category in categories" :key="category.id"
                            class="group hover:bg-white/[0.02] transition-colors">
                            <td class="py-4 px-6">
                                <span class="text-white font-bold text-sm">{{ category.name }}</span>
                            </td>
                            <td class="py-4 px-6 text-gray-400 text-sm font-mono">
                                {{ category.slug }}
                            </td>
                            <td class="py-4 px-6 text-right">
                                <button @click="deleteCategory(category.id)"
                                    class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="categories.length === 0">
                            <td colspan="3" class="py-12 text-center text-gray-500">No categories found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import { blogCategoriesService } from '../../services/blog.service';

const loading = ref(true);
const categories = ref<any[]>([]);
const newCategoryName = ref('');

const fetchCategories = async () => {
    loading.value = true;
    try {
        const res = await blogCategoriesService.getCategories();
        categories.value = res.data;
    } catch (error) {
        console.error('Failed to fetch categories', error);
    } finally {
        loading.value = false;
    }
};

const createCategory = async () => {
    if (!newCategoryName.value.trim()) return;
    try {
        await blogCategoriesService.createCategory({ name: newCategoryName.value.trim() });
        newCategoryName.value = '';
        await fetchCategories();
    } catch (error) {
        alert("Failed to create category");
    }
};

const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
        await blogCategoriesService.deleteCategory(id);
        await fetchCategories();
    } catch (err) {
        alert("Failed to delete category");
    }
};

onMounted(() => {
    fetchCategories();
});
</script>
