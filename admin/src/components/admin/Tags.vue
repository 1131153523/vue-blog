<template>
    <div class="tags">
        <div class="add-tags">
            <el-tag
                    :key="tag.tags_id"
                    v-for="(tag, index) in tags"
                    closable
                    :disable-transitions="false"
                    size="medium"
                    @close="Close(index,tags_id)"
                    :type="tag.color"

            >
                <span style="color: #000">{{tag.tags_name}}</span>
                <el-popover
                        placement="top"
                        width="160"
                        v-model="dialogVisible"
                        v-if="index === index1"
                >
                    <p>确定删除吗?</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="handleClose({tags_id:tag.tags_id, index}, $event)">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleClose({tags_id:tag.tags_id, index}, $event)">确定</el-button>
                    </div>
                </el-popover>
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag addTag" size="small" @click="showInput" >+ 新建标签</el-button>
        </div>
        <div class="tags-tree">
            <el-tree
                    :data="articleTree"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    default-expand-all
            ></el-tree>
        </div>
    </div>
</template>



<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                inputVisible: false,
                inputValue: '',

                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                dialogVisible: false,
                index1: -1,
                tags_id: ''
            };
        },
        mounted(){
            this.$store.dispatch('getTags')
            this.$store.dispatch('getArticleList')

        },
        methods: {
            handleClose(value, event) {
                if (this.dialogVisible && event.target.innerHTML.indexOf('确') !== -1) {
                    this.$store.dispatch('removeTag', value)
                    this.dialogVisible = false
                } else if (this.dialogVisible && event.target.innerHTML.indexOf('取') !== -1) {
                    this.dialogVisible = false
                }
            },
            Close(index, tags_id){
                this.dialogVisible = true
                this.index1 = index
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue === '') {
                    this.inputVisible = false;
                    return
                }
                this.$store.dispatch('addTag', inputValue)
                this.inputVisible = false;
                this.inputValue = '';
            },

            handleNodeClick(data) {
//                console.log(data);
            }
        },
        computed: {
            ...mapState(['tags']),
            articleTree: {
                get(){
                    return this.$store.state.articleTree
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .el-tag {
        margin-left: 10px;
        margin-top: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 80px;
        margin-left: 10px;
        margin-top: 10px;
        vertical-align: bottom;
    }
    .tags {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
                justify-content: space-around;
        width: 100%;
        > div {
            height: 600px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            -webkit-flex-basis: 40%;
                -ms-flex-preferred-size: 40%;
                    flex-basis: 40%;
            overflow: auto;
        }
        .add-tags {
            background-color: #fff;
            -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
            position: relative;
            -moz-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
            -webkit-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
            box-shadow: 4px 4px 40px rgba(0,0,0,.05);
            -webkit-border-radius: 3px;
               -moz-border-radius: 3px;
                    border-radius: 3px;
            .addTag {
                position: absolute;
                left: 20px;
                bottom: 20px
            }
            .saveTag {
                position: absolute;
                right: 20px;
                bottom: 20px
            }
        }
        .tags-tree {
            -webkit-flex-basis: 40%;
                -ms-flex-preferred-size: 40%;
                    flex-basis: 40%;
            background-color: #fff;
            -moz-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
            -webkit-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
            box-shadow: 4px 4px 40px rgba(0,0,0,.05);
            -webkit-border-radius: 3px;
               -moz-border-radius: 3px;
                    border-radius: 3px;
        }
    }
    @media screen and (max-width: 760px){
        .tags {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
               -moz-box-orient: vertical;
               -moz-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            padding: 10px;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                    box-sizing: border-box;
            > div {
                height: 400px;
            }
        }
        .addTag {
            position: absolute;
            right: 20px;
            bottom: 50px
        }
    }
</style>