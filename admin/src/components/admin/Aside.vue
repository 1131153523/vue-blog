<template>
    <div class="aside">
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" @click="$store.dispatch('changePath', {path: '/admin/home', tag: '首页'})" >
                <i class="fa fa-dashboard fa-lg"></i>&nbsp;&nbsp;&nbsp;
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="fa fa-file-text fa-lg"></i>&nbsp;&nbsp;&nbsp;
                    <span>文章管理</span>
                </template>
                <el-menu-item
                        index="2-1"
                        @click="$store.dispatch('changePath', {path: '/admin/write', tag: '发布文章'})"
                >
                    <i class="fa fa-pencil fa-1x" ></i>&nbsp;&nbsp;&nbsp;
                    <span>发布文章</span>
                </el-menu-item>
                <el-menu-item
                        index="2-2"
                        @click="$store.dispatch('changePath', {path: '/admin/verifyArticle', tag: '审核文章'})"
                >
                    <i class="fa fa-table fa-1x"></i>&nbsp;&nbsp;&nbsp;<span>审核文章</span></el-menu-item>
            </el-submenu>
            <el-menu-item index="3" @click="$store.dispatch('changePath', {path: '/admin/tags', tag: '标签管理'})" >
                <i class="fa fa-tags fa-lg"></i>&nbsp;&nbsp;&nbsp;
                <span slot="title">标签管理</span>
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
