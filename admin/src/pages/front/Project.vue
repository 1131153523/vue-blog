<template>
    <div class="project">
        <div class="project-left">
            <h3 class="project-title " >全部项目</h3>
            <div class="project-all " v-if="projects.length !== 0">
                <article class="project-intro" v-for="e in projects" v-if="e.article_pass === 1" :key="e.article_id">
                    <router-link :to="'/article/' + e.article_id">
                        <div class="project-intro-img" v-if="e.article_img">
                            <img :src="e.article_img" alt=""> 
                        </div>
                    </router-link>
                    <div class="project-intro-main">
                        <div class="project-intro-title">
                            <router-link :to="'/article/' + e.article_id">
                                <p>
                                    {{e.article_title}}
                                </p>
                            </router-link>
                        </div>
                        <div class="project-intro-content">
                            <router-link :to="'/article/' + e.article_id">
                                <p>
                                    {{e.article_introduce}}
                                </p>
                            </router-link>
                        </div>
                        <div class="project-intro-tag">
                            <svg class="icon" aria-hidden="true" @click.stop="submenu">
                                <use xlink:href="#icon-biaoqian1"></use>
                            </svg>  
                            <span>项目</span> 
                        </div>
                    </div>
                </article>
            </div>
        </div>
        <div class="project-right">
            <div class="personal-intro">
                <Info />
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    export default {
        data () {
            return {
                projects: []
            }
        },
        components: {
            Info: resolve => require(['../../components/front/Info.vue'], resolve) 
        },
        async mounted () {
            try {
                let res = await api.getProjects()
                this.projects = res.data
            } catch(e) {
                console.log(e)
            }
        }
    }   
</script>
    
<style lang="less" scoped>
    .project {
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        height: 700px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
           -moz-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
        .project-right {
            width: 320px;
            width: 20rem;
        }
        .project-left {
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
               -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
            -webkit-box-flex: 1;
            -webkit-flex: 1;
               -moz-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;
            margin-right: 10px;
            background-color: #fff;
            .project-title {
                line-height: 45px;
                -webkit-box-sizing: border-box;
                   -moz-box-sizing: border-box;
                        box-sizing: border-box;
                padding-left: 20px;
                font-size: 20px;
                font-weight: 300;
                border-bottom: 1px solid #f6f6f6;
                background-color: #fff;
            }
            .project-all {
                        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
                        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
                display: -webkit-box;
                display: -webkit-flex;
                display: -moz-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-justify-content: space-around;
                    -ms-flex-pack: distribute;
                        justify-content: space-around;
                -webkit-flex-wrap: wrap;
                    -ms-flex-wrap: wrap;
                        flex-wrap: wrap;
                padding: 10px;
                -webkit-box-sizing: border-box;
                   -moz-box-sizing: border-box;
                        box-sizing: border-box;
                background-color: #fff;
                .project-intro {
                                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
                                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
                    width: 30%;
                    -webkit-box-shadow: 0 0 20px rgba(0,0,0,.15);
                       -moz-box-shadow: 0 0 20px rgba(0,0,0,.15);
                            box-shadow: 0 0 20px rgba(0,0,0,.15);
                    margin: 20px 0;
                    .project-intro-img {
                                        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
                                        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
                        width: 100%;
                        position: relative;
                        overflow: hidden;
                        img {
                            width: 100%;
                            display: block;
                            -webkit-transition: all 0.5s ease-in;
                            -o-transition: all 0.5s ease-in;
                            -moz-transition: all 0.5s ease-in;
                            transition: all 0.5s ease-in;
                        }
                        &:hover {
                                                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
                            &:after {
                                opacity: 1;
                                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
                            }
                            img {
                                -webkit-transform: scale(1.2) rotate(3deg);
                                   -moz-transform: scale(1.2) rotate(3deg);
                                    -ms-transform: scale(1.2) rotate(3deg);
                                     -o-transform: scale(1.2) rotate(3deg);
                                        transform: scale(1.2) rotate(3deg);
                            }
                        }
                        &:after {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0,0,0,.3);
                            opacity: 0;
                            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
                            cursor: pointer;
                            -webkit-transition: all 0.15s ease-in;
                            -o-transition: all 0.15s ease-in;
                            -moz-transition: all 0.15s ease-in;
                            transition: all 0.15s ease-in;
                        }
                    }
                    .project-intro-main {
                        padding:0 15px;
                        -webkit-box-sizing: border-box;
                           -moz-box-sizing: border-box;
                                box-sizing: border-box;
                        .project-intro-title {
                            a {
                                p {
                                    line-height: 30px;
                                    font-size: 16px;
                                    color: #242f35;
                                    overflow:hidden;
                                    white-space: nowrap;
                                    -o-text-overflow: ellipsis;
                                       text-overflow: ellipsis;
                                }
                            }
                        }
                        .project-intro-content {
                            p {
                                line-height: 22px;
                                font-size: 14px;
                                color: #666;
                                text-indent: 2em;
                            }
                        }
                        .project-intro-tag {
                            margin: 10px 0;
                            font-size: 15px;
                            color: #999;
                            span {
                                margin-left: 5px;
                            }
                        }
                    }

                }
            }

        }
    }
    @media screen and (max-width: 1100px){
        .project-intro {
            width: 47%!important;
        }
    }
    @media screen and (max-width: 800px){
        .project-intro {
            width: 90%!important;
        }
        .project-right {
            display: none;
        }
        .project-left {
            -webkit-box-flex: 0;
            -webkit-flex: none;
               -moz-box-flex: 0;
                -ms-flex: none;
                    flex: none;
        }
    }
</style>