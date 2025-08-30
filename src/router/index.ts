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
                    meta: {
                        title: 'Home',
                    },
                },
                {
                    path: 'profile',
                    component: ProfileView,
                    meta: {
                        title: 'Profile',
                    },
                },
                {
                    path: 'new-form',
                    component: FormBuilder,
                    meta: {
                        title: 'New form'
                    }
                },
                {
                    path: 'form/:id',
                    component: FormEditor,
                    meta: {
                        title: 'Form editor',
                    },
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
                    meta: {
                        title: 'Respond to: ',
                    }
                },
                {
                    path: '/form/:id/answers',
                    component: FormResponses,
                    meta: {
                        title: 'Form responses',
                    }
                },
            ],
        },
        {
            path: '/sign-in',
            component: SignIn,
            meta: {
                title: 'Sign in'
            }
        },
        {
            path: '/sign-up',
            component: SignUp,
            meta: {
                title: 'Sign up'
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundView,
            meta: {
                title: '404'
            }
        },
        {
            path: '/no-access',
            component: NoAccess,
            meta: {
                title: 'No access'
            }
        },
    ],
})

router.beforeEach((to) => {
    const { isLoggedIn: isUserLoggedIn } = useUserStore()

    if (to.meta.title) {
        const title = document.querySelector('title')
        if (!!title) {
            title.text = (to.meta.title as string) ?? 'Form builder' 
        }
    }

    if (isUserLoggedIn) {
        if (to.path !== '/sign-in' && to.path !== '/sign-up') {
            return true
        }
        return '/'
    } else if (to.path !== '/sign-in' && to.path !== '/sign-up') {
        return { path: '/sign-in' }
    }
    return true
})

export default router
