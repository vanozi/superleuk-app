<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {IMonthTotals, useWorkingHours} from "stores/workinghours-store";
import VYearList from "components/uren/presentational/PYearList.vue";
import {useAccountStore} from "stores/account-store";

const year = ref(new Date().getFullYear());
const workingHoursStore = useWorkingHours();
const accountStore = useAccountStore();
const data: Ref<IMonthTotals[]> = ref([])
const isMilker = accountStore.hasUserRole('melker')

onMounted(async () => {
  data.value = await workingHoursStore.getYearOverview(year.value)
})

async function changeYearBack() {
  year.value = year.value - 1
  data.value = await workingHoursStore.getYearOverview(year.value)
}

async function changeYearForward() {
  year.value = year.value + 1
  data.value = await workingHoursStore.getYearOverview(year.value)
}

</script>

<template>
  <VYearList
    :year-totals="data"
    :year="year"
    :is-milker="isMilker"
    @change-year-back="changeYearBack"
    @change-year-forward="changeYearForward"
  />
</template>
