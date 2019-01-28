<template>
    <div>
        <div class="banner">
            <el-carousel :interval="4000" type="card" height="200px" class="banner-left">
                <el-carousel-item v-for="item in banner" :key="item.banner_path">
                <h3 style="margin: 0;"><img :src="item.banner_path" alt="" ></h3>
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
                                            <use :xlink:href="item.tags_icon"></use>
                                        </svg>
                                        {{item.tags_name}}                                                  
                                    </router-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>   
                    </h3>
                    <ArticleList @getArticleList="getArticleList" :size="15"/>
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
    import api from '../../api/index.js'
    export default {
        data () {
            return {
                activeName: 'first',
                banner: [],
                tags: [],
                list: [],
            }
        },
        components: {
            Tag: resolve => require(['../../components/front/Tag.vue'], resolve) ,
            ArticleList: resolve => require(['../../components/front/ArticleList.vue'], resolve) ,
            Tools: resolve => require(['../../components/front/Tools.vue'], resolve)
        },
        async mounted () {
            let res = await api.getBanners()
            this.banner = res.data
        },
        methods: {
            tabClick (tab, event) {
                
            },
            getTags (tags) {
                this.tags = tags
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
        .banner-left {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
               -moz-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;
            margin-right: 10px;
            img {
                background-size: cover;
                width: 100%;
            }
        }
        .banner-right {
            width: 320px;
            width: 20rem;
            background-color: #fff;
            margin-bottom: 10px;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                    box-sizing: border-box;
            -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
               -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
            .banner-recommend {
                list-style: none;
                li {
                    overflow: hidden;
                    -o-text-overflow:ellipsis;
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
        .home-left {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
               -moz-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;
            background-color: #fff;
            margin-right: 10px;
            .home-title {
                line-height: 64px;
                line-height: 4rem;
                height: 64px;
                height: 4rem;
                border-bottom: 1px solid #f6f6f6;
                > h3 {
                    font-size: 23.2px;
                    font-size: 1.45rem;
                    font-weight: 300;
                    text-indent: 0.5em;
                    color: rgba(0, 0, 0, 0.58);
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
                    i {
                        font-weight: 200;
                        font-size: 20px;
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