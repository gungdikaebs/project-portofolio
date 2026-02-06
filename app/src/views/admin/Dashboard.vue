<template>
  <AdminLayout>
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white font-display">Dashboard</h2>
      <p class="text-gray-400 mt-2">Welcome back! Here is an overview of your portfolio.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-[#11141A] p-6 rounded-xl border border-white/5">
        <h3 class="text-gray-400 text-sm mb-2">Total Projects</h3>
        <p class="text-3xl font-bold text-white">--</p>
      </div>
      <div class="bg-[#11141A] p-6 rounded-xl border border-white/5">
        <h3 class="text-gray-400 text-sm mb-2">Total Skills</h3>
        <p class="text-3xl font-bold text-white">--</p>
      </div>
      <div class="bg-[#11141A] p-6 rounded-xl border border-white/5">
        <h3 class="text-gray-400 text-sm mb-2">Profile Views</h3>
        <p class="text-3xl font-bold text-white">--</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../../layouts/AdminLayout.vue';
</script>
