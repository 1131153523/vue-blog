import * as types from './types'
import store from './index'
import router from '../router/index'
import api from '../api/index'
import getRandomId from '../utils/getRandomId'
import { type } from 'os';
import { stat } from 'fs';

const mutations = {
    //记录登录状态
    [types.LOGIN]: (state, data) => {
        window.sessionStorage.setItem('token', data.token)
        window.sessionStorage.setItem('username', data.username)
        state.token = data.token
        state.username = data.username
    },
    //更改左侧导航栏显示状态
    [types.CHANGE_COLLAPSE]: (state) => {
        state.isCollapse = !state.isCollapse
    },
    //更改主题颜色
    [types.CHANGE_HEAD_COLOR]: (state, val) => {
        state.headColor = val
    },
    //添加中间的标签导航
    [types.ADD_TAGS_VIEW]: (state, tag) => {
        state.tagsView.push(tag)
        let res = []
        let obj = {}
        for (let i = 0;i < state.tagsView.length;i++) {
            if (!obj[state.tagsView[i].tag]) {
                res.push(state.tagsView[i])
                obj[state.tagsView[i].tag] = true
            }
        }
        state.tagsView = res
    },
    //用于跳转页面，并且添加标签导航
    [types.CHANGE_PATH]: (state, pathInfo) => {
        let {path, tag} = pathInfo
        router.push(path)
        store.commit('ADD_TAGS_VIEW', {tag: tag, path: path})
    },
    //删除标签导航
    [types.REMOVE_TAGS_VIEW]: (state, index) => {
        state.tagsView.splice(index, 1)
    },
    //获取文章标签
    [types.GET_TAGS]: (state, value) => {
        let color = ['success', 'info', 'warning', 'danger']
        state.tags = value.map(item => {
            return {...item, color: color[Math.floor(Math.random()*4)]}
        })
    },
    //删除文章标签
    [types.REMOVE_TAG]: (state, value) => {
        state.tags.splice(value.index, 1)
    },
    //添加文章标签
    [types.ADD_TAG]: (state, value) => {
        state.tags.push(value)
    },
    //获取草稿内容
    [types.GET_DRAFT]:(state, value) => {
        state.articleValue = value

    },
    //保存草稿内容
    [types.SAVE_DRAFT]:(state, value) => {
        console.log(value)
    },
    //设置直接发布的文章内容
    [types.SET_ARTICLE_VALUE]:(state, value) => {
        state.articleValue = value
    },
    //获取文章列表信息
    [types.GET_ARTICLE_LIST]: (state, value) => {
        let tags = {}
        let data = []
        value.forEach(item => {
            tags[item.tags_name] = []
        })
        value.forEach(item => {
            tags[item.tags_name].push(item.article_title)
        })
        for (let tag in tags) {
            data.push({
                label: tag,
                children: [
                    ...tags[tag].map(item => ({label: item}))
                ]
            })
        }
        state.articleList = value
        state.articleList1 = value
        state.articleTree = data
        state.options1[0] = {
            label: '标签',
            options: state.tags.map(e => ({value: e.tags_id, label: e.tags_name}))
        }
        state.options1[1] = {
            label: '作者',
            options: [...new Set([...value.map(e => e.article_author)])].map(e => ({value: e, label: e}))
        }
        let times = [...new Set([...value.map(e => new Date(parseInt(e.article_time)).toLocaleString().slice(0, 10).replace('下', '').replace('上', ''))])]
        times.sort((a,b) => a > b? -1 : 1)
        state.options2[0] = {
            label: '日期',
            options: times.map(e => ({value: e, label: e}))
        }
    },
    //日期筛选文章列表
    [types.SCREEN_DATE]: (state, value) => {

        state.articleList = state.articleList1.filter(e => new Date(parseInt(e.article_time)).toLocaleString().slice(0, 10).replace('下', '').replace('上', '') === value)
    },
    //通过标签或作者筛选文章列表
    [types.SCREEN_TAGS_AUTHOR]: (state, value) => {
        if (state.articleList.length < state.articleList1.length) {
            state.articleList = state.articleList.filter(e => e.tags_id === value || e.article_author === value)
        } else if (state.articleList.length === state.articleList1.length){
            state.articleList = state.articleList1.filter(e => e.tags_id === value || e.article_author === value)
        }
    },
    //清除筛选
    [types.CLEAR_SCREEN]: (state) => {
        state.articleList = state.articleList1
    },
    //搜索筛选
    [types.SCREEN_SEARCH]: (state, value) => {
        state.articleList = state.articleList1.filter(e => e.article_title.indexOf(value) > -1)
    },
    //更新文章审核状态
    [types.UPDATE_ARTICLE_VERIFY]: (state, value) => {
        state.articleList[state.articleList.findIndex(e => e.article_id === value)].article_pass = 1
        state.articleList1[state.articleList1.findIndex(e => e.article_id === value)].article_pass = 1
    },
    [types.UPDATE_ARTICLE_IMG]: (state, value) => {
        state.articleList[state.articleList.findIndex(e => e.article_id === value.article_id)].article_img = value.article_img
        state.articleList1[state.articleList1.findIndex(e => e.article_id === value.article_id)].article_img = value.article_img
    },
    [types.DELETE_ARTICLE]: (state, value) => {
        let index = state.articleList.findIndex(e => e.article_id === value)
        state.articleList1 = [...state.articleList1.slice(0, index), ...state.articleList1.slice(index+1)]
        state.articleList = [...state.articleList.slice(0, index), ...state.articleList.slice(index+1)]
    },
    [types.UPDATE_ARTICLE]: (state, value) => {
        state.articleList1 = state.articleList1.map(e => {
            let item = JSON.parse(JSON.stringify(e))
            if (item.article_id === value.article_id) {
                item.tags_id = value.tags_id
                item.tags_name = state.tags.find(tag => tag.tags_id === value.tags_id).tags_name
                item.article_title = value.article_title
                item.article_author = value.article_author
                return item
            } else {
                return e
            }
        })
        state.articleList = state.articleList.map(e => {
            let item = JSON.parse(JSON.stringify(e))
            if (item.article_id === value.article_id) {
                item.tags_id = value.tags_id
                item.tags_name = state.tags.find(tag => tag.tags_id === value.tags_id).tags_name
                item.article_title = value.article_title
                item.article_author = value.article_author
                return item
            } else {
                return e
            }
        })
    },
    [types.GET_TOOLS]: (state, value) => {
        state.tools = value
    },
    [types.SET_TOOL]: (state, value) => {
        switch(value.type) {
            case 'delete':
                state.tools.splice(state.tools.findIndex(e => e.tool_id === value.tool_id), 1)
                break
            case 'update':
                let index = state.tools.findIndex(e => e.tool_id === value.tool_id)
                state.tools[index].tool_name = value.tool_name
                state.tools[index].tool_url = value.tool_url
                state.tools[index].tool_type = value.tool_type
                break
            case 'insert':
                state.tools.push({
                    tool_id: value.tool_id,
                    tool_name: value.tool_name,
                    tool_url: value.tool_url,
                    tool_type: value.tool_type
                })
        }
    },
    [types.SET_SEARCH]: (state, value) => {
        state.search = value
    },
    [types.SET_LIST]: (state, value) => {
        state.list = value
    },
    [types.LOGIN_GITHUB]: (state) => {
        api.loginGithub()
            .then(res => {
                state.user = res
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    },
    
}

export default mutations