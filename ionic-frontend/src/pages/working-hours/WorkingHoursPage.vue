<template>
        <base-layout page-Title="Uren">
        <ion-card>
            <ion-card-header>
                <!-- <ion-card-subtitle></ion-card-subtitle> -->
                <ion-card-title>Uren totalen</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <h3>Totaal dit jaar</h3>
                        </ion-col>
                        <ion-col>
                            <h4>400</h4>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <h3>Totaal deze maand</h3>
                        </ion-col>
                        <ion-col>
                            <h4>200</h4>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <h3>Totaal deze week</h3>
                        </ion-col>
                        <ion-col>
                            <h4>135</h4>
                        </ion-col>
                    </ion-row>
                </ion-grid>

            </ion-card-content>

        </ion-card>
        <div class="ion-margin">
            <ion-button expand="block" fill="outline" @click="$router.push('/uren/invoeren')">Uren Invoeren</ion-button>
            <ion-button class="ion-margin-top" expand="block" fill="outline">Uren Overzicht</ion-button>
        </div>
        </base-layout>
</template>

<script setup>
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol }  from "@ionic/vue";

</script>

<style>

</style>