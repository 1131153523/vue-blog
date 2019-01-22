<template>
    <div class="changePwd" >
        <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
                <el-form-item label="" prop="prepass">
                    <el-input type="password" v-model="ruleForm.prepass" autocomplete="off" placeholder="原密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import api from '../../api/index'
    export default {
        data() {
            var validatePrepass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('原密码不能为空'));
                    return
                }
                let userInfo = {
                    username: sessionStorage.getItem('username'),
                    prepass: value,
                    token: sessionStorage.getItem('token')
                }
                api.checkPrepass(userInfo).then(res => {
                    if (res.code === 0) {
                        callback(res.msg)
                    } else {
                        callback()
                    }
                }).catch(err => {
                    console.log(err)
                })
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    prepass: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    prepass: [
                        { validator: validatePrepass, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        computed:{
            ...mapState(['resInfo']),
            resInfo(){
                return this.$store.state.resInfo
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let userInfo = {
                            username: sessionStorage.getItem('username'),
                            token: sessionStorage.getItem('token'),
                            password: this.ruleForm.checkPass
                        }
                        api.postChangePass(userInfo).then(res => {
                            console.log(res);
                            if (res.code) {
                                this.$message({
                                    showClose: true,
                                    message: res.msg,
                                    type: 'success'
                                });
                                this.$emit('isVisible', false)
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.msg,
                                    type: 'error'
                                });
                                this.$emit('isVisible', true)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .changePwd {
        display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
        display: -moz-box; /* Firefox 17- */
        display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
        display: -moz-flex; /* Firefox 18+ */
        display: -ms-flexbox; /* IE 10 */
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
             justify-content: center;
        width: 100%;
    }

</style>
