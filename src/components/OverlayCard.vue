<template>
<div class="overlay">

  <b-card v-for="(revenue, index) in arrayOfRevenue" :key="index" class="company-card">
    <template v-for="(value, i) in revenue" :key="i">
      <span v-if="i == revenue.length - 1">{{revenue[i]}}</span>
        </template>
      <!-- <span>{{ revenue.length }}</span> -->
      {{ companies[index] }}
    </b-card>   
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { stockService } from '@/services/stockService';
let revenueOfCompanies = ref([]);
let companies = ref([]);
let arrayOfRevenue = ref([]);

onMounted(async () => {
    const Apple = await stockService.fetchData('$AAPL');
const Meta = await stockService.fetchData('$META');
const Microsoft = await stockService.fetchData('$MSFT');
const Google = await stockService.fetchData('$GOOG');
const Amazon = await stockService.fetchData('$AMZN');
const Tesla = await stockService.fetchData('$TSLA');
const Nvidia = await stockService.fetchData('$NVDA');

 revenueOfCompanies.value = [Apple[5], Meta[5], Microsoft[9], Google[3], Amazon[9], Tesla[13], Nvidia[3]];
 arrayOfRevenue.value = revenueOfCompanies.value.map(item => Object.values(item));
 companies.value = ['Apple', 'Meta', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia'];
    console.log('Loaded data', revenueOfCompanies.value, companies.value, arrayOfRevenue );
    
})
</script>

<style scoped>

.overlay {
    background: #023A6233;
    display: flex;
    flex-direction: row !important;
    padding: 24px;
    gap: 24px;
    margin: 0px 100px;
    border-radius: 16px;
    color: white;
}

.company-card {
    width: 173px;
    height: 100%;
    border-radius: 16px;
    background-color: #011F35;
    padding: 20px 24px;
    color: white;
}

</style>