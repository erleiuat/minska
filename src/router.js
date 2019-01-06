import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: 'Home',
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
                title: 'Dashboard',
                secure: true
            },
            component: function () {
                return import('./views/Secure/Dashboard.vue')
            }
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login',
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
                title: 'Register',
                secure: false
            },
            component: function () {
                return import('./views/Unsecure/Register.vue')
            }
        },
        {
            path: '/401',
            name: 'noPermission',
            meta: {
                title: '401 No Permission',
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
                title: '404 Not Found',
                secure: null
            },
            component: function () {
                return import('./views/Shared/404.vue')
            }
        }

    ]
})
