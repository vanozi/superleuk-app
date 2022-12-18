<script >
export default {
  setup(props) {
    const machineReference = props.params.data.machine.work_number + ' - ' + props.params.data.machine.work_name;
    const machineId = '' + props.params.data.machine.id;
    return {machineReference, machineId}
  }
}

</script>

<template>
  <RouterLink :to="('/werkplaats/machine/' + machineId)">{{ machineReference }}</RouterLink>
</template>
