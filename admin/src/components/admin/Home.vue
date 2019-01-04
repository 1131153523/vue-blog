<template>
    <div class="home">
        <div class="Info">
            <div>
                <i class="fa fa-file" :style="{color: headColor}"></i>
                <div>
                    <h3>文章数量</h3>
                    <span>20</span>
                </div>
            </div>
            <div>
                <i class="fa fa-comments" :style="{color: headColor}" ></i>
                <div>
                    <h3>评论</h3>
                    <span>20</span>
                </div>
            </div>
            <div>
                <i class="fa fa-user" :style="{color: headColor}" ></i>
                <div>
                    <h3>访问量</h3>
                    <span>20</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState(['headColor'])
        }
    }
</script>
<style scoped>
    /*.home {*/
        /*width: 100%;*/
    /*}*/
    .home .Info {
        display: flex;
        justify-content: space-around;
        height: 80px;
    }
    .home .Info  > div {
        background-color: #fff;
        height: 100px;
        flex-basis: 25%;
        -moz-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        -webkit-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        border-radius: 3px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
    }
    .home .Info  > div i {
        opacity: 0.8;
        transition: all 0.2s ease-out;
    }
    .home .Info  > div:hover  i {
        transform: translateY(-5px);
        opacity: 1;
    }
    .home .Info  > div i {
        font-size: 45px;
    }

    .home .Info  > div > div h3 {
        color: rgba(0,0,0,.45);
        font-size: 18px;
    }
    .home .Info  > div > div span {
        font-size: 20px;
        color: #666;
    }



    @media screen and (min-width: 640px) and (max-width: 960px){
        .home .Info  > div i {
            font-size: 45px;
        }
        .home .Info  > div span {
            font-size: 20px;
        }
    }

    @media screen and (max-width: 640px) {
        .home .Info {
            flex-wrap: wrap;
            margin-top: 5px;

        }
        .home .Info > div {
            flex-basis: 80%;
            margin-top: 20px;
            align-items: center;
        }
        .home .Info  > div i {
            font-size: 45px;
        }
        .home .Info  > div span {
            font-size: 20px;
        }
        .home .Info  > div > div h3 {
            color: rgba(0,0,0,.45);
            font-size: 18px;
            display: inline-block;
            margin-right: 20px;
        }
    }

</style>
