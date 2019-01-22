<template>
    <div>
        <div class="banner">
            <el-carousel :interval="4000" type="card" height="200px" class="banner-left">
                <el-carousel-item v-for="item in banner" :key="item">
                <h3 style="margin: 0;"><img :src="item" alt="" style="background-size: cover;"></h3>
                </el-carousel-item>
            </el-carousel>
            <div class="banner-right">
                <el-tabs v-model="activeName"  @tab-click="tabClick" type="border-card" style="width: 100%;height: 100%;box-shadow: none;">
                    <el-tab-pane label="推荐文章" name="first">
                        <ul class="banner-recommend">
                            <li v-for="e in list" :key="e.article_id">
                                <router-link :to="'/article/' + e.article_id">
                                    <svg class="icon refrash" aria-hidden="true" style="font-size: 13px;">
                                        <use xlink:href="#icon-jiantou"></use>
                                    </svg>                                      
                                    {{e.article_title}}
                                </router-link>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="关于本站" name="second">关于本站</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="home">
            <div class="home-left">
                <div class="home-title">
                    <h3>
                        <span class="tag-title">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-biaoqian"></use>
                            </svg>
                            &nbsp;{{$route.query.tags_name ? $route.query.tags_name : '最新文章'}}
                            <svg class="icon refrash" aria-hidden="true" @click.stop="Refrash">
                                <use xlink:href="#icon-shuaxin"></use>
                            </svg>                                 
                            <span class="refrash-list" @click.stop="Refrash">刷新列表</span>                                       
                        </span>
                        <el-dropdown :hide-on-click="false" trigger="click" class="selectTag">
                            <span class="el-dropdown-link">
                                热门标签<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in tags" :key="item.tags_id">
                                    <router-link :to="{ path:'/home', query: { tags_name:  item.tags_name} }">
                                        <svg class="icon" aria-hidden="true">
                                            <use :xlink:href="tagIcon(item.tags_name)"></use>
                                        </svg>
                                        {{item.tags_name}}                                                  
                                    </router-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>   
                    </h3>
                    <ArticleList @getArticleList="getArticleList" :size="6"/>
                </div>
            </div>
            <div class="home-right">
                <Tag @getTags="getTags"/>
                <Tools />
            </div>
        </div>  
    </div>
</template>
<script>
    import Tools from '../../components/front/Tools.vue'
    import Tag from '../../components/front/Tag.vue'
    import ArticleList from '../../components/front/ArticleList.vue'
    import api from '../../api/index.js'
    export default {
        data () {
            return {
                activeName: 'first',
                banner: ['http://127.0.0.1:3000/images/bpic8127.jpg', 'http://127.0.0.1:3000/images/bpic9202.jpg','http://127.0.0.1:3000/images/zzpic14973.jpg'],
                tags: [],
                list: [],
            }
        },
        components: {
            Tag,
            ArticleList,
            Tools
        },
        mounted () {

            
        },
        methods: {
            tabClick (tab, event) {
                
            },
            getTags (tags) {
                this.tags = tags
            },
            tagIcon (val) {
                switch(val.toLowerCase()) {
                    case 'javascript':
                        return '#icon-JavaScript'
                    case 'es6':
                        return '#icon-JavaScript'
                    case 'python':
                        return '#icon-python'
                    case 'vue':
                        return '#icon-Vue'
                    case 'html':
                        return '#icon-HTML'
                    case 'css':
                        return '#icon-CSS-outline'
                    case '算法': 
                        return '#icon-jiyinsuanfa'
                    case '数据库':
                        return '#icon-database'
                    case 'nodejs':
                        return '#icon-node-jsNodejsxingnengpingtai'
                    case 'webpack':
                        return '#icon-webpack'
                }   
            },
            Refrash () {
                this.$store.commit('SET_SEARCH', '')
            },
            getArticleList (list) {
                this.list = list ? list.slice(0, 6) : []
            }         
        },

    }   
</script>
    
<style lang="less">
    .banner {
        display: flex;
        justify-content: space-between;
        .banner-left {
            flex: 1;
            margin-right: 10px;
        }
        .banner-right {
            width: 20rem;
            background-color: #fff;
            margin-bottom: 10px;
            box-sizing: border-box;
            box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
            .banner-recommend {
                list-style: none;
                li {
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    a {
                        font-size: 15px;
                        line-height: 24px;
 
                        &:hover {
                            color: #2098D1;
                        }
                    }
                }
            }
        }
    }
    .home {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .home-left {
            flex: 1;
            background-color: #fff;
            margin-right: 10px;
            .home-title {
                line-height: 4rem;
                height: 4rem;
                border-bottom: 1px solid #f6f6f6;
                > h3 {
                    font-size: 1.45rem;
                    font-weight: 300;
                    text-indent: 0.5em;
                    color: rgba(0, 0, 0, 0.58);
                    display: flex;
                    justify-content: space-between;                    
                    i {
                        font-weight: 200;
                        font-size: 1.25rem;
                        color: #000;
                    }
                    .refrash {
                        margin-left: 15px;
                        cursor: pointer;
                    }
                    .refrash-list {
                        font-size: 15px;
                        cursor: pointer;
                    }
                }
                .selectTag {
                    margin-right: 15px;
                    cursor: pointer;
                    display: none;
                }
            }
          
        }
    }

    @media screen and (max-width: 800px) {
        .home {
            display: block;
        }
        .home .home-right {
            display: none;
        }
        .home .home-left {
            display: block;
            margin-right: 0px;
            height: 100%;
        }
        .banner {
            display: none;
        }
        .selectTag {
            display: inline-block!important;
        }
    }
</style>