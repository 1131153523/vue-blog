import * as types from './types'
import store from './index'
import router from '../router/index'
import api from '../api/index'
import getRandomId from '../utils/getRandomId'
export default {
    async getTags({commit}) {
        try {
            let res = await api.getTags()
            if (res.code) {
                commit(types.GET_TAGS, res.data)
            }
        } catch(e) {
            console.log(e)
            console.log('GET_TAGS出现错误')
        }
    },
    async removeTag({commit}, value){
        try {
            let res = await api.removeTag(value)
            if (res.code) {
                commit(types.REMOVE_TAG, value)
            }
        } catch(e) {
            console.log(e);
            console.log('REMOVE_TAG出现错误')
        }
    },
    async addTag({commit}, value) {
        try {
            let color = ['success', 'info', 'warning', 'danger']
            let obj = {
                tags_id: getRandomId(),
                tags_name: value,
                color: color[Math.floor(Math.random()*4)],
            }
            let res = await api.addTag(obj)
            if (res.code) {
                commit(types.ADD_TAG, obj)
            }
        } catch(e) {
            console.log(e)
            console.log('ADD_TAG出现错误')
        }
    },
    async getDraft({commit}, value){
        let res = await api.getDraft()
            .then((res) => {
                if (res.code) {
                    commit(types.GET_DRAFT, res.data)
                }
            })
            .catch(e => {
                console.log(e)
                console.log('GET_DRAFT出现错误')
            })
    },
    async saveDraft({commit}, value) {
        try {
            let res = await api.saveDraft({draft_content: value})
            if (!res.code) {
                commit(types.SAVE_DRAFT, value)
            }
        } catch (e) {
            console.log(e)
            console.log('SAVE_DRAFT出现错误')
        }
    },
    async writeArticle({commit}, info) {
        try {
            let res = await api.writeArticle(info)
            if (res.code) {
                store.dispatch('getArticleList')
            }
        } catch (e) {
            console.log(e);
            console.log('WRITE_ARTICLE出现错误')
        }
    },
    async getArticleList({commit}) {
        try {
            let res = await api.getArticleList()
            if (res.code) {
                commit(types.GET_ARTICLE_LIST, res.data)
            }
        } catch (e) {
            console.log(e)
            console.log('GET_ARTICLE_LIST出现错误')
        }
    },
    async updateArticleVerify({commit}, value) {
        try {
            let res = await api.updateArticleVerify({article_id: value})
            if (res.code) {
                commit(types.UPDATE_ARTICLE_VERIFY, value)
            }
        }catch (e) {
            console.log(e)
            console.log('UPDATE_ARTICLE_VERIFY出现错误')  
        }
    },
    async deleteArticle ({commit}, value) {
        try {
            let res = await api.deleteArticle({article_id: value})
            if (res.code) {
                commit(types.DELETE_ARTICLE, value)
            }   
        } catch (e) {
            console.log(e)
            console.log('UPDATE_ARTICLE_VERIFY出现错误')
        }
    },
    async updateArticle ({commit}, value) {
        try {
            let res = await api.updateArticle(value)
            if (res.code) {
                commit(types.UPDATE_ARTICLE, value)
            }
        } catch (e) {
            console.log(e)
            console.log('UPDATE_ARTICLE出现错误')
        }
    },
    async getTools ({commit}) {
        try {
            let res = await api.getTools()
            if (res.code) {
                commit(types.GET_TOOLS, res.data)
            }
        } catch (e) {
            console.log(e)
            console.log('GET_TOOLS出现错误')
        }
    },
    async setTool({commit}, value) {
        switch(value.type) {
            case 'delete':
                let res = await api.deleteTool(value)
                if (res.code) {
                    commit(types.SET_TOOL, value)
                }
                break
            case 'update':
                let res1 = await api.updateTool(value)
                if (res1.code) {
                    commit(types.SET_TOOL, value)
                }
                break
            case 'insert':
                let res2 = await api.addTool(value)
                if (res2.code) {
                    commit(types.SET_TOOL, value)
                }
                
        }
    },
    loginGithub({commit}) {
        commit(types.LOGIN_GITHUB)
    }
}

