<template>
    <div class="tag">
        <h3 class="hvr-underline-from-left"></i>&nbsp;&nbsp;热门标签</h3>
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
                        this.$emit('getTags', res.data)
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
        width: 20rem;
        padding-bottom: 30px;
        background-color: #fff;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        > h3 {
            text-indent: 0.4em;
            line-height: 3.5625rem;
            font-weight: 200;
            border-bottom: 1px solid #f6f6f6;
            width: 100%;
        }
        .tag-area {
            height: 100%;
            width: 20rem;
            padding: 5px;
            box-sizing: border-box;
            .tag-list {
                list-style: none;
                width: 100%;
                li {
                    a {
                        display: flex;      
                        height: 100%;
                        width: 100%;
                        text-decoration: none;
                        line-height: 2.5rem;
                        text-align: left;
                        font-size: 1.25rem;
                        color: rgba(0, 0, 0, 0.68);
                        background: #efefef;
                        border-radius: 3px;
                        padding: 3px;
                        box-sizing: border-box;
                        margin-top: 6px;
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
@keyframes hvr-pulse-shrink {
  to {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
}
.hvr-pulse-shrink {
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-pulse-shrink:hover, .hvr-pulse-shrink:focus, .hvr-pulse-shrink:active {
  -webkit-animation-name: hvr-pulse-shrink;
  animation-name: hvr-pulse-shrink;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
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