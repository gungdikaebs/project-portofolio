<template>
    <section id="experience" class="py-32 relative overflow-hidden">
        <!-- Background Blobs -->
        <div
            class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none">
        </div>
        <div
            class="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none">
        </div>

        <!-- Background Watermark -->
        <div class="absolute bottom-[5%] left-[-5%] select-none pointer-events-none z-0">
            <span
                class="text-[12rem] md:text-[15rem] font-heading font-bold text-white/[0.02] leading-none">HISTORY</span>
        </div>

        <div class="w-full max-w-[1350px] mx-auto px-6 relative z-10">

            <!-- Header -->
            <div class="mb-20">
                <h2 class="font-heading font-bold text-4xl md:text-5xl text-primary mb-4 reveal-text">
                    Working <span class="text-accent">History.</span>
                </h2>
                <div class="h-1 w-20 bg-accent/50 rounded-full mt-6"></div>
            </div>

            <!-- Experience Timeline -->
            <div class="relative border-l border-white/10 ml-4 md:ml-10 space-y-16">

                <div v-for="(job, index) in experiences" :key="index" class="experience-item relative pl-8 md:pl-16">
                    <!-- Timeline Dot -->
                    <div
                        class="absolute -left-[5px] top-3 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_10px_rgba(106,227,255,0.5)] z-10">
                    </div>

                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 group">

                        <!-- Role & Company -->
                        <div class="max-w-2xl">
                            <h3
                                class="font-heading font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-accent transition-colors">
                                {{ job.role }}
                            </h3>
                            <h4 class="font-body text-xl text-primary mb-6">{{ job.company }}</h4>

                            <p class="text-secondary text-lg leading-relaxed mb-6">
                                {{ job.description }}
                            </p>

                            <!-- Tech Stack Used -->
                            <div class="flex flex-wrap gap-3">
                                <span v-for="tech in job.stack" :key="tech"
                                    class="px-3 py-1 bg-white/5 rounded-full text-xs text-secondary border border-white/5">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- Date -->
                        <div class="flex-shrink-0">
                            <span
                                class="font-mono text-accent text-sm md:text-base border border-accent/20 px-4 py-2 rounded-full bg-accent/5">
                                {{ job.date }}
                            </span>
                        </div>

                    </div>
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

const experiences = [
    {
        role: 'Senior Frontend Engineer',
        company: 'Tech Solutions Inc.',
        date: '2023 - Present',
        description: 'Leading the frontend architecture for high-scale SaaS products. Reduced load times by 40% through code splitting and advanced caching strategies. Mentoring junior developers and implementing E2E testing pipelines.',
        stack: ['Vue 3', 'TypeScript', 'Vite', 'Cypress']
    },
    {
        role: 'Full Stack Developer',
        company: 'Creative Studio Bali',
        date: '2021 - 2023',
        description: 'Developed custom web applications for international clients. Built CMS-driven marketing sites and robust e-commerce platforms. Collaborated directly with designers to ensure pixel-perfect implementation.',
        stack: ['Laravel', 'React', 'MySQL', 'Tailwind']
    },
    {
        role: 'Web Developer Intern',
        company: 'Bali Digital Agency',
        date: '2020 - 2021',
        description: 'Assisted in building responsive landing pages and maintaining legacy WordPress sites. Gained hands-on experience with modern CSS frameworks and version control systems.',
        stack: ['HTML/CSS', 'JavaScript', 'WordPress', 'PHP']
    }
]

onMounted(() => {
    // Stagger Reveal
    const items = document.querySelectorAll('.experience-item')

    items.forEach(item => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            }
        })
    })
})
</script>
