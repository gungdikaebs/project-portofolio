import gsap from 'gsap';

export const initTilt = (element: HTMLElement, intensity: number = 20) => {
    // Ensure parent has perspective
    gsap.set(element, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

    // Find inner content for parallax (e.g., the image)
    const innerImage = element.querySelector('img');
    if (innerImage) {
        gsap.set(innerImage, { scale: 1.05 });
    }

    // Create Glare Element
    const glare = document.createElement('div');
    gsap.set(glare, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(125deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
        pointerEvents: 'none',
        opacity: 0,
        zIndex: 10,
        mixBlendMode: 'overlay'
    });
    element.appendChild(glare);

    // Optimized Trackers (quickTo for best performance)
    const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

    // Ambient Float Animation
    const floatTween = gsap.to(element, {
        y: '-12px',
        duration: 2.5 + Math.random(),
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: Math.random() * 2
    });

    const onMouseEnter = () => {
        // Pause floating immediately on enter
        floatTween.pause();
    };

    const onMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (mouseX - centerX) / centerX; // -1 to 1
        const percentY = (mouseY - centerY) / centerY; // -1 to 1

        // 1. Magnetic Movement (High Perf)
        xTo((mouseX - centerX) * 0.15); // Increased magnetic strength
        yTo((mouseY - centerY) * 0.15);

        // 2. Tilt Rotation (Standard Tween is fine for rotation)
        gsap.to(element, {
            rotationX: -percentY * intensity,
            rotationY: percentX * intensity,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto'
        });

        // 3. Parallax Image
        if (innerImage) {
            gsap.to(innerImage, {
                x: -percentX * 8,
                y: -percentY * 8,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        }

        // 4. Glare
        gsap.to(glare, {
            opacity: 1,
            backgroundPosition: `${50 + (percentX * 50)}% ${50 + (percentY * 50)}%`,
            duration: 0.1
        });
    };

    const onMouseLeave = () => {
        // Reset everything smoothly
        gsap.to(element, {
            rotationX: 0,
            rotationY: 0,
            x: 0,
            y: 0, // Reset position
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto',
            onComplete: () => {
                floatTween.resume(); // Resume floating
            }
        });

        if (innerImage) {
            gsap.to(innerImage, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
        }

        gsap.to(glare, { opacity: 0, duration: 0.5 });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
        floatTween.kill();
        if (glare.parentNode === element) element.removeChild(glare);
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
    };
};
