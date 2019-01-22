<template>
    <div class="tool">

        <el-table
            :data="tools"
            border
            height="450"
            style="width: 100%">
            <el-table-column
                prop="tool_name"
                label="链接名">
            <template slot-scope="scope">
                <el-tag v-if="index !== scope.row.tool_id">{{scope.row.tool_name}}</el-tag>
                <el-input v-model="inputName" placeholder="请输入链接名" v-if="index === scope.row.tool_id">
                    <i slot="suffix" class="el-input__icon el-icon-edit" @click.stop="save(scope.row)" style="cursor:pointer;color: #409EFF;"></i>
                </el-input>
            </template>
            </el-table-column>
            <el-table-column
                prop="tool_url"
                label="链接地址">
            <template slot-scope="scope">
                <el-tag v-if="index !== scope.row.tool_id" type="success">{{scope.row.tool_url}}</el-tag>
                <el-input v-model="inputUrl" placeholder="请输入链接地址" v-if="index === scope.row.tool_id">
                    <i slot="suffix" class="el-input__icon el-icon-edit" @click.stop="save(scope.row)" style="cursor:pointer;color: #409EFF;"></i>
                </el-input>
            </template>                
            </el-table-column>
            <el-table-column
                prop="tool_type"
                label="链接分类">
                <template slot-scope="scope">
                    <el-tag v-if="index !== scope.row.tool_id" type="warning">{{scope.row.tool_type}}</el-tag>
                    <el-input v-model="inputType" placeholder="请输入链接分类" v-if="index === scope.row.tool_id">
                        <i slot="suffix" class="el-input__icon el-icon-edit" @click.stop="save(scope.row)" style="cursor:pointer;color: #409EFF;"></i>
                    </el-input>
                </template>     
            </el-table-column>
            
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="updateTool(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="deleteTool(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="inputTool">
            <el-input
                placeholder="请输入链接名"
                v-model="name"
                class="input"
                clearable>
            </el-input>
            <el-input
                placeholder="请输入链接地址"
                v-model="url"
                class="input"
                clearable>
            </el-input>
            <el-input
                placeholder="请输入链接分类"
                v-model="type"
                class="input"
                clearable>
            </el-input>
            <el-button type="primary" plain style="margin-left: 5px;" @click="addTool">添加</el-button>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import getRandomId from '../../utils/getRandomId.js'
    import index from '../../api';
    export default {
        data () {
            return {
                inputName: '',
                inputUrl: '',
                index: '',
                inputType: '',
                name: '',
                url: '',
                type: ''
            }
        },
        created () {
            this.$store.dispatch('getTools')
        },
        mounted () {

        },
        computed: {
            ...mapState(['tools'])
        },
        methods: {
            updateTool (row) {
                this.index = row.tool_id
                this.inputUrl = row.tool_url
                this.inputName = row.tool_name
                this.inputType = row.tool_type
            },
            save (row) {
                if (row.tool_url === this.inputUrl && row.tool_name === this.inputName && row.tool_type === this.inputType) {
                    this.index = ''
                    return
                }
                this.$store.dispatch('setTool', {tool_id: row.tool_id, tool_url: this.inputUrl, tool_name: this.inputName, tool_type: this.inputType, type: 'update'})
                this.index = ''
            },
            deleteTool (row) {
                if (confirm('确认删除？')) {
                    this.$store.dispatch('setTool', {...row, type: 'delete'})
                }
            },
            addTool () {
                if (!this.name || !this.url || !this.type) {
                    this.$message.warning({
                        message: '不能为空'
                    })
                    return 
                }
                this.$store.dispatch('setTool', {
                    tool_id: getRandomId(),
                    tool_name: this.name,
                    tool_url: this.url,
                    tool_type: this.type,
                    type: 'insert'
                })
                this.name = ''
                this.url = ''
                this.type = ''

            }
        }
    }
</script>
<style scoped lang="less">
    .tool {
        padding: 10px;
        -webkit-box-sizing: border-box;
           -moz-box-sizing: border-box;
                box-sizing: border-box;
        .inputTool {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -webkit-justify-content: flex-start;
               -moz-box-pack: start;
                -ms-flex-pack: start;
                    justify-content: flex-start;
            width: 70%;
            margin-top: 5px;
            .input {
                &:nth-child(2) {
                    margin: 0 5px;
                }

            }
        }
    }
    @media screen and (max-width: 800px){
        .inputTool {
            display: block!important;
        }
        .input {
            margin: 5px 0!important;
        }
    }
</style>
