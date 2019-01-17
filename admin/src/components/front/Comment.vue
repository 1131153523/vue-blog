<template>
    <div class="comments" >
        <h3 class="comments-title">评论</h3>
        <div class="comments-content">
            <el-input
                class="textarea"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 7}"
                placeholder="请输入评论"
                resize="none"
                :clearable="true"
                v-model="content">
            </el-input>
        </div>
        <div class="comments-input">
            <el-input
                placeholder="请输入你的邮箱"
                class="comments-email"
                v-model="email">
            </el-input>&nbsp;&nbsp;&nbsp;*选填                
            <el-input v-model="name" placeholder="昵称" class="comments-name"></el-input>
        </div> 
        <el-button type="primary" plain style="margin-bottom: 20px;" @click.stop="toComment">评论</el-button>
        <div class="comments-all">
            <div class="comments-item" v-for="e in Comment" :key="e.id" :data-id="e.id" v-if="e.parent_id === ''">
                <div class="item-main">
                    <div class="item-left">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="e.comment_touxiang"></use>
                        </svg> 
                    </div>
                    <div class="item-right">
                        <span class="item-name">{{e.comment_name}}</span>
                        &nbsp;&nbsp;&nbsp;<el-button type="text" @click.stop="deleteComment(e.id)" v-if="token && $store.state.token === token">删除评论</el-button>
<pre class="item-content">
{{e.comment_content}}
</pre>
                        <div class="item-bottom">
                            <span class="item-time">{{e.comment_create_time | formatDate}}</span>
                            <span class="item-reply" @click.stop="reply(e.id)" >
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-huifu"></use>
                                </svg>  
                            </span>
                            <span class="item-agree" @click.stop.once="agree(e.id)">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg>                                
                                <span class="agree-num">{{e.comment_agree}}</span>                               
                            </span>
                        </div>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-if="e.id === index"
                            style="margin: 10px 0;width:80%;"
                            v-model="recontent">
                        </el-input>
                        <div class="reply-btn"   v-if="e.id === index">
                            <el-button type="primary"  size="mini" @click.stop="toReply(e.id)">评论</el-button>
                        </div>
                        <div class="reply" v-for="item in comment" :key="item.id + Math.random()" v-if="item.parent_id !== '' && item.parent_id === e.id">
                            <div class="reply-left">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-icon-test8"></use>
                                </svg>                                 
                            </div>
                            <div class="reply-right">
                                <span class="reply-name" style="color: red;">{{item.comment_name}}</span>
                                回复　<span style="color: #2098D1;">{{e.comment_name}}</span> ：
<pre class="reply-content">
{{item.comment_content}}
</pre>                      
                            <div class="reply-bottom">
                                <span class="reply-time">{{item.comment_create_time | formatDate}}</span>
                                <el-button type="text" @click.stop="deleteComment(item.id)" v-if="token && $store.state.token === token">删除评论</el-button>
                                <span class="reply-agree" v-on:click.once.stop="agree(item.id)">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dianzan"></use>
                                    </svg>

                                    <span class="agree-num">{{item.comment_agree}}</span>                               
                                </span>
                            </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Read from '../common/Read.vue'
    import getRandomId from '../../utils/getRandomId.js'
    import {mapState} from 'vuex'
    import api from '../../api/index.js'
    import { setTimeout } from 'timers';
    export default {
        data () {
            return {
                content: ``,
                name: '',
                email: '',
                recontent: '',
                comments: {},
                comment: [],
                isShow: false,
                index: '',
                token: sessionStorage.getItem('token')
            }
        },
        mounted (){
            let article_id = this.$route.params.article_id

            if (this.comments[article_id]) {
                this.comment = this.comments[article_id]
            } else {
                api.getCommentsById({article_id: article_id})
                    .then (res => {
                        if (res.code) {
                            this.comments[article_id] = res.data
                            this.comment = res.data
                            this.comment.forEach(e => {
                                e.icon = this.Icon()
                            })
                        }
                    })
                    .catch (e => {
                        console.log(e)
                    }) 
            }
        },
        activated () {
            let article_id = this.$route.params.article_id
            if (this.comments[article_id]) {
                this.comment = this.comments[article_id]
            } else {
                api.getCommentsById({article_id: article_id})
                    .then (res => {
                        if (res.code) {
                            this.comments[article_id] = res.data
                            this.comment = res.data
                        }
                    })
                    .catch (e => {
                        console.log(e)
                    }) 
            }
        },
        computed: {
            Comment () {
                this.comment.sort((a, b) => b.comment_create_time - a.comment_create_time)
                return this.comment
            },
        },
        methods: {
            Icon () {
                let arr = [
                    '#icon-default14', 
                    '#icon-default13', 
                    '#icon-default12', 
                    '#icon-default11', 
                    '#icon-default10', 
                    '#icon-default9', 
                    '#icon-default8', 
                    '#icon-default7', 
                    '#icon-default6', 
                    '#icon-default5', 
                    '#icon-default4', 
                    '#icon-default3', 
                    '#icon-default2', 
                    '#icon-default1', 
                    '#icon-default', 
                    '#icon-icon-test9', 
                    '#icon-icon-test5', 
                    '#icon-icon-test2', 
                    '#icon-icon-test3', 
                    '#icon-icon-test4', 
                    ]
                return arr[Math.round(Math.random()*(arr.length - 1))]
            },
            reply (id) {
                if (!this.$store.state.token || !window.sessionStorage.getItem('token') || this.$store.state.token !== window.sessionStorage.getItem('token')) {
                    alert('只有管理员有权限回复!')
                } else {
                    if (this.index) {
                        this.index = ''
                    } else {
                        this.index = id
                    }
                    
                }
            },
            agree (id) {
                let timeout;
                let previous = 0; 
                if (!timeout) {
                    timeout = setTimeout(() => {
                        timeout = null;
                        api.toAgree({id: id})
                            .then(res => {
                                if (res.code) {
                                    this.comment[this.comment.findIndex(e => e.id === id)].comment_agree ++
                                } else {
                                    alert('点赞失败')
                                }
                                
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }, 1500)
                }
            },
            toComment () {
                if (this.name.length > 30) {
                    alert('昵称太长了！')
                    return
                }
                if (this.content.length > 530) {
                    alert('内容太长了！')
                    return
                }
                if (this.email !== '' && !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.email)) {
                    alert('邮箱格式不正确')
                    this.email = ''
                    return 
                }
                if (this.name === '' || this.content === '') {
                    alert('昵称和内容不能为空')
                } else {
                    let comment = {
                        id: getRandomId(),
                        article_id: this.$route.params.article_id,
                        comment_name: this.name,
                        comment_content: this.content,
                        comment_email: this.email,
                        comment_create_time: +new Date(),
                        comment_touxiang: this.Icon()
                    }
                api.toComment(comment)
                    .then(res => {
                        if (res.code) {
                            this.comment.unshift({...comment, parent_id: '', comment_agree: 0})
                            this.comments[this.$route.params.article_id] = this.comment
                            this.content = ''
                            setTimeout(() => {
                                Array.prototype.forEach.call(document.querySelectorAll('.comments-item'), (item => {
                                    if (item.dataset.id === comment.id) {
                                        item.style.borderBottom = '3px solid #2098D1'
                                    }
                                }))
                            }, 0)
                        } else {
                            alert(res.msg)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
                }
            },
            toReply (parent_id) {
                if (this.recontent === '') {
                    alert('回复内容不能为空')
                    return 
                }
                let comment = {
                    id: getRandomId(),
                    parent_id: parent_id,
                    article_id: this.$route.params.article_id,
                    comment_name: this.$store.state.username,
                    comment_content: this.recontent,
                    comment_email: '',
                    comment_create_time: +new Date(),
                    comment_touxiang: '#icon-default'
                }
                api.toComment(comment)
                    .then(res => {
                        if (res.code) {
                            this.comment = [{...comment, comment_agree: 0}, ...this.comment]
                            this.index = ''
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            deleteComment (id) {
                if (confirm('确认删除？')) {
                    api.deleteComment({id})
                        .then(res => {
                            if (res.code) {
                                this.comment.splice(this.comment.findIndex(e => e.id === id), 1)
                            } else {
                                alert(res.msg)
                            }
                        }) 
                        .catch(e => {
                            console.log(ｅ)
                        })
                }           
            }

        },
        filters: {
            formatDate (date) {
                let now = +new Date()
                let milliseconds = now - parseInt(date)
                let timeSpanStr = ''
                if (milliseconds <= 1000 * 60 * 1) {
                    timeSpanStr = '刚刚';
                }
                else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
                    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
                }
                else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
                    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
                }
                else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 100) {
                    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
                }
                return timeSpanStr
            }
        }
    }
</script>
<style scoped lang="less">
    .comments {
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        margin-top: 5px;
        margin-right: 10px;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #fff;
        padding-bottom: 20px;
        .comments-title {
            text-align: center;
            line-height: 70px;
            font-size: 20px;
            font-weight: 200;
            color: #999;
        }
        .comments-input {
            width: 100%;
            margin-bottom: 10px;
            .comments-name {
                margin-top: 10px;
                width: 38%;
                margin-right: 10px;
                display: block;

            }
            .comments-email {
                margin-top: 10px;
                width: 38%;
            }
        }
        .comments-content {
            display: flex;
            .textarea {
                width: 493px;
                background-color: #fff;
                border-radius: 3px;
                box-sizing: border-box;
                font-size: 16px;
                outline: none;
                &:focus {
                    outline: 1px solid #ccc;
                    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                }
            }
        }
        .comments-all {
            width: 100%;
            padding-top: 20px;
            padding-left: 30px;
            box-sizing: border-box;
            .comments-item {
                margin-top: 20px;
                border-bottom: 1px solid #e6e4e4;
                padding-bottom: 10px;
                .item-main {
                    display: flex;
                    justify-content: space-between;
                    .item-left {
                        border-radius: 50%;
                        svg {
                            font-size: 35px;
                        }
                    }
                    .item-right {
                        flex: 1;
                        .item-name {
                            margin-left: 10px;
                            line-height: 35px;
                            font-size: 14px;
                        }
                        .item-content {
                            box-sizing: border-box;
                            padding: 12px;
                            border-radius: 3px;
                            margin-top: 0px;
                            font-size: 13px;
                            background-color: #fafbfc;
                            width: 80%;
                            white-space:pre-wrap; 
                            white-space:-moz-pre-wrap; 
                            white-space:-pre-wrap; 
                            white-space:-o-pre-wrap;
                            word-wrap:break-word;
                        }
                        .item-bottom {
                            margin-top: 15px;
                            width: 80%;
                            .item-time {
                                color: #403f3f;
                            }
                            .item-agree {
                                float: right;
                                margin-right: 30px;
                                font-size: 17px;
                                cursor: pointer;
                                .agree-num {
                                    font-size: 12px;
                                    color: #403f3f;
                                }
                            }
                            .item-reply {
                                float: right;
                                margin-right: 20px;
                                font-size: 17px;
                                cursor: pointer;
                            }
                        }      
                        
                        .reply {
                            width: 80%;
                            background-color: #fafbfc;
                            margin-top: 15px;
                            display: flex;
                            justify-content: space-between;
                            padding: 10px;
                            box-sizing: border-box;
                            .reply-left {
                                border-radius: 50%;
                                svg {
                                    font-size: 35px;
                                }
                            }
                            .reply-right {
                                flex: 1;
                                .reply-name {
                                    margin-left: 10px;
                                    line-height: 35px;
                                    font-size: 14px;                                    
                                }
                                .reply-content {
                                    box-sizing: border-box;
                                    padding: 12px;
                                    border-radius: 3px;
                                    margin-top: 0px;
                                    font-size: 13px;
                                    width: 80%;
                                    white-space:pre-wrap; 
                                    white-space:-moz-pre-wrap; 
                                    white-space:-pre-wrap; 
                                    white-space:-o-pre-wrap;
                                    word-wrap:break-word;
                                }
                                .reply-bottom {
                                    margin-top: 10px;
                                    .reply-time {
                                        color: #403f3f;
                                    }

                                    .reply-agree {
                                        float: right;
                                        margin-right: 10px;
                                        font-size: 17px;
                                        cursor: pointer;
                                        .agree-num {
                                            font-size: 12px;
                                            color: #403f3f;
                                        }
                                    }
                                }
                                .reply-btn {
                                    display: flex;
                                    justify-content: flex-end;
                                    margin-bottom: 10px;
                                    margin-top: 10px;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
    @media screen and (max-width: 800px) {
        .comments {
            margin-right: 0;
        }
    }
</style>
