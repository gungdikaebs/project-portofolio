<template>
    <section id="contact" ref="sectionEl" class="py-[var(--section-space)] relative overflow-hidden bg-background">
        <div class="section-shell relative z-10">
            <div class="scroll-divider-wrapper mb-16 h-px w-full overflow-hidden bg-primary/5 md:mb-20">
                <div class="contact-scroll-line h-full w-full origin-left bg-gradient-to-r from-primary/35 via-primary/15 to-primary/5"></div>
            </div>

            <div class="grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
                <div>
                    <span class="section-kicker contact-kicker mb-6 block">08 / Contact</span>
                    <h2 class="contact-heading mb-8 max-w-[11ch] font-heading text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-primary md:text-7xl">
                        Have a role or project in mind<span class="text-accent">?</span>
                    </h2>
                    <p class="contact-copy max-w-xl text-lg leading-relaxed text-secondary">
                        Tell me what you’re hiring for or what you’re building. A few details are enough to start a conversation.
                    </p>

                    <div class="contact-links mt-12 border-y border-primary/20">
                        <div class="grid min-h-20 grid-cols-[5.5rem_minmax(0,1fr)_2.75rem] items-center gap-3 border-b border-primary/15 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_3rem] sm:gap-5">
                            <span class="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-secondary">Email</span>
                            <a href="mailto:gungdika85@gmail.com" class="group flex min-w-0 items-center justify-between gap-3 text-base font-medium text-primary transition-colors hover:text-primary sm:text-lg md:text-xl">
                                <span class="break-all">gungdika85@gmail.com</span>
                                <span class="shrink-0 text-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
                            </a>
                            <button type="button" @click="copyEmail"
                                class="flex h-10 w-10 items-center justify-center border border-primary/15 text-secondary transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-offset-2 sm:h-11 sm:w-11"
                                :aria-label="copied ? 'Email copied to clipboard' : 'Copy email address'"
                                :title="copied ? 'Copied' : 'Copy email address'">
                                <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                                    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-primary">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </div>

                        <a href="https://wa.me/6281237397984" target="_blank" rel="noopener noreferrer"
                            class="group grid min-h-20 grid-cols-[5.5rem_minmax(0,1fr)_2.75rem] items-center gap-3 py-4 text-primary transition-colors hover:text-primary sm:grid-cols-[7rem_minmax(0,1fr)_3rem] sm:gap-5"
                            aria-label="Message Gung Dika on WhatsApp (opens in a new tab)">
                            <span class="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-secondary">WhatsApp</span>
                            <span class="flex min-w-0 items-center justify-between gap-3 text-base font-medium sm:text-lg md:text-xl">
                                <span>+62 812 3739 7984</span>
                                <span class="shrink-0 text-secondary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
                            </span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <span class="sr-only" aria-live="polite">{{ copied ? 'Email copied to clipboard' : '' }}</span>
                </div>

                <div class="contact-form mt-2 border-t border-primary/25 pt-5 lg:mt-0">
                    <div class="mb-7 flex items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-secondary">
                        <span>Message / WhatsApp</span>
                        <span>01 — 03</span>
                    </div>
                    <h3 class="mb-3 font-heading text-2xl font-bold text-primary md:text-3xl">Start with a short brief</h3>
                    <p class="mb-8 max-w-md text-sm leading-relaxed text-secondary">Your message opens in WhatsApp so you can review it before sending.</p>

                    <form @submit.prevent="submitForm" class="flex flex-col gap-3">
                        <div class="contact-field group flex flex-col gap-2 border-b border-primary/15 py-3 transition-colors focus-within:border-primary/60">
                            <label for="name" class="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-secondary">Name</label>
                            <input type="text" id="name" required v-model="formData.name" autocomplete="name"
                                class="w-full bg-transparent text-base text-primary placeholder:text-secondary focus:outline-none sm:text-lg"
                                placeholder="Your name">
                        </div>

                        <div class="contact-field group flex flex-col gap-2 border-b border-primary/15 py-3 transition-colors focus-within:border-primary/60">
                            <label for="email" class="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-secondary">Email</label>
                            <input type="email" id="email" required v-model="formData.email" autocomplete="email"
                                class="w-full bg-transparent text-base text-primary placeholder:text-secondary focus:outline-none sm:text-lg"
                                placeholder="you@company.com">
                        </div>

                        <div class="contact-field group flex flex-col gap-2 border-b border-primary/15 py-3 transition-colors focus-within:border-primary/60">
                            <label for="message" class="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-secondary">What would you like to discuss?</label>
                            <textarea id="message" rows="4" required v-model="formData.message"
                                class="w-full resize-y bg-transparent text-base leading-relaxed text-primary placeholder:text-secondary focus:outline-none sm:text-lg"
                                placeholder="A little context about the role or project…"></textarea>
                        </div>

                        <button type="submit" class="group mt-5 inline-flex min-h-14 w-full items-center justify-between gap-4 bg-primary px-5 font-semibold text-background transition-colors hover:bg-primary focus-visible:outline-offset-4">
                            <span>Continue in WhatsApp</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 transition-transform group-hover:translate-x-1">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
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

gsap.registerPlugin(ScrollTrigger)

const copied = ref(false)
const sectionEl = ref<HTMLElement | null>(null)
let context: gsap.Context | null = null
const formData = ref({
    name: '',
    email: '',
    message: ''
})

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
})

onUnmounted(() => context?.revert())
</script>
