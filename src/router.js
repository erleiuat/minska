import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/dashboard',
            component: () => import('./views/Secure/Dashboard.vue'),
            meta: {
                title: 'dashboard',
                icon: 'dashboard',
                main: true,
                secure: true
            }
        },
        {
            path: '/weight',
            component: () => import('./views/Secure/Weight.vue'),
            meta: {
                title: 'weight',
                icon: 'linear_scale',
                main: true,
                secure: true
            }
        },
        {
            path: '/calories',
            component: () => import('./views/Secure/Calories.vue'),
            meta: {
                title: 'calories',
                icon: 'cake',
                main: true,
                secure: true
            }
        },
        {
            path: '/templates',
            component: () => import('./views/Secure/Templates.vue'),
            meta: {
                title: 'templates',
                icon: 'archive',
                main: true,
                secure: true
            }
        },
        /*{
            path: '/group',
            component: () => import('./views/Secure/Group.vue'),
            meta: {
                title: 'group',
                icon: 'group',
                main: true,
                secure: true
            }
        },*/
        {
            path: '/settings',
            component: () => import('./views/Secure/Settings.vue'),
            meta: {
                title: 'settings',
                icon: 'dashboard',
                main: false,
                secure: true
            }
        },
        {
            path: '/',
            component: () => import('./views/Unsecure/Home.vue'),
            meta: {
                title: 'home',
                icon: null,
                main: false,
                secure: false
            }
        },
        {
            path: '/login',
            component: () => import('./views/Unsecure/Login.vue'),
            meta: {
                title: 'login',
                icon: 'lock_open',
                main: true,
                secure: false
            }
        },
        {
            path: '/register',
            component: () => import('./views/Unsecure/Register.vue'),
            meta: {
                title: 'register',
                icon: 'subdirectory_arrow_right',
                main: true,
                secure: false
            }
        },
        {
            path: '/confirm',
            component: () => import('./views/Unsecure/Confirm.vue'),
            meta: {
                title: 'confirm',
                icon: 'mail_outline',
                main: true,
                secure: false
            }
        },
        {
            path: '/help',
            component: () => import('./views/Shared/Help.vue'),
            meta: {
                title: 'help',
                icon: 'question_answer',
                main: false,
                secure: null
            }
        },
        {
            path: '/401',
            component: () => import('./views/Shared/401.vue'),
            meta: {
                title: 'nopermission',
                icon: null,
                main: false,
                secure: null
            }
        },
        {
            path: '*',
            component: () => import('./views/Shared/404.vue'),
            meta: {
                title: 'notfound',
                icon: null,
                main: false,
                secure: null
            }
        }

    ]
})
