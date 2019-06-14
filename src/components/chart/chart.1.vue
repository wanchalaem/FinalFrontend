<template>
  <div class="example">
    <apexcharts width="500" height="350" type="bar" :options="chartOptions" :series="series">
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
          categories: [2019, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },
}
</script>
