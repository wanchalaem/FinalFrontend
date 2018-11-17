import axios from "@/axios"

const state = {
    loginForm : {}
}

const getters = {}

const mutations = {
    resetLoginForm : function(state){
        state.loginForm = {}
    }
}

const actions = {

    login: async ({commit,state}) => {
        window.console.log("user/login")
        let result = await axios.post('/api/v1/farmer/login', state.loginForm)
            .then((r) => {
                window.console.log("login/login", r.data)
                let storage = window.localStorage;
                storage.setItem("token", r.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${storage.getItem('token')}`;
                window.console.log('login/login', 'finish')
                return r.data;
            }).catch((error) => {
                window.console.error(error.stack)
            })
        commit("resetLoginForm")
        return result
    },
    logout : async (context) =>{
        localStorage.removeItem("token")
        context.dispatch("farmer/clearState",{},{root:true})
    }

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
