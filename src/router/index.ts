import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainLayout from '@/components/Layouts/MainLayout.vue';

export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: MainLayout,
        meta: {
          title: 'META.HOME.TITLE',
          description: 'META.HOME.DESCRIPTION',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routers],
});

export default router;
