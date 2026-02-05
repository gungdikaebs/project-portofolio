<template>
    <footer class="py-12 bg-[#0B0D10] border-t border-white/5">
        <div class="max-w-[1350px] mx-auto px-6">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">

                <!-- Brand & Time -->
                <div class="flex flex-col gap-4">
                    <h2 class="font-heading font-bold text-2xl text-white">Gung Dika.</h2>
                    <p class="text-secondary text-sm">Bali, Indonesia • {{ timeString }}</p>
                </div>

                <!-- Links Grid -->
                <div class="flex flex-wrap gap-12 sm:gap-20">
                    <div>
                        <h4 class="text-white font-bold text-sm mb-4">Socials</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="text-secondary hover:text-accent transition-colors">LinkedIn</a></li>
                            <li><a href="#" class="text-secondary hover:text-accent transition-colors">GitHub</a></li>
                            <li><a href="#" class="text-secondary hover:text-accent transition-colors">Instagram</a>
                            </li>
                            <li><a href="#" class="text-secondary hover:text-accent transition-colors">Twitter (X)</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-bold text-sm mb-4">Navigation</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#home" class="text-secondary hover:text-white transition-colors">Home</a></li>
                            <li><a href="#about" class="text-secondary hover:text-white transition-colors">About</a>
                            </li>
                            <li><router-link to="/projects"
                                    class="text-secondary hover:text-white transition-colors">Projects</router-link>
                            </li>
                            <li><a href="#skills" class="text-secondary hover:text-white transition-colors">Skills</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Bottom Copyright -->
            <div
                class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 gap-4">
                <p>&copy; 2026 Gung Dika. All rights reserved.</p>
                <p>Designed & Built with passion.</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const timeString = ref('')
let timer: number

const updateTime = () => {
    const now = new Date()
    timeString.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Makassar' }) + ' WITA'
}

onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>
