import axios from "@/axios"
import _ from 'lodash'
import moment from 'moment';

const state = {
    noti:0
}

const getters = {
    notiState: (state) => () => {
        state.noti =  1;
    },
    test: (state) => (a, b) => {
        return a + b;
    },

    dateTH: () => (date) => { 
        let dateConvert = moment();
        if(date != null){
            dateConvert = moment(date);
        } 
        let buddhist = dateConvert
            .locale("th")
            .add(543, "years")
            .format("DD/MM/YYYY");
        return buddhist;
    },
    notNull: (state) => (data)=> {
        if (data == null) {
            return 'ยังไม่มีข้อมูล';
        } else {
            return data;
        }
    },
  


}

const mutations = {


}

const actions = {

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}