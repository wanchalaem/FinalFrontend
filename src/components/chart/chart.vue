<template>
  <div class="example">
    <apexcharts width="800" height="350" type="bar" :options="chartOptions" :series="series">
    </apexcharts>
    
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import {
    get
  } from "vuex-pathify"

export default {
  name: 'Chart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [2019]
        }
      },
      series: [{
        name: 'ยอดขายประจำวัน',
        data: [30]
      }]
    }
  },
}
</script>
