import Vue from 'vue'
import Vuex from 'vuex'
import notebooks from "./notebooks"
import note from "./note"
import user from "./user"
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    notebooks,
    note,
    user
  }
})
