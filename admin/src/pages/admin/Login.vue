<template>
    <div id="login">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="grid-content bg-purple">
                    <el-row>
                        <el-col >
                            <div class="grid-content bg-purple">
                                <el-form
                                        :model="ruleForm2"
                                        status-icon :rules="rules2"
                                        ref="ruleForm2" label-width="100px"
                                        :label-position="labelPosition"
                                        class="demo-ruleForm">
                                    <el-form-item label="用户名" prop="username">
                                        <el-input  v-model="ruleForm2.username" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="password">
                                        <el-input type="password" v-model="ruleForm2.password" autocomplete="off" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm2')" >提交</el-button>
                                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    import api from '../../api/index'
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));

                } else if(value.length > 16) {
                    callback(new Error('用户名长度不超过16'));
                } else {
                    callback();
                }
            }
            return {
                ruleForm2: {
                    password: '',
                    username: '',
                },
                rules2: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: validateUser, trigger: 'blur' }
                    ]

                },
                labelPosition: 'top'
            };
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.login(this.ruleForm2)
                            .then(res => {
                                if (res.code === 1) {
                                    this.ruleForm2.username = res.data.username
                                    this.$store.dispatch('UserLogin', res.data)
                                    this.$notify({
                                        title: '成功',
                                        message: res.msg,
                                        type: 'success',
                                        offset: 150
                                    });
                                    this.$router.push('/admin')
                                } else {
                                    this.$notify.error({
                                        title: '错误',
                                        message: res.msg,
                                        offset: 150
                                    });
                                }
                            })
                            .catch(err => {
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
        }

    }
</script>
<style scoped>
    #login {
        margin-top: 180px;
    }
</style>