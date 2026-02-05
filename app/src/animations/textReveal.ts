import gsap from 'gsap';
import { splitText } from './utils';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateTextReveal = (element: HTMLElement, delay: number = 0) => {
    // Ensure parent is visible and reset
    gsap.set(element, { opacity: 1, x: 0, y: 0, autoAlpha: 1 });
    element.style.transform = 'none'; // Force clear transform in case of lingering inline styles

    const chars = splitText(element, 'chars');

    gsap.to(chars, {
        y: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power4.out',
        delay: delay,
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
        }
    });
};

export const animateWordsReveal = (element: HTMLElement) => {
    const words = splitText(element, 'words');

    gsap.to(words, {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
        }
    });
};
