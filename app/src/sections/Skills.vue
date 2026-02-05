<template>
    <section id="skills" class="py-32 relative bg-background overflow-hidden">
        <!-- Background Watermark -->
        <div class="absolute top-[10%] right-[-10%] select-none pointer-events-none z-0">
            <span class="text-[15rem] font-heading font-bold text-white/[0.02] leading-none">SKILLS</span>
        </div>

        <!-- Grid Pattern -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">

            <!-- Header -->
            <div class="mb-20">
                <h2 class="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 reveal-text">
                    Technical <span class="text-accent">Skills.</span>
                </h2>
                <div class="h-1 w-20 bg-accent/50 rounded-full mt-6"></div>
            </div>

            <!-- Skills Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <!-- Category 1: Frontend -->
                <div
                    class="skill-card group bg-surface border border-white/5 p-8 rounded-2xl hover:border-accent/30 transition-colors duration-300">
                    <div class="mb-6 flex items-center gap-4">
                        <div class="p-3 bg-white/5 rounded-lg text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <path d="M9 3v18" />
                                <path d="m14 9 3 3-3 3" />
                            </svg>
                        </div>
                        <h3 class="font-heading font-bold text-xl text-white">Frontend</h3>
                    </div>
                    <ul class="space-y-4">
                        <li v-for="skill in frontendSkills" :key="skill.name"
                            class="flex items-center gap-3 group/item">
                            <div class="text-secondary group-hover/item:text-accent transition-colors w-6 h-6"
                                v-html="skill.icon"></div>
                            <span class="text-secondary font-medium group-hover/item:text-white transition-colors">{{
                                skill.name }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Category 2: Backend & Tools -->
                <div
                    class="skill-card group bg-surface border border-white/5 p-8 rounded-2xl hover:border-accent/30 transition-colors duration-300">
                    <div class="mb-6 flex items-center gap-4">
                        <div class="p-3 bg-white/5 rounded-lg text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" x2="12" y1="22.08" y2="12" />
                            </svg>
                        </div>
                        <h3 class="font-heading font-bold text-xl text-white">Backend & Tools</h3>
                    </div>
                    <ul class="space-y-4">
                        <li v-for="skill in backendSkills" :key="skill.name" class="flex items-center gap-3 group/item">
                            <div class="text-secondary group-hover/item:text-accent transition-colors w-6 h-6"
                                v-html="skill.icon"></div>
                            <span class="text-secondary font-medium group-hover/item:text-white transition-colors">{{
                                skill.name }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Category 3: Design -->
                <div
                    class="skill-card group bg-surface border border-white/5 p-8 rounded-2xl hover:border-accent/30 transition-colors duration-300">
                    <div class="mb-6 flex items-center gap-4">
                        <div class="p-3 bg-white/5 rounded-lg text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
                                <path d="m5 2 5 5" />
                                <path d="M2 5l5 5" />
                            </svg>
                        </div>
                        <h3 class="font-heading font-bold text-xl text-white">Design & Motion</h3>
                    </div>
                    <ul class="space-y-4">
                        <li v-for="skill in designSkills" :key="skill.name" class="flex items-center gap-3 group/item">
                            <div class="text-secondary group-hover/item:text-accent transition-colors w-6 h-6"
                                v-html="skill.icon"></div>
                            <span class="text-secondary font-medium group-hover/item:text-white transition-colors">{{
                                skill.name }}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const frontendSkills = [
    {
        name: 'Vue.js 3',
        icon: '<svg viewBox="0 0 24 24" fill="#42b883"><path d="M2,3H5.5L12,15L18.5,3H22L12,21L2,3M6.5,3H9.5L12,7.58L14.5,3H17.5L12,13.08L6.5,3Z" /></svg>'
    },
    {
        name: 'TypeScript',
        icon: '<svg viewBox="0 0 24 24" fill="#3178C6"><path d="M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M13,17H16.1C16.5,17 16.8,16.8 16.8,16.5V16C16.8,15.7 16.5,15.5 16.1,15.5H15V10.5H16.1C16.5,10.5 16.8,10.2 16.8,10V9.5C16.8,9.2 16.5,9 16.1,9H11.9C11.5,9 11.2,9.2 11.2,9.5V10C11.2,10.2 11.5,10.5 11.9,10.5H13V15.5H11.9C11.5,15.5 11.2,15.7 11.2,16V16.5C11.2,16.8 11.5,17 11.9,17H13V17M9,10H6.5V9H11.5V10H9V17H7.5V10Z" /></svg>'
    },
    {
        name: 'Tailwind CSS',
        icon: '<svg viewBox="0 0 24 24" fill="#38bdf8"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,14.878,11.859,18.001,11.859c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.039,15.125,4.8,12.001,4.8z M6.001,12.001c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.389,2.435,5.512,2.435c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.24,9.125,12.001,6.001,12.001z"/></svg>'
    },
    {
        name: 'React',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><path d="M12 2.5C7.5 2.5 3.5 5 3.5 12s4 9.5 8.5 9.5S20.5 19 20.5 12 16.5 2.5 12 2.5z" transform="rotate(60 12 12)" /><path d="M12 2.5C7.5 2.5 3.5 5 3.5 12s4 9.5 8.5 9.5S20.5 19 20.5 12 16.5 2.5 12 2.5z" transform="rotate(120 12 12)" /><path d="M12 2.5C7.5 2.5 3.5 5 3.5 12s4 9.5 8.5 9.5S20.5 19 20.5 12 16.5 2.5 12 2.5z" /></svg>'
    },
    {
        name: 'Nuxt.js',
        icon: '<svg viewBox="0 0 24 24" fill="#00DC82"><path d="M2.5 19H21.5L12 3L9 8H6L2.5 19ZM12 7L18.5 17.5H5.5L12 7Z"/><path d="M16 19H22L16 9L13.5 13L16 19Z" opacity="0.5"/></svg>'
    }
]

const backendSkills = [
    {
        name: 'Laravel',
        icon: '<svg viewBox="0 0 24 24" fill="#FF2D20"><path d="M8 2L5 6H12L9 2H8M3 8L6 12H13L10 8H3M20 13L11 22H19L22 13H20M14 8L11 12H18L21 8H14M12 13L9 17H16L19 13H12Z" /></svg>'
    },
    {
        name: 'Node.js',
        icon: '<svg viewBox="0 0 24 24" fill="#339933"><path d="M21,15.06L13.78,19L12,18.03V13.66L18.4,10.2C18.4,10.2 18.66,9.83 18.23,9.58C17.78,9.33 13.97,7.21 12.06,6.18L12,6.17L12,6.13L4.93,10.19V17.2L12,21.14L18.03,17.75L17.5,16.89L12,19.96L5.93,16.63V10.77L12.06,7.22L17.29,10.15V13.68L12,16.58V18.65L12.12,18.7L20.5,14.21L21,15.06M12,2l0,0L2,7.63v11.23L12,24.47l10-5.61V7.63L12,2Z" /></svg>'
    },
    {
        name: 'MySQL',
        icon: '<svg viewBox="0 0 24 24" fill="#00758F"><path d="M2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2C6.5,2 2,6.5 2,12M12,4C14.7,4 17.1,5.3 18.7,7.4L17.3,8.8C16,7.2 14.1,6.2 12,6.2C8.8,6.2 6.2,8.8 6.2,12C6.2,15.2 8.8,17.8 12,17.8C14.1,17.8 16,16.8 17.3,15.2L18.7,16.6C17.1,18.7 14.7,20 12,20C7.6,20 4,16.4 4,12C4,7.6 7.6,4 12,4Z" /></svg>'
    },
    {
        name: 'Docker',
        icon: '<svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.6,8.68V6.15H15.9V8.68M13.6,5.65H15.9V3.12H13.6M10.8,8.68V6.15H13.06V8.68M10.8,5.65H13.06V3.12H10.8M8,8.68V6.15H10.26V8.68M8,5.65H10.26V3.12H8M5.19,8.68V6.15H7.46V8.68M5.19,5.65H7.46V3.12H5.19M1.74,11.5a1.1,1.1 0 0,0 0.81,1.06c0.07,0.73 0.65,1.29 1.39,1.29h0.41c0.09,1.83 1.6,3.29 3.47,3.29c1.93,0 3.49-1.56 3.49-3.49c0-0.07 0-0.14-0.01-0.21h2.24c-0.01,0.07-0.01,0.14-0.01,0.21c0,1.93 1.56,3.49 3.49,3.49c1.86,0 3.38-1.46 3.47-3.29h0.77c0.88,0 1.6-0.72 1.6-1.6V9.16H1.74V11.5Z" /></svg>'
    },
    {
        name: 'Git / GitHub',
        icon: '<svg viewBox="0 0 24 24" fill="#F05032"><path d="M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,4.96 11.5,5.07L9.8,3.38L10.5,2.68C11.3,1.89 12.63,1.89 13.43,2.68L21.31,10.59C22.11,11.37 22.11,12.63 21.31,13.43L13.43,21.31C12.63,22.11 11.3,22.11 10.5,21.31L2.6,13.43C1.81,12.63 1.81,11.37 2.6,10.59Z" /></svg>'
    }
]

const designSkills = [
    {
        name: 'Figma',
        icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2H8.5C6.567 2 5 3.567 5 5.5C5 7.433 6.567 9 8.5 9H12V2Z" fill="#F24E1E"/><path d="M12 9H8.5C6.567 9 5 10.567 5 12.5C5 14.433 6.567 16 8.5 16H12V9Z" fill="#A259FF"/><path d="M12 16H8.5C6.567 16 5 17.567 5 19.5C5 21.433 6.567 23 8.5 23C10.433 23 12 21.433 12 19.5V16Z" fill="#1ABCFE"/><path d="M12 16H15.5C17.433 16 19 14.433 19 12.5C19 10.567 17.433 9 15.5 9H12V16Z" fill="#0ACF83"/><path d="M12 9H15.5C17.433 9 19 7.433 19 5.5C19 3.567 17.433 2 15.5 2H12V9Z" fill="#FF7262"/></svg>'
    },
    {
        name: 'GSAP',
        icon: '<svg viewBox="0 0 24 24" fill="#88CE02"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M7.5,13.5L10,15L13.5,10L16.5,12L12,18L7.5,13.5Z" /></svg>' // Simple motion icon
    },
    {
        name: 'UI/UX Principles',
        icon: '<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' // Globeish
    },
    {
        name: 'Responsive Design',
        icon: '<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M19,18H5V6H19M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" /></svg>'
    }
]

onMounted(() => {
    // Stagger Reveal for Cards
    gsap.from('.skill-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%'
        }
    })
})
</script>
