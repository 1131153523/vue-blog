import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
const Login = resolve => require(['../pages/admin/Login.vue'], resolve) 
const Admin = resolve => require(['../pages/admin/Admin.vue'], resolve) 
const Home = resolve => require(['../components/admin/Home.vue'], resolve) 
const _404 = resolve => require(['../pages/admin/404.vue'], resolve) 
const Tool = resolve => require(['../components/admin/Tool.vue'], resolve) 
const Tags = resolve => require(['../components/admin/Tags.vue'], resolve) 
const Write = resolve => require(['../components/admin/Write.vue'], resolve) 
const VerifyArticle = resolve => require(['../components/admin/VerifyArticle.vue'], resolve) 
const Read = resolve => require(['../components/common/Read.vue'], resolve) 
const Index = resolve => require(['../pages/front/Index.vue'], resolve) 
const Main = resolve => require(['../pages/front/Home.vue'], resolve) 
const Article = resolve => require(['../pages/front/Article.vue'], resolve) 
const Project = resolve => require(['../pages/front/Project.vue'], resolve) 
const Message = resolve => require(['../pages/front/Message.vue'], resolve) 
// import Message from '../pages/front/Message.vue'
const About = resolve => require(['../pages/front/About.vue'], resolve) 
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component:Index,
            redirect: '/home',
            children: [
                {
                    path: '/article/:article_id',
                    name: 'Article',
                    component: Article
                },
                {
                    path: '/home',
                    name: 'Home',
                    component: Main
                },
                {
                    path: '/project',
                    name: 'Project',
                    component: Project 
                },
                {
                    path: '/message',
                    name: 'Message',
                    component: Message
                },
                {
                    path: '/about',
                    name: 'About',
                    component: About
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component:Login
        },
        {
            path: '/admin',
            name: 'Admin',
            meta: {
                requireAuth: true
            },
            component: Admin,
            children: [
                {
                    path: '/admin/home',
                    name: '首页',
                    meta: {
                        requireAuth: true
                    },
                    component: Home,
                },
                {
                    path: '/admin/tags',
                    name: '标签管理',
                    meta: {
                        requireAuth: true
                    },
                    component: Tags,
                },
                {
                    path: '/admin/write',
                    name: '发布文章',
                    meta: {
                        requireAuth: true
                    },
                    component: Write
                },
                {
                    path: '/admin/verifyArticle',
                    name: '审核文章',
                    meta: {
                        requireAuth: true
                    },
                    component: VerifyArticle
                },
                {
                    path: '/admin/readArticle/:article_id',
                    name: '查看文章',
                    meta: {
                        requireAuth: true
                    },
                    component: Read
                },
                {
                    path: '/admin/tool',
                    name: '工具箱',
                    meta: {
                        requireAuth: true
                    },
                    component: Tool
                }
            ],
            redirect: '/admin/home'
        },
        {
            path: '/404',
            name: '404',
            component: _404
        },
        {
            path: '*',
            redirect: '/404',
            hidden: true
        }
    ],
    scrollBehavior(to, from,savedPosition) {
        if (to.fullPath.indexOf('/article/') > -1 && !to.fullPath.includes('-comment')) {
            return {
                x: 0,
                y: 0
            }
        } else if (to.fullPath.includes('-comment') && to.fullPath.includes('/article/')){
            return {
                x: 0,
                y: document.querySelector('.wrapper').scrollHeight
            }
        } else {
            return savedPosition
        }
    }
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            return next()
        }
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
})
export default router
