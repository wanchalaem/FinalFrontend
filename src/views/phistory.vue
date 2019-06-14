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

    <!-- <pre>{{dateFind}}</pre> -->
    <v-container grid-list-xs>
      <!-- <v-text-field v-model="dateFind" type="date" @input="load()"></v-text-field> -->
      <center>
        <v-flex xs12 sm6 md4>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date"
            lazy transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="dateFind" type="date" label="คลิกเพื่อเลือกวันที่" prepend-icon="event" readonly
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker v-model="dateFind" @input="load()" no-title scrollable>
              <v-spacer></v-spacer>
              <!-- <v-btn flat color="primary" @click="menu = false">Cancel</v-btn> -->
              <v-btn flat color="primary" @click="$refs.menu.save(date)">ตกลง</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </center>

      <center>
        <div id="chart">
          <Chart />
        </div>
      </center>


      <v-toolbar color="primary" dark fab>
        <v-toolbar-title xs8>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template>
          <v-btn round @click="goToDefault()" color="orange">
            <h4>ไปที่วันล่าสุด</h4>
          </v-btn>
        </template>
      </v-toolbar>

      <!-- <v-btn color="success" @click="goToDefault()">ไปที่วันล่าสุด</v-btn> -->
      <!-- <pre>{{order_detail}}</pre> -->
      <v-data-table :items="order_detail" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <h4>{{ props.item.token_order }}</h4>
          </td>
          <td><img style="height:60px; width:60px!important; border-radius:200px;" :src="props.item.img" alt=""></td>
          <td>
            <h4>{{ props.item.name }}</h4>
          </td>
          <td>
            <h4>จำนวน : {{ props.item.amount }}</h4>
          </td>
          <td>
            <h4>ราคา : {{ props.item.total_price }} บาท</h4>
          </td>
          <!-- <td>{{ props.item.amount }}</td> -->
        </template>
      </v-data-table>
    </v-container>

  </v-content>
</template>

<script>
  import moment from 'moment';
  import Chart from '@/components/chart/chart';
  import {
    get
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
        dateFind: '',
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
      order_detail: get('order_detail/order_detail')
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {

      async goToDefault() {
        this.dateFind = moment().format('YYYY-MM-DD');
        await this.load();
      },
      /******* Methods default run ******/
      load: async function () {
        if (this.dateFind == '') {
          this.goToDefault();
        }
        await this.$store.dispatch('order_detail/getDataById', this.dateFind);
      },

    },
  }
</script>
