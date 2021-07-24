<template>
  <section class="board-dashboard">
    <h2>{{board.title}} Dashboard</h2>
    <div class="charts-container">
    <section class="chart-container" style="position:relative;min-width:200px; width:25vw;">
      <h4>Card Per List</h4>
      <cards-chart class="chart" :board="board" />
    </section>
    <section class="chart-container" style="position:relative;min-width:200px; width:25vw;">
      <h4>Labels Summary</h4>
      <labels-chart class="chart" :board="board" />
    </section>
    <section class="chart-container" style="position:relative;min-width:200px; width:25vw;">
      <h4>Cards Per Member</h4>
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