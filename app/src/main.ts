import { createApp } from 'vue'
import './styles/variables.css' /* Variables first */
import './styles/globals.css'   /* Tailwind (Preflight + Utilities) */
import './styles/base.css'      /* Custom Cleanups/Base Styles (after Preflight) */
import App from './App.vue'

createApp(App).mount('#app')
