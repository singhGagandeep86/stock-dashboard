<template>
    <b-card class="b-card">
        <span>Revenue last 3 years</span>
        <canvas ref="revenueChart"></canvas>
    </b-card>
</template>


<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { Chart } from 'chart.js/auto';
import { stockService } from '@/services/stockService';

const revenueChart = ref(null);

onMounted(async () => {

    await stockService.loadAll();

    await nextTick();

    const appleRevenue = stockService.arrayOfRevenue.value[0]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const metaRevenue = stockService.arrayOfRevenue.value[1]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const microsoftRevenue = stockService.arrayOfRevenue.value[2]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const googleRevenue = stockService.arrayOfRevenue.value[3]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const amazonRevenue = stockService.arrayOfRevenue.value[4]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const teslaRevenue = stockService.arrayOfRevenue.value[5]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const nvidiaRevenue = stockService.arrayOfRevenue.value[6]
        .map(v => parseFloat(String(v).replace(',', '.')))
        .filter(v => !isNaN(v))
        .slice(-15);

    const ctx = revenueChart.value.getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'],
            datasets: [
                {
                    label: 'Meta',
                    data: metaRevenue,
                    borderColor: '#39DAFF',
                    backgroundColor: '#39DAFF',
                    tension: 0.1,
                }, {
                    label: 'Tesla',
                    data: teslaRevenue,
                    borderColor: '#31BFE2',
                    backgroundColor: '#31BFE2',
                    tension: 0.1,
                }, {
                    label: 'Nvidia',
                    data: nvidiaRevenue,
                    borderColor: '#29A5C5',
                    backgroundColor: '#29A5C5',
                    tension: 0.1,
                }, {
                    label: 'Microsoft',
                    data: microsoftRevenue,
                    borderColor: '#218AA8',
                    backgroundColor: '#218AA8',
                    tension: 0.1,
                }, {
                    label: 'Apple',
                    data: appleRevenue,
                    borderColor: '#196F8C',
                    backgroundColor: '#196F8C',
                    tension: 0.1,
                }, {
                    label: 'Google',
                    data: googleRevenue,
                    borderColor: '#11546F',
                    backgroundColor: '#11546F',
                    tension: 0.1,
                }, {
                    label: 'Amazon',
                    data: amazonRevenue,
                    borderColor: '#093A52',
                    backgroundColor: '#093A52',
                    tension: 0.1,
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 0,
                    suggestedMax: 200,
                    ticks: { color: '#fff', stepSize: 10 },
                    grid: { color: '#fff' },
                },
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: '#fff' },
                },
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#fff' }
                },
            },
        },
    });
});
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

.chart-container {
    background: #012a46;
    border-radius: 12px;
    padding: 24px;
    margin: 30px 100px;
    width: 100%;
}

canvas {
    width: 100%;
    height: 100%;
}
</style>