<script setup lang="ts">
import { computed, onBeforeMount, onMounted, provide, Ref, ref } from "vue";
import { useAdminWorkingHours } from "stores/admin/workinghours-store.ts";
import { useMedewerkersStore } from "stores/admin/medewerkers-store";
import { storeToRefs } from 'pinia'
import PWeekList from "components/uren/presentational/PWeekList.vue";
import PWeekOverviewDialog from "components/uren/presentational/PWeekOverviewDialog.vue";
const props = defineProps({
  user_id: {
    type: Number,
    required: true
  }
})
const showDialog = ref(false)


const today = ref(new Date());
const firstDayOfYear = computed(() => new Date(today.value.getFullYear(), 0, 1));
const lastDayOfYear = computed(() => new Date(today.value.getFullYear(), 11, 31));
const workingHoursAdminStore = useAdminWorkingHours();
const medewerkersStore = useMedewerkersStore();


const medewerker = medewerkersStore.getUserById(props.user_id)
const isMilker = medewerkersStore.hasUserRole('melker')
const weekOverview = ref([])



onBeforeMount(async () => {
  await workingHoursAdminStore.getWeekOverview(firstDayOfYear.value.toISOString().split('T')[0], lastDayOfYear.value.toISOString().split('T')[0], props.user_id)
})

async function changeYearBack() {
  today.value = new Date(today.value.getFullYear() - 1, today.value.getMonth(), today.value.getDate())
  await workingHoursAdminStore.getWeekOverview(firstDayOfYear.value.toISOString().split('T')[0], lastDayOfYear.value.toISOString().split('T')[0], props.user_id)
}

async function changeYearForward() {
  today.value = new Date(today.value.getFullYear() + 1, today.value.getMonth(), today.value.getDate())
  await workingHoursAdminStore.getWeekOverview(firstDayOfYear.value.toISOString().split('T')[0], lastDayOfYear.value.toISOString().split('T')[0], props.user_id)
}

async function showWeekInDialog(row) {
  showDialog.value = true
  weekOverview.value = row
}

</script>

<template>
  <PWeekList :week-totals="workingHoursAdminStore.weekOverview" :year="today.getFullYear()" :is-milker="isMilker"
    @change-year-back="changeYearBack" @change-year-forward="changeYearForward" @showWeekInDialog="showWeekInDialog" />
  <PWeekOverviewDialog :open="showDialog" :week-overview="weekOverview" @closeDialog="showDialog = false" />
</template>
