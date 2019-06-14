import axios from '@/axios'
import _ from 'lodash'
import Swal from 'sweetalert2';
const state = {
    order: [],
    orderData:{
        token_order:'',
    },
    orderDetailData:{ 
        
    },
    orderCode:'',
}
const getters = {

}

const mutations = {

}

const actions = {
async getData() {
let load = await axios.get('/api/order/')
    .then((r) => {
        state.order = r.data
    }).catch((e) => {
        console.log('Error Data');
});
    },

async orderCodeGenerater(context,params){
    state.orderData.token_order = 'ORDER-'+Date.now();
},

async storeOrder(context, params) {
    await actions.orderCodeGenerater();
    let load = await axios.post('/api/order/', state.orderData)

},
async storeOrderDetail(context, params) {
    try {
        let token = state.orderData.token_order
        for(let i=0; i<params.length; i++){
            let storeOrder = {
                token_order : token,
                id_product: params[i].id,
                amount: params[i].amount,
                total_price: params[i].total_price,
            }
            let load = await axios.post('/api/order_detail/', storeOrder)
            .then((r) => {
               
            }).catch((e) => {

            });
        } 
    } catch (error) {
        
    } 
},


async updateData(context, params) {
    let load = await axios.put('/api/order/' + params.id, params)
        .then((r) => {
        alert('Update Data Success');
    }).catch((e) => {
        alert('Error Update');
    });
},

async destroyData(context, params) {
    let load = await axios.delete('/api/order/' + params.id)
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