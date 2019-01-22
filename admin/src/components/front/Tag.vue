<template>
    <div class="tag">
        <h3 class="hover-underline-animation">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-biaoqian2"></use>
            </svg>            
            &nbsp;&nbsp;热门标签
        </h3>
        <div class="tag-area">
            <ul class="tag-list">
                <el-row :gutter="4">
                    <el-col :span="12" v-for="e in tags" :key="e.tags_id">
                        <li class="hvr-pulse-shrink">
                            <router-link :to="{ path:'/home', query: { tags_name:  e.tags_name} }">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="tagIcon(e.tags_name)"></use>
                                </svg>
                                <span>{{e.tags_name}}</span>
                            </router-link>
                        </li>
                    </el-col>
                </el-row>
            </ul>
        </div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import { rejects } from 'assert';
    export default {
        data () {
            return {
                tags: []
            }
        },
        mounted () {
            api.getTags()
                .then(res => {
                    if (res.code) {
                        this.tags = res.data.filter(e => e.tags_name !== '项目')
                        this.$emit('getTags', this.tags)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        methods: {
            tagIcon (val) {
                switch(val.toLowerCase()) {
                    case  'es6': 
                        return '#icon-JavaScript'
                    case 'javascript':
                        return '#icon-JavaScript'
                    case 'python':
                        return '#icon-python'
                    case 'vue':
                        return '#icon-Vue'
                    case 'html':
                        return '#icon-HTML'
                    case 'css':
                        return '#icon-CSS-outline'
                    case '算法': 
                        return '#icon-jiyinsuanfa'
                    case '数据库':
                        return '#icon-database'
                    case 'nodejs':
                        return '#icon-node-jsNodejsxingnengpingtai'
                    case 'webpack':
                        return '#icon-webpack'
                }   
            }
        },
        computed: {

        }
    }   
</script>
    
<style lang="less">
    .tag {
        width: 320px;
        width: 20rem;
        padding-bottom: 30px;
        background-color: #fff;
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
           -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        > h3 {
            font-size: 17px;
            text-indent: 0.4em;
            line-height: 57px;
            line-height: 3.5625rem;
            font-weight: 200;
            border-bottom: 1px solid #f6f6f6;
            width: 100%;
            svg {
                font-size: 22px;
            }
        }
        .tag-area {
            height: 100%;
            width: 320px;
            width: 20rem;
            padding: 5px;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                    box-sizing: border-box;
            .tag-list {
                list-style: none;
                width: 100%;
                li {
                    a {
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -moz-box;
                        display: -ms-flexbox;
                        display: flex;      
                        height: 100%;
                        width: 100%;
                        text-decoration: none;
                        line-height: 40px;
                        line-height: 2.5rem;
                        text-align: left;
                        font-size: 20px;
                        font-size: 1.25rem;
                        color: rgba(0, 0, 0, 0.68);
                        background: #efefef;
                        -webkit-border-radius: 3px;
                           -moz-border-radius: 3px;
                                border-radius: 3px;
                        padding: 3px;
                        -webkit-box-sizing: border-box;
                           -moz-box-sizing: border-box;
                                box-sizing: border-box;
                        margin-top: 6px;
                        -webkit-box-align: center;
                        -webkit-align-items: center;
                           -moz-box-align: center;
                            -ms-flex-align: center;
                                align-items: center;
                        &:hover {
                            background: #2098D1;
                            color: #fff;
                            i {
                                color: yellow;
                            }
                        }
                        svg {
                            font-size: 19px;
                            margin-left: 3px;
                            margin-right: 7px;
                        }
                    }
                }
            }
        }
    }





    @-webkit-keyframes hvr-pulse-shrink {
        to {
            -webkit-transform: scale(0.9);
            transform: scale(0.9);
        }
    }
    @-moz-keyframes hvr-pulse-shrink {
        to {
            -webkit-transform: scale(0.9);
            -moz-transform: scale(0.9);
                 transform: scale(0.9);
        }
    }
    @-o-keyframes hvr-pulse-shrink {
        to {
            -webkit-transform: scale(0.9);
            -o-transform: scale(0.9);
               transform: scale(0.9);
        }
    }
    @keyframes hvr-pulse-shrink {
        to {
            -webkit-transform: scale(0.9);
            -moz-transform: scale(0.9);
              -o-transform: scale(0.9);
                 transform: scale(0.9);
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