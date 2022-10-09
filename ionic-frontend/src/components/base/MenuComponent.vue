<template>
    <!--  the side menu  -->
    <ion-menu content-id="main-content" id="main-menu">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Superleuk</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item button @click="$router.push('/home')">
                    <ion-icon icon="homeoutline"></ion-icon>
                    <ion-label class="ion-margin-start">
                        Home
                    </ion-label>

                </ion-item>
                <ion-item button @click="$router.push('/uren')">
                    <ion-icon icon="timeoutline"></ion-icon>
                    <ion-label class="ion-margin-start">
                        Uren
                    </ion-label>
                </ion-item>
                <ion-item button @click="$router.push('/uren/invoeren')">
                    <ion-icon icon="timeoutline"></ion-icon>
                    <ion-label class="ion-margin-start">
                        Uren Invoeren
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-list>
                    <ion-item button @click="logout()">
                        <ion-icon icon="logoutoutline"></ion-icon>
                        <ion-label class="ion-margin-start">
                            Uitloggen
                        </ion-label>
                    </ion-item>
                </ion-list>

            </ion-toolbar>
        </ion-footer>
    </ion-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { Preferences } from '@capacitor/preferences';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonFooter } from '@ionic/vue';
import api from '../../api';
export default {
    data: () => ({
    }),

    components: {
        IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonFooter
    },
    methods: {
        async removeAccessToken() {
            await Preferences.remove({ key: 'accessToken' });
        },
        async logout() {
            console.log("Uitlog")
            // als een gebruiker uitlogd dan volgende doen
            // bearer token uit store en local storage verwijderen
            // user info uit de store verwijderen
            await api.post('/ionic/logout',{ device_id : this.$store.getters['auth/loggedIndeviceId'] } ,{
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.auth.accessToken // the token is a variable which holds the token
                }
            }).then(() => {
                this.removeAccessToken();
                this.$store.commit('auth/DELETE_ACCESS_TOKEN');
                this.$store.commit('auth/DELETE_LOGGED_IN_USER');
                this.$store.commit('auth/DELETE_LOGGED_IN_DEVICE_ID');
                this.$router.push('/auth')
                window.location.reload()
            }).catch((e) => {
                console.log(e)
            })

            // request naar backend sturen om het device uit te loggen

        }
    },
    computed: {
        ...mapGetters({
            access_token: 'auth/accessToken',
            logged_in_user: 'auth/loggedInUser'
        })
    },
}
</script>

<style scoped>
ion-menu {
    --width: 300px;
}
</style>