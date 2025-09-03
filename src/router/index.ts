import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '@/views/LayoutView.vue'
import { useUserStore } from '@/stores/user.ts'
import NotFoundView from '@/views/NotFoundView.vue'
import { fetchForm } from '@/services/forms'

const HomeView = () => import('@/views/HomeView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const FormBuilder = () => import('@/views/FormBuilder.vue')
const FormEditor = () => import('@/views/FormEditor.vue')
const FormResponses = () => import('@/views/FormResponses.vue')
const FormResponseWrapper = () => import('@/views/FormResponseWrapper.vue')
const NoAccess = () => import('@/views/NoAccess.vue')
const SingleChoiceQuestionBreakdown = () => import('@/views/SingleChoiceQuestionBreakdown.vue')
const MultipleChoiceQuestionBreakdown = () => import('@/views/MultipleChoiceQuestionBreakdown.vue')
const SignIn = () => import('@/views/SignIn.vue')
const SignUp = () => import('@/views/SignUp.vue')

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
                        title: 'New form',
                    },
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
                    },
                },
                {
                    path: '/form/:id/answers',
                    component: FormResponses,
                    meta: {
                        title: 'Form responses',
                    },
                },
                {
                    path: '/form/:formId/question/:questionId/single-choice/breakdown',
                    component: SingleChoiceQuestionBreakdown,
                    meta: {
                        title: 'Question breakdown',
                    },
                },
                {
                    path: '/form/:formId/question/:questionId/multiple-choice/breakdown',
                    component: MultipleChoiceQuestionBreakdown,
                    meta: {
                        title: 'Question breakdown',
                    },
                },
            ],
        },
        {
            path: '/sign-in',
            component: SignIn,
            meta: {
                title: 'Sign in',
            },
        },
        {
            path: '/sign-up',
            component: SignUp,
            meta: {
                title: 'Sign up',
            },
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundView,
            meta: {
                title: '404',
            },
        },
        {
            path: '/no-access',
            component: NoAccess,
            meta: {
                title: 'No access',
            },
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
