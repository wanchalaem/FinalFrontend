import axios from '@/axios'
import _ from 'lodash'
import Swal from 'sweetalert2'; 
import order from './order'; 
const state =  {
    order_detail:[], 

    orderDetail: {
    }, 

}
const getters =  {

}

const mutations =  {

}

const actions =  {
async getData() {
let load = await axios.get('/api/order_detail/')
    .then((r) =>  {
        state.order_detail = r.data
    }).catch((e) =>  {
        console.log('Error Data'); 
}); 
    }, 

    
    async getDataById(context, params) {
        let load = await axios.post('/api/findById/',  {date:params})
            .then((r) =>  {
                state.order_detail = r.data
            }).catch((e) =>  {
                console.log('Error Data'); 
        }); 
            }, 


async updateData(context, params) {
    let load = axios.put('/api/order_detail/' + params.id, params)
        .then((r) =>  {
        alert('Update Data Success'); 
    }).catch((e) =>  {
        alert('Error Update'); 
    }); 
}, 

async destroyData(context, params) {
    let load = axios.delete('/api/order_detail/' + params.id)
        .then((r) =>  {
        alert('Delete Data Success'); 
    }).catch((e) =>  {
        alert('Error Delete'); 
    }); 
    }, 

}

export default {
    namespaced:true, 
    state, 
    getters, 
    mutations, 
    actions
    }