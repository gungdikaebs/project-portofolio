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
                <div v-for="category in categories" :key="category.id"
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
                        <h3 class="font-heading font-bold text-xl text-white">{{ category.name }}</h3>
                    </div>
                    <ul class="space-y-4">
                        <li v-for="skill in category.skills" :key="skill.id || skill.name"
                            class="flex items-center gap-3 group/item">
                            <div
                                class="text-secondary group-hover/item:text-accent transition-colors w-6 h-6 flex items-center justify-center">
                                <span v-if="isSvg(skill.icon)" v-html="skill.icon"></span>
                                <i v-else :class="skill.icon" class="text-xl"></i>
                            </div>
                            <span class="text-secondary font-medium group-hover/item:text-white transition-colors">
                                {{ skill.name }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useSkills } from '../composables/useSkills'

gsap.registerPlugin(ScrollTrigger)

const { categories, loading, fetchSkills } = useSkills()

const isSvg = (icon: string) => {
    return icon && icon.trim().startsWith('<svg');
}

onMounted(async () => {
    await fetchSkills()

    nextTick(() => {
        ScrollTrigger.refresh()

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
})
</script>
