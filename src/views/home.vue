<!----------Make By YourName---------------->
<template>
    <div>
    
        <v-toolbar class="box-blue">
    
            <v-toolbar-side-icon></v-toolbar-side-icon>
    
            <v-toolbar-title>Title</v-toolbar-title>
    
            <v-spacer></v-spacer>
    
            <v-toolbar-items class="hidden-sm-and-down">
    
                <v-btn flat>Link One</v-btn>
    
                <v-btn flat>Link Two</v-btn>
    
                <v-btn flat>Link Three</v-btn>
    
            </v-toolbar-items>
    
        </v-toolbar>
    
    
    
        <v-container>
    
            <h1>Hello อีแฮมหน้าเฮี่ย</h1>
    
            <v-btn @click="$router.push('/xx')" class="box-red shadow" dark round>ฆ่าอีแฮม</v-btn>
    
        </v-container>
    </div>
</template>

<script>
    export default {
    
        name: 'home',
    
        /*-------------------------Load Component---------------------------------------*/
    
        components: {
    
    
    
        },
    
        /*-------------------------Set Component---------------------------------------*/
    
        props: {
    
    
    
        },
    
        /*-------------------------DataVarible---------------------------------------*/
    
        data() {
    
            return {
    
    
    
            };
    
        },
    
        /*-------------------------Run Methods when Start this Page------------------------------------------*/
    
        async mounted() {
    
            /**** Call loading methods*/
    
            this.load();
    
        },
    
        /*-------------------------Run Methods when Start Routed------------------------------------------*/
    
        async beforeRouteEnter(to, from, next) {
    
            next()
    
        },
    
        /*-------------------------Vuex Methods and Couputed Methods------------------------------------------*/
    
        computed: {
    
    
    
        },
    
        /*-------------------------Methods------------------------------------------*/
    
        methods: {
    
    
    
    
    
            /******* Methods default run ******/
    
            load: async function() {}
    
        },
    
    }
</script>