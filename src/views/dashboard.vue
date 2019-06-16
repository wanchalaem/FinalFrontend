<!----------Make By YourName---------------->
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

        <v-layout row wrap pdt-40>
            <v-flex xs12 sm6 md4>
                <v-card class="mx-auto" max-width="350">
                    <v-card dark flat>
                        <v-img src="https://f.ptcdn.info/740/028/000/1424725251-o.jpg"
                            gradient="to top, rgba(0,0,0,.60), rgba(0,0,0,.60)">
                            <v-container fill-height>
                                <v-layout align-center>
                                    <v-layout column justify-end>
                                        <div class="headline font-weight-light">
                                            <h4>รายการขายดี</h4>
                                        </div>
                                        <br>
                                        <div class="text font-weight-light" type="top">
                                            <h2>"{{topdownMenu.name}}"</h2>
                                        </div>
                                    </v-layout>
                                    <strong class="display-4 font-weight-regular mr-4"></strong>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-card>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md4>
                <v-card class="mx-auto" max-width="350">
                    <v-card dark flat>
                        <v-img src="https://f.ptcdn.info/740/028/000/1424725251-o.jpg"
                            gradient="to top, rgba(0,0,0,.60), rgba(0,0,0,.60)">
                            <v-container fill-height>
                                <v-layout align-center>
                                    <v-layout column justify-end>
                                        <div class="headline font-weight-light">
                                            <h4>รายการขายไม่ดี</h4>
                                        </div>
                                        <br>
                                        <div class="text font-weight-light" type="down">
                                            <h2>"{{downMenu.name}}"</h2>
                                        </div>
                                    </v-layout>
                                    <strong class="display-4 font-weight-regular mr-4"></strong>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-card>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md4>
                <v-card class="mx-auto" max-width="350">
                    <v-card dark flat>
                        <v-img src="https://f.ptcdn.info/740/028/000/1424725251-o.jpg"
                            gradient="to top, rgba(0,0,0,.60), rgba(0,0,0,.60)">
                            <v-container fill-height>
                                <v-layout align-center>
                                    <v-layout column justify-end>
                                        <div class="headline font-weight-light">
                                            <h4>จำนวนรายการอาหาร</h4>
                                        </div>
                                    </v-layout>
                                    <strong class="display-4 font-weight-regular mr-4">{{productCount}}</strong>
                                    <div class="text font-weight-light">
                                        <h2>เมนู</h2>
                                    </div>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-card>
                </v-card>
            </v-flex>

        </v-layout>


        <v-flex xs12 pd-20>
            <v-layout row wrap>
                <div id="chart">
                    <v-container grid-list-xs>
                        <h4>รายการขายวันนี้</h4>
                    </v-container>
                    <Chart />
                </div>

                <v-layout justify-center>
                    <v-flex xs12 sm10 md8 lg6>
                        <v-card ref="form">
                            <v-card-text>
                                <v-text-field label="อันดับ1" value="คะน้า" readonly></v-text-field>
                                <v-text-field label="อันดับ2" value="แกงเขียวหวาน" readonly></v-text-field>
                                <v-text-field label="อันดับ3" value="ต้มยำกุ้ง" readonly></v-text-field>
                                <v-text-field label="อันดับ4" value="พะแนง" readonly></v-text-field>
                                <v-text-field label="อันดับ5" value="กะเพรา" readonly></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>


            </v-layout>
        </v-flex>

    </v-content>
</template>

<script>
    import moment from 'moment';
    import Chart from '@/components/chart/chart1';
    import {
        get,
        sync,
        call
    } from "vuex-pathify"
    export default {
        name: 'chart',
        name: 'Root',
        /*-------------------------Load Component---------------------------------------*/
        components: {
            Chart
        },
        /*-------------------------DataVarible---------------------------------------*/
        data() {
            return {
                menu: false,
                
            };

        },
        /*-------------------------Run Methods when Start this Page------------------------------------------*/
        async mounted() {
            /**** Call loading methods*/
            await this.load();
        },
        /*-------------------------Run Methods when Start Routed------------------------------------------*/
        async beforeRouteEnter(to, from, next) {
            next()
        },
        /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
        computed: {
            product: get('product/product'),
            ...sync('product/*'),

        },
        /*-------------------------Methods------------------------------------------*/
        methods: {
            ...call('product/*'),

            
            /******* Methods default run ******/
            load: async function () {
                await this.countAllMenu();
                await this.topMenuTop();
                await this.lowMenu();
            },

        },
    }
</script>
