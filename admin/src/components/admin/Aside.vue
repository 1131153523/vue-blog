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
            <el-menu-item index="5" @click="addManager" >
                    <svg class="icon" aria-hidden="true" style="font-size: 20px;" >
                        <use xlink:href="#icon-tianjiaguanliyuan"></use>
                    </svg>&nbsp;&nbsp;&nbsp;                    
                <span slot="title">添加管理</span>
            </el-menu-item>
        </el-menu>
        <el-dialog
            style="margin-top: 5vh;"
            title="添加管理"
            :visible.sync="addManagerVisible"
            width="50%">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item  prop="username">
                    <el-input  v-model="ruleForm.username"  placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>                
                <el-form-item  prop="pass">
                    <el-input type="password"  placeholder="密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass">
                    <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>
<script>
    import {mapState} from 'vuex'
    import api from '../../api/index.js'
    import getRandomId from '../../utils/getRandomId.js'
    export default {
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else {
                    callback()
                }
            }
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    callback()
                }
            }
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'))
                } else if (value !== this.ruleForm.pass){
                    callback(new Error('两次密码输入不一致'))
                } else {
                    callback()
                }
            }
            return {
                addManagerVisible: false,
                ruleForm: {
                    username: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validateCheckPass, trigger: 'blur'}
                    ]
                }
            }
        },
        computed:{
            ...mapState(['isCollapse'])
        },
        methods:{
            addManager () {
                this.addManagerVisible = true
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.addManager({...this.ruleForm, admin_id: getRandomId()})
                            .then(res => {
                                console.log(res)
                            })
                            .catch(e => {
                                console.log(e)
                            })
                            
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
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
