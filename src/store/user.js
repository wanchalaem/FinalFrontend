import axios from '@/axios'
import _ from 'lodash'
const state = {
    user:[],

}
const getters = {

}

const mutations = {

}

const actions = {
async getData() {
    let load = axios.get('/api/users/')
    .then((r) => {
        state.user = r.data
    }).catch((e) => {
        console.log('Error Data');
});
    },
async storeRegisterData(context, params) {
    let load = await axios.post('/api/v1/register', params)
    .then((r) => {
        alert(r.data);
    }).catch((e) => {
        alert('Error Save');
    });
},

async storeLoginData(context, params) {
    let load = await axios.post('/api/v1/login', params)
    
    .then((r) => {
        let user = JSON.stringify(r.data);
        localStorage.setItem('token',user);
        location.reload();
    }).catch((e) => {
        alert('Error Save');
    });
},

async updateUserRegisterData(context, params) {
    let load = axios.put('/api/users/' + params.id, params)
        .then((r) => {
        alert('Update Data Success');
    }).catch((e) => {
        alert('Error Update');
    });
},

async updateUserLoginData(context, params) {
    let load = axios.put('/api/users/' + params.id, params)
        .then((r) => {
        alert('Update Data Success');
    }).catch((e) => {
        alert('Error Update');
    });
},

async destroyData(context, params) {
    let load = axios.delete('/api/users/' + params.id)
        .then((r) => {
        alert('Delete Data Success');
    }).catch((e) => {
        alert('Error Delete');
    });
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
    }