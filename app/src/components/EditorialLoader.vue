<script setup lang="ts">
withDefaults(defineProps<{
    label: string
    message?: string
    variant?: 'page' | 'section'
}>(), {
    message: 'Composing the next page.',
    variant: 'page',
})

const registrationMarks = Array.from({ length: 9 }, (_, index) => index)
</script>

<template>
    <div
        class="editorial-loader"
        :class="`editorial-loader--${variant}`"
        role="status"
        aria-live="polite"
        :aria-label="`Loading ${label}. ${message}`"
    >
        <div class="editorial-loader__meta">
            <span>{{ variant === 'page' ? 'Archive /' : 'Loading /' }} {{ label }}</span>
            <span class="editorial-loader__state"><i aria-hidden="true"></i> In progress</span>
        </div>

        <p v-if="variant === 'page'" class="editorial-loader__headline" aria-hidden="true">
            Composing <span>the next page.</span>
        </p>

        <div class="editorial-loader__rail" aria-hidden="true">
            <span
                v-for="mark in registrationMarks"
                :key="mark"
                class="editorial-loader__mark"
                :class="{ 'editorial-loader__mark--major': mark % 4 === 0 }"
            ></span>
            <span class="editorial-loader__beam"></span>
        </div>

        <div v-if="variant === 'page'" class="editorial-loader__foot" aria-hidden="true">
            <span>{{ message }}</span>
            <span>One moment</span>
        </div>
    </div>
</template>

<style scoped>
.editorial-loader {
    width: 100%;
    color: var(--color-text-secondary);
}

.editorial-loader--page {
    border-top: 1px solid color-mix(in srgb, var(--color-text-primary) 25%, transparent);
    padding-block: clamp(2rem, 6vw, 4rem);
}

.editorial-loader--section {
    padding-block: 0.4rem 0.75rem;
}

.editorial-loader__meta,
.editorial-loader__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: 0.64rem;
    line-height: 1.4;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.editorial-loader__state {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    white-space: nowrap;
}

.editorial-loader__state i {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    background: var(--color-text-primary);
    animation: editorial-loader-beat 1.8s ease-in-out infinite;
}

.editorial-loader__headline {
    margin-top: clamp(1.75rem, 4vw, 3rem);
    color: var(--color-text-primary);
    font-family: var(--font-heading);
    font-size: clamp(2rem, 5.5vw, 4.5rem);
    font-weight: 700;
    line-height: 0.98;
    letter-spacing: -0.065em;
}

.editorial-loader__headline span {
    display: block;
    font-weight: 400;
    font-style: italic;
}

.editorial-loader__rail {
    position: relative;
    display: flex;
    height: 1.8rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    overflow: hidden;
}

.editorial-loader__rail::before {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    height: 1px;
    background: color-mix(in srgb, var(--color-text-primary) 14%, transparent);
    content: '';
}

.editorial-loader__mark {
    z-index: 1;
    width: 1px;
    height: 0.35rem;
    background: color-mix(in srgb, var(--color-text-primary) 24%, transparent);
}

.editorial-loader__mark--major {
    height: 0.7rem;
    background: color-mix(in srgb, var(--color-text-primary) 48%, transparent);
}

.editorial-loader__beam {
    position: absolute;
    z-index: 2;
    top: calc(50% - 1px);
    left: 0;
    width: clamp(3rem, 12vw, 8rem);
    height: 2px;
    background: var(--color-text-primary);
    box-shadow: 0 0 14px color-mix(in srgb, var(--color-text-primary) 22%, transparent);
    animation: editorial-loader-scan 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.editorial-loader__foot {
    margin-top: 0.25rem;
    color: var(--color-text-secondary);
    letter-spacing: 0.1em;
}

.editorial-loader--section .editorial-loader__meta {
    font-size: 0.58rem;
}

.editorial-loader--section .editorial-loader__rail {
    height: 1rem;
    margin-top: 0.35rem;
}

.editorial-loader--section .editorial-loader__beam {
    width: clamp(2.5rem, 8vw, 5rem);
}

@keyframes editorial-loader-scan {
    from { left: 0; transform: translateX(-105%); }
    to { left: 100%; transform: translateX(0); }
}

@keyframes editorial-loader-beat {
    0%, 100% { opacity: 0.4; transform: scale(0.78); }
    50% { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
    .editorial-loader__state i,
    .editorial-loader__beam {
        animation: none;
    }

    .editorial-loader__beam {
        left: 0;
        width: 3rem;
        transform: translateX(-105%);
    }
}
</style>
