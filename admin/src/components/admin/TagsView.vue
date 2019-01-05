<template>
    <div class="tags-view">
        <ul class="view-list">
            <li
                    class="view-item"
                    v-for="(item, index) in tagsView"
                    :key="item.path"
                    :class="{now: $route.path === item.path ? true : false}"
                    @click.stop="$store.dispatch('changePath', {path: item.path, tag: item.tag})"
            >
                <span>{{item.tag}}</span>
                <i
                        class="el-icon-close"
                        @click.stop="$store.dispatch('removeTagsView', index)"
                ></i>
            </li>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState(['tagsView'])
        }
    }
</script>
<style scoped lang="less">
    .tags-view {
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        .view-list {
            height: 100%;
            list-style: none;
            margin-left: 10px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
            -webkit-box-align: flex-end;
            -ms-flex-align: flex-end;
            align-items: flex-end;

            .view-item {
                border: 1px solid #d8dce5;
                font-size: 12px;
                padding: 4px 8px 4px 13px;
                margin-left: 10px;
                margin-bottom: 5px;
                height: 18px;
                width: 100px;
                -webkit-transition: all 0.3s ease;
                transition: all 0.3s ease;
                i {
                    float: right;
                    margin-top: 3px;
                    &:hover {
                        background-color: #ccc;
                    }
                }
                cursor: pointer;
                &:hover {
                    background-color: #42b983;
                    color: #fff;
                    border-color: #42b983;
                }
            }
        }
    }
    .now {
        background-color: #42b983;
        color: #fff;
        border: 1px solid #42b983!important;
    }

</style>
