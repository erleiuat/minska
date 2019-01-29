import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            meta: {
                title: 'home',
                icon: null,
                main: false,
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Home.vue')
            }
        },
        {
            path: '/dashboard',
            meta: {
                title: 'dashboard',
                icon: 'dashboard',
                main: true,
                secure: true
            },
            component: function () {
                return import('./views/Secure/Dashboard.vue')
            }
        },
        {
            path: '/weight',
            meta: {
                title: 'weight',
                icon: 'linear_scale',
                main: true,
                secure: true
            },
            component: function () {
                return import('./views/Secure/Weight.vue')
            }
        },
        {
            path: '/calories',
            meta: {
                title: 'calories',
                icon: 'cake',
                main: true,
                secure: true
            },
            component: function () {
                return import('./views/Secure/Calories.vue')
            }
        },
        {
            path: '/templates',
            meta: {
                title: 'templates',
                icon: 'archive',
                main: true,
                secure: true
            },
            component: function () {
                return import('./views/Secure/Templates.vue')
            }
        },
        {
            path: '/group',
            meta: {
                title: 'group',
                icon: 'group',
                main: true,
                secure: true
            },
            component: function () {
                return import('./views/Secure/Group.vue')
            }
        },
        {
            path: '/settings',
            meta: {
                title: 'settings',
                icon: 'dashboard',
                main: false,
                secure: true
            },
            component: function () {
                return import('./views/Secure/Settings.vue')
            }
        },
        {
            path: '/login',
            meta: {
                title: 'login',
                icon: 'lock_open',
                main: true,
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Login.vue')
            }
        },
        {
            path: '/register',
            meta: {
                title: 'register',
                icon: 'subdirectory_arrow_right',
                main: true,
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Register.vue')
            }
        },
        {
            path: '/help',
            meta: {
                title: 'help',
                icon: 'question_answer',
                main: false,
                secure: null
            },
            component: function () {
                return import('./views/Shared/Help.vue')
            }
        },
        {
            path: '/401',
            meta: {
                title: 'nopermission',
                icon: null,
                main: false,
                secure: null
            },
            component: function () {
                return import('./views/Shared/401.vue')
            }
        },
        {
            path: '*',
            meta: {
                title: 'notfound',
                icon: null,
                main: false,
                secure: null
            },
            component: function () {
                return import('./views/Shared/404.vue')
            }
        }

    ]
})
