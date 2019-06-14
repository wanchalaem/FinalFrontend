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

        <v-container> 
            <v-toolbar color="primary" dark>
                <v-toolbar-title>
                     <h4 color="white">จัดการสินค้า</h4> 
                </v-toolbar-title>
                <v-spacer></v-spacer>
                    <template >
                        <v-btn round @click="dialog=true" color="orange"><h4>เพิ่มรายการ</h4></v-btn>
                    </template>
                
            </v-toolbar>
            
            
            <v-dialog v-model="dialog" scrollable max-width="500px" persistent transition="dialog-transition">
                <v-card class="container">
                    <v-title primary-title  class="text-xs-right">
                        <v-btn fab @click="reload()" color="red" dark small>
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-title> 
                    <image-uploader  :maxWidth="512" :quality="0.7" v-model="form.img"></image-uploader>
                    <!-- <v-text-field v-model="form.img" label="รูปภาพ"></v-text-field>  -->
                    <v-text-field v-model="form.name" label="รายการ"></v-text-field>
                    <v-text-field v-model="form.price" label="ราคา"></v-text-field> 
                    <!-- <v-text-field v-model="form.amount" label="amount"></v-text-field> -->
                     
                    <v-btn v-if="!updateBtn" @click="save()" color="green" dark><h4>บันทึก</h4></v-btn>
                    <v-btn v-if="updateBtn" @click="update()" color="green" dark><h4>บันทึก</h4></v-btn>
                </v-card>
            </v-dialog>


            <v-data-table :items="product" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props"> 
                    <!-- <td>{{ props.item.img }}</td>  -->
                    <td><img style="height:80px; width:80px!important; border-radius:200px;" :src="props.item.img" alt=""></td>
                    <td><h4>{{ props.item.name }}</h4></td>
                    <td><h4>{{ props.item.price }} บาท</h4></td>
                    <!-- <td>{{ props.item.amount }}</td> --> 
                    <td>
                        <v-btn @click="updateOpen(props.item)" fab color="green" dark left outline small class="text-xs-right"><h4>แก้ไข</h4></v-btn>
                    </td>
                    <td>
                        <v-btn @click="remove(props.item)" fab color="red" dark left outline small class="text-xs-right"><h4>ลบ</h4></v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-container> 
    </v-content>
</template>

<script> 
    import {
        get
    } from "vuex-pathify"
    export default {
        name: 'Root',
        /*-------------------------Load Component---------------------------------------*/
        components: {

        },
        /*-------------------------DataVarible---------------------------------------*/
        data() {
            return {
                form: { 
                },
                dialog: false, 
                updateBtn: false,

            };
        },
        /*-------------------------Run Methods when Start this Page------------------------------------------*/
        async mounted() {
            /**** Call loading methods*/
          await  this.load();
        },
        /*-------------------------Run Methods when Start Routed------------------------------------------*/
        async beforeRouteEnter(to, from, next) {
            next()
        },
        /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
        computed: {
            product: get('product/product')
        },
        /*-------------------------Methods------------------------------------------*/
        methods: {


            save: async function () {
                console.log(this.form);
                this.$store.dispatch('product/storeData', this.form);
                this.reload();
            },
            remove: async function (params) {
                this.$store.dispatch('product/destroyData', params);
                this.reload();
            },
            updateOpen(params) {
                this.form = params;
                this.updateBtn = true;
                this.dialog = true;
            },
            update: async function () {
                this.$store.dispatch('product/updateData', this.form);
                this.reload();
            },

            reload() {
                this.dialog = false;
                this.load();
                this.form = {};
            },
            /******* Methods default run ******/
            load: async function () {
               await this.$store.dispatch('product/getData');
                
            }
        },
    }
</script>