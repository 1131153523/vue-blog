<template>
    <div class="tag">
        <h3><i class="fa fa-tags"></i>&nbsp;&nbsp;热门标签</h3>
        <div class="tag-area">
            <ul class="tag-list">
                <el-row :gutter="4">
                    <el-col :span="12" v-for="e in tags" :key="e.tags_id">
                        <li class="hvr-buzz-out"><router-link :to="{ path:'/home', query: { tags_name:  e.tags_name} }"><img :src="src(e.tags_name)"><span>{{e.tags_name}}</span></router-link></li>
                    </el-col>
                </el-row>
            </ul>
        </div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
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
                        this.tags = res.data
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        methods: {
            src (tags_name) {
                tags_name = tags_name.toLowerCase()
                switch(tags_name) {
                    case 'javascript':
                        return 'http://127.0.0.1:3000/images/javascript.png'
                    case 'vue':
                        return 'http://127.0.0.1:3000/images/vue.js.png'
                    default: 
                        return ''
                }
            }
        }
    }   
</script>
    
<style lang="less">
    .tag {
        width: 20rem;
        min-height: 400px;
        background-color: #fff;
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        > h3 {
            text-indent: 0.4em;
            line-height: 3.5625rem;
            font-weight: 200;
            border-bottom: 1px solid #f6f6f6;
        }
        .tag-area {
            height: 100%;
            width: 100%;
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
                            background: rgba(107, 222, 50, 0.89);
                            color: #fff;
                        }
                        img {
                            width: 20px;
                            height: 20px;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }





    @-webkit-keyframes hvr-buzz-out {
    10% {
        -webkit-transform: translateX(3px) rotate(2deg);
        transform: translateX(3px) rotate(2deg);
    }
    20% {
        -webkit-transform: translateX(-3px) rotate(-2deg);
        transform: translateX(-3px) rotate(-2deg);
    }
    30% {
        -webkit-transform: translateX(3px) rotate(2deg);
        transform: translateX(3px) rotate(2deg);
    }
    40% {
        -webkit-transform: translateX(-3px) rotate(-2deg);
        transform: translateX(-3px) rotate(-2deg);
    }
    50% {
        -webkit-transform: translateX(2px) rotate(1deg);
        transform: translateX(2px) rotate(1deg);
    }
    60% {
        -webkit-transform: translateX(-2px) rotate(-1deg);
        transform: translateX(-2px) rotate(-1deg);
    }
    70% {
        -webkit-transform: translateX(2px) rotate(1deg);
        transform: translateX(2px) rotate(1deg);
    }
    80% {
        -webkit-transform: translateX(-2px) rotate(-1deg);
        transform: translateX(-2px) rotate(-1deg);
    }
    90% {
        -webkit-transform: translateX(1px) rotate(0);
        transform: translateX(1px) rotate(0);
    }
    100% {
        -webkit-transform: translateX(-1px) rotate(0);
        transform: translateX(-1px) rotate(0);
    }
    }
    @keyframes hvr-buzz-out {
    10% {
        -webkit-transform: translateX(3px) rotate(2deg);
        transform: translateX(3px) rotate(2deg);
    }
    20% {
        -webkit-transform: translateX(-3px) rotate(-2deg);
        transform: translateX(-3px) rotate(-2deg);
    }
    30% {
        -webkit-transform: translateX(3px) rotate(2deg);
        transform: translateX(3px) rotate(2deg);
    }
    40% {
        -webkit-transform: translateX(-3px) rotate(-2deg);
        transform: translateX(-3px) rotate(-2deg);
    }
    50% {
        -webkit-transform: translateX(2px) rotate(1deg);
        transform: translateX(2px) rotate(1deg);
    }
    60% {
        -webkit-transform: translateX(-2px) rotate(-1deg);
        transform: translateX(-2px) rotate(-1deg);
    }
    70% {
        -webkit-transform: translateX(2px) rotate(1deg);
        transform: translateX(2px) rotate(1deg);
    }
    80% {
        -webkit-transform: translateX(-2px) rotate(-1deg);
        transform: translateX(-2px) rotate(-1deg);
    }
    90% {
        -webkit-transform: translateX(1px) rotate(0);
        transform: translateX(1px) rotate(0);
    }
    100% {
        -webkit-transform: translateX(-1px) rotate(0);
        transform: translateX(-1px) rotate(0);
    }
    }
    .hvr-buzz-out {
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }
    .hvr-buzz-out:hover, .hvr-buzz-out:focus, .hvr-buzz-out:active {
        -webkit-animation-name: hvr-buzz-out;
        animation-name: hvr-buzz-out;
        -webkit-animation-duration: 0.75s;
        animation-duration: 0.75s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
    }


    

</style>