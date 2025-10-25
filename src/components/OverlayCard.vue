<template>
  <div class="overlay">

    <b-card v-for="(revenue, index) in stockService.arrayOfRevenue.value" :key="index" class="company-card">
     <div class="company-head"><img :src="stockService.companies.value[index].logo">  {{ stockService.companies.value[index].name }}</div>
       <template v-for="(value, i) in revenue" :key="i">
         <span class="revenue-sn" v-if="i == revenue.length - 1">Revenue {{ stockService.lastQuarterOfCompanies.value[index][i] }}</span>
        <span class="revenue-vl" v-if="i == revenue.length - 1">{{ formatTwoDecimals(value) }}</span>
        <p class="mention" v-if="i == revenue.length - 1">in Bill USD</p>
      </template>
    </b-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { stockService } from '@/services/stockService';
let formatTwoDecimals = (value) => { 
  let formattedValue = String(value).replace(',', '.');
  return Number(formattedValue).toFixed(2);
}

onMounted(async () => {
  await stockService.loadAll();
  
});
</script>

<style scoped>
.overlay {
  background: #023A6233;
  display: flex;
  flex-direction: row !important;
  height: 190px;
  padding: 24px;
  gap: 24px;
  margin: 0px 100px;
  border-radius: 16px;
  color: white;
}

.company-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  background-color: #011F35;
  color: white;

  .revenue-sn {
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }

  .revenue-vl {
    font-size: 24px;
    font-weight: 500;
  }

  .mention {
    font-size: 12px;
    font-weight: 400;
  }
}

.company-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
}
</style>