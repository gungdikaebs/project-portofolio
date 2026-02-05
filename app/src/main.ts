import { createApp } from 'vue'
import './styles/globals.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Disable native browser scroll restoration to let Vue Router/Lenis handle it
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

app.use(router).mount('#app')
