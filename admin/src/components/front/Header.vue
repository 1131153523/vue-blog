<template>
    <header class="header">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" > 
                <div class="nav">
                    <div class="nav-left">
                        <div class="logo">
                            MyBlog
                        </div>
                        <nav>
                            <ul class="nav-list">
                                <li class="hvr-underline-reveal hvr-underline-reveal-active"><router-link to="/">首页</router-link></li>
                                <li class="hvr-underline-reveal"><router-link to="/article">作品</router-link></li>
                                <li class="hvr-underline-reveal"><router-link to="/article">生活</router-link></li>
                                <li class="hvr-underline-reveal"><router-link to="/article">留言</router-link></li>
                                <li class="hvr-underline-reveal"><router-link to="/article">关于我</router-link></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="nav-right">
                        <div class="search">
                            <el-input
                                placeholder="文章或作者关键字搜索"
                                v-model="search">
                                <i slot="suffix" class="el-input__icon el-icon-search" style="cursor:pointer;"></i>
                            </el-input>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
    export default {
        data () {
            return {
                search: ''
            }
        },
        mounted () {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 60) {
                    document.querySelector('.header').classList.add('backColor')
                } else {
                    document.querySelector('.header').classList.remove('backColor')
                }
            }
        }
    }
</script>
    
<style lang="less" scoped>
    .header {
        height: 5rem;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0);
        transition: all 0.4s linear;
        box-sizing: border-box;
        padding: 0 10px;
        .nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .nav-left {
                height: 100%;
                display: flex;
                justify-content: space-between;
                .logo {
                    width: 7.5rem;
                    text-align: center;
                    line-height: 5rem;
                    font-size: 1.4375rem;
                }
                nav {
                    .nav-list {
                        list-style: none;
                        display: flex;
                        justify-content: center;
                        li {
                            height: 5rem;
                            line-height: 5rem;
                            padding: 0 1.6rem;
                            a {
                                text-decoration: none;
                                font-size: 1.375rem;
                                color: rgba(0, 0, 0, 0.58);
                                text-align: center;
                                &:hover {
                                    color: #2098D1;
                                }                                
                                &::before {
                                    content: "";
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                    bottom: 0;
                                    left: 0;

                                }
                            }
                        }
                    }
                }
            }
            .nav-right {
                height: 5rem;
                .search {
                    height: 100%;
                    display: flex;
                    align-items: center;
 
                }
            }
        }
    }






    .backColor {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    }


    .hvr-underline-reveal {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        position: relative;
        overflow: hidden;
    }
    .hvr-underline-reveal:before {
        content: "";
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        bottom: 0;
        background: #2098D1;
        height: 4px;
        -webkit-transform: translateY(4px);
        transform: translateY(4px);
        -webkit-transition-property: transform;
        transition-property: transform;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
    }

    .hvr-underline-reveal-active::after {
        content: "";
        position: absolute;
        z-index: -1;
        left: 0;
        right: 0;
        bottom: 0;
        background: #2098D1;
        height: 4px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }
    .hvr-underline-reveal:hover:before, .hvr-underline-reveal:focus:before, .hvr-underline-reveal:active:before {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

</style>