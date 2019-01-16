<template>
    <header class="header">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" > 
                <div class="nav">
                    <div class="nav-left">
                        <div class="logo">
                            MyBlog
                        </div>
                        <svg class="icon" aria-hidden="true" @click.stop="submenu">
                            <use xlink:href="#icon-ai-arrow-down"></use>
                        </svg>
                        <nav>
                            <ul class="nav-list">
                                <li class="hvr-underline-reveal hvr-underline-reveal-active"><router-link to="/">首页</router-link></li>
                                <li class="hvr-underline-reveal"><router-link to="/article/asdasd">作品</router-link></li>
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
                                @keyup.enter.native="Search"
                                v-model="search">
                                <i slot="suffix" class="el-input__icon el-icon-search" style="cursor:pointer;"  @click.stop="Search"></i>
                            </el-input>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                search: ''
            }
        },
        computed: {

        },
        mounted () {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 60) {
                    document.querySelector('.header').classList.add('backColor')
                } else {
                    document.querySelector('.header').classList.remove('backColor')
                }
            }
        },
        methods: {
            submenu () {
                if (document.querySelector('.header .nav .nav-left nav').style.display == 'block') {
                    document.querySelector('.header .nav .nav-left nav').style.display = 'none'
                } else {
                    document.querySelector('.header .nav .nav-left nav').style.display = 'block'
                }
            },
            Search () {
                this.$store.dispatch('setSearch', this.search)
                this.search = ''
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
        background: rgba(255, 255, 255, 1);
        transition: all 0.4s linear;
        box-sizing: border-box;
        padding: 0 10px;
        z-index: 101111111111111;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        .nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .nav-left {
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .logo {
                    width: 7.5rem;
                    text-align: center;
                    line-height: 5rem;
                    font-size: 1.4375rem;
                }
                > svg {
                    font-size: 2.5rem;
                    font-weight: 100;
                    display: none;
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
    @media screen and (min-width: 801px) {
        .header .nav .nav-left nav {
            display: block!important;
        }
    }

    @media screen and (max-width: 800px) {
        .header .nav .nav-left nav .nav-list {
            display: block;
        }
        .header .nav .nav-left {
            position: relative;
        }
        .header .nav .nav-left > svg {
            display: inline-block;
            cursor: pointer;
            font-size: 1.5rem;
        }
        .header .nav .nav-left nav {
            display: none;
            position: absolute;
            top: 60px;
            right: -34px;
            border-radius: 3px;
            box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        }
        .header .nav .nav-left nav .nav-list li{
            display: block;
            text-align: center;
            background-color: #fff;
        }
        .header .nav .nav-left nav .nav-list li::after {
            display: none;
        }
        .header .nav .nav-left nav .nav-list li::before {
            display: none;
        }
        .header .nav .nav-left nav .nav-list li a {
            color: #000;
        }
        .header .nav .nav-left nav .nav-list li a:hover{
            color: #2098D1;
        }
        .header .nav .nav-left nav .nav-list li a:hover::before {
            background: rgba(0, 0, 0, 0.2);
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