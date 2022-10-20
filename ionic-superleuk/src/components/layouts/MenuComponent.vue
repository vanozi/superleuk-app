<template>
    <ion-menu id="main-menu">
        <ion-header >
            <ion-toolbar>
                <ion-title>Superleuk</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="store.state.auth.accessToken!=null">
            <ion-list >
                <ion-item-group>
                    <ion-item-divider>
                        <ion-label>Uren</ion-label>
                    </ion-item-divider>
                    <ion-item button @click="closeMenuOnSmallScreens();$router.push('/uren/invoeren')">
                        <ion-icon slot="start" icon="penciloutline"></ion-icon>
                        <ion-label>Invoeren</ion-label>
                    </ion-item>
                    <ion-item button @click="closeMenuOnSmallScreens();$router.push('/uren')" lines="none">
                        <ion-icon slot="start" icon="reorderthreeoutline"></ion-icon>
                        <ion-label>Overzicht</ion-label>
                    </ion-item>
                </ion-item-group>

                <ion-item-group>
                    <ion-item-divider>
                        <!-- <ion-icon slot="start" icon="personCircleOutline"></ion-icon> -->
                        <ion-label>Account</ion-label>
                    </ion-item-divider>
                    <ion-item button lines="none" @click="closeMenuOnSmallScreens(); performLogout()">
                        <ion-icon slot="start" icon="logoutoutline"></ion-icon>
                        <ion-label> Uitloggen </ion-label>
                    </ion-item>
                </ion-item-group>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
import {
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonList,
    IonItemDivider,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { menuController } from "@ionic/vue";

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        return {
            store,
            async closeMenuOnSmallScreens() {
                console.log(window.innerWidth)
                if(window.innerWidth<992){
                    await menuController.close();
                    return
                } 
                return
            },
            async performLogout() {
                console.log(store.state.auth.deviceId)
                let response = await store.dispatch('auth/logOut', store.state.auth.accessToken)
                if (response.status == 200) {
                    router.push("/login")
                }
            },
            IonIcon,
            IonMenu,
            IonMenuToggle,
            IonHeader,
            IonToolbar,
            IonTitle,
            IonContent,
            IonItemGroup,
            IonItem,
            IonLabel,
            IonList,
            IonItemDivider,

        };
    },
});
</script>
<style>

</style>