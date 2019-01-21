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

    static addManager ({username, pass, admin_id}) {
        let sql = escape`insert into admin(admin_id, admin_name, admin_password) values(${admin_id}, ${username}, ${pass})`
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
    static writeArticle({article_id, article_title, article_introduce,article_author, article_path,article_assist,article_img,article_read,article_time,tags_id}) {
        let sql = escape`insert into articles(article_id,article_title, article_introduce, article_author, article_path, article_assist, article_read, article_img, article_time, tags_id) values(
${article_id}, ${article_title}, ${article_introduce}, ${article_author}, ${article_path}, ${article_assist}, ${article_read}, ${article_img}, ${article_time}, ${tags_id})`
        return p.query(sql)
    }
    static uploadArticle({article_id, article_title, article_introduce, article_author, article_path,article_time,tags_id}) {
        let sql = escape`insert into articles(article_id,article_title, article_introduce, article_author, article_path, article_time, tags_id)
        values(${article_id}, ${article_title}, ${article_introduce},${article_author}, ${article_path}, ${article_time}, ${tags_id})`
        return p.query(sql)
    }
    static getArticleList (value) {
        if (!value['limit'] || !value['offset']) {
            let sql = escape`select article_id, article_title, article_introduce ,article_pass, article_author, article_assist, article_read, article_img, article_time, tags.tags_id, tags.tags_name from articles,tags where articles.tags_id=tags.tags_id`
            return p.query(sql)
        } else {
            let {limit, offset, tags_name} = value
            let sql = ''
            if (tags_name === 'home') {
                sql = escape`select article_id, article_title, article_pass, article_author, article_assist, article_read, article_img, article_time, tags.tags_id, tags.tags_name from articles,tags where articles.tags_id=tags.tags_id  limit ${parseInt(limit)} offset ${parseInt(offset)}`
            } else {
                sql = escape`select article_id, article_title, article_pass, article_author, article_assist, article_read, article_img, article_time, tags.tags_id, tags.tags_name from articles,tags where articles.tags_id=tags.tags_id and tags_name=${tags_name} limit ${parseInt(limit)} offset ${parseInt(offset)}`
            }
            return p.query(sql)
        }
    }
    static updateArticleVerify ({article_id}) {
        let sql = escape`update articles set article_pass=1 where article_id=${article_id}`
        return p.query(sql)
    }
    static getArticleById(article_id) {
        let sql = escape`select * from articles,tags where articles.tags_id=tags.tags_id and article_id=${article_id}`
        return p.query(sql)
    }
    static uploadArticleTumbImg (article_id, article_img) {
        let sql = escape`update articles set article_img=${article_img} where article_id=${article_id}`
        return p.query(sql)
    }
    static deleteArticle (article_id) {
        let sql = escape`delete from articles where article_id=${article_id}`
        return p.query(sql)
    }
    static updateArticle ({article_id, article_title,article_introduce, article_author, tags_id}) {
        let sql = escape`update articles set article_title=${article_title}, article_introduce=${article_introduce}, article_author=${article_author},tags_id=${tags_id} where article_id=${article_id}`
        return p.query(sql)
    }

    static getTools () {
        let sql = escape`select * from tools`
        return p.query(sql)
    }
    static deleteTool ({tool_id}) {
        let sql = escape`delete from tools where tool_id=${tool_id}`
        return p.query(sql)
    }

    static updateTool ({tool_id, tool_name, tool_url, tool_type}) {
        let sql = escape`update tools set tool_name=${tool_name}, tool_url=${tool_url}, tool_type=${tool_type} where tool_id=${tool_id}`
        return p.query(sql)
    }
    static addTool ({tool_id, tool_name, tool_url, tool_type}) {
        let sql = escape`insert into tools(tool_id, tool_name, tool_url, tool_type) values(${tool_id}, ${tool_name}, ${tool_url}, ${tool_type})`
        return p.query(sql)
    }
    static updateArticleComment(article_id) {
        let sql = escape`update articles set article_assist=article_assist + 1 where article_id=${article_id}`
        return p.query(sql)
    }
    static updateArticleCommentSub (article_id) {
        let sql = escape`update articles set article_assist=article_assist - 1 where article_id=${article_id}`
        return p.query(sql)
    }
    static toComment ({id, article_id,  comment_name, comment_touxiang ,comment_content, comment_email, comment_create_time, parent_id=''}) {
        let sql = escape`insert into comments(id, article_id, parent_id, comment_name, comment_touxiang, comment_content, comment_email, comment_create_time)
        values(${id}, ${article_id}, ${parent_id}, ${comment_name}, ${comment_touxiang}, ${comment_content}, ${comment_email}, ${comment_create_time})`
        return p.query(sql)
    }
    static toAgree ({id}) {
        let sql = escape`update comments set comment_agree=comment_agree+1 where id=${id}`
        return p.query(sql)
    }
    static getCommentsById (article_id) {
        let sql = escape`select * from comments where  article_id=${article_id}`
        return p.query(sql)
    }
    static deleteComment ({id}) {
        let sql = escape`delete from comments where id=${id} or parent_id=${id}`
        return p.query(sql)
    }
}
module.exports = Model