<template>
    <div class="write">
        <div class="Breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>发布文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="upload">
            <h1 style="font-size: 30px;font-weight: 200;margin-bottom: 10px">上传发布</h1>
            <el-button size="small" type="success" @click="submitUpload" :disabled="uploadDisabled" style="display: block;margin-bottom: 10px;">选择完成上传</el-button>
            <el-select v-model="selectValue" clearable placeholder="请选择标签" style="margin-bottom: 10px;">
                <el-option
                        v-for="item in tags"
                        :key="item.tags_id  "
                        :label="item.tags_name"
                        :value="item.tags_name"

                >
                </el-option>
            </el-select>
            <el-input
                    placeholder="请输入标题"
                    v-model="extraData.article_title"
                    clearable
                    style="width: 90%;"
            >
            </el-input>
            <el-input
                type="textarea"
                :rows="5"
                style="margin-top: 10px;width: 90%;"
                placeholder="文章简介"
                v-model="content2">
            </el-input>            
            <el-upload
                    ref="upload"
                    class="upload-demo"
                    drag
                    action="http://127.0.0.1:3000/admin/uploadArticle"
                    :auto-upload="false"
                    multiple
                    :on-change="fileChange"
                    :on-success="fileSuccess"
                    :data="extraData"
                    :before-upload="beforeUpload"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>(只能上传md文件)</div>
            </el-upload>
        </div>
        <h1 style="font-size: 30px;font-weight: 200;margin-bottom: 10px">直接发布</h1>
        <el-input
            type="textarea"
            :rows="5"
            style="width: 50%;margin-bottom: 20px;"
            placeholder="文章简介"
            v-model="content1">
        </el-input>
        <mavon-editor
                v-model="articleValue"
                style="height: 100%"
                :boxShadow="true"
                @imgAdd="$imgAdd"
                :toolbars="toolbars"
                @save="$save"
        ></mavon-editor>
        <el-dialog
                title="选择标签"
                :visible.sync="dialogVisible"
                width="30%"
        >


            <div class="select-tag">
                <el-select
                        v-model="selectValue"
                        :multiple="false"
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择文章标签">
                    <el-option
                            v-for="item in tags"
                            :key="item.tags_id"
                            :label="item.tags_name"
                            :value="item.tags_name">
                    </el-option>
                </el-select>
            </div>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="SelectClose">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import getRandomId from '../../utils/getRandomId'
    import api from '../../api/index'
import { clearInterval } from 'timers';
    export default {
        props:{
            toolbars: {
                type: Object,
                default: function () {
                    return {
                        bold: true, // 粗体
                        italic: true, // 斜体
                        header: true, // 标题
                        underline: true, // 下划线
                        strikethrough: true, // 中划线
                        mark: true, // 标记
                        superscript: true, // 上角标
                        subscript: true, // 下角标
                        quote: true, // 引用
                        ol: true, // 有序列表
                        ul: true, // 无序列表
                        link: true, // 链接
                        imagelink: true, // 图片链接
                        code: true, // code
                        table: true, // 表格
                        readmodel: true, // 沉浸式阅读
                        htmlcode: true, // 展示html源码
                        help: true, // 帮助
                        /* 1.3.5 */
                        undo: true, // 上一步
                        redo: true, // 下一步
                        save: true, // 保存（触发events中的save事件）
                        /* 1.4.2 */
                        navigation: true, // 导航目录
                        /* 2.1.8 */
                        alignleft: true, // 左对齐
                        aligncenter: true, // 居中
                        alignright: true, // 右对齐
                        /* 2.2.1 */
                        subfield: true, // 单双栏模式
                        preview: true, // 预览
                    }
                },
            }
        },
        data(){
            return {
                isUpload: false,
                dialogVisible: false,
                selectValue: [],
                info: {},
                drafts_id: '',
                uploadDisabled: false,
                extraData: {
                    token: window.sessionStorage.getItem('token'),
                    article_id: getRandomId(),
                    article_author: this.$store.state.username,
                    article_title: '',
                    article_time: new Date().toLocaleString().replace(/\//g, '-'),
                    tags_id: '',
                    article_introduce: this.content2
                },
                content1: '',
                content2: '',
                token: window.sessionStorage.getItem('token')
            }
        },
        created (){
            this.$store.dispatch('getTags')
            this.$store.dispatch('getDraft')
            this.timer = setInterval(() => {
                this.$store.dispatch('saveDraft', this.articleValue)
            },20000)
        },
        computed: {
            ...mapState(['tags', 'username', 'articleInfo', 'draft','articleValue']),
            articleValue:{
                get(){
                    return this.$store.state.articleValue
                },
                set(val){
                    return this.$store.commit('SET_ARTICLE_VALUE', val)
                }
            }
        },
        methods: {
            $imgAdd(pos, $file){
                api.uploadArticleImg({...$file})
                    .then(res => {
                        if (res.code) {
                            this.$store.commit('SET_ARTICLE_VALUE', this.articleValue.replace(`![${$file._name}](${pos})`,`![${$file._name}](${res.data})`))
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                
            },
            $save(value, render) {
                if (value === '') {
                    this.$notify({
                        title: '警告',
                        message: '请编辑内容',
                        type: 'warning'
                    })
                    return
                }
                let re = /#(.*)\n?/
                let r = '';
                let title = ''
                r = re.exec(value)
                title = r[1]
                this.info = {
                    article_id: getRandomId(),
                    article_title: title,
                    article_content: value,
                    article_img: '',
                    article_author: this.username,
                    article_assist: 0,
                    article_read: 0,
                    article_introduce: this.content1,
                    article_time: new Date().toLocaleString().replace(/\//g, '-'),
                }
                this.dialogVisible = true
            },
            SelectClose() {
                if (this.dialogVisible) {
                    if (!this.info.article_title || !this.selectValue || this.info.article_title === 'Number') {
                        this.$notify.warning({
                            message: '标题或标签不能为空',
                            offset: 150
                        })
                    } else {
                        this.info.tags_id = this.tags.find((item) => item.tags_name === this.selectValue).tags_id
                        this.$store.dispatch('writeArticle', this.info)
                        this.dialogVisible = false
                    }
                }
            },
            submitUpload () {
                this.$refs.upload.submit()
                this.extraData.article_introduce = this.content2
                this.extraData.article_id = getRandomId()
            },
            beforeUpload(file){

            },
            fileChange(file, fileList) {
                this.uploadDisabled = false
                if (file.status ==='ready' && file.raw.type !== 'text/markdown') {
                    this.uploadDisabled = true
                    this.$notify.warning({
                        message: '必须上传markdown格式文件,请取消文件上传',
                        offset: 150
                    })
                    fileList.clearFiles()
                }
                if (this.selectValue !== '') {
                    this.extraData.tags_id = this.$store.state.tags.find(item => item.tags_name === this.selectValue).tags_id
                }

            },
            fileSuccess(response, file, fileList){
                if (response.code) {
                    this.$notify.success({
                        message:response.msg,
                        offset: 150
                    })
                    this.$store.dispatch('getArticleList')
                } else {
                    this.$notify.error({
                        message:response.msg,
                        offset: 150
                    })
                }
            }
        },
        activated () {

        },
        deactivated () {
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>
<style scoped lang="less">
    .write {
        padding: 0 10px;
        box-sizing: border-box;
        height: 400px;
    }
    .Breadcrumb {
        margin-bottom: 15px;


        
    }

    .upload {
        width: 400px;
    }
    .upload-demo {
        margin-top: 10px;
    }
    @media screen and (min-width: 1400px){
        .write {
            height: 800px;
        }
    }
    @media screen and (max-width: 1399px){
        .write {
            height: 400px;
        }
    }
    
    @media screen and (max-width: 460px){
        .upload {
            width: 100%;
        }
        .upload-demo {
            display: block;
        }
    }

</style>
