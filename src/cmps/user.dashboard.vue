<template>
  <section class="user-dashboard">
    <h2>{{ user.fullname }} Dashboard</h2>
    <div class="charts-container">
      <section
        class="chart-container"
        style="position: relative; min-width: 200px; width: 15vw"
      >
        <h4>Your cards per board</h4>
        <cards-chart :boards="boards" :user="user" />
      </section>
      <section
        class="chart-container"
        style="position: relative; min-width: 200px; width: 15vw"
      >
      <h4>Your activity in boards</h4>
        <activity-chart :boards="boards" :user="user" />
      </section>
    </div>
  </section>
</template>

<script>
import cardsChart from "./user-charts/cards.boards.chart.vue";
import activityChart from "./user-charts/activities.boards.chart.vue"
export default {
  props: {
    boards: Array,
    user: Object
  },
  components: {
    cardsChart,
    activityChart,
  },
};
</script>