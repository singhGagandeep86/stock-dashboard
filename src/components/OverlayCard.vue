<template>
  <div class="overlay">

    <b-card v-for="(revenue, index) in arrayOfRevenue" :key="index" class="company-card">
     <div class="company-head"><img :src="companies[index].logo">  {{ companies[index].name }}</div>
       <template v-for="(value, i) in revenue" :key="i">
         <span v-if="i == revenue.length - 1">Revenue {{ lastQuarterOfCompnies[index][i] }}</span>
        <span v-if="i == revenue.length - 1">{{ revenue[i] }}</span>
      </template>
    </b-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { stockService } from '@/services/stockService';
import appleLogo from '@/assets/Images/logo/apple.png'
import metaLogo from '@/assets/Images/logo/meta.png'
import microsoftLogo from '@/assets/Images/logo/microsoft.png'
import googleLogo from '@/assets/Images/logo/google.png'
import amazonLogo from '@/assets/Images/logo/amazon.png'
import teslaLogo from '@/assets/Images/logo/tesla.png'
import nvidiaLogo from '@/assets/Images/logo/nvidia.png'
let revenueOfCompanies = ref([]);
let companies = ref([]);
let arrayOfRevenue = ref([]);
let lastQuarterOfCompnies = ref([]);

onMounted(async () => {
  const Apple = await stockService.fetchData('$AAPL');
  const Meta = await stockService.fetchData('$META');
  const Microsoft = await stockService.fetchData('$MSFT');
  const Google = await stockService.fetchData('$GOOG');
  const Amazon = await stockService.fetchData('$AMZN');
  const Tesla = await stockService.fetchData('$TSLA');
  const Nvidia = await stockService.fetchData('$NVDA');

  revenueOfCompanies.value = [Apple[8], Meta[4], Microsoft[8], Google[4], Amazon[8], Tesla[13], Nvidia[4]];
  lastQuarterOfCompnies.value = [Apple[2], Meta[2], Microsoft[2], Google[2], Amazon[2], Tesla[2], Nvidia[2]];
  arrayOfRevenue.value = revenueOfCompanies.value.map(item => Object.values(item));
  companies.value = [
    { name: 'Apple', logo: appleLogo },
    { name: 'Meta', logo: metaLogo },
    { name: 'Microsoft', logo: microsoftLogo },
    { name: 'Google', logo: googleLogo },
    { name: 'Amazon', logo: amazonLogo },
    { name: 'Tesla', logo: teslaLogo },
    { name: 'Nvidia', logo: nvidiaLogo }
  ];
  console.log('Loaded data', revenueOfCompanies.value, companies.value, arrayOfRevenue);

})
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
  /* width: 173px; */
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 16px;
  background-color: #011F35;
  /* padding: 20px 24px; */
  color: white;
}

.company-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
}
</style>