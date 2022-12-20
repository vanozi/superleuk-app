<script setup>
import { inject, computed } from 'vue';
const storing = inject('storing')
const storingsMelder = computed(() => storing ? storing.value.user.first_name + ' ' +  storing.value.user.last_name: null)
const storingsMeldingsdag = computed(() => storing ? storing.value.created_at.split('T')[0]: null)



</script>
<template>
  <main v-if="storing">
    <div class="row justify-center"><h6>{{storing.machine.work_number}} - {{storing.machine.work_name}}</h6></div>
    <div class="row justify-center q-ma-md">
    <div class="col-12 col-lg-8 col-xl-6 ">
        <q-input v-model="storingsMeldingsdag" label="Opgevoerd op" readonly/>
        <q-input v-model="storingsMelder" type="text" label="Opgevoerd door" readonly/>
        <q-input v-model="storing.status"  label="Status" readonly/>
        <q-input v-model="storing.issue_description" type="textarea" label="Omschrijving" readonly/>
      </div>
    </div>
      
  </main>

<!-- <p v-if="storing">{{storing.user}}</p> -->
</template>
