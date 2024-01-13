<script setup lang="ts">
import { onBeforeMount, Ref, ref } from "vue";
import VYearList from "components/uren/presentational/PYearList.vue";
import { IMonthTotals, useAdminWorkingHours } from "stores/admin/workinghours-store.ts";
import { useMedewerkersStore } from "stores/admin/medewerkers-store";
import { router } from "src/router";
import { storeToRefs } from 'pinia'

const props = defineProps({
  user_id: {
    type: Number,
    required: true
  }
})
const year = ref(new Date().getFullYear());
const workingHoursAdminStore = useAdminWorkingHours();
const medewerkersStore = useMedewerkersStore();
const medewerker = medewerkersStore.getUserById(props.user_id)
const isMilker = medewerkersStore.hasUserRole('melker')
const { yearOverview } = storeToRefs(workingHoursAdminStore)


onBeforeMount(async () => {
  await workingHoursAdminStore.getYearOverview(year.value, props.user_id)
})

async function changeYearBack() {
  year.value = year.value - 1
  await workingHoursAdminStore.getYearOverview(year.value, props.user_id)
}

async function changeYearForward() {
  year.value = year.value + 1
  await workingHoursAdminStore.getYearOverview(year.value, props.user_id)
}

</script>

<template>
  <div>{{ medewerker?.first_name }} {{ medewerker?.last_name }}</div>
  <VYearList :year-totals="workingHoursAdminStore.yearOverview" :year="year" :is-milker="isMilker"
    @change-year-back="changeYearBack" @change-year-forward="changeYearForward" />
</template>
