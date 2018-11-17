import axios from "@/axios"
import _ from 'lodash'
import province from "./province"
const modules = {
    province : province
}

export default {
    namespaced: true,
    modules : modules,
    state: {
        bredingLoad: false,
        choices: null,
    },
    mutations: {
        setChoices: function (state, c) {
            state.choices = _.groupBy(c, (o) => {
                return o.parent_id
            });
        }
    },
    actions: {
        load: async function (context) {
            let result = await axios.get("/api/v1/farmer/cattle-choices",
                {params: {all: true}})
                .then((response) => {
                    let choices = response.data
                    return choices;
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
            context.commit("setChoices", result);

        },
        getChoices: async function (context) {
            if (!context.state.choices) {
                await context.dispatch("load")
            }
            return context.state.choices;
        }
        , getChoicesByType: async function (context, type) {
            if (type == "พันธุ์โค") {
                return await context.dispatch('getBreedTypes')
            } else {
                if (context.state.choices == null) {
                    await context.dispatch('getChoices');
                }
                let parent = context.state.choices[null]
                let key = _.findKey(parent, {choice: type})
                if (parent[key]) {
                    return context.state.choices[parent[key].id];
                }
            }
        },
        getBreedTypes: async function (context) {
            if (context.state.choices == null) {
                await context.dispatch('getChoices');
            }
            let c = context.state.choices;
            let master = context.state.choices[null]
            let key = _.findKey(master, {choice: "พันธุ์โค"})
            let parent = context.state.choices[null][key]
            parent.children = c[parent.id]
            _.each(parent.children, function (p) {
                p.children = c[p.id]
            });
            let join = [];
            _.each(parent.children, function (p) {
                if (p.children.length > 0) {
                    _.each(p.children, function (c) {
                        let len_c = c.choice.split(' - ').length
                        if (len_c < 2) {
                            c.choice = `${p.choice} - ${c.choice}`
                        }
                        join.push(c)
                    })
                } else {
                    window.console.log(p)
                    join.push(p)
                }
            })
            context.state.bredingLoad = true
            return join;
        }
    },
    getters: {
        getBreedByCode: (state) => (choice_id) => {
            if (choice_id) {
                let c_id = choice_id.substring(0, 4);
                c_id = c_id + "00";
                let master = _.get(state.choices, c_id);
                let child = _.find(master, {id: choice_id});
                if (child) {
                    let l = child.choice
                    return l
                }
            }
            return 'w,j,u'
        },
        getChoiceByCode: (state) => (choice_id) => {
            if (choice_id) {
                let c_id = choice_id.substring(0, 2);
                c_id = c_id + "0000";
                let master = _.get(state.choices, c_id);
                let child = _.find(master, {id: choice_id});
                if (child) {
                    return child.choice
                }
            }
            return null
        },
        getThaiFormatDate: () => (date) => {
            if (date) {
                let options = {year: 'numeric', month: 'long', day: 'numeric'};
                let dateformat = Intl.DateTimeFormat('th', options).format(new Date(date))

                return dateformat
            }
        }
    }

}
