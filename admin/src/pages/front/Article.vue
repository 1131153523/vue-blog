<template>
    <div class="readArticle">
        <div class="article">
            <div style="overflow: auto;flex: 1;">
                <div class="article-detail">
                    <div class="article-info">
                        <h3 class="article-title">{{info.article_title}}</h3>  
                        <div class="article-info-d" >
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-biaoqian1"></use>
                            </svg> &nbsp;&nbsp;                   
                            <span>
                                {{info.tags_name}}&nbsp;&nbsp;&nbsp;
                                <svg class="icon" aria-hidden="true" style="font-size: 18px;">
                                    <use xlink:href="#icon-yueduliang"></use>
                                </svg>                        
                                {{info.article_read}} &nbsp;&nbsp;   &nbsp;&nbsp;                      
                                作者:&nbsp;{{info.article_author}}&nbsp;·&nbsp;
                                发布日期:&nbsp;{{info.article_time | formatDate}}
                            </span>
                        </div>               
                    </div>
                    <Read status="read" @getArticle="getArticle" :article_id="$route.params.article_id" :navigation="false" class="read"/>         
                </div> 
                <Comment />                
            </div>
            <div class="article-right">
                <Tag class="tag"/>
                <Tools />
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                info: {}
            }
        },
        components: {
            Read: resolve => require(['../../components/common/Read.vue'], resolve),
            Tag: resolve => require(['../../components/front/Tag.vue'], resolve),
            Comment: resolve => require(['../../components/front/Comment.vue'], resolve),
            Tools: resolve => require(['../../components/front/Tools.vue'], resolve)
        },
        mounted () {

        },
        methods: {
            getArticle (val) {
                this.info = val
            }
        },
        filters: {
            formatDate (date) {
                if (date === undefined){
                    return
                }
                return date.slice(0, 10).replace('下', '').replace('上', '')
            }
        }   
    }   
</script>
    
<style lang="less" scoped>
    .readArticle {
        .article {
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
            .article-detail {
                -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                   -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                // overflow: auto;
                margin-right: 10px;
                &::-webkit-scrollbar {
                    display: none;
                }
                .article-info {
                    width: 100%;
                    background-color: #fff;
                    padding-left: 20px;
                    -webkit-box-sizing: border-box;
                       -moz-box-sizing: border-box;
                            box-sizing: border-box;
                    .article-title {
                        line-height: 65px;
                        font-size: 30px;
                        font-weight: 200;
                    }
                    .article-info-d {
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
                        padding-bottom: 10px;
                        > span {
                            color: #999;
                            font-size: 14px;
                        }
                    }

                }        
                .read {
                    margin: 0 -1px!important;
                }
            }
        }
        .tag {
            max-height: 500px;
        }
    }

    @media screen and (max-width: 800px) {
        .tag {
            display: none;
        }
        .article-detail{
            margin-right: 0!important;
        }

    }
    
</style>