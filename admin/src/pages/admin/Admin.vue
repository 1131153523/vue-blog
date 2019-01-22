<template>
    <div class="container" >
        <el-container>
            <el-header style="z-index: 4000"><Header></Header></el-header>
            <section class="section">
                <el-aside
                        v-show="isCollapse"
                        style="background-color: rgb(48, 65, 86);"

                >
                    <div class="aside" :style="{marginLeft: !isCollapse? '-180px' : '0px'}">
                        <keep-alive>
                            <Aside></Aside>
                        </keep-alive>
                    </div>
                </el-aside>
                <div class="main" :style="{paddingLeft: !isCollapse ? 0 : '180px'}">
                    <div class="tags-view">
                        <keep-alive>
                            <TagsView></TagsView>
                        </keep-alive>
                    </div>
                    <div class="main-mid">
                        <transition name="slide-fade">
                            <keep-alive>
                                <router-view class="vue-page-animation-router-view" style="position: absolute;width: 100%;min-height: 500px"></router-view>
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </section>
        </el-container>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data: () => ({
            show: true
        }),
        computed:{
            ...mapState(['isCollapse', 'headColor'])
        },
        components: {
            Aside: resolve => require(['../../components/admin/Aside.vue'], resolve) ,
            Header: resolve => require(['../../components/admin/Header.vue'], resolve) ,
            TagsView: resolve => require(['../../components/admin/TagsView.vue'], resolve)
        }
    }
</script>
<style scoped>
    .header {
        height: 60px;
    }
    * {
        padding: 0;
        margin: 0;
    }

    .aside {
        position: fixed;
        overflow: hidden;
        z-index: 5000;
        width: 180px;
        height: 100%;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }


    .main {
        background-color: #eff1f4;
        /*overflow-x: hidden;*/
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: -moz-box;
        display: flex;
        position: relative;
        -webkit-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        transition: all 0.3s ease;
        padding-left: 180px;

    }
    .section {
    }

    .tags-view {
        width: 100%;
        height: 40px;
        background-color: #fff;
        border-bottom: 1px solid #d8dce5;
        border-top: 1px solid #d8dce5;
        margin-bottom: 5px;
        position: fixed;
        z-index: 4000;

    }
    .main-mid {
        width: 100%;
        padding-top: 60px;
        min-height: 1000px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: -moz-box;
        display: flex;
        position: relative;
    }


    .fadeIn {
        -webkit-transform: translate3d(-100%, 0, 0);
           -moz-transform: translate3d(-100%, 0, 0);
                transform: translate3d(-100%, 0, 0);
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    }
    .fadeOut {
        -webkit-transform: translate3d(0, 0, 0);
           -moz-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
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
