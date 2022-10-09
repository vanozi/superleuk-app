<template>
        <base-layout page-Title="Home" backButtonHidden="true" >
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>Hallo</ion-card-subtitle>
                    <ion-card-title>{{uName}}</ion-card-title>
                    <p>{{loggedInDeviceId}}</p>
                </ion-card-header>

                <ion-card-content>
                    <p>{{user.name}} is {{userRefs.age}} jaar oud</p>
                    <button @click="setNewData(34)">Change Age</button>
                    <div>
                        <input type="text" placeholder="First Name" v-model="firstName" />
                        <input type="text" placeholder="Last Name" ref="lastNameInput" />
                        <button @click="setLastName">Set last name</button>
                    </div>
                </ion-card-content>
                <ion-list lines="none">
                    <ion-item>
                        <ion-label>
                            <h3>User email</h3>
                            <p v-if="loggedInUser!=null">{{loggedInUser.email}}</p>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            <h3>Device ID</h3>
                            <p>{{loggedInDeviceId}}</p>
                        </ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-label>
                            <h3>Access token</h3>
                            <p>{{accessToken}}</p>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-card>
        </base-layout>

</template>

<script setup>
// imports
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonLabel } from '@ionic/vue';
import { useStore } from 'vuex'
// import { mapGetters } from 'vuex'
import { reactive, ref, computed, watch, toRefs } from 'vue';

// reactive variables
const user = reactive({
    name: 'Vanozi',
    age: 36
})
const userRefs = toRefs(user);
const store = useStore();
const firstName = ref('');
const lastName = ref('');
const lastNameInput = ref(null);
// functions 
function setNewData(newAge) {
    userRefs.age.value = newAge
}
function setLastName() {
    lastName.value = lastNameInput.value.value;
}
//computed
const uName = computed(function () {
    return firstName.value + ' ' + lastName.value
});
const loggedInUser = computed(function () {
    return store.state.auth.loggedInUser
})
const loggedInDeviceId = computed(function () {
    return store.state.auth.loggedIndeviceId
})
const accessToken = computed(function () {
    return store.state.auth.accessToken
})
// watchers
watch([firstName, userRefs.age], function (newValues, oldValues) {
    console.log('Old age: ', oldValues[1]);
    console.log('New Age: ', newValues[1])
});



    // data: () => ({
    // }),
    // methods: {
    // },
    // computed: {
    //     ...mapGetters({
    //         access_token: 'auth/accessToken',
    //         logged_in_user : 'auth/loggedInUser',
    //         logged_in_device_id : 'auth/loggedIndeviceId'
    //     })
    // },
</script>

<style>

</style>