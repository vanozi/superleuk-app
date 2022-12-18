<template>
    <div class="container">
        <Bar v-if="!loading" :data="data" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'



import { storeToRefs } from "pinia";
import { useTankGegevens } from "src/stores/tankgegevens-store";

ChartJS.defaults.backgroundColor = '#9BD0F5';

const { chartData, loading, error } = storeToRefs(useTankGegevens());
const { fetchSummedDataBetweenDates } = useTankGegevens();



fetchSummedDataBetweenDates();

const keys = computed(() => Object.keys(chartData.value));
const values = computed(() => Object.values(chartData.value));

const data = computed(() => {
    return {
        labels: keys.value,
        datasets: [
            {
                label: 'Liters per dag',
                data: values.value
            }
        ]
    }
})



ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

</script>
