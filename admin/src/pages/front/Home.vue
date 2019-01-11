<template>
    <div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" > 
                <div class="home">
                    <div class="home-left">
                        <Tag />
                    </div>
                    <div class="home-right">

                    </div>                      
                </div>
            </el-col> 
        </el-row>   
    </div>
</template>
<script>
    import Tag from '../../components/front/Tag.vue'
    export default {
        components: {
            Tag
        }
    }   
</script>
    
<style lang="less">
    .home {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>