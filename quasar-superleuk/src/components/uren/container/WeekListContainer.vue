<script setup lang="ts">
import {computed, onMounted, Ref, ref} from "vue";
import {useWorkingHours} from "stores/workinghours-store";
import {useAccountStore} from "stores/account-store";
import {storeToRefs} from 'pinia'
import PWeekList from "components/uren/presentational/PWeekList.vue";

const today = ref(new Date());
const firstDayOfYear = computed(() => new Date(today.value.getFullYear(), 0, 1));
const lastDayOfYear = computed(() => new Date(today.value.getFullYear(), 11, 31));
const workingHoursStore = useWorkingHours();
const {myWeekOverView} = storeToRefs(workingHoursStore)
const accountStore = useAccountStore();
const isMilker = accountStore.hasUserRole('melker')

onMounted(async () => {
  await workingHoursStore.getMyWeekOverview(firstDayOfYear.value.toISOString().split('T')[0], lastDayOfYear.value.toISOString().split('T')[0])
})

async function changeYearBack() {
  today.value = new Date(today.value.getFullYear() - 1, today.value.getMonth(), today.value.getDate())
  await workingHoursStore.getMyWeekOverview(firstDayOfYear.value.toISOString().split('T')[0], lastDayOfYear.value.toISOString().split('T')[0])
}

async function changeYearForward() {
  today.value = new Date(today.value.getFullYear() + 1, today.value.getMonth(), today.value.getDate())
  await workingHoursStore.getMyWeekOverview(firstDayOfYear.value.toISOString().split('T')[0], lastDayOfYear.value.toISOString().split('T')[0])
}

</script>

<template>
  <PWeekList
      :week-totals="myWeekOverView"
      :year="today.getFullYear()"
      :is-milker="isMilker"
      @change-year-back="changeYearBack"
      @change-year-forward="changeYearForward"
  />
</template>
