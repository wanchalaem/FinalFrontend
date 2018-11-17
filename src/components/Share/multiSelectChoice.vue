<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-select
        :items="choices"
        item-text="choice"
        item-value="id"
        :label="to"
        @change="onChange"
        v-model="select"
        multiple
        chips
      ></v-select>
    </v-flex>
    <v-flex v-for="(i,index) in form.selectObj" :key="index">
      <template v-if="i && i.options">
        <v-text-field
          v-if="i.options.has_text"
          @change="remarkChange"
          v-model="i.options.worming_type"
          label="อื่นๆ (ระบุ)"
        ></v-text-field>
      </template>

    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "multiSelectChoice",
    props: {
      to: String,
      value: [Array],
      remark: String,
    },
    data() {
      return {
        choices: [],
        select: [],
        form: {
          selectObj: []
        }
      }
    },
    async mounted() {
      this.choices = await this.$store.dispatch('choice/getChoicesByType', this.to)
      this.select = this.value ? this.value : [];
      this.form.selectObj = [];
      for (let i = 0; i < this.select.length; i++) {
        this.setSelectObj(this.select[i])
      }
    },
    watch: {
      value(newval, oldval) {
        if (!newval) {
          console.log('watch value :',newval)

          this.select = []
          this.form = {
            selectObj: []
          }

          this.choices.forEach((c)=>{
            if(c.options && c.options.has_text == true) {
              c.options.worming_type = null
            }
          })

        }
      }
    },
    methods: {
      compare: function (a, b) {
        console.log(a, b);
        return true
      },
      setSelectObj: function (ev) {
        let key = _.findKey(this.choices, {id: ev})
        this.form.selectObj.push(this.choices[key])

      },
      onChange(ev) {
        this.form.selectObj = [];
        for (let i = 0; i < ev.length; i++) {
          this.setSelectObj(ev[i])
        }

        this.$emit('input', this.form.selectObj);
      },
      remarkChange(ev) {
        this.$emit('input', this.form.selectObj);
      }
    }
  }
</script>

<style scoped>

</style>
