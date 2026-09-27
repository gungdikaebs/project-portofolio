<template>
    <section id="process" ref="sectionEl" class="relative bg-[#151616] text-primary" aria-labelledby="process-heading">
        <div class="section-shell">
            <header class="process-intro border-b border-white/15 pb-14 pt-28 md:pb-20 md:pt-40">
                <div class="flex items-center justify-between gap-6 border-t border-white/15 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-secondary">
                    <span>03 / Process</span>
                    <span>From question to delivery</span>
                </div>
                <div class="mt-16 grid gap-9 lg:mt-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:items-end lg:gap-16">
                    <h2 id="process-heading" class="max-w-[9ch] font-heading text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.075em]">How I<br><span class="italic font-normal">work.</span></h2>
                    <p class="max-w-sm border-l border-white/25 pl-5 text-base leading-relaxed text-secondary md:text-lg">From the first conversation to handoff, I make the problem, decisions, and next steps visible.</p>
                </div>
            </header>

            <div class="grid gap-0 lg:grid-cols-[minmax(14rem,0.58fr)_minmax(0,1fr)] lg:gap-[clamp(3rem,7vw,8rem)]">
                <div class="hidden lg:block">
                    <div class="sticky top-28 flex h-[calc(100svh-9rem)] max-h-[43rem] min-h-[31rem] flex-col justify-between py-14">
                        <div>
                            <span class="font-mono text-[0.7rem] uppercase tracking-[0.17em] text-secondary">Currently / {{ currentStep.phase }}</span>
                            <div class="mt-7 overflow-hidden border-b border-white/15 pb-6" aria-hidden="true">
                                <span class="block font-heading text-[clamp(7rem,15vw,14rem)] font-bold leading-none tracking-[-0.11em]">{{ currentStep.number }}</span>
                            </div>
                            <p class="mt-6 max-w-xs font-heading text-2xl font-semibold leading-tight tracking-tight">{{ currentStep.title }}<span class="font-normal">.</span></p>
                        </div>

                        <nav aria-label="Workflow stages" class="max-w-sm">
                            <ol class="border-t border-white/15">
                                <li v-for="(step, index) in steps" :key="step.number">
                                    <button type="button" class="flex min-h-11 w-full items-center justify-between gap-4 border-b border-white/15 text-left font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors hover:text-primary" :class="activeIndex === index ? 'text-primary' : 'text-secondary'" :aria-label="`Jump to ${step.title}`" :aria-current="activeIndex === index ? 'step' : undefined" @click="scrollToStep(index)">
                                        <span>{{ step.number }} / {{ step.title }}</span>
                                        <span v-if="activeIndex === index" aria-hidden="true">↗</span>
                                    </button>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <ol class="process-steps">
                    <li v-for="(step, index) in steps" :id="`process-step-${index + 1}`" :key="step.number" class="process-step grid min-h-[19rem] gap-5 border-b border-white/15 py-12 sm:min-h-[22rem] sm:py-16 lg:min-h-[27rem] lg:content-center lg:py-20">
                        <div class="flex items-center justify-between gap-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-secondary">
                            <span>{{ step.number }} / 06</span>
                            <span>{{ step.phase }}</span>
                        </div>
                        <h3 class="max-w-[15ch] font-heading text-[clamp(2.6rem,5.4vw,5.3rem)] font-bold leading-[0.98] tracking-[-0.065em]">{{ step.title }}<span class="font-normal">.</span></h3>
                        <p class="max-w-xl text-base leading-[1.75] text-secondary md:text-lg">{{ step.description }}</p>
                        <p class="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.67rem] uppercase tracking-[0.13em]"><span class="text-secondary">Outcome</span><span class="text-primary">{{ step.output }}</span></p>
                    </li>
                </ol>
            </div>

            <div class="grid gap-6 pb-24 pt-16 md:grid-cols-[minmax(14rem,0.58fr)_minmax(0,1fr)] md:gap-[clamp(3rem,7vw,8rem)] md:pb-32 lg:pt-28">
                <span class="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-secondary">Next / In practice</span>
                <div class="flex flex-col items-start gap-7 sm:flex-row sm:items-end sm:justify-between">
                    <p class="max-w-xl font-heading text-2xl font-semibold leading-snug tracking-tight md:text-3xl">The result: a product people can use and a codebase others can continue.</p>
                    <a href="#experience" class="inline-flex min-h-11 shrink-0 items-center gap-3 border-b border-white/40 text-sm font-medium transition-colors hover:border-primary hover:text-secondary">See my experience <span aria-hidden="true">↗</span></a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { reduceMotion } from '../animations/motion'

gsap.registerPlugin(ScrollTrigger)

const steps = [
    { number: '01', phase: 'Discover', title: 'Understand', description: 'I listen first: who is this for, what is getting in the way, and what would a useful outcome look like? Constraints become part of the brief.', output: 'A focused problem statement' },
    { number: '02', phase: 'Direction', title: 'Plan', description: 'I break the work into priorities, decide what to prove early, and make the path from first release to later improvements visible.', output: 'A practical roadmap' },
    { number: '03', phase: 'Structure', title: 'Design / Architecture', description: 'I map the interface, API, and data before building. Clear boundaries help the product stay understandable as it grows.', output: 'A shared system map' },
    { number: '04', phase: 'Build', title: 'Implement', description: 'I build in working slices, connecting the experience people use to the services and data behind it.', output: 'Usable product increments' },
    { number: '05', phase: 'Quality', title: 'Test / Review', description: 'I check important journeys, edge cases, responsive behavior, and feedback before calling a feature complete.', output: 'A reviewed build' },
    { number: '06', phase: 'Handoff', title: 'Deliver', description: 'I ship with the context others need: clear documentation, a reliable setup, and an honest list of next steps.', output: 'A product ready to evolve' },
] as const

const sectionEl = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const currentStep = computed(() => steps[activeIndex.value] ?? steps[0])
let context: gsap.Context | null = null

const scrollToStep = (index: number) => {
    document.getElementById(`process-step-${index + 1}`)?.scrollIntoView({
        behavior: reduceMotion() ? 'auto' : 'smooth',
        block: 'center',
    })
}

onMounted(() => {
    const element = sectionEl.value
    if (!element) return

    context = gsap.context(() => {
        element.querySelectorAll<HTMLElement>('.process-step').forEach((step, index) => {
            ScrollTrigger.create({
                trigger: step,
                start: 'top 55%',
                end: 'bottom 55%',
                onEnter: () => { activeIndex.value = index },
                onEnterBack: () => { activeIndex.value = index },
            })
        })

        if (!reduceMotion()) {
            gsap.from('.process-intro h2, .process-intro p', {
                y: 24,
                opacity: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.process-intro', start: 'top 78%' },
            })
        }
    }, element)

    ScrollTrigger.refresh()
})

onUnmounted(() => context?.revert())
</script>
