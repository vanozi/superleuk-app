<template>
  <div class="row justify-center ">
    <h6>{{machine.info.work_number}} - {{machine.info.work_name}}</h6>
  </div>

    <div class="row justify-center q-ma-md ">
      <div class="col-12 col-md-auto q-mx-sm">
        <q-input v-model="machine.info.work_number" label="Werknummer" :readonly="readOnly"/>
        <q-input v-model="machine.info.work_name" type="text" label="Werknaam" :readonly="readOnly"/>
        <q-input v-model="machine.info.brand_name" type="text" label="Merk" :readonly="readOnly"/>
        <q-input v-model="machine.info.type_name" type="text" label="Model" :readonly="readOnly"/>
      </div>
      <div class="col-12 col-md-auto q-mx-sm">
        <q-input v-model="machine.info.group" type="text" label="Groep" :readonly="readOnly"/>
        <q-input v-model="machine.info.category" type="text" label="Category" :readonly="readOnly"/>
        <q-input v-model="machine.info.licence_number" type="text" label="Kenteken" :readonly="readOnly"/>
        <q-input v-model="machine.info.construction_year" type="text" label="Bouwjaar" :readonly="readOnly"/>
      </div>
    </div>


</template>

<script setup>
import { unref, ref } from 'vue';


const props = defineProps(['machine']);
const readOnly = true;

const machine = unref(props.machine)



// const machineInTemplate = props.machine;



</script>


<!-- {
  "id": 51,
  "work_number": "M08",
  "work_name": "7810",
  "category": "Trekker",
  "group": "Gemotoriseerd",
  "brand_name": "John Deere",
  "type_name": "7810",
  "licence_number": "TPX-75-R",
  "chassis_number": "RW7810R025042",
  "construction_year": 1999,
  "ascription_code": "9071-24201"
} -->
