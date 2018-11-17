<template>
  <div>
    <v-menu
      ref="menu1"
      :close-on-content-click="false"
      v-model="menu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        hide-details class="pb-1"
        slot="activator"
        v-model="showDate"
        :label="label"
        append-icon="event"
        @blur="parseDate(showDate)"
      ></v-text-field>
      <v-date-picker ref="datePicker" @change="$emit('change',date)" v-model="date" no-title @input="menu = false"
                     locale="th"/>
    </v-menu>
  </div>

</template>

<script>

    import moment from "moment"


    export default {
    name: "DatePicker",
    props: {
      valDate: {
        type: [String, Object],
      },
      label: {
        type: String,
        default: 'วัน/เดือน/ปี'
      },
      dateFormat: {
        type: String,
        default: "DD MMMM YYYY"
      }
    },
    data: () => ({
      showDate: null,
      date: null,
      menu: false,
    }),
    watch: {
      valDate: function (newVal, oldVal) {

        if (newVal) {
          if (newVal != oldVal) {
            this.showDate = this.formatDate(newVal)
          }
        } else {
          this.showDate = null
        }
      },
      menu: function () {
        if (this.$refs.datePicker) {
          if (this.valDate) {
            this.$refs.datePicker.tableDate = moment(this.valDate, "YYYY-MM-DD").format("YYYY-M")
          } else {
            this.$refs.datePicker.tableDate = moment().format("YYYY-M")
          }
        }


      }

    },
    async mounted() {
      this.date = this.valDate;
      this.showDate = this.formatDate(this.valDate)

    },
    methods: {
      parseDate(dateStr) {
        if (!dateStr) {
          this.date = null;
        } else {
          try {
            let [d, m, y] = dateStr.split('/');
            y = y - 543

            if (d != null && m != null && y != null) {
              let date = moment().year(y).month(m - 1).date(d);
              this.date = date.format("YYYY-MM-DD")
            } else {
              this.showDate = null;
            }
          } catch (e) {
            window.console.log('parseDate', e.stack);
            this.date = null;
          }

        }
        this.$emit('change', this.date);
      },
      formatDate(dateStr) {
        if (dateStr) {

          try {
            let date = new Date(dateStr)
            let options = {day: '2-digit', month: '2-digit', year: 'numeric'};
            return date.toLocaleDateString('th', options)
          } catch (e) {
            return null;
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
