<template>
    <v-app id="app">
        <loading/>
        <router-view/>
    </v-app>
</template>

<script>
    import axios from "@/axios"
    import Loading from "./components/Share/Loading";

    export default {
        name: "App",
        components: {Loading},
        data: () => ({}),
        methods: {
            showLoad: async function () {
                await this.$store.dispatch("loading/showLoad")
            },
            dismissLoad: async function () {

                await this.$store.dispatch("loading/dismissLoad")
            }
        },
        async mounted() {
  
        },
        created() {

            this.$on("before-request", this.showLoad);
            this.$on("request-error", this.dismissLoad);
            this.$on("after-response", this.dismissLoad);
            this.$on("response-error", this.dismissLoad);

           

        },
        beforeDestroy() {
            this.$off("before-request", this.showSpinner);
            this.$off("request-error", this.hideSpinner);
            this.$off("after-response", this.hideSpinner);
            this.$off("response-error", this.hideSpinner);
        }
    }
</script>
