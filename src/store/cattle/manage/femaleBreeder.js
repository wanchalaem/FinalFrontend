import axios from "@/axios"

const state = {
  step: 0,
  forms: {},
  update:0,
}

const getters = {

  setStep: (state) => (step) => {
    state.step = step;
  },
  setUpdate: (state) => (update) => {
    state.update = update;
  },
  setForms: (state) => (forms) => {
    state.forms = forms;
    console.log(state.forms);
  }


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