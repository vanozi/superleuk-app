<script >
export default {
  setup(props) {
    const machineReference = props.params.data.work_number + ' - ' + props.params.data.work_name;
    const machineId = '' + props.params.data.id;
    return {machineReference, machineId}
  }
}

</script>

<template>
  <RouterLink :to="('/werkplaats/machine/' + machineId)">{{ machineReference }}</RouterLink>
</template>
