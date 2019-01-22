<template>
    <div class="tools">
        <h3 class="hover-underline-animation">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-ziyuan"></use>
            </svg>            
            &nbsp;&nbsp;工具箱
        </h3>
        <el-collapse v-model="activeNames"  accordion  class="tools-wrapper">
            <el-collapse-item :title="item" :name="item" v-for="item in $store.getters.toolType" :key="item" >
                <ul>
                    <li class="tool" v-for="e in tools" :key="e.tool_id" v-if="e.tool_type === item">
                        <a :href="e.tool_url" target="_blank">
                            <svg class="icon" aria-hidden="true" >
                                <use xlink:href="#icon-lianjie"></use>
                            </svg>
                            {{e.tool_name}}
                        </a>
                    </li>
                </ul>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                activeNames: '前端'
            }
        },
        computed: {
            ...mapState(['tools'])
        },
        created () {
            this.$store.dispatch('getTools')
        }
    }
</script>
<style scoped lang="less">
    .tools {
        width: 320px;
        width: 20rem;
        padding-bottom: 20px;
        background-color: #fff;
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
           -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        margin-top: 10px;
        > h3 {
            font-size: 17px;
            text-indent: 0.4em;
            line-height: 57px;
            line-height: 3.5625rem;
            font-weight: 200;
            border-bottom: 1px solid #f6f6f6;
            width: 100%;
            svg {
                font-size: 20px;
            }
        }
        .tools-wrapper {
            padding: 10px;
            border: none;
            ul {
                margin-top: 5px;
                li {
                    -webkit-transition: all 0.2s ease-in-out;
                    -o-transition: all 0.2s ease-in-out;
                    -moz-transition: all 0.2s ease-in-out;
                    transition: all 0.2s ease-in-out;
                    &:hover {
                        -webkit-transform: translate3d(5px, 0, 0);
                           -moz-transform: translate3d(5px, 0, 0);
                                transform: translate3d(5px, 0, 0);
                        a {
                            color: #2098D1;
                        }
                    } 
                
                    a {
                        svg {
                            font-size: 20px;
                        }
                    }
                }
            }
        }


    }


    @media screen and (max-width: 800px){
        .tools {
            display: none;
        }
    }
    .hover-underline-animation{
        display: inline-block;
        position: relative;
    }
    .hover-underline-animation:after{
        content:'';
        position: absolute;
        width: 100%;
        -webkit-transform:scaleX(0);
           -moz-transform:scaleX(0);
            -ms-transform:scaleX(0);
             -o-transform:scaleX(0);
                transform:scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #0087ca;
        -webkit-transform-origin: bottom right;
           -moz-transform-origin: bottom right;
            -ms-transform-origin: bottom right;
             -o-transform-origin: bottom right;
                transform-origin: bottom right;
        -webkit-transition: -webkit-transform 0.25s ease-out;
        transition: -webkit-transform 0.25s ease-out;
        -o-transition: -o-transform 0.25s ease-out;
        -moz-transition: transform 0.25s ease-out, -moz-transform 0.25s ease-out;
        transition: transform 0.25s ease-out;
        transition: transform 0.25s ease-out, -webkit-transform 0.25s ease-out, -moz-transform 0.25s ease-out, -o-transform 0.25s ease-out;
    }
    .hover-underline-animation:hover:after{
        -webkit-transform:scaleX(1);
           -moz-transform:scaleX(1);
            -ms-transform:scaleX(1);
             -o-transform:scaleX(1);
                transform:scaleX(1);
        -webkit-transform-origin: bottom left;
           -moz-transform-origin: bottom left;
            -ms-transform-origin: bottom left;
             -o-transform-origin: bottom left;
                transform-origin: bottom left;
    }
</style>
