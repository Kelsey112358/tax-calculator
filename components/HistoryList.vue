<template>
  <div>
    <h2 class="text-xl font-semibold">
      History
    </h2>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400 mt-4">
      <thead class="border text-xs text-gray-700 uppercase bg-gray-50 text-gray-400">
        <tr>
          <th class="px-6 py-3"></th>
          <th class="px-6 py-3">Gross income</th>
          <th class="px-6 py-3">Include super</th>
          <th class="px-6 py-3">Superannuation rate</th>
          <th class="px-6 py-3">Tax year</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="h.id" v-for="h of history" class="bg-white border-gray-700">
          <td class="border px-6 py-3" @click="handleClick(h.id)">x</td>
          <td class="border px-6 py-3">{{ h.grossIncome }}</td>
          <td class="border px-6 py-3">{{ h.includeSuper }}</td>
          <td class="border px-6 py-3">{{ h.superRate }}</td>
          <td class="border px-6 py-3">{{ h.taxYear }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const state = useMainStore()
const history = computed(() => state.getUserHistory(state.getActiveUserId));

const handleClick = (id) => {
  state.removeHistory(Number(id));
}
</script>
