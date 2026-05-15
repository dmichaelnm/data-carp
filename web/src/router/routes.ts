import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },

  {
    path: '/auth',
    component: () => import('layouts/AuthenticationLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue') },
      {
        path: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      {
        path: 'forgot-password',
        component: () => import('pages/auth/ForgotPasswordPage.vue'),
      },
    ],
  },

  {
    path: '/info',
    component: () => import('layouts/InfoLayout.vue'),
    children: [
      {
        path: 'privacy-policy',
        component: () => import('pages/info/PrivacyPolicyPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
