<template>
    <div>
        <svg class="icon" aria-hidden="true" @click="loginGithub" >
            <use xlink:href="#icon-GitHub" ></use>
        </svg>  
    </div>
</template>
<script>
    import api from '../../api/index.js'
    export default {
        data () {
            return {

            }
        },
        async mounted (){

        },
        methods: {

        }
    }
</script>
<style scoped lang="less">
    svg {
        font-size: 30px;
    }
</style>
