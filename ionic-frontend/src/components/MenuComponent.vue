<template>
    <!--  the side menu  -->
    <ion-menu content-id="main-content" id="main-menu">
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item button @click="$router.push('/home2')">
                    <ion-label>Home2</ion-label>
                </ion-item>
                <ion-item button @click="$router.push('/home')">
                    <ion-icon name="home"></ion-icon>
                    <ion-label>
                        Home1
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel ,IonIcon} from '@ionic/vue';
export default {
    components: {
        IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon
    }
}
</script>

<style scoped>
ion-menu {
    --width: 300px;
}
</style>