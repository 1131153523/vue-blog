<template>
    <div class="article">
        <Read status="read" :article_id="$route.params.article_id" :navigation="false"/>
    </div>
</template>
<script>
    import Read from '../../components/common/Read.vue'
    export default {
        components: {
            Read
        }
    }   
</script>
    
<style lang="less">

</style>