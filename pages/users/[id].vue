<template>
  <div class="flex justify-between">
    <CalculatorForm />
    <HistoryList />
  </div>
</template>

<script setup>
const state = useMainStore();

const { data } = await useFetch('/api/taxrates');
state.setTaxRates(data.value.rates);
</script>
