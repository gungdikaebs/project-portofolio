<template>
    <div class="min-h-screen bg-[#0B0D10] flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-[#11141A] border-r border-white/5 hidden md:flex flex-col">
            <div class="p-6 border-b border-white/5">
                <h1 class="text-xl font-bold text-white font-display">Gung Dika</h1>
                <p class="text-xs text-gray-500 mt-1">CMS Dashboard</p>
            </div>

            <nav class="flex-1 p-4 space-y-2">
                <router-link to="/admin" class="nav-item" active-class="active">
                    Dashboard
                </router-link>
                <router-link to="/admin/projects" class="nav-item" active-class="active">
                    Projects
                </router-link>
                <router-link to="/admin/skills" class="nav-item" active-class="active">
                    Skills
                </router-link>
                <router-link to="/admin/profile" class="nav-item" active-class="active">
                    Profile
                </router-link>
            </nav>

            <div class="p-4 border-t border-white/5">
                <button @click="logout"
                    class="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg text-sm transition-colors">
                    Log Out
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <div class="p-8">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
};
</script>

<style scoped>
/* Replacing @apply with standard Tailwind classes inside template or just CSS */
.nav-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #9CA3AF;
    /* text-gray-400 */
    border-radius: 0.5rem;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.nav-item:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-weight: 500;
}
</style>
