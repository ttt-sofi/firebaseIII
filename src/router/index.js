import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '@/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Singup',
    },

    {
      path: '/Login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/Singup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {

  const authRequired = to.meta.login
  const isAuthenticated = auth.currentUser !== null

  if(authRequired && !isAuthenticated){
    next('/login')
  } else {
    next()
  }
  })

export default router
