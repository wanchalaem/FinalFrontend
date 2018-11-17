import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import loading from './loading';
import error from "./error"

Vue.use(Vuex)

const modules = {
    loading : loading,
  
    error : error,
    
}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
