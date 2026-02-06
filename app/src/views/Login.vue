<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0B0D10] px-4">
    <div class="w-full max-w-md bg-[#11141A] p-8 rounded-2xl border border-white/5 shadow-2xl">
      <h1 class="text-3xl font-bold text-white mb-2 font-display">Admin Login</h1>
      <p class="text-gray-400 mb-8 text-sm">Enter your credentials to access the dashboard.</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full bg-[#0B0D10] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full bg-[#0B0D10] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    // Save token
    localStorage.setItem('token', response.data.access_token);
    
    // Redirect to Admin Dashboard
    router.push('/admin');
  } catch (err: any) {
    console.error(err);
    error.value = err.response?.data?.message || 'Login failed. Please check credentials.';
  } finally {
    loading.value = false;
  }
};
</script>
