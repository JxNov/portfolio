import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainLayout from '@/components/Layouts/MainLayout.vue';

export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    meta: {
      icon: '',
      name: 'Home',
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: MainLayout,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routers],
});

export default router;
