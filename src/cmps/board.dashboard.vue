<template>
  <section class="board-dashboard">
    <h2>{{board.title}} Dashboard</h2>
    <div class="charts-container">
    <section class="chart-container" style="position:relative; height:35vh; width:25vw;">
      <cards-chart class="chart" :board="board" />
    </section>
    <section class="chart-container" style="position:relative; height:35vh; width:25vw;">
      <labels-chart class="chart" :board="board" />
    </section>
    <section class="chart-container" style="position:relative; height:35vh; width:25vw;">
      <members-chart class="chart" :board="board" />
    </section>
    </div>
  </section>
</template>

<script>
import labelsChart from "./charts/labels.board.chart.vue";
import membersChart from "./charts/member.cards.chart.vue";
import cardsChart from "./charts/cards.group.chart.vue";
export default {
  props: {
    board: Object,
  },
  components: {
    labelsChart,
    membersChart,
    cardsChart,
  },
};
</script>

<style>
</style>