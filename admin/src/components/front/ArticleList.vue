<template>
    <div>
        <div class="articles" v-if="list.length !== 0">
            <article v-for="item in list" :key="item.article_id" v-if="item.article_pass" class="hvr-overline-reveal" >
                <div class="article-info">
                    <router-link :to="'/article/' + item.article_id" ><h3 class="article-title">{{item.article_title}}</h3></router-link>
                    <router-link :to="'/article/' + item.article_id" v-if="item.article_introduce">                                    
                        <p class="article-intro">
                            {{item.article_introduce === 'undefined' ? '' : item.article_introduce}}
                        </p>
                    </router-link>
                    <div class="article-hot">
                        <span class="assist" @click.stop="toComment(item.article_id)">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-comment"></use>
                            </svg>
                            <span class="comment-num">{{Math.ceil(item.article_assist / 2)}}</span>&nbsp;<span class="dot">·</span>评论数
                        </span>  
                        <span class="author">{{item.article_author}}</span><span class="dot">·</span>
                        <span class="time">{{item.article_time | formatDate}}</span><span class="dot">·</span>
                        <span class="article_tag">{{item.tags_name}}</span>
                    </div>
                </div>
                <div class="article-screen" v-if="item.article_img !== ''">
                    <router-link :to="'/article/' + item.article_id" ><img :src="item.article_img" v-if="item.article_img.length > 0" alt=""></router-link>
                </div>
            </article>
        </div>         
        <h4 v-show="list.length === 0" class="tip">暂无文章</h4>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import { setTimeout } from 'timers';
    import { resolve } from 'url';
    import { rejects } from 'assert';
    export default {
        props: {
            size: {
                type: Number,
                default: 4,
            }
        },
        data () {
            return {
                articles: [],
                page: {},
                list: [],
                pageList: {},
                isEnd: {}
            }
        },
        async mounted () {
            let tags_name = this.$route.query.tags_name ? this.$route.query.tags_name: 'undefined'
            this.page[tags_name] = 1
            this.list = await this.getData(this.page[tags_name])
            this.pageList[tags_name] = this.list
            this.isEnd[tags_name] = false
            window.onscroll = () => {
                if (this.$route.path.indexOf('/home') > -1) {
                    let html = document.documentElement
                    let scheight = html.scrollHeight
                    let top = html.scrollTop
                    let height = html.clientHeight
                    if (scheight <= top + height) {
                        this.page[this.$route.query.tags_name ? this.$route.query.tags_name: 'undefined'] ++
                        this.loadMore()
                    }  
                }
            }
        },
        watch: {
            '$route.query.tags_name': async function (newVal, oldVal) {
                this.$emit('getArticleList', this.pageList[newVal])
                if (!this.page[newVal]) {
                    this.page[newVal] = 1
                }
                if (!this.pageList[newVal] && !this.isEnd[newVal]) {
                    this.pageList[newVal] = []
                } else {
                    this.list = this.removeDup(this.pageList[newVal], 'article_id')
                    return
                }
                let newList = await this.getData(this.page[newVal])
                this.pageList[newVal] = this.pageList[newVal].concat(newList)
                this.list = this.removeDup(this.pageList[newVal].concat(newList), 'article_id')
                this.list.sort((a, b) => b.article_time - a.article_time)
            },
            '$store.state.search': function (newVal, oldVal) {
                this.list = this.pageList[this.$route.query.tags_name].filter(e => e.article_title.indexOf(newVal) > -1 || e.article_author.indexOf(newVal) > -1)               
                this.list.sort((a, b) => b.article_time - a.article_time)
                this.$emit('getArticleList', this.list)
            }
        },
        methods: {
            async loadMore () {
                let tags_name = this.$route.query.tags_name ? this.$route.query.tags_name: 'undefined'
                this.$emit('getArticleList', this.pageList[tags_name])
                let search = this.$store.state.search
                let prelist = []
                let newList = await this.getData(this.page[tags_name])
                if (this.isEnd[tags_name]) {
                    return
                }
                this.pageList[tags_name] = this.pageList[tags_name].concat(newList)
                this.pageList[tags_name].sort((a, b) => b.article_time - a.article_time)
                prelist = this.removeDup(this.pageList[tags_name], 'article_id')
                this.list = prelist.filter(e => e.article_title.indexOf(search) > -1 || e.article_author.indexOf(search) > -1)
                this.list.sort((a, b) => b.article_time - a.article_time)
                this.$emit('getArticleList', this.pageList[tags_name])
            },
            removeDup (arr, key) {
                let result = [];
                let obj = {};
                for(let i =0; i<arr.length; i++){
                    if(!obj[arr[i][key]]){
                        result.push(arr[i])
                        obj[arr[i][key]] = true
                    }
                }
                result.sort((a, b) => b.article_time - a.article_time)
                return result
            },
            getData(page) {
                let tags_name = this.$route.query.tags_name? this.$route.query.tags_name : 'undefined'
                let value = {
                        limit: this.size, 
                        offset: (page - 1) * this.size, 
                        tags_name: tags_name
                }
                return new Promise((resolve, reject) => {
                    if (!this.isEnd[this.$route.query.tags_name]) {
                        api.getArticleList(value)
                            .then(res => {
                                let re = res.data.filter(e => e.tags_name !== '项目')
                                let data = re.map(e => {
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
                                    return e
                                })
                                if (res.code) {
                                    data.sort((a, b) => b.article_time - a.article_time)
                                    if (data.length === 0 ||res.count['count(*)'] === data.length) {
                                        this.isEnd[tags_name] = true
                                    }
                                    this.$emit('getArticleList', data)
                                    resolve(data)
                                }
                            })
                            .catch(e => {
                                console.log(e)
                                reject(e)
                            })
                    } else {
                        resolve('end')
                    }
                }) 
            },
            toComment (id) {
                this.$router.push({ name: 'Article', params: { article_id: id }})
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
            background-color: #fff;
            border-bottom: 1px solid #f6f6f6;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
               -moz-box-pack: justify;
                -ms-flex-pack: justify;
                    justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
               -moz-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
            a {
                text-decoration: none;
            }
            .article-info {
                padding-left: 18px;
                -webkit-box-sizing: border-box;
                   -moz-box-sizing: border-box;
                        box-sizing: border-box;
                .article-title {
                    font-weight: 500;
                    font-size: 25px;
                    font-size: 1.5625rem;
                    line-height: 48px;
                    line-height: 3rem;
                    color: #212121;
                    vertical-align: middle;
                    margin-top: 5px;
                }
                .article-intro {
                    width: 80%;
                    overflow: hidden;
                    -o-text-overflow: ellipsis;
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
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: start;
                    -webkit-justify-content: flex-start;
                       -moz-box-pack: start;
                        -ms-flex-pack: start;
                            justify-content: flex-start;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                       -moz-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    margin-bottom: 8px;
                    .assist {
                        display: block;
                        color: #b2bac2;
                        -webkit-border-radius: 1px;
                           -moz-border-radius: 1px;
                                border-radius: 1px;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -moz-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -webkit-align-items: center;
                           -moz-box-align: center;
                            -ms-flex-align: center;
                                align-items: center;
                        height: 35.2px;
                        height: 2.2rem;
                        cursor: pointer;
                        > svg {
                            display: block;
                            font-size: 15px;
                            margin-right: 5px;
                            -webkit-border-radius: 50%;
                               -moz-border-radius: 50%;
                                    border-radius: 50%;
                            background-color: rgba(1, 126, 102, 0.08);
                            color: #2098D1;
                            padding: 4px;
                            width: 20px;
                            text-align: center;
                            line-height: 20px;
                            &:hover {
                                color:#fff;
                                background-color: #2098D1;
                            }
                        }
                        .comment-num {
                            color: #2098D1;
                            font-weight: bold;
                            &:before {
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
                    -webkit-border-radius: 5px;
                       -moz-border-radius: 5px;
                            border-radius: 5px;
                }
            }
        }
    }  
    .tip {
        text-align: center;
        font-size: 18px;
        font-weight: 200;
        color: rgba(1,126,102,0.5);
    }
    @media screen and (max-width: 800px) {
        .home .home-left .articles article .article-screen {
            width: 125px;
            height: 50px;
            margin-right: 10px;
        }
    }

.hvr-overline-reveal {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  -moz-transform: perspective(1px) translateZ(0);
       transform: perspective(1px) translateZ(0);
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0);
     -moz-box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}
.hvr-overline-reveal:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    background: #2098D1;
    height: 2px;
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
     -ms-transform: translateY(-2px);
      -o-transform: translateY(-2px);
         transform: translateY(-2px);
    -webkit-transition-property: transform;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: -o-transform;
    -moz-transition-property: transform, -moz-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform, -moz-transform, -o-transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
      -o-transition-duration: 0.3s;
         transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    -moz-transition-timing-function: ease-out;
      -o-transition-timing-function: ease-out;
         transition-timing-function: ease-out;
}
.hvr-overline-reveal:hover:before, .hvr-overline-reveal:focus:before, .hvr-overline-reveal:active:before {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
     -ms-transform: translateY(0);
      -o-transform: translateY(0);
         transform: translateY(0);
}
</style>