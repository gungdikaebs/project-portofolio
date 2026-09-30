import { readonly, ref } from 'vue'

type Theme = 'dark' | 'light'

const storageKey = 'portfolio-theme'
const theme = ref<Theme>(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
let initialized = false
let hasSavedPreference = false

const isTheme = (value: string | null): value is Theme => value === 'dark' || value === 'light'

export const updateThemeColor = () => {
    const isPublic = document.documentElement.hasAttribute('data-portfolio')
    const color = isPublic ? (theme.value === 'light' ? '#f5f4ef' : '#101111') : '#0B0D10'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
}

const applyTheme = (value: Theme) => {
    theme.value = value
    document.documentElement.dataset.theme = value
    updateThemeColor()
}

export const initializeTheme = () => {
    if (initialized) return
    initialized = true
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
    const systemTheme = (): Theme => systemPreference.matches ? 'dark' : 'light'
    let saved: string | null = null
    try { saved = localStorage.getItem(storageKey) } catch { /* Storage may be unavailable. */ }
    hasSavedPreference = isTheme(saved)
    applyTheme(isTheme(saved) ? saved : systemTheme())

    systemPreference.addEventListener('change', () => {
        if (!hasSavedPreference) applyTheme(systemTheme())
    })
    window.addEventListener('storage', (event) => {
        if (event.key !== storageKey && event.key !== null) return
        hasSavedPreference = isTheme(event.newValue)
        applyTheme(isTheme(event.newValue) ? event.newValue : systemTheme())
    })
}

const toggleTheme = () => {
    hasSavedPreference = true
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
    try { localStorage.setItem(storageKey, theme.value) } catch { /* Keep the selection for this visit. */ }
}

export const useTheme = () => ({ theme: readonly(theme), toggleTheme })
