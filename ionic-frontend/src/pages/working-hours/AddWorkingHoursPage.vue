<template>
    <base-layout page-Title="Uren Invoeren">
        <!-- toolbar om van week te wisselen -->
        <ion-toolbar>
            <ion-title class="ion-text-center">Selecteer week</ion-title>
        </ion-toolbar>
        <ion-toolbar color="light">
            <date-picker class="ion-padding" v-model="date" weekPicker />
        </ion-toolbar>
            <ion-row v-for="(entry) in weekData" :key="entry.datum" style="border: 1px solid; border-color:lightgrey;border-radius:10px">
                <ion-col class="ion-padding-horizontal">
                <p>Datum</p>
                <p>Uren</p>
                <p>Omschrijving</p>
            </ion-col>
            <ion-col class="ion-padding-horizontal" size="6">
                <p>{{entry.datum}}</p>
                <p>{{entry.uren}}</p>
                <p>{{entry.omschrijving}}</p>
            </ion-col>
            </ion-row>


            <!-- <ion-accordion-group>
                <ion-accordion v-for="(entry) in weekData" :key="entry.datum">
                    <ion-item lines="none" slot="header">
                        <ion-label class="ion-text-center">{{entry.datum}}</ion-label>
                        <ion-label class="ion-text-center">{{entry.uren}}</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        {{entry.omschrijving}}
                    </div>
                </ion-accordion>

            </ion-accordion-group> -->

    </base-layout>
</template>

<script setup>

import { ref } from 'vue';
import {
    IonToolbar,
    // IonItem,
    // IonLabel,
    // IonCard,
    IonRow,
    IonCol,


} from '@ionic/vue';
const date = ref();
const weekData = ref([
    { datum: '2022-10-09', uren: 5, omschrijving: 'lekker gewerktweweweweweweweweweeeeeee' },
    { datum: '2022-10-10', uren: 3, omschrijving: 'lekker gewerkt' },
    { datum: '2022-10-11', uren: 4, omschrijving: 'lekker gewerkt' },
    { datum: '2022-10-12', uren: 5, omschrijving: 'lekker gewerkt' },
    { datum: '2022-10-13', uren: 2, omschrijving: 'lekker gewerkt' },
    { datum: '2022-10-14', uren: 6, omschrijving: 'lekker gewerkt' },
    { datum: '2022-10-15', uren: 2, omschrijving: 'lekker gewerkt' }
]);
</script>

<style scoped>

</style>