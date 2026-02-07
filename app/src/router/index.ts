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
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/admin',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/skills',
        name: 'AdminSkills',
        component: () => import('../views/admin/SkillsIndex.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/projects',
        name: 'AdminProjects',
        component: () => import('../views/admin/ProjectsIndex.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/projects/create',
        name: 'AdminProjectCreate',
        component: () => import('../views/admin/ProjectForm.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/projects/:id/edit',
        name: 'AdminProjectEdit',
        component: () => import('../views/admin/ProjectForm.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/profile',
        name: 'AdminProfile',
        component: () => import('../views/admin/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/experience',
        name: 'AdminExperience',
        component: () => import('../views/admin/ExperienceIndex.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/education',
        name: 'AdminEducation',
        component: () => import('../views/admin/EducationIndex.vue'),
        meta: { requiresAuth: true }
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

// Navigation Guard
router.beforeEach((to, _from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.name === 'Login' && isAuthenticated) {
        next('/admin');
    } else {
        next();
    }
});

export default router
