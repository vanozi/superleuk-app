<script setup lang="ts">
import { emit } from 'process';
import { computed, ref } from 'vue';

// props and emits
import { defineEmits } from 'vue';
const emits = defineEmits(['datesSelectedChanged']);

const date = ref({});
const dateRangeFormatted = computed(() => {
  if (date.value.from && date.value.to) {
    return `${date.value.from} - ${date.value.to}`;
  }
  return 'Selecteer data';
});

interface MyLocale {
  days?: string[];
  daysShort?: string[];
  months?: string[];
  monthsShort?: string[];
  firstDayOfWeek?: number;
  format24h?: boolean;
  pluralDay?: string;
}

const myLocale: MyLocale = {
  /* starting with Sunday */
  daysShort: 'zon_maa_din_woe_don_vri_zat'.split('_'),
  months: 'Januari_Februari_Maart_April_Mei_Juni_Juli_Augustus_September_Oktober_November_December'.split('_'),
  pluralDay: 'dagen',
};

function onRangeChange(value: any, reason: any, details: any) {
  emits('datesSelectedChanged', value);
}

</script>

<template>
  <div>
    <q-input v-model="dateRangeFormatted">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date @update:model-value="onRangeChange" range v-model="date" :locale="myLocale">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
