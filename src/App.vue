<template>
  <header>
    <img src="./assets/Images/Rectangle.png">
    <span>The Magnificent Seven Companies</span>
  </header>
  <OverlayCard />

  <div class="cards-container">
    <RevenueCard class="each-card" />
    <RevenueBreakdown class="each-card" />
  </div>

  <div class="cards-container">
    <NetIncome class="each-card" />
    <GrossMargin class="each-card" />
    <RevenueGrowth class="each-card" />
  </div>

</template>

<script>
import GrossMargin from './components/GrossMargin.vue';
import NetIncome from './components/NetIncome.vue';
import OverlayCard from './components/OverlayCard.vue';
import RevenueBreakdown from './components/RevenueBreakdown.vue';
import RevenueCard from './components/RevenueCard.vue';
import RevenueGrowth from './components/RevenueGrowth.vue';
import { stockService } from './services/stockService';

export default {
  name: 'App',
  components: {
    OverlayCard, RevenueCard, RevenueBreakdown, NetIncome, GrossMargin, RevenueGrowth
  },
   async created() {
    this.data = await stockService.fetchData('$AAPL');

// const Apple = stockService.fetchData('$AAPL');
// const Meta = stockService.fetchData('$META');
// const Microsoft = stockService.fetchData('$MSFT');
// const Google = stockService.fetchData('$GOOG');
// const Amazon = stockService.fetchData('$AMZN');
// const Tesla = stockService.fetchData('$TSLA');
// const Nvidia = stockService.fetchData('$NVDA');


// const arrayOfCompanies = ref([Apple, Meta, Microsoft, Google, Amazon, Tesla, Nvidia])

    console.log('Loaded data', this.data );
  }

}
</script>

<style>
body {
  margin: 0;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  font-family: 'rubik', sans-serif;
}

header {
  display: flex;
  align-items: center;
  gap: 24px;

  span {
    color: #F9F9F9;
    font-size: 36px;
    font-family: 'Figtree';
  }
}

#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 64px 0px;
  gap: 40px;
  box-sizing: border-box;
}

.cards-container {
  display: flex;
  gap: 32px;
  width: 100%;
  height: 352px;
  padding: 0px 100px;
}

.each-card {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: #011F35;
}
</style>
