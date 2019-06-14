import axios from '@/axios'
import _ from 'lodash'
import Swal from 'sweetalert2';
const state = {
    product: [],
    productChoose:[],
    priceCalculate:0,
}
const getters = {

}

const mutations = {

}

const actions = {

async mapData(context,params){
    let check = _.filter(state.productChoose, {id:params.id})
        if(check.length == 0){
            state.productChoose.push(params);
        await actions.calculateData(); 
        Swal.fire(
            'เพิ่มสำเร็จ',
            '',
            'success'
          ) 
          
        }else{
            Swal.fire(
                'คุณเพิ่มรายการนี้แล้ว',
                '',
                'info'
              ) 
        } 
},

async calculateData(context,params){
    state.priceCalculate =0;
    for(let i=0; i< state.productChoose.length; i++){
        let num =   state.productChoose[i].price * state.productChoose[i].amount;
        console.log(num);
        state.priceCalculate+= num;
        console.log('count',state.priceCalculate)
    }
},


async getData() {
let load = await axios.get('/api/product/')
    .then((r) => {
        state.product = r.data
    }).catch((e) => {
        console.log('Error Data');
});
    },

async storeData(context, params) {
    let load = await axios.post('/api/product/', params)
    .then((r) => {
        Swal.fire(
            'เพิ่มข้อมูลสำเร็จ',
            '',
            'success'
          ) 
    }).catch((e) => {
        Swal.fire(
            'เพิ่มข้อมูลไม่สำเร็จ',
            '',
            'error'
          ) 
    });
    this.reload();
},

async updateData(context, params) {
    let load = await axios.put('/api/product/' + params.id, params)
        .then((r) => {
            Swal.fire(
                'แก้ไขข้อมูลสำเร็จ',
                '',
                'success'
              ) 
    }).catch((e) => {
        Swal.fire(
            'แก้ไขข้อมูลไม่สำเร็จ',
            '',
            'error'
          )
    });
    this.reload();
},

async destroyData(context, params) {
    let load = await axios.delete('/api/product/' + params.id)
        .then((r) => {
            Swal.fire(
                'ลบข้อมูลสำเร็จ',
                '',
                'success'
              )
    }).catch((e) => {
        Swal.fire(
            'ลบข้อมูลไม่สำเร็จ',
            '',
            'error'
          )
    });
    this.reload();
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
    }