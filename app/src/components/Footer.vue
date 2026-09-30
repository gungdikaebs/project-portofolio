<template>
    <footer class="py-12 bg-background border-t border-primary/10">
        <div class="max-w-[1350px] mx-auto px-6">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">

                <!-- Brand & Time -->
                <div class="flex flex-col gap-4">
                    <h2 class="font-heading font-bold text-2xl text-primary">Gung Dika.</h2>
                    <p class="text-secondary text-sm">Bali, Indonesia • {{ timeString }}</p>
                </div>

                <!-- Links Grid -->
                <div class="flex flex-wrap gap-12 sm:gap-20">
                    <div>
                        <h4 class="text-primary font-bold text-sm mb-4">Elsewhere</h4>
                        <ul class="space-y-2 text-sm">
                            <li>
                                <a href="https://github.com/gungdikaebs" target="_blank" rel="noopener noreferrer"
                                    class="text-secondary hover:text-accent transition-colors">GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/gungdikaebs/" target="_blank" rel="noopener noreferrer"
                                    class="text-secondary hover:text-accent transition-colors">LinkedIn
                                </a>
                            </li>
                            <li><a href="mailto:gungdika85@gmail.com"
                                    class="text-secondary hover:text-accent transition-colors">Email</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-primary font-bold text-sm mb-4">Navigation</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/#home" class="text-secondary hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/#about" class="text-secondary hover:text-primary transition-colors">About</a>
                            </li>
                            <li><router-link to="/projects"
                                    class="text-secondary hover:text-primary transition-colors">Projects</router-link>
                            </li>
                            <li><a href="/#process" class="text-secondary hover:text-primary transition-colors">How I Work</a></li>
                            <li><a href="/#experience" class="text-secondary hover:text-primary transition-colors">Experience</a></li>
                            <li><a href="/#skills" class="text-secondary hover:text-primary transition-colors">Skills</a>
                            </li>
                            <li><a href="/#education" class="text-secondary hover:text-primary transition-colors">Education</a></li>
                            <li><router-link to="/blog" class="text-secondary hover:text-primary transition-colors">Blog</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Bottom Copyright -->
            <div
                class="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center text-xs text-secondary gap-4">
                <p>&copy; 2026 Gung Dika. All rights reserved.</p>
                <p>Designed and built by Gung Dika.</p>
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
