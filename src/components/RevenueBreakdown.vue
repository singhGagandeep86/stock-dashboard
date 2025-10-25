<template>

    <b-card class="b-card">
        <span>Revenue Breakdown Magnificent Seven</span>
        <canvas ref="shareChart" class="chart-canvas"></canvas>
    </b-card>

</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { stockService } from '@/services/stockService';
import { Chart } from 'chart.js/auto';

const shareChart = ref(null);


onMounted(async () => {
    await stockService.loadAll();
    await nextTick();
    const revenues = (stockService.arrayOfRevenue?.value || [])
    .map(arr => {
      const last = Array.isArray(arr) ? arr.at(-1) : arr;
      const correctedLast = last.replace(',', '.');
      return Number(correctedLast).toFixed(2);
    });

    const ctx = shareChart.value.getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [`Meta ${revenues[1]}`, `Tesla ${revenues[6]}`, `Nvidia ${revenues[3]}`, `Microsoft ${revenues[2]}`, `Apple ${revenues[0]}`, `Google ${revenues[4]}`, `Amazon ${revenues[5]}`],
            datasets: [{
                data: revenues,
                backgroundColor: ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8', '#196F8C', '#11546F', '#093A52'],
                borderColor: '#ffffff',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: { 
                        color: '#fff', 
                        font: { size: 10 },
                        weight: '400',
                        margin: 10
                    },
                    boxWidth: 12
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.label}: ${ctx.parsed.toFixed(1)}`
                    }
                }
            }
        }
    });

})

</script>

<style scoped>
.b-card {
    display: flex;
    flex-direction: column;
    background-color: #011F35;
}

.b-card span {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 600;
}

.chart-canvas {
  width: 100% !important;     
  height: 300px !important;    
  max-width: 600px !important;
}

</style>