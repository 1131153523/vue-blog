import * as types from './types'

export default {
    UserLogin({commit}, data) {
        commit(types.LOGIN, data)
    },
    changeCollapse({commit}){
        commit(types.CHANGE_COLLAPSE)
    },
    changeHeadColor({commit}, val) {
        commit(types.CHANGE_HEAD_COLOR, val)
    },
    addTagsView({commit}, tag) {
        commit(types.ADD_TAGS_VIEW, tag)
    },
    changePath({commit}, pathInfo) {
        commit(types.CHANGE_PATH, pathInfo)
    },
    removeTagsView({commit}, index) {
        commit(types.REMOVE_TAGS_VIEW, index)
    },
    getTags({commit}) {
        commit(types.GET_TAGS)
    },
    removeTag({commit}, value){
        commit(types.REMOVE_TAG, value)
    },
    addTag({commit}, value) {
        commit(types.ADD_TAG, value)
    },
    getDraft({commit}, value){
        commit(types.GET_DRAFT, value)
    },
    saveDraft({commit}, value) {
        commit(types.SAVE_DRAFT, value)
    },
    setArticleValue({commit}, value) {
        commit(types.SET_ARTICLE_VALUE, value)
    },
    writeArticle({commit}, info) {
        commit(types.WRITE_ARTICLE, info)
    },
    getArticleList({commit}) {
        commit(types.GET_ARTICLE_LIST)
    },
    screenDate ({commit}, value) {
        commit(types.SCREEN_DATE, value)
    },
    screenTagsAuthor({commit}, value) {
        commit(types.SCREEN_TAGS_AUTHOR, value)
    },
    clearScreen ({commit}) {
        commit(types.CLEAR_SCREEN)
    },
    screenSearch({commit}, value) {
        commit(types.SCREEN_SEARCH, value)
    },
    updateArticleVerify({commit}, value) {
        commit(types.UPDATE_ARTICLE_VERIFY, value)
    },
    updateArticleImg ({commit}, value) {
        commit(types.UPDATE_ARTICLE_IMG, value)
    },
    deleteArticle ({commit}, value) {
        commit(types.DELETE_ARTICLE, value)
    },
    updateArticle ({commit}, value) {
        commit(types.UPDATE_ARTICLE, value)
    },
    setSearch ({commit}, value) {
        commit(types.SET_SEARCH, value)
    },
    setList({commit}, value) {
        commit(types.SET_LIST, value)
    },
    toComment ({commit}, value) {
        commit(types.TO_COMMENT, value)
    },
    getCommentsByIｄ({commit}, value) {
        commit(types.GET_COMMENTS_BY_ID, value)
    }
}

