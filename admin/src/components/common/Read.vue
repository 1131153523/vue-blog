<template>
    <mavon-editor 
        v-model="value" 
        :toolbarsFlag="toolbarsFlag" 
        :defaultOpen="defaultOpen" 
        :editable="editable" 
        :subfield="false" 
        :navigation="navigation" 
        :toolbars="toolbars"
        @imgAdd="$imgAdd"
        class="readStyle"/>
</template>
<script>
import api from '../../api/index.js'
import {mapState} from 'vuex'
export default {
    props:{
        getValue: {
            type: Function
        },
        navigation: {
            type: Boolean,
            default: true
        },
        toolbarsFlag: {
            type: Boolean,
            default: false
        },
        defaultOpen: {
            type: String,
            default: 'preview'
        },
        editable: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: 'readArticle'
        },
        article_id: {
            type: String,
        },
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
    data () {
        return {
            value: ''
        }
    },
    watch: {
        article_id (val) {
            if (this.status === 'updateArticle') {
                api.getArticleById({article_id: this.article_id, token: this.token})
                    .then(res => {
                        if (res.code) {
                            this.value = res.data
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })           
            }
        },
        value (val) {
            this.getValue ? this.getValue (val) : null
        }
    },
    mounted () {
        if (this.status === 'updateArticle') {
            api.getArticleById({article_id: this.article_id, token: this.token})
                .then(res => {
                    if (res.code) {
                        this.value = res.data
                    }
                })
                .catch(e => {
                    console.log(e)
                })           
        }
    },
    computed: {
        ...mapState(['token'])
    },
    methods: {
        $imgAdd(pos, $file){
            api.uploadArticleImg({...$file, token:this.$store.state.token})
                .then(res => {
                    if (res.code) {
                        this.value = this.value.replace(`![${$file._name}](${pos})`,`![${$file._name}](${res.data})`)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
    },
    activated () {
        if (this.status === 'readArticle') {
            api.getArticleById({article_id: this.$route.params.article_id, token: this.token})
                .then(res => {
                    if (res.code) {
                        this.value = res.data
                    }
                    
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },

}
</script>
<style lang="less" scoped>
    .readStyle {
        min-height: 500px;
        margin: 5px;
    }

</style>
