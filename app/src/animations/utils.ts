/**
 * Splits text content of an element into individual headers (words or chars) wrapped in spans.
 * This mimics GSAP's SplitText plugin functionality for basic usage.
 */
export const splitText = (element: HTMLElement, type: 'chars' | 'words' = 'words') => {
    const text = element.innerText;
    element.innerHTML = '';

    // Split by words first to preserve spacing
    const words = text.split(' ');

    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.overflow = 'hidden';
        wordSpan.style.verticalAlign = 'top'; // Prevent layout shifts

        if (type === 'chars') {
            const chars = word.split('');
            chars.forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.innerText = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.transform = 'translateY(100%)'; // Initial state for reveal
                charSpan.classList.add('split-char');
                wordSpan.appendChild(charSpan);
            });
        } else {
            // Words animation
            const contentSpan = document.createElement('span');
            contentSpan.innerText = word;
            contentSpan.style.display = 'inline-block';
            contentSpan.style.transform = 'translateY(100%)'; // Initial state
            contentSpan.classList.add('split-word');
            wordSpan.appendChild(contentSpan);
        }

        element.appendChild(wordSpan);

        // Add space after word unless it's the last one
        if (wordIndex < words.length - 1) {
            const space = document.createTextNode(' ');
            element.appendChild(space);
        }
    });

    return type === 'chars' ? element.querySelectorAll('.split-char') : element.querySelectorAll('.split-word');
};
