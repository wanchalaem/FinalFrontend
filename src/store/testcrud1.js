import axios from '@/axios'
import _ from 'lodash'
const state = {
    testcrud1 :[],
}
const getters = {

}

const mutations = {

}

const actions = {
async getData() {
let load = axios.get('/api/product/')
    .then((r) => {
        state.testcrud1 = r.data
    }).catch((e) => {
        console.log('Error Data');
});
    },
async storeData(context, params) {
    let load = axios.post('/api/product/', params)
    .then((r) => {
        alert('Save Data Success');
    }).catch((e) => {
        alert('Error Save');
    });
},

async updateData(context, params) {
    let load = axios.put('/api/product/' + params.id, params)
        .then((r) => {
        alert('Update Data Success');
    }).catch((e) => {
        alert('Error Update');
    });
},

async destroyData(context, params) {
    let load = axios.delete('/api/product/' + params.id)
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