<template>
  <AdminLayout>
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white font-display">Dashboard</h2>
      <p class="text-gray-400 mt-2">Welcome back! Here is an overview of your portfolio.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>

    <div v-else class="space-y-8">

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <!-- Projects -->
        <div class="bg-[#11141A] p-6 rounded-xl border border-white/5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Projects</h3>
          <p class="text-4xl font-bold text-white">{{ stats.projects }}</p>
          <router-link to="/admin/projects" class="text-xs text-blue-400 mt-4 inline-block hover:underline">Manage
            Projects &rarr;</router-link>
        </div>

        <!-- Skills -->
        <div class="bg-[#11141A] p-6 rounded-xl border border-white/5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Skills</h3>
          <p class="text-4xl font-bold text-white">{{ stats.skills }}</p>
          <router-link to="/admin/skills" class="text-xs text-purple-400 mt-4 inline-block hover:underline">Manage
            Skills &rarr;</router-link>
        </div>

        <!-- Experience -->
        <div class="bg-[#11141A] p-6 rounded-xl border border-white/5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 7h-9"></path>
              <path d="M14 17H5"></path>
              <circle cx="17" cy="17" r="3"></circle>
              <circle cx="7" cy="7" r="3"></circle>
            </svg>
          </div>
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Experience</h3>
          <p class="text-4xl font-bold text-white">{{ stats.experience }}</p>
          <router-link to="/admin/experience" class="text-xs text-green-400 mt-4 inline-block hover:underline">Manage
            Career &rarr;</router-link>
        </div>

        <!-- Education -->
        <div class="bg-[#11141A] p-6 rounded-xl border border-white/5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Education & Certs</h3>
          <p class="text-4xl font-bold text-white">{{ stats.education }}</p>
          <router-link to="/admin/education" class="text-xs text-yellow-400 mt-4 inline-block hover:underline">Manage
            Academic &rarr;</router-link>
        </div>

      </div>

      <!-- Quick Actions -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link to="/admin/projects"
            class="bg-[#11141A] hover:bg-white/5 p-4 rounded-xl border border-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-center group">
            <div
              class="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <span class="text-xl font-bold">+</span>
            </div>
            <span class="text-sm font-medium text-gray-300">Add Project</span>
          </router-link>

          <router-link to="/admin/skills"
            class="bg-[#11141A] hover:bg-white/5 p-4 rounded-xl border border-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-center group">
            <div
              class="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <span class="text-xl font-bold">+</span>
            </div>
            <span class="text-sm font-medium text-gray-300">Add Skill</span>
          </router-link>

          <router-link to="/admin/experience"
            class="bg-[#11141A] hover:bg-white/5 p-4 rounded-xl border border-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-center group">
            <div
              class="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
              <span class="text-xl font-bold">+</span>
            </div>
            <span class="text-sm font-medium text-gray-300">Add Experience</span>
          </router-link>

          <router-link to="/admin/profile"
            class="bg-[#11141A] hover:bg-white/5 p-4 rounded-xl border border-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-center group">
            <div
              class="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-300">Update Profile</span>
          </router-link>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '../../layouts/AdminLayout.vue';
import api from '../../services/api';

const loading = ref(true);
const stats = ref({
  projects: 0,
  skills: 0,
  experience: 0,
  education: 0
});

const fetchStats = async () => {
  loading.value = true;
  try {
    // Parallel fetch for valid stats
    const [projectsRes, skillsRes, expRes, eduRes, certRes] = await Promise.all([
      api.get('/projects'),
      api.get('/skills'),
      api.get('/experience'),
      api.get('/education'),
      api.get('/certifications')
    ]);

    stats.value = {
      projects: projectsRes.data.length,
      skills: skillsRes.data.length,
      experience: expRes.data.length,
      education: eduRes.data.length + certRes.data.length // Combine Edu & Certs count
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStats();
});
</script>
