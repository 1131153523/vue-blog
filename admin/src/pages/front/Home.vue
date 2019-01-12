<template>
    <div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" >
                <div class="banner">
                    <el-carousel :interval="4000" type="card" height="200px" class="banner-left">
                        <el-carousel-item v-for="item in banner" :key="item">
                        <h3 style="margin: 0;"><img :src="item" alt="" style="background-size: cover;"></h3>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="banner-right">
                        <el-tabs v-model="activeName"  @tab-click="tabClick" type="border-card" style="width: 100%;height: 100%;box-shadow: none;">
                            <el-tab-pane label="推荐文章" name="first">推荐文章</el-tab-pane>
                            <el-tab-pane label="关于本站" name="second">关于本站</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="home">
                    <div class="home-left">
                        <div class="home-title">
                            <h3><i class="fa fa-superpowers"></i>&nbsp;{{$route.query.tags_name ? $route.query.tags_name : '最新文章'}}</h3>
                            <ArticleList />
                        </div>
                    </div>
                    <div class="home-right">
                        <Tag @getTags="getTags"/>
                    </div>
                </div>
            </el-col> 
        </el-row>   
    </div>
</template>
<script>
    import Tag from '../../components/front/Tag.vue'
    import ArticleList from '../../components/front/ArticleList.vue'
    import api from '../../api/index.js'
    export default {
        data () {
            return {
                activeName: 'first',
                banner: ['http://127.0.0.1:3000/images/bpic8127.jpg', 'http://127.0.0.1:3000/images/bpic9202.jpg','http://127.0.0.1:3000/images/zzpic14973.jpg'],
                
            }
        },
        components: {
            Tag,
            ArticleList
        },
        mounted () {
 

        },
        methods: {
            tabClick (tab, event) {
                
            },
            getTags (tags) {
                
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
                border-bottom: 1px solid #f6f6f6;
                > h3 {
                    font-size: 1.45rem;
                    font-weight: 300;
                    text-indent: 0.5em;
                    color: rgba(0, 0, 0, 0.58);
                    i {
                        font-weight: 200;
                        font-size: 1.25rem;
                        color: #000;
                    }
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

    }
// .el-carousel__item h3 {
//     color: #475669;
//     font-size: 14px;
//     opacity: 0.75;
//     line-height: 200px;
//     margin: 0;
//   }
  
//   .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
//   }
  
//   .el-carousel__item:nth-child(2n+1) {
//     background-color: #d3dce6;
//   }
</style>