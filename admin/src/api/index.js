import ajax from '../utils/ajax'
export default {
    login(form){
        return ajax('/admin/login', form, 'POST')
    },
    checkPrepass(value) {
        return ajax('/admin/checkPrepass', value, 'POST')
    },
    postChangePass(value) {
        return ajax('/admin/changePass', value, 'POST')
    },
    getTags(value) {
        return ajax('/admin/getTags',  value, 'POST')
    },
    removeTag(tags_id) {
        return ajax('/admin/removeTag',  tags_id, 'POST')
    },
    addTag(value) {
        return ajax('/admin/addTag',  value, 'POST')
    },
    getDraft() {
        return ajax('/admin/getDraft')
    },
    saveDraft(value){
        return ajax('/admin/saveDraft', value, 'POST')
    },
    writeArticle(value) {
        return ajax('/admin/writeArticle', value, 'POST')
    },
    uploadArticleImg(file) {
        return ajax('/admin/uploadArticleImg', file, 'POST')
    },
    getArticleList() {
        return ajax('/admin/getArticleList')
    },
    updateArticleVerify (value) {
        return ajax('/admin/updateArticleVerify', value, 'POST')
    },
    getArticleById (value) {
        return ajax('/admin/getArticleById', value, 'POST')
    }
}