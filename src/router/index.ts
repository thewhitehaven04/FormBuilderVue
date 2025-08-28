import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import LayoutView from '@/views/LayoutView.vue'
import { useUserStore } from '@/stores/user.ts'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import FormBuilder from '@/views/FormBuilder.vue'
import HomeView from '@/views/HomeView.vue'
import FormEditor from '@/views/FormEditor.vue'
import FormResponses from '@/views/FormResponses.vue'
import FormResponseWrapper from '@/views/FormResponseWrapper.vue'
import { fetchForm } from '@/services/forms'
import NoAccess from '@/views/NoAccess.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: LayoutView,
            children: [
                {
                    path: '',
                    component: HomeView,
                },
                {
                    path: 'profile',
                    component: ProfileView,
                },
                {
                    path: 'new-form',
                    component: FormBuilder,
                },
                {
                    path: 'form/:id',
                    component: FormEditor,
                    beforeEnter: async (to) => {
                        // don't do that in a real app, request userId from the backend explicitly
                        const { data: user } = useUserStore()
                        const form = await fetchForm(Number.parseInt(to.params.id as string))

                        if (form.created_by === user.userId) {
                            return true
                        }

                        return {
                            path: '/no-access',
                        }
                    },
                },
                {
                    path: 'respond/:id',
                    component: FormResponseWrapper,
                },
                {
                    path: '/form/:id/answers',
                    component: FormResponses,
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
        {
            path: '/no-access',
            component: NoAccess,
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
