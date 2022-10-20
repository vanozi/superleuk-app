<template>
    <ion-row class="ion-padding">
        <n-data-table size="small" :columns="columns" :data="weekData"  />
    </ion-row>

</template>

<script>
import moment from 'moment'
import {IonRow} from '@ionic/vue'


export default {
    props : ["title", "weekData"],
    setup() {

        const createColumns = () => {
            return [
                {
                    type: "expand",
                    expandable: (rowData) => rowData.description.length > 0,
                    renderExpand: (rowData) => {
                        return rowData.description;
                    },
                },
                {
                    title: "Datum",
                    key: "date",
                    render(row) {
                        console.log(row)
                        return moment(row.date, "YYYY-MM-DD").format("ddd DD MMM YYYY");
                    },
                },
                {
                    title: "Uren",
                    key: "hours",
                },
            ];
        };


        return {
            columns: createColumns(),
            IonRow
        }
    }
}
</script>

<style>

</style>