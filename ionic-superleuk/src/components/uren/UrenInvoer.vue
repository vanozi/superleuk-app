<template>
	<div>
		<ion-grid>
			<ion-row class="ion-justify-content-center ion-align-items-center">
				<ion-col class="ion-text-center">
					<n-button text style="font-size: 24px" @click="transformDate('subtract', 7)">
						<n-icon>
							<back-icon />
						</n-icon>
					</n-button>
				</ion-col>
				<ion-col class="ion-text-center ion-align-text-center">
					<div class="ion-align-text-center">
						<h4 >
							{{weekObject.weekNumber}}
						</h4>
					
					</div>
				</ion-col>
				<ion-col class="ion-text-center">
					<n-button text style="font-size: 24px" v-if="nextWeekAllowed" @click="transformDate('add', 7)">
						<n-icon>
							<forward-icon />
						</n-icon>
					</n-button>
				</ion-col>
			</ion-row>
			<ion-row class="ion-justify-content-center ion-padding">
				{{ formatDate(weekObject.weekStart) }} -
				{{ formatDate(weekObject.weekEnd) }}
			</ion-row>
			<ion-row class="ion-justify-content-center ion-align-items-center ion-margin-top">
				<n-data-table  :columns="columns" :data="data" :summary="summary" />
			</ion-row>
		</ion-grid>
	</div>

</template>


  
<script>
import { defineComponent, h, ref, computed, reactive } from "vue";
import moment from "moment";
import { ArrowBack as BackIcon } from "@vicons/ionicons5";
import { ArrowForward as ForwardIcon } from "@vicons/ionicons5";
import { IonGrid, IonRow, IonCol } from '@ionic/vue'

moment.locale("nl");

const currentDate = ref(moment());
const weekObject = reactive({
	weekStart: computed(() => currentDate.value.clone().startOf("isoWeek")),
	weekEnd: computed(() => currentDate.value.clone().endOf("isoWeek")),
	weekNumber: computed(() => currentDate.value.isoWeek()),
});

const createColumns = () => {
	return [
	{
			type: 'expand',
			expandable: (rowData) => rowData.omschrijving.length > 0,
			renderExpand: (rowData) => {
				return rowData.omschrijving
			}
		},
		{
			title: "Datum",
			key: "datum",
			render(row) {
				return moment(row.datum, "YYYY-MM-DD").format("ddd DD MMM YYYY");
			},
		},
		{
			title: "Uren",
			key: "uren",
		},

	];
};

const createData = () => [
	{
		key: 1,
		datum: "2022-10-10",
		uren: 3,
		omschrijving : ""
	},
	{
		key: 2,
		datum: "2022-10-11",
		uren: 4,
		omschrijving : "Lekker gewerkt"
	},
	{
		key: 3,
		datum: "2022-10-12",
		uren: 5,
		omschrijving : "Lekker gewerkt"
	},
	{
		key: 4,
		datum: "2022-10-13",
		uren: 2,
		omschrijving : "Lekker gewerkt"
	},
	{
		key: 5,
		datum: "2022-10-14",
		uren: 2,
		omschrijving : "Lekker gewerkt"
	},
	{
		key: 6,
		datum: "2022-10-15",
		uren: 2,
		omschrijving : "Lekker gewerkt"
	},
	{
		key: 7,
		datum: "2022-10-16",
		uren: 2,
		omschrijving : "Lekker gewerkt"
	},
];

const createSummary = (pageData) => {
	return {
		datum: {
			value: h(
				"span",
				{ style: { color: "black", float: "right" } },
				"Totaal:  " +
				pageData.reduce((previousValue, row) => previousValue + row.uren, 0)
			),
			colSpan: 3,
		},
	};
};

function formatDate(dateToTransform) {
	return moment(dateToTransform, "YYYY-MM-DD").format("ddd DD MMM YYYY");
}

function transformDate(direction, numberOfDays) {
	if (direction == "subtract") {
		currentDate.value = moment(
			currentDate.value.subtract(numberOfDays, "days")
		);
	} else if (direction == "add") {
		currentDate.value = moment(
			currentDate.value.add(numberOfDays, "days")
		);
	}
}

const nextWeekAllowed = computed(() => {
	if (weekObject.weekNumber >= moment().isoWeek()) {
		return false;
	} else {
		return true;
	}
});

export default defineComponent({
	components: { BackIcon, ForwardIcon, IonGrid, IonRow, IonCol, },
	setup() {
		return {
			IonGrid, IonRow, IonCol,
			summary: createSummary,
			data: createData(),
			columns: createColumns(),
			weekObject,
			BackIcon,
			ForwardIcon,
			formatDate,
			nextWeekAllowed,
			transformDate
		};
	},
});
</script>