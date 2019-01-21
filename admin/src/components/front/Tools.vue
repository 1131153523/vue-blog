<template>
    <div class="tools">
        <h3 class="hvr-underline-from-left">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-ziyuan"></use>
            </svg>            
            &nbsp;&nbsp;工具箱
        </h3>
        <el-collapse v-model="activeNames"  accordion  class="tools-wrapper">
            <el-collapse-item :title="item" :name="item" v-for="item in $store.getters.toolType" :key="item" >
                <ul>
                    <li class="tool" v-for="e in tools" :key="e.tool_id" v-if="e.tool_type === item">
                        <a :href="e.tool_url">
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
        width: 20rem;
        padding-bottom: 20px;
        background-color: #fff;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        margin-top: 10px;
        > h3 {
            text-indent: 0.4em;
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
                    transition: all 0.2s ease-in-out;
                    &:hover {
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
.hvr-underline-from-left {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}
.hvr-underline-from-left:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 100%;
    bottom: 0;
    background: #2098D1;
    height: 3px;
    -webkit-transition-property: right;
    transition-property: right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}
.hvr-underline-from-left:hover:before, .hvr-underline-from-left:focus:before, .hvr-underline-from-left:active:before {
    right: 0;
}
</style>
