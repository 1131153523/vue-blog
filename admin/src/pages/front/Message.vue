<template>
    <div>
        <a :href="path" >
            <svg class="icon" aria-hidden="true"  >
                <use xlink:href="#icon-GitHub"></use>
            </svg>  
        </a>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    export default {
        data () {
            return {
                client_id: '76542152a5f2910c5137',
                client_secret: '8c94bdae00dba8f7db0765edfc43c62ad2b11460',
                scope: ['user'],
                path: ''
            }
        },
        async mounted (){
            let data = (+new Date()).toString()
            this.path = `https://github.com/login/oauth/authorize?client_id=${this.client_id}&scope=${this.scope}&state=${data}`
        },
        methods: {
            async loginGithub() {
                let res = await api.loginGithub()
                console.log(res)
            }
        }
    }
</script>
<style scoped lang="less">
    svg {
        font-size: 30px;
    }
</style>
