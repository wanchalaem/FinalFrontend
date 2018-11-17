import axios from "@/axios"

export default {
  namespaced: true,
  state: {
    provinces: [],
    isLoaded : false,
  },
  mutations: {
    setProvinces: function (state,provinces) {
      state.provinces = provinces;
    },
    setIsLoaded : function(state,value) {
      state.isLoaded = value
    }
  },
  actions: {
    getProvinces: async function (context) {
        let result = await axios.get("/api/v1/provinces", {params: {all: true}})
        .then((response) => {
          context.commit("setProvinces", response.data);
          context.commit("setIsLoaded",true)
          return response.data;
        })
        .catch((error) => {
          window.console.error(error.stack)
          return null
        })
        return result
      }
  }
}
