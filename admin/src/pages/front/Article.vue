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
    import Read from '../../components/common/Read.vue'
    import Tag from '../../components/front/Tag.vue'
    import Tools from '../../components/front/Tools.vue'
    import Comment from '../../components/front/Comment.vue'
    export default {
        data () {
            return {
                info: {}
            }
        },
        components: {
            Read,
            Tag,
            Comment,
            Tools
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
            display: flex;
            justify-content: space-between;
            .article-detail {
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
                    box-sizing: border-box;
                    .article-title {
                        line-height: 65px;
                        font-size: 30px;
                        font-weight: 200;
                    }
                    .article-info-d {
                        display: flex;
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