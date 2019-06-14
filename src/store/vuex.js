import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
 

 

import TestCrud1 from './testcrud1'; 

// import Store from './store'; 
import User from './user'; 
import Order from './order';
import Order_deatil from './order_detail';

import Product from './product';

Vue.use(Vuex)

const modules = {

    testcrud1:TestCrud1,

    // store:Store, 
    
    user:User, 
    order:Order,
    order_detail:Order_deatil, 
    product:Product,

}

export default new Vuex.Store({
    plugins: [pathify.plugin],
    modules : modules
})
