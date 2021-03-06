import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})
