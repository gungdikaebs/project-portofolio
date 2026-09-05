import gsap from 'gsap'

export const motion = {
    duration: {
        fast: 0.28,
        base: 0.55,
        slow: 0.9,
    },
    ease: {
        enter: 'power3.out',
        exit: 'power2.in',
        emphasis: 'expo.out',
    },
    stagger: {
        tight: 0.045,
        base: 0.09,
    },
    distance: {
        small: 16,
        base: 36,
        large: 72,
    },
} as const

export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const revealImmediately = (targets: gsap.TweenTarget) => {
    gsap.set(targets, { clearProps: 'all', opacity: 1, visibility: 'visible', x: 0, y: 0 })
}
