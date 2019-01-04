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
            if (!obj[state.tagsView[i].path]) {
                res.push(state.tagsView[i])
                obj[state.tagsView[i].path] = true
            }
        }
        state.tagsView = res
    },
    //用于跳转页面，并且添加标签导航
    [types.CHANGE_PATH]: (state, pathInfo) => {
        let {path, tag} = pathInfo
        router.push(path)
        store.dispatch('addTagsView', {tag: tag, path: path})
    },
    //删除标签导航
    [types.REMOVE_TAGS_VIEW]: (state, index) => {
        state.tagsView.splice(index, 1)
    },
    //获取文章标签
    [types.GET_TAGS]: (state) => {
        api.getTags({token: state.token})
            .then(res => {
                let color = ['success', 'info', 'warning', 'danger']
                if (res.code) {
                    state.tags = res.data.map(item => {
                        return {...item, color: color[Math.floor(Math.random()*4)]}
                    })
                }
            })
            .catch(err => {
                console.log(err)
                console.log('GET_TAGS出现错误')
            })
    },
    //删除文章标签
    [types.REMOVE_TAG]: (state, value) => {
        api.removeTag({token: state.token, ...value})
            .then(res => {
                if (res.code) {
                    state.tags.splice(value.index, 1)
                }
            })
            .catch(e => {
                console.log(e);
                console.log('REMOVE_TAG出现错误')
            })
    },
    //添加文章标签
    [types.ADD_TAG]: (state, value) => {
        let color = ['success', 'info', 'warning', 'danger']
        let obj = {
            tags_id: getRandomId(),
            tags_name: value,
            color: color[Math.floor(Math.random()*4)],
            token: state.token
        }
        api.addTag(obj)
            .then(res => {
                if (res.code) {
                    state.tags.push(obj)
                }
            })
            .catch(e => {
                console.log(e);
                console.log('ADD_TAG出现错误')
            })
    },
    //获取草稿内容
    [types.GET_DRAFT]:(state) => {
        api.getDraft()
            .then((res) => {
                if (res.code) {
                    state.articleValue = res.data
                }
            })
            .catch(e => {
                console.log(e)
                console.log('GET_DRAFT出现错误')
            })
    },
    //保存草稿内容
    [types.SAVE_DRAFT]:(state, value) => {
        api.saveDraft({draft_content: value, token: state.token})
            .then(res => {
                if (!res.code) {
                    console.log(res)
                }
            })
            .catch(e => {
                console.log(e)
                console.log('SAVE_DRAFT出现错误')
            })
    },
    //通过直接发布上传文章
    [types.WRITE_ARTICLE]:(state, info) => {
        api.writeArticle({...info, token: state.token})
            .then(res => {
                if (res.code) {
                    console.log('发布成功')
                    store.dispatch('getArticleList')
                }
            })
            .catch(e => {
                console.log(e);
                console.log('WRITE_ARTICLE出现错误')
            })
    },
    //设置直接发布的文章内容
    [types.SET_ARTICLE_VALUE]:(state, value) => {
        state.articleValue = value
    },
    //获取文章列表信息
    [types.GET_ARTICLE_LIST]: (state) => {
        api.getArticleList()
            .then(res => {
                if (res.code) {
                    let tags = {}
                    let data = []
                    res.data.forEach(item => {
                        tags[item.tags_name] = []
                    })
                    res.data.forEach(item => {
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
                    state.articleList = res.data
                    state.articleList1 = res.data
                    state.articleTree = data
                    state.options1[0] = {
                        label: '标签',
                        options: [...new Set([...res.data.map(e => e.tags_name)])].map(e => ({value: e, label: e}))
                    }
                    state.options1[1] = {
                        label: '作者',
                        options: [...new Set([...res.data.map(e => e.article_author)])].map(e => ({value: e, label: e}))
                    }

                    let times = [...new Set([...res.data.map(e => e.article_time.slice(0, 10))])]
                    times.sort((a,b) => a > b? -1 : 1)
                    state.options2[0] = {
                        label: '日期',
                        options: times.map(e => ({value: e, label: e}))
                    }
                }
            })
            .catch(e => {
                console.log(e)
                console.log('GET_ARTICLE_LIST出现错误')
            })
    },
    //日期筛选文章列表
    [types.SCREEN_DATE]: (state, value) => {
        state.articleList = state.articleList1.filter(e => e.article_time.slice(0, 10) === value)
    },
    //通过标签或作者筛选文章列表
    [types.SCREEN_TAGS_AUTHOR]: (state, value) => {
        if (state.articleList.length < state.articleList1.length) {
            state.articleList = state.articleList.filter(e => e.tags_name === value || e.article_author === value)
        } else if (state.articleList.length === state.articleList1.length){
            state.articleList = state.articleList1.filter(e => e.tags_name === value || e.article_author === value)
        }
    },
    //清除筛选
    [types.CLEAR_SCREEN]: (state) => {
        state.articleList = state.articleList1
    },
    //搜索筛选
    [types.SCREEN_SEARCH]: (state, value) => {
        state.articleList = state.articleList.filter(e => e.article_title.indexOf(value) > -1)

    },
    //更新文章审核状态
    [types.UPDATE_ARTICLE_VERIFY]: (state, value) => {
        api.updateArticleVerify({article_id: value, token: state.token})
            .then(res => {
                if (res.code) {
                    state.articleList[state.articleList.findIndex(e => e.article_id === value)].article_pass = 1
                    state.articleList1[state.articleList1.findIndex(e => e.article_id === value)].article_pass = 1

                }
            })
            .catch(e => {
                console.log(e)
                console.log('UPDATE_ARTICLE_VERIFY出现错误')
            })
    }
}

export default mutations