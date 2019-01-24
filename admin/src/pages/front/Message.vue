<template>
    <div class="message">
        <div id="vcomments"></div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import Valine from 'valine';
    window.AV = require('leancloud-storage')
    export default {
        data () {
            return {

            }
        },
        mounted (){
            
            new Valine({
                el: '#vcomments' ,
                appId: '2YwTwkrYghGrn5kJbwo1aKNO-gzGzoHsz',
                appKey: 'JgMJ2pf4k3RXPAhL5CBe2pkI',
                notify:false, 
                verify:false, 
                avatar:'wavatar', 
                placeholder: '～＼（≧▽≦）／～来啊　　评论啊' 
            });
        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
    .message {
        background-color: #fff;

    }
    #vcomments {
        padding: 15px;
        box-sizing: border-box;
    }
</style>
