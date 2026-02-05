import gsap from 'gsap';

export const initMagneticButtons = (selector: string = '.magnetic-btn') => {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach((btn) => {
        const button = btn as HTMLElement;

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move the button itself
            gsap.to(button, {
                x: x * 0.3, // Strength of magnetic effect
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Optional: Move child element (like a span or icon) more excessively for depth
            const child = button.querySelector('.btn-content') as HTMLElement;
            if (child) {
                gsap.to(child, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });

            const child = button.querySelector('.btn-content') as HTMLElement;
            if (child) {
                gsap.to(child, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    });
};
