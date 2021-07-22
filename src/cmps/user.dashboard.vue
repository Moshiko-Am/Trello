<template>
  <section class="user-dashboard">
    <div class="boards-list-header">
      <h3 class="boards-list-header-name">DASHBOARD</h3>
      <div>
        <div class="boards-page-board-section-header-icon">
          <span class="icon-lg icon-organization"></span>
        </div>
        <h3 class="boards-page-board-section-header-name">
          {{ user.fullname }}'s Dashboard
        </h3>
      </div>
    </div>
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
import activityChart from "./user-charts/activities.boards.chart.vue";
export default {
  props: {
    boards: Array,
    user: Object,
  },
  components: {
    cardsChart,
    activityChart,
  },
};
</script>