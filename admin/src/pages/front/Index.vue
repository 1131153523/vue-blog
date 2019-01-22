<template>
    <div class="wrapper">
        <Header /> 
        <div class="main">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" >
                <transition name="slide-fade">
                    <keep-alive>
                        <router-view></router-view> 
                    </keep-alive>
                </transition>
                </el-col> 
            </el-row> 
        </div>
        <div class="toTop">
            <svg class="icon" aria-hidden="true"  @click.stop="toTop">
                <use xlink:href="#icon-fanhuidingbu1"></use>
            </svg>
            <div>
            <svg class="icon" aria-hidden="true" v-if="$route.fullPath.indexOf('/article') > -1" @click="toBottom">
                <use xlink:href="#icon-pinglun1"></use>
            </svg> 
            <svg class="icon" aria-hidden="true" v-if="$route.fullPath.indexOf('/article') > -1" >
                <use xlink:href="#icon-tableshare"></use>
            </svg>  
            </div>           
        </div>   
    </div>
</template>
<script>
    export default {
        components: {
            Header: resolve => require(['../../components/front/Header.vue'], resolve) 
        },
        methods: {
            toTop () {
                window.scrollTo(0, 0)
            },
            toBottom () {
                document.querySelector(".comments").scrollIntoView();
            }
        },
        mounted() {
            
        }
    }   
</script>
    
<style lang="less">

    .wrapper {
        padding-top: 64px;
        padding-top: 4rem;
        .toTop {
            position: fixed;
            right: 60px;
            bottom: 100px;
            z-index: 111111111;
            height: 50px;
            svg {
                color: #2098D1;
                cursor: pointer;
                display: block;
                &:first-child {
                    font-size: 32px;
                }
                &:nth-child(2) {
                    font-size: 32px;
                }
                &:last-child {
                    font-size: 25px;
                    margin-top: 10px;
                }
            }
        }
        .main {
            width:100%;
            margin-top: 20px;
            padding: 10px;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                    box-sizing: border-box;
        }
    }
    @media screen and (max-width: 800px){
        .toTop {
            right: 25px!important;
            bottom: 100px!important;
        }
    }



    .slide-fade-enter-active {
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -ms-transition: all .5s ease;
        -o-transition: all .5s ease;

    }
    .slide-fade-leave-active {
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -ms-transition: all .5s ease;
        -o-transition: all .5s ease;
    }
    .slide-fade-enter{
        transform: translate3d(60px, 0, 0);
        -webkit-transform: translate3d(60px,0, 0);
        -moz-transform: translate3d(60px, 0, 0);
        -ms-transform: translate3d(60px, 0, 0);
        -o-transform: translate3d(60px, 0, 0);
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
    .slide-fade-leave-active {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        position: absolute;
    }
</style>