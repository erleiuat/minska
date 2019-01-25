import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: 'home',
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Home.vue')
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {
                title: 'dashboard',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Dashboard.vue')
            }
        },
        {
            path: '/weight',
            name: 'weight',
            meta: {
                title: 'weight',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Weight.vue')
            }
        },
        {
            path: '/calories',
            name: 'calories',
            meta: {
                title: 'calories',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Calories.vue')
            }
        },
        {
            path: '/templates',
            name: 'templates',
            meta: {
                title: 'templates',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Templates.vue')
            }
        },
        {
            path: '/group',
            name: 'group',
            meta: {
                title: 'group',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Group.vue')
            }
        },
        {
            path: '/settings',
            name: 'settings',
            meta: {
                title: 'settings',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Settings.vue')
            }
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'login',
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Login.vue')
            }
        },
        {
            path: '/register',
            name: 'register',
            meta: {
                title: 'register',
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Register.vue')
            }
        },
        {
            path: '/help',
            name: 'help',
            meta: {
                title: 'help',
                secure: null
            },
            component: function () {
                return import('./views/Shared/Help.vue')
            }
        },
        {
            path: '/401',
            name: 'noPermission',
            meta: {
                title: 'nopermission',
                secure: null
            },
            component: function () {
                return import('./views/Shared/401.vue')
            }
        },
        {
            path: '*',
            name: 'notFound',
            meta: {
                title: 'notfound',
                secure: null
            },
            component: function () {
                return import('./views/Shared/404.vue')
            }
        }

    ]
})
