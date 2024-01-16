<script setup lang="ts">
import { IWorkingHours } from 'src/stores/workinghours-store';
import PWeekOverviewDialog from 'components/presentational/PWeekOverviewDialog.vue';
import { computed } from 'vue';


const props = defineProps<{
  weekOverview: IWorkingHours[];
  showDialog: boolean;
}>();

const weekOverview = computed(() => props.weekOverview)

</script>

<template>
  <PWeekOverviewDialog :week-overview="weekOverview" :show-dialog="showDialog" />
</template>
