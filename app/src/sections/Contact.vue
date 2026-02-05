<template>
    <section id="contact" class="py-32 relative overflow-hidden bg-[#0B0D10]">
        <!-- Background Elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]">
            </div>
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

                <!-- Left: CTA -->
                <div>
                    <span class="text-accent font-mono text-sm tracking-widest uppercase mb-6 block reveal-contact">Get
                        in Touch</span>
                    <h2
                        class="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-12 reveal-contact">
                        Let's start a <br />
                        <span class="text-secondary/50 transition-colors duration-500 hover:text-white">project</span>
                        together.
                    </h2>

                    <div class="flex flex-col gap-8 reveal-contact">
                        <div class="flex items-center gap-6">
                            <!-- Magnetic Email Button -->
                            <a href="mailto:contact@gungdika.com"
                                class="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
                                <span class="relative z-10 font-bold text-lg">contact@gungdika.com</span>
                                <div
                                    class="relative z-10 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>
                            </a>

                            <!-- Copy Email Button -->
                            <button @click="copyEmail"
                                class="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-white hover:border-white hover:bg-white/5 transition-all active:scale-90"
                                aria-label="Copy Email">
                                <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </div>

                        <!-- Phone / WhatsApp Button -->
                        <div class="flex items-center gap-6">
                            <a href="https://wa.me/6281234567890" target="_blank"
                                class="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95">
                                <span class="relative z-10 font-bold text-lg">+62 812 3456 7890</span>
                                <div
                                    class="relative z-10 w-8 h-8 bg-white/10 group-hover:bg-black group-hover:text-white text-white rounded-full flex items-center justify-center transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                                        </path>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right: Contact Form -->
                <div
                    class="bg-surface/50 border border-white/5 rounded-3xl p-8 md:p-10 reveal-contact mt-10 lg:mt-0 backdrop-blur-sm">
                    <h3 class="font-heading font-bold text-2xl text-white mb-8">Send a Message</h3>
                    <form @submit.prevent="submitForm" class="flex flex-col gap-6">
                        <!-- Group: Name -->
                        <div class="flex flex-col gap-2">
                            <label for="name"
                                class="text-sm font-mono text-secondary uppercase tracking-wider">Name</label>
                            <input type="text" id="name" required v-model="formData.name"
                                class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                                placeholder="John Doe">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="message"
                                class="text-sm font-mono text-secondary uppercase tracking-wider">Message</label>
                            <textarea id="message" rows="4" required v-model="formData.message"
                                class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-white/20"
                                placeholder="Tell me about your project..."></textarea>
                        </div>

                        <button type="submit"
                            class="self-start inline-flex items-center justify-center gap-2 bg-accent text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors mt-2 group">
                            Send Message
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const copied = ref(false)
const formData = ref({
    name: '',
    message: ''
})

const copyEmail = () => {
    navigator.clipboard.writeText('contact@gungdika.com')
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
}

const submitForm = () => {
    const phoneNumber = '6281234567890' // Replace with actual WhatsApp number
    const text = `Name: ${formData.value.name}%0AMessage: ${formData.value.message}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`
    window.open(whatsappUrl, '_blank')
}

onMounted(() => {
    // Animations
    const elements = document.querySelectorAll('.reveal-contact')
    elements.forEach((el, index) => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%'
            },
            delay: index * 0.1
        })
    })
})
</script>
