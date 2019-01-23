<template>
    <div class="about">
        <div class="about-left">
            <mavon-editor 
            v-model="value"
            :toolbarsFlag="toolbarsFlag" 
            :defaultOpen="defaultOpen" 
            :editable="editable" 
            :subfield="false" 
            :boxShadow="boxShadow"
            :navigation="navigation" />
        </div>
        <div class="about-right">
            <Info />
        </div>
    </div>
</template>
<script>
    import api from '../../api/index.js'
    import Info from '../../components/front/Info.vue'
    export default {
        data () {
            return {
                value: ''
            }
        },
        props: {
            boxShadow: {
                type: Boolean,
                default: false
            },
            getValue: {
                type: Function
            },
            navigation: {
                type: Boolean,
                default: false
            },
            toolbarsFlag: {
                type: Boolean,
                default: false
            },
            defaultOpen: {
                type: String,
                default: 'preview'
            },
            editable: {
                type: Boolean,
                default: false
            },
        },
        async mounted (){
            try {
                let res = await api.getAbout()
                if (res.code) {
                    let id = res.data.article_id
                    let res1 = await api.getArticleById({article_id: id})
                    if (res1.code) {
                        this.value = res1.data
                    }
                    console.log(this.value);
                    
                    
                }
            } catch(e) {
                console.log(e)
            }
            
        },
        methods: {

        },
        components: {
            Info
        }
    }
</script>
<style scoped lang="less">
    .about {
        display: flex;
        justify-content: space-between;

        .about-left {
            flex: 1;
            margin-right: 10px;
            box-sizing: border-box;
            padding: 10px;
            background-color: #fff;
                    -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
           -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
                box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
        }
    }
</style>
