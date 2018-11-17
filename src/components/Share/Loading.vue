<template>
    <v-dialog
            v-model="dialog"
            persistent
            width="300">
        <v-card
                color="primary"
                dark>
            <v-card-text>
                กรุณารอสักครู่
                <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

    import { get } from 'vuex-pathify'

    export default {
        name: "Loading",
        computed : {
            dialog : get("loading/isLoad")
        }
    }
</script>

