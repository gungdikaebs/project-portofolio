<template>
    <aside aria-label="Page section navigation" class="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex select-none pointer-events-auto mix-blend-difference">
        <button
            v-for="(section, index) in sections"
            :key="section.id"
            type="button"
            @click="scrollTo(section.id)"
            class="group relative flex items-center justify-end py-1 outline-none"
            :aria-label="`Navigate to ${section.label}`"
            :aria-current="activeSection === section.id ? 'true' : undefined">
            
            <!-- Tooltip Label -->
            <span
                class="pointer-events-none mr-3 whitespace-nowrap border-b border-white/30 pb-1 font-mono text-[10px] tracking-wider uppercase text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                0{{ index + 1 }} · {{ section.label }}
            </span>

            <!-- Track Indicator -->
            <div class="flex items-center gap-1.5">
                <span
                    v-if="activeSection === section.id"
                    class="font-mono text-[10px] font-medium text-white transition-colors duration-200">
                    0{{ index + 1 }}
                </span>
                <span
                    class="h-px transition-[width,background-color] duration-200"
                    :class="activeSection === section.id
                        ? 'w-7 bg-white'
                        : 'w-2 bg-white/35 group-hover:w-4 group-hover:bg-white/70'">
                </span>
            </div>
        </button>
    </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { reduceMotion } from '../animations/motion'

interface Section {
    id: string
    label: string
}

const sections: Section[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Selected Work' },
    { id: 'process', label: 'How I Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'blog', label: 'Articles' },
    { id: 'contact', label: 'Contact' },
]

const activeSection = ref('home')
let observer: IntersectionObserver | null = null

const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' })
    }
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                }
            })
        },
        {
            rootMargin: '-35% 0px -55%',
            threshold: 0,
        }
    )

    sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer?.observe(el)
    })
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>
