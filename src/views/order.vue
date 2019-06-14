<!----------Make By YourName---------------->
<template>
    <div> 

        <v-toolbar class=" ">
            <v-spacer></v-spacer>
            <v-flex xs4>
                <v-text-field name="name" label="ค้นหา" id="id"></v-text-field>
            </v-flex>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn color="success">login</v-btn>
        </v-toolbar>

        <v-container>
            <v-layout>
                <v-flex xs12 >
                    <v-card>
                        <v-card-actions>
                            <h1 justify-center style="width:100%;"  color="orange" readonly>ชื่อร้าน : {{shopChoose.name_store}}</h1>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout>
                <v-flex xs12>
                    <v-card>
                        <v-card-actions>
                            <h1 style="width:100%;" flat color="orange" readonly>รายการ</h1>
                        </v-card-actions>

                        <v-card-title v-for="data,m in menu" v-if="data.id==idAccount">

                            <h2 class="pd-6">{{data.name_menu}}</h2>
                            
                            <v-spacer></v-spacer>
                            <h2 class="pdr-14">  {{data.price}} บาท</h2>
                            <!-- <v-btn icon class="mr-0" color="red" dark>
                                <v-icon>mdi-minus-box</v-icon>
                            </v-btn>
                            <h2 class="pd-10">1</h2>
                            <v-btn icon class="mr-0" color="green" dark>
                                <v-icon>mdi-plus-box</v-icon>
                            </v-btn> -->
                        </v-card-title>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-xs>
            <v-layout row wrap v-for="data,m in menu" v-if="data.id==idAccount">
                <v-toolbar color=" ">
                    <v-spacer></v-spacer>
                    <h2>ราคาทั้งหมด : {{data.price}}</h2>
                </v-toolbar>
            </v-layout>
        </v-container>

        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="pd-60" v-for="data,u in user" v-if="data.id==1">
                        <!-- <v-text-field label="ชื่อเล่น"></v-text-field>
                        <v-text-field label="เบอร์โทร"></v-text-field>
                        <v-text-field label="ที่อยู่"></v-text-field> -->
                        <v-text-field v-model="data.name" label="ชื่อ"></v-text-field>
                        <v-text-field v-model="data.tel" label="เบอร์"></v-text-field>
                        <v-text-field v-model="data.address" label="ที่อยู่"></v-text-field> 

                         <v-select v-model="form.delivery" :items="items" label="รับที่ร้าน หรือ ส่งถึงที่"></v-select>

                        <!-- <v-radio-group v-model="radios" :mandatory="false" align-center>
                            <v-radio label="รับที่ร้าน" value="รับที่ร้าน"></v-radio>
                            <v-radio label="ส่งถึงที่" value="ส่งถึงที่"></v-radio>
                        </v-radio-group>
                        <h2>{{ radios || 'null' }}</h2> -->
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container> 

        <v-container>
                <v-layout v-for="data,m in menu" v-if="data.id==idAccount">
                    <v-flex xs12 @click="$router.push({path:'/statement', query:{id:data.id}})"> 
                        <v-btn style="width:100%;" color="success" 
                        large v-if="!updateBtn" @click="save()">บันทึกข้อมูล</v-btn>
                        <v-btn style="width:100%;" color="success" 
                        large v-if="updateBtn" @click="update()">บันทึกข้อมูล</v-btn>
                    </v-flex>
                </v-layout>
            </v-container> 

    </div>
</template>

<script>
import {
        get
    } from "vuex-pathify";

    export default {

        name: 'home',

        /*-------------------------Load Component---------------------------------------*/

        components: {

        },

        /*-------------------------Set Component---------------------------------------*/

        props: {
 
        },

        /*-------------------------DataVarible---------------------------------------*/

        data() {

            return {
                form: {},
                // page: 1,
                items: ['รับที่ร้าน', 'ส่งถึงที่'],
                // radios: 'รับที่ร้าน',
                idAccount: "",
                dialog: false,
                updateBtn: false,
            };

        },

        /*-------------------------Run Methods when Start this Page------------------------------------------*/

        async mounted() {

            /**** Call loading methods*/

            this.load();

        },

        /*-------------------------Run Methods when Start Routed------------------------------------------*/

        async beforeRouteEnter(to, from, next) {

            next()

        },

        /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/

        computed: {
            menu: get('menu/menu'),
            user: get('user/user'), 
            order: get('order/order'), 
            shopChoose: get('shop/shopChoose'),
        },

        /*-------------------------Methods------------------------------------------*/

        methods: { 
            save: async function () {
                console.log(this.form);
                this.$store.dispatch('order/storeData', this.form); 
                this.reload();
                
                this.$router.push('/statement');
            },
            reload() {
                this.dialog = false;
                this.load();
                this.form = {};
            },

            /******* Methods default run ******/

            load: async function () {
                this.$store.dispatch('shop/getData'); 
                this.$store.dispatch('menu/getData'); 
                this.$store.dispatch('user/getData'); 
                this.$store.dispatch('order/getData'); 

                this.myParam = this.$route.query;
                this.idAccount = this.myParam.id;
                console.log("table" + this.idAccount);
            }

        },

    }
</script>