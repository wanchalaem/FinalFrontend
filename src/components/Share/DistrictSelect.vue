<template>
    <div v-if="provinces">
        <v-select
                class="mb-3"
                :items="provinces"
                hide-details
                item-text="province_name" label="จังหวัด"
                v-model="selProvince"
                return-object
                :error-messages="error.house_province"
                @change="provinceChange"/>
        <v-select
                class="mb-3"
                :items="amphurs"
                hide-details
                return-object
                item-text="amphur_name" label="อำเภอ"
                :error-messages="error.house_amphur"
                v-model="selAmphur"
                @change="amphurChange">
        </v-select>
        <v-select
                class="mb-3"
                :items="districts"
                hide-details
                return-object
                v-model="selDistrict"
                :error-messages="error.house_district"
                item-text="district_name" label="ตำบล"
                @change="districtChange">
        </v-select>
    </div>

</template>
<script>
import { get } from "vuex-pathify";
import Base from "@/components/Base";

let defaultProvince = {
  province_id: 0,
  province_name: "กรุณาเลือก"
};
let defaultAmphur = {
  amphur_id: 0,
  amphur_name: "กรุณาเลือก"
};
let defaultDistrict = {
  district_id: 0,
  district_name: "กรุณาเลือก"
};
export default {
  name: "DistrictSelect",
  extends: Base,
  props: {
    valProvince: {
      type: Number,
      default: 0
    },
    valAmphur: {
      type: Number,
      default: 0
    },
    valDistrict: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    isProvinceLoaded: get("choice/province/isLoaded"),
    provinces: [defaultProvince],
    amphurs: [defaultAmphur],
    districts: [defaultDistrict],

    selProvince: defaultProvince,
    selAmphur: defaultAmphur,
    selDistrict: defaultDistrict
  }),
  async created() {
    if (this.isProvinceLoaded) {
        console.log(this.$store.state)
      let provinces =  this.$store.state.choice.province.provinces;
      this.provinces = [defaultProvince].concat(provinces);
    } else {
      let provinces = await this.$store.dispatch(
        "choice/province/getProvinces"
      );
      this.provinces = [defaultProvince].concat(provinces);
    }

    this.sync();
  },
  methods: {
    sync: function() {
      this.provinces.forEach(p => {
        if (p.province_id == this.valProvince) {
          this.selProvince = p;
          this.provinceChange(p);
        }
      });
      this.amphurs.forEach(a => {
        if (a.amphur_id == this.valAmphur) {
          this.selAmphur = a;
          this.amphurChange(a);
        }
      });

      this.districts.forEach(d => {
        if (d.district_id == this.valDistrict) {
          this.selDistrict = d;
          this.districtChange(d);
        }
      });
    },
    provinceChange: function(ev) {
      if (ev.amphurs) {
        this.amphurs = [defaultAmphur].concat(ev.amphurs);
      } else {
        this.amphurs = [defaultAmphur];
      }
      this.$emit("change", [ev, null, null]);
    },
    amphurChange: function(ev) {
      if (ev.districts) {
        this.districts = [defaultDistrict].concat(ev.districts);
      } else {
        this.districts = [defaultDistrict];
      }
      this.$emit("change", [this.selProvince, ev, null]);
    },
    districtChange: function(ev) {
      this.$emit("change", [this.selProvince, this.selAmphur, ev]);
    }
  }
};
</script>
