<template>
    <div class="wrapper">
        <Header/> 
        <div class="main">
            <transition name="slide-fade">
                <router-view></router-view> 
            </transition>
        </div>
        <div class="toTop">
            <span class="fa fa-angle-up" @click.stop="toTop"></span>
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
            > span {
                font-size: 1.875rem;
                border-radius: 50%;
                background-color: #fff;
                width: 3.125rem;
                height: 3.125rem;
                text-align: center;
                line-height: 3.125rem;
                box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
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
        background: rgba(255, 255, 255, 0);
        color: #ffffff;
    }

    ::-moz-selection {
        background: rgba(255, 255, 255, 0);
        color: #ffffff;
    }

    ::selection {
        background: rgba(255, 255, 255, 0);
        color: #ffffff;
    }

    ::-moz-selection {
        background: rgba(255, 255, 255, 0);
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
        transform: translate3d(40px, 0, 0);
        -webkit-transform: translate3d(40px, 0, 0);
        -moz-transform: translate3d(40px, 0, 0);
        -ms-transform: translate3d(40px, 0, 0);
        -o-transform: translate3d(40px, 0, 0);
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
    .slide-fade-leave-active {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        display: none;

    }
</style>