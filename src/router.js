import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => import(/* webpackChunkName: "viewsSecure" */ './views/Secure/Dashboard.vue')
const Weight = () => import(/* webpackChunkName: "viewsSecure" */ './views/Secure/Weight.vue')
const Calories = () => import(/* webpackChunkName: "viewsSecure" */ './views/Secure/Calories.vue')
const Templates = () => import(/* webpackChunkName: "viewsSecure" */ './views/Secure/Templates.vue')
const Group = () => import(/* webpackChunkName: "viewsSecure" */ './views/Secure/Group.vue')
const Settings = () => import(/* webpackChunkName: "viewsSecure" */ './views/Secure/Settings.vue')

const Home = () => import(/* webpackChunkName: "viewsUnsecure" */ './views/Unsecure/Home.vue')
const Login = () => import(/* webpackChunkName: "viewsUnsecure" */ './views/Unsecure/Login.vue')
const Register = () => import(/* webpackChunkName: "viewsUnsecure" */ './views/Unsecure/Register.vue')

const Help = () => import(/* webpackChunkName: "viewsDefault" */ './views/Shared/Help.vue')
const error401 = () => import(/* webpackChunkName: "viewsDefault" */ './views/Shared/401.vue')
const error404 = () => import(/* webpackChunkName: "viewsDefault" */ './views/Shared/404.vue')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: 'home',
                icon: null,
                main: false,
                secure: false
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                title: 'dashboard',
                icon: 'dashboard',
                main: true,
                secure: true
            }
        },
        {
            path: '/weight',
            component: Weight,
            meta: {
                title: 'weight',
                icon: 'linear_scale',
                main: true,
                secure: true
            }
        },
        {
            path: '/calories',
            component: Calories,
            meta: {
                title: 'calories',
                icon: 'cake',
                main: true,
                secure: true
            }
        },
        {
            path: '/templates',
            component: Templates,
            meta: {
                title: 'templates',
                icon: 'archive',
                main: true,
                secure: true
            }
        },
        {
            path: '/group',
            component: Group,
            meta: {
                title: 'group',
                icon: 'group',
                main: true,
                secure: true
            }
        },
        {
            path: '/settings',
            component: Settings,
            meta: {
                title: 'settings',
                icon: 'dashboard',
                main: false,
                secure: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'login',
                icon: 'lock_open',
                main: true,
                secure: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                title: 'register',
                icon: 'subdirectory_arrow_right',
                main: true,
                secure: false
            }
        },
        {
            path: '/help',
            component: Help,
            meta: {
                title: 'help',
                icon: 'question_answer',
                main: false,
                secure: null
            }
        },
        {
            path: '/401',
            component: error401,
            meta: {
                title: 'nopermission',
                icon: null,
                main: false,
                secure: null
            }
        },
        {
            path: '*',
            component: error404,
            meta: {
                title: 'notfound',
                icon: null,
                main: false,
                secure: null
            }
        }

    ]
})
