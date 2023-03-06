import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/components/genPlan/AppGenplanIndex'),
            name: 'index'
        },
        {
            path: '/show',
            component: () => import('@/components/genPlan/AppGenplanShow'),
            name: 'show'
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
})

export default router