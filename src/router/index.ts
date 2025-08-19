import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '@/stores/user.ts'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NewForm from '@/views/NewForm.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView,
            children: [
                {
                    path: 'profile',
                    component: ProfileView,
                },
                {
                    path: 'new-form',
                    component: NewForm,
                },
            ],
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
            path: '/:pathMatch(.*)*',
            component: NotFoundView,
        },
    ],
})

router.beforeEach((to) => {
    const { isLoggedIn: isUserLoggedIn } = useUserStore()

    if (isUserLoggedIn) {
        if (to.path !== '/sign-in' && to.path !== '/sign-up') {
            return true
        }
        return '/'
    } else if (to.path !== '/sign-in' && to.path !== '/sign-up') {
        return {
            path: '/sign-in',
        }
    }
    return true
})

export default router
