import Vue from 'vue'
import Vuex from 'vuex'
import state from './states.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters'
Vue.use( Vuex )
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})