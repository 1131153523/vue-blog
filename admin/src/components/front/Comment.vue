<template>
    <div class="comments">
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
            <el-input v-model="name" placeholder="昵称" class="comments-name"></el-input>
            <el-input
                placeholder="请输入你的邮箱"
                class="comments-email"
                v-model="email">
            </el-input>&nbsp;&nbsp;&nbsp;*选填    
        </div> 
        <el-button type="primary" plain style="margin-bottom: 20px;" @click.stop="toComment">评论</el-button>
        <div class="comments-all">
            <div class="comments-item">
                <div class="item-main">
                    <div class="item-left">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon-test2"></use>
                        </svg> 
                    </div>
                    <div class="item-right">
                        <span class="item-name">Admin</span>
<pre class="item-content">
{{content}}
</pre>
                        <div class="item-bottom">
                            <span class="item-time">10分钟前</span>
                            <span class="item-reply" @click.stop="reply">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-huifu"></use>
                                </svg>  
                            </span>
                            <span class="item-agree" @click.stop="agree">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dianzan"></use>
                                </svg>                                
                                <span class="agree-num">10</span>                               
                            </span>
                        </div>

                        <div class="reply">
                            <div class="reply-left">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-icon-test8"></use>
                                </svg>                                 
                            </div>
                            <div class="reply-right">
                                <span class="reply-name">Admin</span>
                                回复　<span style="color: #406599;">技术狗</span> ：
<pre class="reply-content">
</pre>                      
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-if="reedit"
                                v-model="recontent">
                            </el-input>
                            <div class="reply-btn" v-if="reedit">
                                <el-button type="primary"  size="mini" >评论</el-button>
                            </div>
                            <div class="reply-bottom">
                                <span class="reply-time">10分钟前</span>
                                <span class="reply-agree" @click.stop="agree">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-dianzan"></use>
                                    </svg>
                                    <span class="agree-num">10</span>                               
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
    export default {
        data () {
            return {
                content: '',
                name: '',
                email: '',
                recontent: '',
                reedit: false
            }
        },
        mounted (){
            this.$store.dispatch('getCommentsByIｄ', this.$route.params.article_id)
        },
        methods: {
            reply () {
                if (this.reedit) {
                    this.reedit = false
                } else {
                    this.reedit = true
                }
            },
            agree () {

            },
            toComment () {
                if (this.name > 20) {
                    alert('昵称太长了！')
                    return
                }
                if (this.content > 530) {
                    alert('内容太长了！')
                    return
                }
                if (this.name === '' && this.content === '') {
                    alert('昵称和内容不能为空')
                } else {
                    let comment = {
                        id: getRandomId(),
                        article_id: this.$route.params.article_id,
                        comment_name: this.name,
                        comment_content: this.content,
                        comment_email: this.email,
                        comment_create_time: +new Date()
                    }
                    this.$store.dispatch('toComment', comment)
                }
            },
            toReply () {
                
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
