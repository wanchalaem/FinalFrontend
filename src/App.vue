<template>
    <v-app id="app"> 
        <router-view/>
    </v-app>
</template>

<script>
    import axios from "@/axios"
  
    export default {
        name: "App",
        components: {},
        data: () => ({
            token:localStorage.getItem('token')
        }),
        methods: {
            showLoad: async function () {
              
            },
            dismissLoad: async function () {
 
            }
        },
        async mounted() {
            if(this.token){
                axios.defaults.headers.common['Authorization'] = this.token.api_token;
            } 
        },
        created() {
            
            

           

        },
        beforeDestroy() { 
        }
    }
</script>
