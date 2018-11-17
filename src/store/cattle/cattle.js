import axios from "@/axios"
import _ from 'lodash'
import moment from 'moment';


const state = {
  cattles: null,
  cattleChoose:null,
  avatar: null,
  cattle:null
}

const getters = {
  getAge: (state) => (date) => {
    if (date) {
      let years = moment().diff(date, 'years');
      let month = moment().diff(date, 'month');
      month = month - (years * 12)
      let age = `${years} ปี ${month} เดือน`;
      return age
    } else {
      return "ไม่มีข้อมูล"
    }
  },
  
  getCattleType: (state) => (type) => {
      if(type == '020100'){return 'พ่อพันธุ์'}
      else if(type == '020200'){return 'แม่พันธุ์'}
      else if(type == '020300'){return 'โคขุน'}
      else if(type == '020400'){return 'โคแรกเกิด'}
      else{return 'ไม่รู้จัก'} 
  },

  getCattleChoose: (state) => (cattle) => {
    state.cattleChoose = cattle;
  },
  
  getCattleChoose2: (state) => (cattle) => {
    state.cattle = cattle;
  },

}

const mutations = {

  setCattle: function (state, data) {
    state.cattles = data
  },

  setAvatar: function (state, data) {
    state.avatar = data;
}


}

const actions = {
  async getCattle(context, params) {
    let result = await axios.get('/api/v1/farmer/farmer/' + params.farmerId + '/cattles', {
        params: params
      })
      .then(async (response) => {
        let u = response.data; 
        context.commit('setCattle', u.data);
        return result;
      })
      .catch((error) => {
        context.dispatch("error/setError", error.response.data, {
          root: true
        });
        return null;
      });

    return result
  },

  async createCattle(context, params) {
    let result = await axios.post(`/api/v1/farmer/farmer/${params.farmer_id}/cattles`, params)
      .then((response) => {
        alert('บันทึกข้อมูลสำเร็จ');
        return response.data
      })
      .catch((error) => {
        context.dispatch("error/setError", error.response.data, {
          root: true
        });
        return null
      });
    return result
  },

  updateCattle: async function (context, params) {
      delete params.update;
      delete params.fertilization;
      let result = await axios.put(`/api/v1/farmer/farmer/${params.farmer_id}/cattles/` + params.id, params)
        .then((response) => {
          alert('แก้ไขข้อมูลสำเร็จ');
          return response.data
        })
        .catch((error) => {
          //alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
          return null
        });
      return result
    },

    async removeCattle(context, params) {

        let result = await axios.delete(`/api/v1/farmer/farmer/${params.farmer_id}/cattles/` + params.id) //return True or False
          .then((response) => {
            alert('ลบข้อมูลสำเร็จ');
            return response.data
          })
          .catch((error) => {
            alert('เกิดข้อผิดพลาดในการลบข้อมูล');
            context.dispatch("error/setError", error.response.data, {
              root: true
            });
            return null
          });
        return result

      },

      async clearState(context) {
        context.commit('clearState')
      },

      async downloadAvatar(context) {
         let result = await axios.get('/api/v1/farmer/cattles/'+state.cattle.id+'/avatar',
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

     

}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}