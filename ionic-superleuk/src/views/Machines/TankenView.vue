<template>
    <base-view>
        <template #default-view-title>

            <ion-title>Tanken</ion-title>
        </template>
        <template #default-view-body>

            <n-data-table ref="tableRef" :columns="columns" :data="responseData" :pagination="pagination" />
        </template>
    </base-view>
</template>
    
<script setup>
import { computed, unref, ref ,reactive } from "vue";
import { useAxiosGet } from "../../composables/axios";

const url = "/tank_transactions/";
const response = useAxiosGet(url);

// Data Table
const tableRef = ref(null)
const responseData = computed(() => unref(response.data));
const pagination = {
    pageSize: 20,
};
const columns = reactive([
    {
        title: "Datum",
        key: "start_date_time",
    },
    {
        title: "Machine",
        key: "vehicle",
    },
    {
        title: "Aantal liter",
        key: "quantity",
    },
]);

// Filter opties voor de machines 
const machineFilterOptions = computed(() => )



</script>