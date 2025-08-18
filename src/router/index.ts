import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Home from '@/views/Home.vue'
import { useUserStore } from '@/stores/user.ts'
import Profile from '@/views/Profile.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/sign-in',
      component: SignIn,
    },
    {
      path: '/sign-up',
      component: SignUp,
    },
    {
      path: '/profile',
      component: Profile,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not found',
      component: NotFoundView,
    },
  ],
})

router.beforeEach((to) => {
  const { isLoggedIn: isUserLoggedIn } = useUserStore()

  if (isUserLoggedIn) {
    return true
  } else if (to.path !== '/sign-in' && to.path !== '/sign-up') {
    return {
      path: '/sign-in',
    }
  }
  return true
})

export default router
