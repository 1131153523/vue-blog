<template>
    <div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" >
                <div class="banner">
                    <el-carousel :interval="4000" type="card" height="200px" class="banner-left">
                        <el-carousel-item v-for="item in 6" :key="item">
                        <h3>{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                    <div class="banner-right">
                        <el-tabs v-model="activeName"  @tab-click="tabClick">
                            <el-tab-pane label="网站公告" name="first">网站公告</el-tab-pane>
                            <el-tab-pane label="推荐文章" name="second">推荐文章</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="home">
                    <div class="home-left">
                        <div class="home-title">
                            <h3><i class="fa fa-eercast"></i>&nbsp;{{$route.query.tags_name ? $route.query.tags_name : '最新文章'}}</h3>
                        </div>
                        <div class="home-tags">
                            <router-link to=""></router-link>
                        </div>
                    </div>
                    <div class="home-right">
                        <Tag @getTags="getTags" />
                    </div>                      
                </div>
            </el-col> 
        </el-row>   
    </div>
</template>
<script>
    import Tag from '../../components/front/Tag.vue'
    export default {
        data () {
            return {
                activeName: ''
            }
        },
        components: {
            Tag
        },
        methods: {
            tabClick (tab, event) {
                
            },
            getTags (tags) {
                
            }
        }
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
            padding: 5px;
            margin-bottom: 5px;
            box-sizing: border-box;
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
            height: 400px;
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>