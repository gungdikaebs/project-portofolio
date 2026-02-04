/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                accent: 'var(--color-accent)',
            },
            fontFamily: {
                heading: ['var(--font-heading)'],
                body: ['var(--font-body)'],
            }
        },
    },
    plugins: [],
}
