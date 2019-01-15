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
        </div>   
    </div>
</template>
<script>
    import Header from '../../components/front/Header.vue'
    export default {
        components: {
            Header
        },
        methods: {
            toTop () {
                window.scrollTo(0, 0)
            }
        },
        mounted() {
            
        }
    }   
</script>
    
<style lang="less">

    .wrapper {
        padding-top: 4rem;
        .toTop {
            position: fixed;
            right: 20px;
            bottom: 4.375rem;
            > svg {
                font-size: 32px;
                border-radius: 50%;
                color: #2098D1;
                cursor: pointer;
            }
        }
        .main {
            width:100%;
            margin-top: 20px;
            padding: 10px;
            box-sizing: border-box;
        }
    }
    ::selection {
        background: yellowgreen;
        color: #ffffff;
    }

    ::-moz-selection {
        background: yellowgreen;
        color: #ffffff;
    }

    ::selection {
        background: yellowgreen;
        color: #ffffff;
    }

    ::-moz-selection {
        background: yellowgreen;
        color: #ffffff;
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
        position: absolute;
    }
    .slide-fade-leave-active {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        position: absolute;
    }
</style>