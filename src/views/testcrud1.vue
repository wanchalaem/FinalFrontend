<!----------Make By YourName---------------->
<template>
    <v-content>
        <v-container>
            <v-btn @click="dialog=true" color="boc-green">Add Data</v-btn>
            <v-dialog v-model="dialog" scrollable max-width="500px" persistent transition="dialog-transition">
                <v-card class="container">
                    <v-title primary-title>
                        <v-btn @click="reload()">Close</v-btn>
                    </v-title>
                    <v-text-field v-model="form.name" label="name"></v-text-field>
                    <v-text-field v-model="form.price" label="price"></v-text-field>
                    <!-- <v-text-field v-model="form.amount" label="amount"></v-text-field> -->

                    <image-uploader :maxWidth="512" :quality="0.7" v-model="form.img"></image-uploader>
                    <v-btn v-if="!updateBtn" @click="save()">Save</v-btn>
                    <v-btn v-if="updateBtn" @click="update()">Save</v-btn>
                </v-card>
            </v-dialog>


            <v-data-table :items="testcrud1" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.price }}</td>
                    <!-- <td>{{ props.item.amount }}</td> -->
                    <td><img style="height:50px; weight:50px;" :src="props.item.img" alt=""></td>
                    <td>
                        <v-btn @click="updateOpen(props.item)" class="box-blue">Update</v-btn>
                    </td>
                    <td>
                        <v-btn @click="remove(props.item)" class="box-red">Delete</v-btn>
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
                itemm: ['อาหาร', 'เครื่องดื่ม'],

                items: ['มี', 'ไม่มี'],

                dialog: false,

                updateBtn: false,

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
            testcrud1: get('testcrud1/testcrud1')
        },
        /*-------------------------Methods------------------------------------------*/
        methods: {
            save: async function () {
                console.log(this.form);
                this.$store.dispatch('testcrud1/storeData', this.form);
                this.reload();
            },
            remove: async function (params) {
                this.$store.dispatch('testcrud1/destroyData', params);
                this.reload();
            },
            updateOpen(params) {
                this.form = params;
                this.updateBtn = true;
                this.dialog = true;
            },
            update: async function () {
                this.$store.dispatch('testcrud1/updateData', this.form);
                this.reload();
            },

            reload() {
                this.dialog = false;
                this.load();
                this.form = {};
            },
            /******* Methods default run ******/
            load: async function () {
                await this.$store.dispatch('testcrud1/getData');

            }
        },
    }
</script>