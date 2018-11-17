import axios from "@/axios"
import _ from 'lodash' 
 

const state = {
    ActionBar:{}, 
}

const getters = {
   
}

const mutations = {

    setActionBar: function (state, data) {
        state.ActionBar = data
    },
 
 
}

const actions = { 
    async defaultActionBar(context,params) { 
        let title = 'Cattle Farmer';
        if(params){
            title = params;
        }
         state.ActionBar = {
             bg:'box-purple', 
             title:title,
             iconLeft:'mdi-arrow-left',
             
             btnFirst:false,
             iconFirst:'mdi-menu',
             pathFirst:'',

             btnSecond:false,
             iconSecond:'mdi-menu',
             pathSecond:'',

         }
     },

     async defaultActionBarB(context,params) { 
        let title = 'Cattle Farmer';
        if(params){
            title = params;
        }
         state.ActionBar = {
             bg:'box-purple', 
             title:title,
             iconLeft:'mdi-arrow-left',
             
             btnFirst:false,
             iconFirst:'mdi-menu',
             pathFirst:'',

             btnSecond:false,
             iconSecond:'mdi-menu',
             pathSecond:'',

         }
     },

     async customActionBar(context,params) { 
        context.commit('setActionBar',params)
    },
   
   

    async clearState(context){
        context.commit('clearState')
    }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
