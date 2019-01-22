<template>
    <div class="info">
        <h3 class="info-title">
            <svg class="icon" aria-hidden="true" @click.stop="submenu">
                <use xlink:href="#icon-renwu"></use>
            </svg>            
            个人简介
        </h3>
        <div class="info-avator">
            <img src="http://127.0.0.1:3000/images/IMG_0402.JPG" alt="">
        </div>
        <div class="info-content">
            <p>范义辉</p>
            <p>前端入门小白</p>
            <p>16计算机科学与技术专业(大三)</p>
        </div>
        <div class="info-contact">
            <div class="github">
                <el-tooltip class="item" effect="dark" content="https://github.com/1131153523" placement="bottom">
                    <a href="https://github.com/1131153523">
                        <svg class="icon" aria-hidden="true" @click.stop="submenu">
                            <use xlink:href="#icon-github"></use>
                        </svg>    
                    </a>                    
                </el-tooltip>
            </div>
            <div class="qq">
                <el-tooltip class="item" effect="dark" content="1131153523" placement="bottom">
                    <svg class="icon" aria-hidden="true" @click.stop="submenu">
                        <use xlink:href="#icon-QQ1"></use>
                    </svg>    
                </el-tooltip>
            </div>
            <div class="email">
                <el-tooltip class="item" effect="dark" content="1131153523@qq.com" placement="bottom">
                    <svg class="icon" aria-hidden="true" @click.stop="submenu">
                        <use xlink:href="#icon-youxiang-"></use>
                    </svg>    
                </el-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
    export default {

    }   
</script>
    
<style lang="less" scoped>
    .info {
        background-color: #fff;
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
           -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        padding-bottom: 30px;
        .info-title {
            width: 100%;
            text-indent: 0.4em;
            line-height: 57px;
            line-height: 3.5625rem;
            font-weight: 200;
            border-bottom: 1px solid #f6f6f6;
            font-size: 17px;
            svg {
                font-size: 25px;
            }
        }
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
           -moz-box-orient: vertical;
           -moz-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-align: center;
        -webkit-align-items: center;
           -moz-box-align: center;
            -ms-flex-align: center;
                align-items: center;        
        .info-avator {
            width: 80px;
            height: 80px;
            margin-top: 10px;
            img {
                width: 100%;
                -webkit-border-radius: 50%;
                   -moz-border-radius: 50%;
                        border-radius: 50%;
                -webkit-transition: all 0.4s ease-in-out;
                -o-transition: all 0.4s ease-in-out;
                -moz-transition: all 0.4s ease-in-out;
                transition: all 0.4s ease-in-out;
                &:hover {
                    -webkit-transform: rotateZ(360deg);
                       -moz-transform: rotateZ(360deg);
                        -ms-transform: rotate(360deg);
                         -o-transform: rotateZ(360deg);
                            transform: rotateZ(360deg);
                }
            }
        }
        .info-content {
            margin-top: 10px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.7);
            padding: 5px;
            -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
                    box-sizing: border-box;
            p {
                text-align: center;
                background-color: #f4f5f5;
                margin-top: 5px;
                -webkit-border-radius: 5px;
                   -moz-border-radius: 5px;
                        border-radius: 5px;
                padding: 3px 20px;
            }
        }
        .info-contact {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-justify-content: space-around;
                -ms-flex-pack: distribute;
                    justify-content: space-around;
            width: 100%;
            margin-top: 10px;
            > div {
                svg {
                    font-size: 30px;
                    cursor: pointer;
                    &:hover {
                        color: #2098D1;
                    } 
                }
            }
        }
    }
    
</style>