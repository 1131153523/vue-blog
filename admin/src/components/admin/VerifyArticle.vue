<template>
    <div class="verify">
        <div class="Breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>审核文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="btns">
            <el-button type="primary" round @click="verifyMore">批量审核</el-button>
            <el-button type="danger" round @click="deleteMore">批量删除</el-button>
            <el-button round @click.stop="clearScreen">清除筛选</el-button>
        </div>
        <el-select v-model="value2" placeholder="日期筛选" class="selectAndInput">
            <el-option-group
                    v-for="group in options2"
                    :key="group.label"
                    :label="group.label">
                <el-option
                        v-for="item in group.options"
                        :key="item.value + Math.random() + Math.random()"
                        :label="(item.label.lastIndexOf('下') > -1 || item.label.lastIndexOf('上') > -1) ? item.label.substring(0, item.label.length - 1): item.label"
                        :value="item.value">
                </el-option>
            </el-option-group>
        </el-select>
        <el-select v-model="value1" placeholder="作者或标签筛选" style="z-index: 2" >
            <el-option-group
                    v-for="group in options1"
                    :key="group.label"
                    :label="group.label"
            >
                <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"

                        :value="item.value">
                </el-option>
            </el-option-group>
        </el-select>

        <el-input
                v-model="search"
                size="mini"
                placeholder="文章关键字搜索"
                style="width: 250px;margin-bottom: 10px;margin-right: 10px;width: 172px"
                class="selectAndInput"
        />

        <div class="articleList">
            <el-table
                    :data="articleList"
                    height="400"
                    border
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    @selection-change="handleSelectionChange"
            >

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="180"
                        prop="date"
                >

                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.article_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="标题"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.article_title }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="作者"
                        width="100"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="'primary'"
                                disable-transitions>{{scope.row.article_author}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="标签"
                        width="100"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="'success'"
                                disable-transitions>{{scope.row.tags_name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="阅读量"
                        width="100"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="'warning'"
                                disable-transitions>{{scope.row.article_read}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="评论数"
                        width="100"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="'warning'"
                                disable-transitions>{{scope.row.article_assist}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label="缩略图上传"
                        width="120"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-upload
                                class="upload-demo"
                                action="http://127.0.0.1:3000/admin/uploadArticleTumbImg"
                                multiple
                                :limit="1"
                                :show-file-list="false"
                                :data="{article_id: scope.row.article_id, token: $store.state.token}"
                                :on-success="fileSuccess"
                        >
                            <el-button type="success">{{scope.row.article_img ? '重新上传' : '上传'}}<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-upload>
                    </template>
                </el-table-column>


                <el-table-column label="操作" fixed="right" width="140">
                    <template slot-scope="scope" >
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleVerify(scope.$index, scope.row)"
                                class="clearMargin"
                                :disabled="scope.row.article_pass === 1 ? true:false"
                        >审核</el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleRead(scope.$index, scope.row)"
                                class="clearMargin"
                        >查看</el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleUpdate(scope.$index, scope.row)"
                                class="clearMargin"
                        >修改</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                class="clearMargin"
                        >删除</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    import api from '../../api/index'
    import { log } from 'util'
    export default {
        data() {
            return {
                multipleSelection: [],
                dialogVisible: false
            }
        },
        mounted(){
            this.$store.dispatch('getArticleList')
        },
        computed: {
            value1:{
                get(){

                },
                set(val){
                    this.$store.dispatch('screenTagsAuthor', val)
                }
            },
            value2:{
                get(){
                    
                },
                set(val){
                    this.$store.dispatch('screenDate', val)
                }
            },
            search: {
                get(){

                },
                set(val){
                    this.$store.dispatch('screenSearch', val)
                }
            },
            ...mapState(['articleList','options2', 'options1','token'])
        },
        methods: {
            handleVerify(index, row) {
                this.$store.dispatch('updateArticleVerify', row.article_id)
                
            },
            handleDelete(index, row) {
                
            },
            handleRead(index, row) {
                this.$store.dispatch('changePath', {path: `/admin/readArticle/${row.article_id}`, tag: '查看文章'})
            },
            handleUpdate(index, row) {
                console.log(index, row)
            },

            clearScreen(){
                this.$store.dispatch('clearScreen')
            },

            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            verifyMore () {
                this.multipleSelection.forEach(e => {
                    this.$store.dispatch('updateArticleVerify', e.article_id)
                })
            },
            deleteMore () {

            },
            fileSuccess(response, file, fileList) {
                if (response.code) {
                    this.$store.dispatch('updateArticleImg', response.data)
                    this.$message.success({
                        message:response.msg,
                        offset: 150
                    })
                } else {
                    this.$message.error({
                        message:response.msg,
                        offset: 150
                    })
                }
            }
        },
        filters: {
            formatDate (value){
                if (!value) {
                    return
                }
                value = value.toString()
                return value.slice(0, 10)
            }
        }
    }
</script>
<style scoped>
    .Breadcrumb {
        margin-bottom: 15px;
    }
    .verify {
        padding: 0 10px;
        box-sizing: border-box;
    }
    @media screen and (max-width: 460px){
        .clearMargin {
            margin-left: 0;
            margin-top: 5px;
            text-align: center;
        }
        .btns {
            margin-bottom: 10px;
        }
    }
    @media screen and (min-width: 461px){
        .clearMargin {
            margin-top: 5px;
            margin-left: 0;
        }

    }
    .btns {
        display: inline-block;
        margin-right: 10px;
    }
    .selectAndInput {
        margin-top: 5px;
    }
</style>
