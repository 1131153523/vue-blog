<template>
    <div class="header" :style="{background: Color}">
        <div>
            <div class="header-left">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div class="switch">
                    <i class="el-icon-arrow-left" @click="CHANGE_COLLAPSE" v-if="isCollapse"></i>
                    <i class="el-icon-arrow-right" @click="CHANGE_COLLAPSE" v-else="!isCollapse"></i>
                </div>
                <div class="logo">
                    VueAdmin
                </div>
            </div>
            <div class="userInfo">
                <div class="chooseColor" style="position: relative;">
                    <el-color-picker v-model="Color" style="opacity: 0;z-index: 11111;"></el-color-picker>
                    <el-button type="primary" icon="el-icon-edit" circle style="position: absolute;top: 0;left: 0;font-size: 20px;vertical-align: middle" :style="{background: headColor,borderColor: headColor}"></el-button>
                </div>
                <div class="avator">
                    <img src="http://img1.2345.com/duoteimg/zixunImg/local/2017/04/05/14913777692508.jpg" alt="">
                </div>
                <div class="submenu">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" style="z-index: 6000!important;">
                            <el-dropdown-item><el-button type="text" @click="dialogVisible = true">修改密码</el-button></el-dropdown-item>
                            <el-dropdown-item><a @click.prevent="logout">退出</a></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-dialog
                    title="修改密码"
                    :visible.sync="dialogVisible"
                    width="50%"
                    :modal="false"
            >
                <ChangePwd @isVisible="isVisible"></ChangePwd>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import ChangePwd from './ChangePwd.vue'
    import {mapState, mapActions, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                logout() {
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('username')
                    this.$router.push({path: '/login'})
                },
                dialogVisible: false,
            };
        },
        computed:{
            ...mapState(['isCollapse','username', 'headColor']),
            Color: {
                get(){
                    return this.$store.state.headColor
                },
                set(val){
                    this.$store.commit('CHANGE_HEAD_COLOR', val)
                }
            }
        },
        methods:{
            ...mapMutations(['CHANGE_COLLAPSE']),
            isVisible(v){
                this.dialogVisible = v
            }
        },
        components:{
            ChangePwd
        }

    }
</script>
<style scoped lang="less">
    .header {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        -webkit-flex: 1;
        -moz-box-flex: 1;
             flex: 1;

        -moz-box-shadow:0px 1px 5px #949494;
        -webkit-box-shadow:0px 1px 5px #949494;
        box-shadow:0px 1px 5px #949494;

        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: -moz-box;
        display: flex;

        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
             justify-content: center;

        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
             align-items: center;

        position: fixed;
        z-index: 3000;
        width: 100%;
        > div {
            -webkit-flex-basis: 95%;
                -ms-flex-preferred-size: 95%;
                    flex-basis: 95%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: -moz-box;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
               -moz-box-pack: justify;
                -ms-flex-pack: justify;
                    justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
               -moz-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            .userInfo {
                cursor: pointer;
                padding-left: 30px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: -moz-box;
                display: flex;
                -webkit-box-pack: justify;
                -webkit-justify-content: space-between;
                   -moz-box-pack: justify;
                    -ms-flex-pack: justify;
                        justify-content: space-between;
                span {
                    color: #fff;
                }
                .submenu {
                    padding-left: 10px;
                    padding-top: 7px;
                }
                .avator {
                    width: 28px;
                    height:28px;
                    display: inline-block;
                    padding-top: 8px;
                    img {
                        width: 100%;
                        height: 100%;
                        -webkit-border-radius: 50%;
                           -moz-border-radius: 50%;
                                border-radius: 50%;
                    }
                }
                .chooseColor {
                    margin-right: 20px;
                }

            }
        }
        .header-left {
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: -moz-box;
            display: flex;
            -webkit-justify-content: space-around;
                -ms-flex-pack: distribute;
                    justify-content: space-around;
            .logo {
                padding-left: 50px;
                color: #fff;
                font-size: 24px;
                font-family: "DejaVu Sans";
            }
            i {
                font-size: 23px;
                cursor: pointer;
                border: 1px solid #fff;
                -webkit-border-radius: 50%;
                   -moz-border-radius: 50%;
                        border-radius: 50%;
                color: #fff;
            }
        }
    }


</style>
