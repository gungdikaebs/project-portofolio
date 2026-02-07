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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    Dashboard
                </router-link>
                <router-link to="/admin/projects" class="nav-item" active-class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    Projects
                </router-link>
                <router-link to="/admin/skills" class="nav-item" active-class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Skills
                </router-link>
                <router-link to="/admin/experience" class="nav-item" active-class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <path d="M20 7h-9"></path>
                        <path d="M14 17H5"></path>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="7" r="3"></circle>
                    </svg>
                    Experience
                </router-link>
                <router-link to="/admin/education" class="nav-item" active-class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                    Education
                </router-link>
                <router-link to="/admin/profile" class="nav-item" active-class="active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                </router-link>
            </nav>

            <div class="p-4 border-t border-white/5">
                <button @click="logout"
                    class="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg text-sm transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="mr-3">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
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
