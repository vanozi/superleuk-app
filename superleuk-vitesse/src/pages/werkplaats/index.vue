<script setup>
const columnDefs = [{ field: 'make' }]
const rowData = []
</script>

<template>
  <section>
    <div class="text-center" flex-col>
      <!-- You can use Vue components inside markdown -->
      <div i-carbon-tool-kit class="text-6xl m-auto" />
      <h2
        text="2xl"
        m="10"
      >
        Werkplaats
      </h2>
    </div>
  </section>
  <section id="tab-buttons">
    <button p-2>
      Machinelijst
    </button>
    <button p-2>
      Gemeld onderhoud
    </button>
    <button p-2>
      Reparaties
    </button>
    <button p-2>
      Tankgeschiedenis
    </button>
  </section>
  <section id="storingen-grid">
    <h2 p="b-4">
      Storingen / Reparaties
    </h2>
    <StoringenGrid />
  </section>
  <section>
    <h2 p="b-4">
      Machines
    </h2>
  </section>
</template>

<style>

</style>
