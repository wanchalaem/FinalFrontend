import axios from "@/axios"
import _ from 'lodash'

function replaceEmptyWithNull(x) {
    _.forEach(x, function (value, key) {
        if (value == '') {
            x[key] = null
        }
    });
}

const state = {
    farmer: null,
    farm: null,
    avatar: null,
}

const getters = {}

const mutations = {
    clearState: function (state) {
        state.farmer = null
        state.farm = null
        state.avatar = null
    },

    setFarmer: function (state, data) {
        state.farmer = data
    },

    setFarm: function (state, data) {
        state.farm = data
        try {
            let lat = parseFloat((state.farm.farm_lat))
            let lng = parseFloat((state.farm.farm_lng))
            state.farm.farm_lat = isNaN(lat) ? null : lat
            state.farm.farm_lng = isNaN(lng) ? null : lng
        } catch (e) {
            window.console.error(e.stack)
        }

    },

    setAvatar: function (state, data) {
        state.avatar = data;
    }
}

const actions = {

    async getFarmer(context) {
        let result = await axios.get('/api/v1/farmer/user')
            .then(async (response) => {
                let farmer = response.data
                let farm;
                if (farmer.farm == null) {
                    farm = await context.dispatch("getFarmForm", {id: farmer.id})
                    farmer.farm = farm
                    farmer.farm.farmer_id = farmer.id
                } else {
                    farm = farmer.farm
                    context.commit("setFarm", farm)
                }
                context.commit("setFarmer", farmer)
                return farmer;
            }).catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null;
            });
        return result
    },
    async updateFarmer(context, params) {
        replaceEmptyWithNull(params);
        let result = await axios.put(`/api/v1/farmer/farmers/${params.id}`, params)
            .then(async (response) => {
                let farmer = response.data
                let farm;
                if (farmer.farm == null) {
                    farm = await context.dispatch("getFarmForm", {id: farmer.id})
                    farmer.farm = farm
                } else {
                    farm = farmer.farm
                    context.commit("setFarm", farm)
                }
                context.commit("setFarmer", farmer)
                return farmer;
            }).catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
            })
        return result
    },
    async updateFarm(context, params) {
        replaceEmptyWithNull(params);
        if (params.id) {
            let result = await axios.put(`/api/v1/farmer/farmers/${context.state.farmer.id}/farms/${params.id}`, params)
                .then(async (response) => {
                    context.commit("setFarm", response.data);
                    return response.data
                })
                .catch((error) => {
                    window.console.log(error.stack);
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
            return result
        } else {
            let result = await axios.post(`/api/v1/farmer/farmers/${context.state.farmer.id}/farms`, params)
                .then(async (response) => {
                    window.console.log('success', response.data);
                    context.commit("setFarm", response.data)
                    return response.data;
                })
                .catch((error) => {
                    window.console.log(error.stack)
                    return null
                })
            return result
        }
    },

    async downloadAvatar(context) {
        let result = await axios.get(`/api/v1/farmer/farmers/${context.state.farmer.id}/avatar`,
            {
                responseType: 'arraybuffer'
            })
            .then((response) => {

                if (response.status != 204) {
                    let image = Buffer.from(response.data, 'binary').toString('base64')
                    context.commit('setAvatar', `data:image/*;base64,${image}`)
                } else {
                    context.commit('setAvatar', null)

                }
            })
            .catch((error) => {
                context.dispatch("error/setError", error.response.data, {root: true});
                return null
            })

        return result
    },

    async uploadAvatar(context, dataUrl) {
        let url = dataUrl

        let result = await
            axios.post(`/api/v1/farmer/farmers/${context.state.farmer.id}/avatar`, {img: url})
                .then((response) => {
                    context.commit("setAvatar", dataUrl)
                    return response.data
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        return result
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
