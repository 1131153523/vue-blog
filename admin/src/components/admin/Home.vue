<template>
    <div class="home">
        <div class="Info">
            <div>
                <svg class="icon" aria-hidden="true"  :style="{color: headColor}">
                    <use xlink:href="#icon-wenzhang"></use>
                </svg>     
                <div>
                    <h3>文章数量</h3>
                    <span>20</span>
                </div>
            </div>
            <div>
                <svg class="icon" aria-hidden="true"   :style="{color: headColor}">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>                     
                <div>
                    <h3>评论</h3>
                    <span>20</span>
                </div>
            </div>
            <div>
                <svg class="icon" aria-hidden="true" :style="{color: headColor}">
                    <use xlink:href="#icon-peoples"></use>
                </svg>                
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
        created () {
            
        },
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
        width: 100%;
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
    .home .Info  > div svg {
        opacity: 0.8;
        transition: all 0.2s ease-out;
    }
    .home .Info  > div:hover  svg {
        transform: translateY(-5px);
        opacity: 1;
    }
    .home .Info  > div svg {
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
        .home .Info  > div svg {
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
        .home .Info  > div svg {
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
