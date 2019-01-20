<template>
    <div class="aside">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" @click="$store.commit('CHANGE_PATH', {path: '/admin/home', tag: '首页'})" >
                <svg class="icon" aria-hidden="true"  style="font-size: 20px;">
                    <use xlink:href="#icon-shouye1"></use>
                </svg>&nbsp;&nbsp;&nbsp;             
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <svg class="icon" aria-hidden="true" style="font-size: 20px;" >
                        <use xlink:href="#icon-wenzhanglan"></use>
                    </svg>&nbsp;&nbsp;&nbsp;                      
                    <span>文章管理</span>
                </template>
                <el-menu-item
                        index="2-1"
                        @click="$store.commit('CHANGE_PATH', {path: '/admin/write', tag: '发布文章'})" >
                    <svg class="icon" aria-hidden="true"  style="font-size: 20px;">
                        <use xlink:href="#icon-combinedshapecopy2"></use>
                    </svg>&nbsp;&nbsp;&nbsp;                   
                    <span>发布文章</span>
                </el-menu-item>
                <el-menu-item
                        index="2-2"
                        @click="$store.commit('CHANGE_PATH', {path: '/admin/verifyArticle', tag: '审核文章'})">
                    <svg class="icon" aria-hidden="true" style="font-size: 20px;" >
                        <use xlink:href="#icon-shenhe"></use>
                    </svg>&nbsp;&nbsp;&nbsp;                  
                    <span>审核文章</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="3" @click="$store.commit('CHANGE_PATH', {path: '/admin/tags', tag: '标签管理'})" >
                    <svg class="icon" aria-hidden="true" style="font-size: 20px;" >
                        <use xlink:href="#icon-biaoqian1"></use>
                    </svg>&nbsp;&nbsp;&nbsp;                    
                <span slot="title">标签管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$store.commit('CHANGE_PATH', {path: '/admin/tool', tag: '工具箱'})" >
                    <svg class="icon" aria-hidden="true" style="font-size: 20px;" >
                        <use xlink:href="#icon-gongjuxiangx"></use>
                    </svg>&nbsp;&nbsp;&nbsp;                    
                <span slot="title">工具箱</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {

            }
        },
        computed:{
            ...mapState(['isCollapse'])
        },
        methods:{

        }

    }
</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        min-height: 800px;
        overflow: hidden;
    }
    .aside > ul{
        height: 100%;
    }

</style>
