<template>
    <div>

        <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col class="ion-text-center">
                <ion-button fill="clear" @click="transformDate('subtract', 7)">
                    <ion-icon slot="icon-only" icon="chevronbackoutline"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-label>Week {{ weekObject.weekNumber }}</ion-label>
            </ion-col>
            <ion-col class="ion-text-center">
                <ion-button v-if="nextWeekAllowed" fill="clear" @click="transformDate('add', 7)">
                    <ion-icon slot="icon-only" icon="chevronforwardoutline"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center ion-padding">
            {{ formatDate(weekObject.weekStart) }} -
            {{ formatDate(weekObject.weekEnd) }}
        </ion-row>
        <n-data-table :columns="columns" :data="data" striped :bordered="true" :single-line="false" :summary="summary"/>
        <ion-row>
            <ion-col>
                <ion-button color="secondary" fill="outline" expand="block">Indienen</ion-button>
            </ion-col>
        </ion-row>
    </div>
</template>

<script>

import {
    // IonCard,
    // IonCardHeader,
    // IonCardSubtitle,
    // IonCardContent,
    IonIcon,
    IonLabel,
    IonCol,
    //   UrenInvoerModal
} from "@ionic/vue";
// import UrenInvoerModal from './UrenInvoerModal.vue'
import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    inject,
    watch,
    computed,
    reactive,
      h,
    defineComponent
} from "vue";

export default defineComponent({
    setup() {
        const createColumns = () => {
            return [
                {
                    title: 'Datum',
                    key: 'datum',
                    render(row) { return moment(row.datum, "YYYY-MM-DD").format("ddd DD MMM YYYY"); }
                },
                {
                    title: 'Uren',
                    key: 'uren'
                }
            ]
        }


        const moment = inject("globalMoment");
        const currentDate = ref(moment());
        const date = ref();
        const createData = () => [
            {
                datum: "2022-10-09",
                uren: 5,
            },
            { datum: "2022-10-10", uren: 3, omschrijving: "lekker gewerkt" },
            { datum: "2022-10-11", uren: 4, omschrijving: "lekker gewerkt" },
            { datum: "2022-10-12", uren: 5, omschrijving: "lekker gewerkt" },
            { datum: "2022-10-13", uren: 2, omschrijving: "lekker gewerkt" },
            { datum: "2022-10-14", uren: 6, omschrijving: "lekker gewerkt" },
            { datum: "2022-10-15", uren: 2, omschrijving: "lekker gewerkt" },
        ];

        const createSummary = (pageData) => {
            return {
                name: {
                    value: h(
                        "span",
                        { style: { color: "red" } },
                        pageData.reduce(
                            (previousValue, row) => previousValue + row.uren,
                            0
                        )
                    ),
                    colSpan: 2
                }
            };
        };

        // WEEK DATA
        const weekObject = reactive({
            weekStart: computed(() => currentDate.value.clone().startOf("isoWeek")),
            weekEnd: computed(() => currentDate.value.clone().endOf("isoWeek")),
            weekNumber: computed(() => currentDate.value.isoWeek()),
        });


        const nextWeekAllowed = computed(() => {
            if (weekObject.weekNumber >= moment().isoWeek()) {
                return false;
            } else {
                return true;
            }
        });

        function transformDate(direction, numberOfDays) {
            if (direction == "subtract") {
                currentDate.value = moment(
                    currentDate.value.subtract(numberOfDays, "days")
                );
            } else if (direction == "add") {
                currentDate.value = currentDate.value.add(numberOfDays, "days");
            }
        }

        function formatDate(dateToTransform) {
            return moment(dateToTransform, "YYYY-MM-DD").format("ddd DD MMM YYYY");
        }

        // function rowClick(rowData) {
        //   // modal openen om datum aan te passen
        // }

        // watchers
        watch([currentDate], function (newValue, oldValue) {
            console.log("Old date: ", oldValue);
            console.log("New date: ", newValue);
        });

        // lifecycle hooks
        onBeforeMount(function () {
            console.log("onBeforeMount");
            console.log(typeof date.value);
        });
        onMounted(function () {
            console.log("onMounted");
            console.log(typeof date.value);
        });
        onBeforeUnmount(function () { });



        return {
            data: createData(),
            columns: createColumns(),
            summary : createSummary,
            IonIcon,
            IonLabel,
            IonCol,
            nextWeekAllowed,
            transformDate,
            formatDate,
            weekObject
        };
    }
});

</script>

<style>
.cell-class-header {
    border-color: black;
    border-width: 0.01em;
    border-style: solid;
    margin-bottom: -1px;
    background-color: lightgrey;
}

.cell-class {
    border-color: black;
    border-width: 0.01em;
    border-style: solid;
    margin-bottom: -1px;
}

.cell-class-footer {
    border-color: black;
    border-width: 0.01em;
    border-style: solid;
    margin-bottom: -1px;
    background-color: lightgrey;
}
</style>