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
                <el-tag v-if="index !== scope.row.tool_id">{{scope.row.tool_url}}</el-tag>
                <el-input v-model="inputUrl" placeholder="请输入链接地址" v-if="index === scope.row.tool_id">
                    <i slot="suffix" class="el-input__icon el-icon-edit" @click.stop="save(scope.row)" style="cursor:pointer;color: #409EFF;"></i>
                </el-input>
            </template>                
            </el-table-column>
            <el-table-column
                prop="tool_type"
                label="链接分类">
                <template slot-scope="scope">
                    <el-tag v-if="index !== scope.row.tool_id">{{scope.row.tool_type}}</el-tag>
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
    </div>
</template>
<script>
    import {mapState} from 'vuex'
import index from '../../api';
    export default {
        data () {
            return {
                inputName: '',
                inputUrl: '',
                index: '',
                inputType: ''
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
            }
        }
    }
</script>
<style scoped lang="less">
    .tool {
        padding: 10px;
        box-sizing: border-box;
    }
</style>
