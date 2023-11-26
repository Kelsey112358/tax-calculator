<template>
  <div class="w-full max-w-xs mr-12">
    <h2 class="text-xl font-semibold">
      Calculator
    </h2>
    <Form class="rounded mb-4" @submit="addToHistory">
      <div class="mt-2" v-for="field of fields">
        <label class="mb-2 inline-block" :for="field.name">{{ field.label }}</label>
        <Field v-if="field.type === 'checkbox'" class="ml-2" :id="field.name" :name="field.name" :type="field.type"
          v-model="formData[field.name]" :value="true" />
        <Field v-else-if="field.type === 'select'" class="border rounded block py-2 px-3" :id="field.name" :name="field.name" :type="field.type"
          v-model="formData[field.name]" as="select">
          <option></option>
          <option v-for="year in taxYears" :key="year" :value="year">{{ year }}</option>
        </Field>
        <Field v-else
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :id="field.name" :name="field.name" :type="field.type" v-model="formData[field.name]" />
        <p>
          <ErrorMessage :name="field.name" class="text-red-500 text-xs italic" />
        </p>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mt-4"
        type="submit">
        Add to History
      </button>
    </Form>
    <div class="my-12">
      <h2 class="text-xl font-semibold mb-4">Tax Summary</h2>
      <p class="font-semibold">Taxable Income: {{ taxableIncome }}</p>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400 mt-4">
        <thead class="border text-xs text-gray-700 uppercase bg-gray-50 text-gray-400">
          <tr>
            <th class="px-6 py-3">Taxable range</th>
            <th class="px-6 py-3">Payable tax</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="tax.start" v-for="tax of taxes" class="bg-white border-gray-700">
            <td class="border px-6 py-3" v-if="tax.end < 0">Over {{ tax.start }}</td>
            <td class="border px-6 py-3" v-else>{{ tax.start }} - {{ tax.end }}</td>
            <td class="border px-6 py-3">{{ tax.payableTax }}</td>
          </tr>
        </tbody>
      </table>
      <p class="font-semibold mt-4">Total Tax: {{ taxInTotal }}</p>
    </div>
  </div>
</template>

<script setup>
const fields = [
  {
    label: "Your gross income",
    name: "grossIncome",
    type: "number"
  },
  {
    label: "Your superannuation rate",
    name: "superRate",
    type: "number"
  },
  {
    label: "Includes superannuation",
    name: "includeSuper",
    type: "checkbox"
  },
  {
    label: "Financial year",
    name: "taxYear",
    type: "select"
  },
];

const formData = reactive({
  grossIncome: 0,
  superRate: 10.5,
  includeSuper: false,
  taxYear: null,
});

const taxableIncome = computed(() => {
  const { grossIncome, includeSuper, superRate } = formData;
  if (includeSuper) {
    return Math.round(grossIncome - (grossIncome / (100 + superRate) * superRate));
  }
  return grossIncome;
});

const state = useMainStore();
const taxRates = state.getTaxRates;
const taxYears = taxRates.map((taxRate) => taxRate.year);

// calculate tax for each threshold
const taxes = computed(() => {
  const rates = taxRates.find(taxRate => taxRate.year === Number(formData.taxYear));
  if (!rates) return [];

  return rates.rates.filter(rate => rate.start <= taxableIncome.value).map((rate) => {
    const max = (taxableIncome.value >= rate.end && rate.end > 0) ? rate.end : taxableIncome.value;
    const payableTax = Math.round((max - rate.start) * rate.rate);
    return {
      ...rate,
      payableTax
    };
  });
})

const taxInTotal = computed(() => taxes.value.reduce((acc, cur) => acc + Number(cur.payableTax), 0));

const addToHistory = (values) => {
  const { grossIncome, includeSuper, taxYear, superRate } = values;
  state.addHistory({
    grossIncome, includeSuper, taxYear, superRate
  });
}
</script>
