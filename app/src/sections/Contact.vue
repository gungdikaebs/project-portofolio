<template>
    <section id="contact" ref="sectionEl" class="py-[var(--section-space)] relative overflow-hidden bg-background">
        <div class="section-shell relative z-10">

            <!-- Scroll Line Divider -->
            <div class="scroll-divider-wrapper mb-16 h-px w-full overflow-hidden bg-white/5 md:mb-20">
                <div class="contact-scroll-line h-full w-full bg-gradient-to-r from-accent/60 via-white/20 to-white/5 origin-left"></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

                <!-- Left: CTA -->
                <div>
                    <span class="section-kicker mb-6 block contact-kicker">08 / Contact</span>
                    <h2
                        class="contact-heading mb-10 max-w-[12ch] font-heading text-5xl font-bold leading-[1.02] tracking-tight text-primary md:text-7xl">
                        Let's build something useful<span class="text-accent">.</span>
                    </h2>

                    <p class="contact-copy mb-10 max-w-xl text-lg leading-relaxed text-secondary">
                        Hiring a developer or planning a web product? Tell me what you need. Reach me by email or WhatsApp.
                    </p>

                    <div class="contact-links flex flex-col gap-8">
                        <div class="flex flex-wrap items-center gap-3 md:gap-6">
                            <!-- Magnetic Email Button -->
                            <a href="mailto:gungdika85@gmail.com"
                                class="magnetic-btn group relative inline-flex max-w-full items-center gap-3 md:gap-4 px-5 py-3 md:px-8 md:py-4 bg-white text-black rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-95">
                                <span class="relative z-10 break-all font-bold text-sm md:text-lg">gungdika85@gmail.com</span>
                                <div
                                    class="relative z-10 w-6 h-6 md:w-8 md:h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="w-3 h-3 md:w-4 md:h-4">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>
                            </a>

                            <!-- Copy Email Button -->
                            <button @click="copyEmail"
                                class="magnetic-btn w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-white hover:border-white hover:bg-white/5 transition-all active:scale-90 shrink-0"
                                aria-label="Copy Email">
                                <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="md:w-5 md:h-5">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" class="text-accent md:w-5 md:h-5">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                            <span class="sr-only" aria-live="polite">{{ copied ? 'Email copied to clipboard' : '' }}</span>
                        </div>

                        <!-- Phone / WhatsApp Button -->
                        <div class="flex items-center gap-6">
                            <a href="https://wa.me/6281237397984" target="_blank" rel="noopener noreferrer"
                                class="magnetic-btn group relative inline-flex items-center gap-3 md:gap-4 px-5 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95">
                                <span class="relative z-10 font-bold text-sm md:text-lg">+62 812 3739 7984</span>
                                <div
                                    class="relative z-10 w-6 h-6 md:w-8 md:h-8 bg-white/10 group-hover:bg-black group-hover:text-white text-white rounded-full flex items-center justify-center transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="w-3 h-3 md:w-4 md:h-4">
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
                    class="contact-form bg-surface/50 border border-white/15 p-6 sm:p-8 md:p-10 mt-10 lg:mt-0"
                    @mousemove="handleFormMouseMove">
                    <h3 class="font-heading font-bold text-2xl text-white mb-3">Start with a short brief</h3>
                    <p class="mb-8 text-sm leading-relaxed text-secondary">This form prepares your message and opens WhatsApp; it does not submit data to this site.</p>
                    <form @submit.prevent="submitForm" class="flex flex-col gap-6">
                        <!-- Group: Name -->
                        <div class="flex flex-col gap-2">
                            <label for="name"
                                class="text-sm font-mono text-secondary uppercase tracking-wider">Name</label>
                            <input type="text" id="name" required v-model="formData.name"
                                autocomplete="name" class="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-white/30 invalid:not-placeholder-shown:border-red-400"
                                placeholder="John Doe">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email"
                                class="text-sm font-mono text-secondary uppercase tracking-wider">Email</label>
                            <input type="email" id="email" required v-model="formData.email"
                                autocomplete="email" class="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-white/30 invalid:not-placeholder-shown:border-red-400"
                                placeholder="john@company.com">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="message"
                                class="text-sm font-mono text-secondary uppercase tracking-wider">Message</label>
                            <textarea id="message" rows="4" required v-model="formData.message"
                                class="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none placeholder:text-white/30"
                                placeholder="What are you building, and where do you need help?"></textarea>
                        </div>

                        <button type="submit"
                            class="self-start inline-flex items-center justify-center gap-2 bg-accent text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors mt-2 group">
                            Continue on WhatsApp
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
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion, reduceMotion } from '../animations/motion'
import { initMagneticButtons } from '../animations/magnetic'

gsap.registerPlugin(ScrollTrigger)

const copied = ref(false)
const sectionEl = ref<HTMLElement | null>(null)
let context: gsap.Context | null = null
const formData = ref({
    name: '',
    email: '',
    message: ''
})

const handleFormMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

const copyEmail = async () => {
    await navigator.clipboard.writeText('gungdika85@gmail.com')
    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
}

const submitForm = () => {
    const phoneNumber = '6281237397984'
    const text = encodeURIComponent(`Name: ${formData.value.name}\nEmail: ${formData.value.email}\nMessage: ${formData.value.message}`)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`
    window.open(whatsappUrl, '_blank')
}

onMounted(() => {
    if (reduceMotion()) return
    context = gsap.context(() => {
        // Line divider animation
        const line = sectionEl.value?.querySelector('.contact-scroll-line')
        if (line) {
            gsap.fromTo(line,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.1,
                    ease: motion.ease.emphasis,
                    scrollTrigger: { trigger: sectionEl.value, start: 'top 85%' }
                }
            )
        }

        gsap.from('.contact-kicker', { x: -motion.distance.base, opacity: 0, duration: motion.duration.base, ease: motion.ease.enter, scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' } })
        gsap.from('.contact-heading', { clipPath: 'inset(0 0 100% 0)', y: motion.distance.base, duration: 1.05, ease: motion.ease.emphasis, scrollTrigger: { trigger: sectionEl.value, start: 'top 72%' } })
        gsap.from('.contact-copy, .contact-links', { opacity: 0, y: motion.distance.small, stagger: motion.stagger.base, duration: motion.duration.base, ease: motion.ease.enter, scrollTrigger: { trigger: '.contact-heading', start: 'top 70%' } })
        gsap.from('.contact-form', { x: motion.distance.large, opacity: 0, duration: motion.duration.slow, ease: motion.ease.enter, scrollTrigger: { trigger: '.contact-form', start: 'top 82%' } })
    }, sectionEl.value || undefined)

    initMagneticButtons('.magnetic-btn')
})

onUnmounted(() => context?.revert())
</script>
