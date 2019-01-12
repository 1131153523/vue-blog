<template>
    <div class="articles" v-if="articles.length !== 0">
        <article v-for="item in articles" :key="item.article_id" v-if="item.article_pass && (item.tags_name === $route.query.tags_name || !$route.query.tags_name)">
            <div class="article-info">
                <router-link :to="'/article/' + item.article_id"><h3 class="article-title">{{item.article_title}}</h3></router-link>
                <router-link :to="'/article/' + item.article_id">                                    
                    <p class="article-intro">
                        经过半年的沉淀，加上对MySQL，redis和分布式这块的补齐，终于开始重拾信心去投了两家之前心水已久的公司。
                    </p>
                </router-link>
                <div class="article-hot">
                    <span class="assist">
                        <i class="fa fa-comment"></i><span class="comment-num">{{item.article_assist}}</span>&nbsp;<span class="dot">·</span>评论数
                    </span>  
                    <span class="author">{{item.article_author}}</span><span class="dot">·</span>
                    <span class="time">{{item.article_time | formatDate}}</span><span class="dot">·</span>
                    <span class="article_tag">{{item.tags_name}}</span>
                </div>
            </div>
            <div class="article-screen">
                <router-link :to="'/article/' + item.article_id"><img :src="item.article_img" v-if="item.article_img.length > 0" alt=""></router-link>
            </div>
        </article>
    </div>    
</template>
<script>
    import api from '../../api/index.js'
    export default {
        props: {
            size: {
                type: Number,
                default: 3
            }
        },
        data () {
            return {
                articles: [],
                page: 1,
            }
        },
        mounted () {
            this.getData({limit: this.size, offset: (this.page - 1) * this.size}, this.$route.query.tags_name || '')
            window.onscroll = () => {
                let html = document.documentElement
                let scheight = html.scrollHeight
                let top = html.scrollTop
                let height = html.offsetHeight
                if (scheight <= top + height) {
                    this.page ++
                    this.getData({limit: this.size, offset: (this.page - 1) * this.size}, this.$route.query.tags_name || '')
                }           
            }
        },
        watch: {
            '$route.query.tags_name': function (newVal, oldVal) {
                this.getData({limit: this.size, offset: (this.page - 1) * this.size}, newVal)
            }
        },
        methods: {
            getData(value, tags_name) {
                    api.getArticleList({...value, tags_name})
                    .then(res => {
                        let data = res.data.map(e => {
                            if (e.article_time.indexOf('下午') > -1) {
                                let t = e.article_time.replace('下午', '')
                                let h = t.split(' ')
                                t = h[1].split(':')
                                t[0] = parseInt(t[0]) + 12
                                t[0] = t[0].toString()
                                t = t.join(':')
                                h[1] = t
                                h = h.join(' ')      
                                let T = new Date(h);
                                e.article_time = T.getTime()
                                return e
                            }
                            if (e.article_time.indexOf('上午') > -1) {
                                let t = e.article_time.replace('上午', '')
                                let h = t.split(' ')
                                t = h[1].split(':')
                                t = t.join(':')
                                h[1] = t
                                h = h.join(' ')
                                let T = new Date(h);
                                e.article_time = T.getTime()
                                return e
                            }
                        })
                        if (res.code) {
                            data.sort((a, b) => b.article_time - a.article_time)
                            this.articles = this.articles.concat(data)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
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
    
<style lang="less" scoped>
    .articles {
                article {
                    border-bottom: 1px solid #f6f6f6;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    a {
                        text-decoration: none;
                    }

                    .article-info {
                        padding-left: 18px;
                        box-sizing: border-box;
                        .article-title {
                            font-weight: 500;
                            font-size: 1.5625rem;
                            line-height: 3rem;
                            color: #212121;
                            vertical-align: middle;
                            margin-top: 5px;
                        }
                        .article-intro {
                            width: 80%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            line-height: 1.5;
                            color: #888;
                            font-size: 13px;
                            font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
                        }
                        .article-hot {
                            margin-top: 7px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin-bottom: 8px;
                            .assist {
                                display: block;
                                color: #b2bac2;
                                border-radius: 1px;
                                display: flex;
                                align-items: center;
                                height: 2.2rem;
                                cursor: pointer;
                                > i {
                                    display: block;
                                    font-size: 15px;
                                    margin-right: 5px;
                                    border-radius: 50%;
                                    background-color: rgba(1,126,102,0.08);
                                    color: #2098D1;
                                    padding: 5px;
                                    &:hover {
                                        color:#fff;
                                        background-color: #2098D1;
                                    }
                                }
                                .comment-num {
                                    color: #2098D1;
                                    font-weight: bold;
                                    &::before {
                                        content: "x ";
                                        font-size: 12px;
                                    } 
                                }
                            }
                            .dot {
                                font-size: 16px;
                                color: #999;
                                font-weight: normal;
                                margin-bottom: 4px;
                                margin: 0 3px;
                            }
                            .author {
                                color: #b2bac2;
                                margin-left: 20px;
                            }
                            .time {
                                color: #b2bac2;
                            }
                        }
                    }
                    .article-screen {
                        width: 175px;
                        height: 85px;
                        margin-right: 30px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 5px;
                        }
                    }
                }
    }  

    @media screen and (max-width: 800px) {
        .home .home-left .articles article .article-screen {
            width: 125px;
            height: 50px;
            margin-right: 10px;
        }
    }
</style>