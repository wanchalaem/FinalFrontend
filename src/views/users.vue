<template>
    <v-content>
        <v-toolbar>
            <v-layout row wrap>
            </v-layout>
            <v-toolbar-items>
                <v-btn flat @click="$router.push('/')">
                    <h4>หน้าหลัก</h4>
                </v-btn>
                <v-btn flat @click="$router.push('/pedit')">
                    <h4>จัดการสินค้า</h4>
                </v-btn>
                <v-btn flat @click="$router.push('/phistory')">
                    <h4>ประวัติ</h4>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

      
    </v-content>
</template>

<script> 
    import {
        get
    } from "vuex-pathify"
    export default {
         
    }
</script>