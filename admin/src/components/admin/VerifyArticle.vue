<template>
    <div class="verify">
        <div class="Breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>审核文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="btns">
            <el-button type="primary" round @click.stop="verifyMore">批量审核</el-button>
            <el-button type="danger" round @click.stop="deleteMore(-1)">批量删除
                <el-popover
                        placement="left"
                        width="160"
                        v-model="dialogVisible1"
                >
                    <p>确定删除吗?</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click.stop="deleteMore(0)">取消</el-button>
                        <el-button type="primary" size="mini" @click.stop="deleteMore(1)">确定</el-button>
                    </div>
                </el-popover>
            </el-button>
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
                placeholder="文章关键字搜索"
                style="width: 250px;margin-bottom: 10px;margin-right: 10px;width: 172px"
                class="selectAndInput"
                
        ><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        <div class="articleList">
            <el-table
                    :data="articleList"
                    height="400"
                    border
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'descending'}"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="180"
                        prop="date">

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


                <el-table-column label="操作" fixed="right" >
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
                                @click="handleDelete(scope.$index, scope.row, -1)"
                                class="clearMargin"
                        >删除
                            <el-popover
                                    placement="top"
                                    width="160"
                                    v-model="dialogVisible"
                                    v-if="scope.$index === index1"
                            >
                                <p>确定删除吗?</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click.stop="deleteArticle(scope.$index, scope.row, 0)">取消</el-button>
                                    <el-button type="primary" size="mini" @click.stop="deleteArticle(scope.$index, scope.row, 1)">确定</el-button>
                                </div>
                            </el-popover>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="文章信息" :visible.sync="dialogFormVisible" style="margin-top: 10vh;">
            <h4 style="margin-bottom: 5px;margin-top: 10px;">标题</h4>
            <el-input
                placeholder="标题"
                v-model="inputTitle">
            </el-input>
            <h4 style="margin-bottom: 5px;margin-top: 10px;">作者或标签</h4>
            <el-select v-model="inputTag" placeholder="作者或标签" style="z-index: 2" >
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
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="handleDelete(scope.$index, scope.row, 0)">取 消</el-button>
                <el-button type="primary" @click="handleDelete(scope.$index, scope.row, 1)">保 存</el-button>
            </div>

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
                dialogVisible: false,
                index1: -1,
                dialogVisible1: false,
                dialogFormVisible: false,
                inputTitle: '',
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

            inputTag: {
                get(){

                },
                set(val){
                    console.log(val)
                    
                }
            },
            ...mapState(['articleList','options2', 'options1','token'])
        },
        methods: {
            handleVerify(index, row) {
                this.$store.dispatch('updateArticleVerify', row.article_id)
                
            },
            handleDelete(index, row) {
                this.dialogVisible = true
                this.index1 = index
            },
            deleteArticle (index, row, flag) {
                if (flag) {
                    this.dialogVisible = false
                    this.$store.dispatch('deleteArticle', row.article_id)
                } else {
                    this.dialogVisible = false
                }
            },
            handleRead(index, row) {
                this.$store.dispatch('changePath', {path: `/admin/readArticle/${row.article_id}`, tag: '查看文章'})
            },
            handleUpdate(index, row, flag) {
                if (flag === -1) {
                    this.dialogFormVisible = true
                    let articleInfo = this.$store.state.articleList1.find(e => e.article_id === row.article_id)
                    this.inputTitle = articleInfo.article_title
                }
                if (flag === 0) {
                    this.dialogFormVisible = false
                }
                if (flag === 1) {
                    
                }
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
            deleteMore (flag) {
                if (flag === 1) {
                    this.dialogVisible1 = false
                    this.multipleSelection.forEach(e => {
                        this.$store.dispatch('deleteArticle', e.article_id)
                    })
                } else if (flag === 0){
                    this.dialogVisible1 = false
                } else {
                    this.dialogVisible1 = true
                }

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
        },
        activated() {
            window.scrollTo(0,0)
        },
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
