<template>
<b-card class="b-card">
    <span>Revenue last 3 years</span>
</b-card>
</template>


<script>
export default {
    name: "RevenueCard"
}
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

</style>