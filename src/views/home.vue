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
                <v-btn v-if="!token" flat @click="dialog=true">
                    <h4>เข้าสู่ระบบ</h4>
                </v-btn>
                <v-btn v-if="token" flat @click="$router.push('/logout')">
                    <h4>ออกจากระบบ</h4>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-dialog v-model="dialog" scrollable max-width="500px" persistent transition="dialog-transition">
            <v-card class="container">
                <!-- <v-toolbar primary-title class="text-xs-right">
                    <v-btn fab @click="reload()" color="red" dark small>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar> -->
                <v-text-field v-model="form.email" label="email"></v-text-field>
                <v-text-field v-model="form.password" label="รหัสผ่าน" type="password"></v-text-field>
                <v-btn v-if="!updateBtn" @click="loginMember()" color="green" dark round>
                    <h4>เข้าสู่ระบบ</h4>
                </v-btn>
                <v-btn v-if="updateBtn" @click="updateLoginMember()" color="green" dark round>
                    <h4>เข้าสู่ระบบ</h4>
                </v-btn>
                <v-btn @click="dialog1=true" color="primary" dark round>
                    <h4>สมัครสมาชิก</h4>
                </v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog1" scrollable max-width="500px" persistent transition="dialog-transition">
            <v-card class="container">
                <v-toolbar primary-title class="text-xs-right">
                    <v-btn fab @click="closeRegisterMember()" color="red" dark small>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-text-field v-model="form.name" label="ชื่อ"></v-text-field>
                <v-text-field v-model="form.password" label="รหัสผ่าน" type="password"></v-text-field>
                <v-text-field v-model="form.email" label="email"></v-text-field>
                <v-btn v-if="!updateBtn" @click="saveMember()" color="green" dark>
                    <h4>สมัครสมาชิก</h4>
                </v-btn>
                <v-btn v-if="updateBtn" @click="updateMember()" color="green" dark>
                    <h4>สมัครสมาชิก</h4>
                </v-btn>
            </v-card>
        </v-dialog>


        <v-layout row wrap>
            <v-flex xs8 pd-10>
                <v-toolbar color="blue " dark>
                    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                    <v-toolbar-title>

                        <h4>รายการ</h4>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card>
                    <v-container fluid grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs2 v-for="data,p in product" :key="p">
                                <v-card>
                                    <img style="height:100px; width:132px" :src="data.img" />
                                    <v-card-title primary-title>
                                        <div>
                                            <h4>{{data.name}}</h4>
                                            <h4>ราคา {{data.price}} บาท</h4>
                                        </div>
                                    </v-card-title>

                                    <div>
                                        <number-input @change="calculateData()&&checkNumber(data.amount)"
                                            v-model.number="data.amount" center placeholder="จำนวน" size="small"
                                            :inputtable="false" :value="1" :min="1" :max="10" inline controls>
                                        </number-input>
                                    </div>

                                    <v-card-actions>
                                        <v-btn dark block color="amber darken-2" @click="mapData(data)">
                                            <h5>เพิ่ม</h5>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>

            <v-flex xs4 pd-10>
                <v-toolbar color="blue " dark>
                    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                    <v-toolbar-title>
                        <!-- <h5>รายการขาย</h5> -->
                        <v-menu pdt-10 ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40"
                            :return-value.sync="date" lazy transition="scale-transition" offset-y full-width
                            min-width="290px">
                            <template v-slot:activator="{ off }">
                                <v-text-field v-model="date" label="รายการขายประจำวันที่" prepend-icon="event" readonly
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-data-table :items="productChoose" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <!-- <td>{{ props.item.img }}</td>  -->
                        <td><img style="height:50px; width:50px!important; border-radius:50px;" :src="props.item.img"
                                alt=""></td>
                        <h4>{{ props.item.name }}</h4>
                        <h4>จำนวน : {{ props.item.amount }}</h4>
                        <td>
                            <h4>ราคา : {{  priceCal(props.item.price*props.item.amount,props.index) }} บาท</h4>
                        </td>

                        <td>
                            <!-- <v-icon small @click="deleteItem(props.item)">
                                delete
                            </v-icon> -->
                            <v-btn @click="deleteItem(props.item)" fab color="red" dark left outline small
                                class="text-xs-right">
                                <h4>ลบ</h4>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>

                <v-toolbar color="blue" dark>
                    <v-toolbar-title>
                        <h6>รายการทั้งหมด : {{productChoose.length}}</h6>
                        <h6>ราคาทั้งหมด : {{priceCalculate}}</h6>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="save()" round>
                        <h4>บันทึก</h4>
                    </v-btn>
                    <!-- <v-btn v-if="!updateBtn" @click="save()" color="green" dark><h4>บันทึก</h4></v-btn>
                    <v-btn v-if="updateBtn" @click="update()" color="green" dark><h4>บันทึก</h4></v-btn> -->
                </v-toolbar>

            </v-flex>

        </v-layout>

    </v-content>
</template>

<script>
    import navbar from '@/components/navbar/navbar';
    import Swal from 'sweetalert2';
    import {
        get,
        sync,
        call
    } from "vuex-pathify"
    export default {
        name: 'Root',
        /*-------------------------Load Component---------------------------------------*/
        components: {

        },
        /*-------------------------DataVarible---------------------------------------*/
        data() {
            return {
                // dateFind: '',
                date: new Date().toLocaleString().substr(0, 10),
                menu: false,
                form: {},
                dialog: false,
                dialog1: false,
                updateBtn: false,
                allPrice: 0,
                token: localStorage.getItem('token')
                // value:1,
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
            ...sync('order/*'),
            ...sync('user/*')
        },
        /*-------------------------Methods------------------------------------------*/
        methods: { 

            ...call('user/*'),
            ...call('order/*'),
            ...call('order_detail/*'),
            countAllPrice(data) {
                this.allPrice += data;
                return data;
            },
            checkNumber(val) {
                if (val > 9) {
                    Swal.fire('เลือกได้มากสุด 10 ชิ้น', ' ', 'info');
                }
            },
            deleteItem(item) {
                const index = this.productChoose.indexOf(item)
                Swal.fire('เอาออกจากรายการสินค้า', '', 'info') && this.productChoose.splice(index, 1)
                this.calculateData();
            },

            async save() {
                let check = false;
                let swalWithBootstrapButtons = Swal.fire({
                    title: 'คุณแน่ใจใช่หรือไม่',
                    text: "",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                    reverseButtons: false
                }).then(async (result) => {
                    if (result.value) {
                        await this.orderCodeGenerater();
                        await this.storeOrder();
                        await this.storeOrderDetail(this.productChoose);
                        // await this.$router.push('/phistory');
                        await location.reload();
                    }
                })
            },

            saveMember: async function () {
                console.log(this.form);
                this.$store.dispatch('user/storeRegisterData', this.form);
                this.dialog1 = false;
                this.load();
                this.form = {};
            },
            updateMember: async function () {
                this.$store.dispatch('user/updateUserRegisterData', this.form);
                this.dialog1 = false;
                this.load();
                this.form = {};
            },

            loginMember: async function () {
                console.log(this.form);
                this.$store.dispatch('user/storeLoginData', this.form);
                this.reload();
            },
            updateLoginMember: async function () {
                this.$store.dispatch('user/updateUserLoginData', this.form);
                this.reload();
            },


            ...call('product/*'),

            reload() {
                this.dialog = false;
                this.load();
                this.form = {};
            },
            closeRegisterMember() {
                this.dialog1 = false;
                this.load();
                this.form = {};
            },

            priceCal(data, index) {
                this.productChoose[index].total_price = data;
                return this.productChoose[index].total_price;
            },

            async setDataPrice(index, data) {

            },

            /******* Methods default run ******/
            load: async function () {
                if (this.token) {
                    await this.$store.dispatch('product/getData');
                } else {
                    this.dialog = true;
                }

            },

        },
    }
</script>