<template>
		<ion-page>
			<ion-header>
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-menu-toggle>
							<ion-menu-button auto-hide="false" menu="main-menu"></ion-menu-button>
						</ion-menu-toggle>
						<!-- <ion-back-button></ion-back-button> -->
					</ion-buttons>
					<ion-title>
						<slot name="default-view-title"></slot>
					</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-content>

				<slot name="default-view-body"></slot>
			</ion-content>
		</ion-page>
</template>

<script setup>
import { IonContent, IonButtons, IonPage, IonHeader, IonTitle, IonToolbar, IonMenuToggle, IonMenuButton } from '@ionic/vue';

</script>

