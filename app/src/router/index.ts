import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/project/:id',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetail.vue')
    },
    {
        path: '/projects',
        name: 'ProjectsIndex',
        component: () => import('../views/ProjectsIndex.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
