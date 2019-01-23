<template>
    <div class="about">
        <div id="vcomments"></div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import Valine from 'valine';
    export default {
        data () {
            return {

            }
        },
        mounted (){
            window.AV = require('leancloud-storage')
            new Valine({
                el: '#vcomments' ,
                appId: '2YwTwkrYghGrn5kJbwo1aKNO-gzGzoHsz',
                appKey: 'JgMJ2pf4k3RXPAhL5CBe2pkI',
                notify:false, 
                verify:false, 
                avatar:'mm', 
                placeholder: 'just go go' 
            });
        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
    .about {
        background-color: #fff;

    }
    #vcomments {
        padding: 15px;
        box-sizing: border-box;
    }
</style>
