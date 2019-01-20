import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/admin/Login.vue'
import Admin from '../pages/admin/Admin.vue'
import Home from '../components/admin/Home.vue'
import store from '../store/index'
import _404 from '../pages/admin/404.vue'
import Tool from '../components/admin/Tool.vue'
import Tags from '../components/admin/Tags.vue'
import Write from '../components/admin/Write.vue'
import VerifyArticle from '../components/admin/VerifyArticle.vue'
import Read from '../components/common/Read.vue'
import Index from '../pages/front/Index.vue'
import Main from '../pages/front/Home.vue'
import Article from '../pages/front/Article.vue'
import Project from '../pages/front/Project.vue'
import { log } from 'util';
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
