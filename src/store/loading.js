
const state = {
    isLoad : false,
    stack : 0
}

const getters = {}

const mutations = {
    setLoad : (state,value) => {
        state.isLoad = value
    }
}

const actions = {
    setLoad : async (context,value) => {
        context.commit("setLoad",value)
    },

    showLoad : async (context) => {
        context.state.stack+=1
        context.commit("setLoad",true)
    },

    dismissLoad : async (context) => {
        setTimeout(
            () => {
               context.state.stack -= 1
               if(context.state.stack == 0) {
                   context.commit("setLoad",false)
               }
            },
            100
        )
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
