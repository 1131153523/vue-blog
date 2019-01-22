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
    .home .Info {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
                justify-content: space-around;
        height: 80px;
        width: 100%;
    }
    .home .Info  > div {
        background-color: #fff;
        height: 100px;
        -webkit-flex-basis: 25%;
            -ms-flex-preferred-size: 25%;
                flex-basis: 25%;
        -moz-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        -webkit-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        box-shadow: 4px 4px 40px rgba(0,0,0,.05);
        -webkit-border-radius: 3px;
           -moz-border-radius: 3px;
                border-radius: 3px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
                justify-content: space-around;
        -webkit-box-align: center;
        -webkit-align-items: center;
           -moz-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        cursor: pointer;
    }
    .home .Info  > div svg {
        opacity: 0.8;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
        -webkit-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
    }
    .home .Info  > div:hover  svg {
        -webkit-transform: translateY(-5px);
           -moz-transform: translateY(-5px);
            -ms-transform: translateY(-5px);
             -o-transform: translateY(-5px);
                transform: translateY(-5px);
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
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
            -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
            margin-top: 5px;

        }
        .home .Info > div {
            -webkit-flex-basis: 80%;
                -ms-flex-preferred-size: 80%;
                    flex-basis: 80%;
            margin-top: 20px;
            -webkit-box-align: center;
            -webkit-align-items: center;
               -moz-box-align: center;
                -ms-flex-align: center;
                        -ms-grid-row-align: center;
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
