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
                <v-btn v-if="!token" flat @click="dialog=true">
                    <h4>เข้าสู่ระบบ</h4>
                </v-btn>
                <v-btn v-if="token" flat @click="$router.push('/logout')">
                    <h4>ออกจากระบบ</h4>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-dialog v-model="dialog" scrollable max-width="500px" persistent transition="dialog-transition">
            <v-card class="container">
                <!-- <v-toolbar primary-title class="text-xs-right">
                    <v-btn fab @click="reload()" color="red" dark small>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar> -->
                <v-text-field v-model="form.email" label="email"></v-text-field>
                <v-text-field v-model="form.password" label="รหัสผ่าน" type="password"></v-text-field>
                <v-btn v-if="!updateBtn" @click="loginMember()" color="green" dark round>
                    <h4>เข้าสู่ระบบ</h4>
                </v-btn>
                <v-btn v-if="updateBtn" @click="updateLoginMember()" color="green" dark round>
                    <h4>เข้าสู่ระบบ</h4>
                </v-btn>
                <v-btn @click="dialog1=true" color="primary" dark round>
                    <h4>สมัครสมาชิก</h4>
                </v-btn>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog1" scrollable max-width="500px" persistent transition="dialog-transition">
            <v-card class="container">
                <v-toolbar primary-title class="text-xs-right">
                    <v-btn fab @click="closeRegisterMember()" color="red" dark small>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-text-field v-model="form.name" label="ชื่อ"></v-text-field>
                <v-text-field v-model="form.password" label="รหัสผ่าน" type="password"></v-text-field>
                <v-text-field v-model="form.email" label="email"></v-text-field>
                <v-btn v-if="!updateBtn" @click="saveMember()" color="green" dark>
                    <h4>สมัครสมาชิก</h4>
                </v-btn>
                <v-btn v-if="updateBtn" @click="updateMember()" color="green" dark>
                    <h4>สมัครสมาชิก</h4>
                </v-btn>
            </v-card>
        </v-dialog>

    </v-content>
</template>

<script>
 
</script>
