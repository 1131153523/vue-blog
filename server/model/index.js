const p = require('../config/index')
const escape = require('../utils/escape')
class Model {
    static login (username, password) {
        let sql = escape`select * from admin where admin_name=${username} and admin_password=${password}`
        return p.query(sql)
    }
    static updateToken ({token, loginTime}, admin_id)  {
        let sql = escape`update admin set admin_token=${token} , admin_login_time=${loginTime} where admin_id=${admin_id}`
        return p.query(sql)
    }
    static checkPrepass({prepass, username, token}) {
        let sql = escape`select * from admin where admin_password=${prepass} and admin_name=${username}`
        return p.query(sql)
    }
    static checkToken({username, token}) {
        let sql = escape`select * from admin where admin_name=${username} and admin_token=${token}`
        return p.query(sql)
    }
    static changePass({username, password, token}) {
        let sql = escape`update admin set admin_password=${password} where admin_name=${username} and admin_token=${token}`
        return p.query(sql)
    }

    //标签数据库操作
    static getTags() {
        let sql = escape`select * from tags`
        return p.query(sql)
    }
    static removeTag(tags_id){
        let sql = escape`delete from tags where tags_id=${tags_id}`
        return p.query(sql)
    }
    static addTag({tags_id, tags_name}) {
        let sql = escape`insert into tags values(${tags_id}, ${tags_name})`
        return p.query(sql)
    }


    //文章数据库操作
    static getDraft() {
        let sql = escape`select draft_content from draft`
        return p.query(sql)
    }
    static saveDraft({draft_content}){
        let sql = escape`update draft set draft_content=${draft_content} where 1`
        return p.query(sql)
    }
    static writeArticle({article_id, article_title,article_author, article_path,article_assist,article_img,article_read,article_time,tags_id}) {
        let sql = escape`insert into articles(article_id,article_title, article_author, article_path, article_assist, article_read, article_img, article_time, tags_id) values(
${article_id}, ${article_title}, ${article_author}, ${article_path}, ${article_assist}, ${article_read}, ${article_img}, ${article_time}, ${tags_id})`
        return p.query(sql)
    }
    static uploadArticle({article_id, article_title, article_author, article_path,article_time,tags_id}) {
        let sql = escape`insert into articles(article_id,article_title, article_author, article_path, article_time, tags_id)
        values(${article_id}, ${article_title}, ${article_author}, ${article_path}, ${article_time}, ${tags_id})`
        return p.query(sql)
    }
    static getArticleList () {
        let sql = escape`select * from articles,tags where articles.tags_id=tags.tags_id`
        return p.query(sql)
    }
    static updateArticleVerify ({article_id}) {
        let sql = escape`update articles set article_pass=1 where article_id=${article_id}`
        return p.query(sql)
    }
}
module.exports = Model