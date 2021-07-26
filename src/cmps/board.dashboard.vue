<template>
  <section class="board-dashboard">
    <h2>{{board.title}} Dashboard</h2>
    <div class="board-indicators">
      <div class="indicator">
        <div class="indic-icon-container members">
          <span class="icon-lg icon-remove-members"></span>
        </div>
        <div class="indicator-info">
          <h4>MEMBERS</h4>
          <h3>{{members}}</h3>
        </div>
      </div>
      <div class="indicator">
        <div class="indic-icon-container tasks">
          <span class="icon-lg icon-activity"></span>
        </div>
        <div class="indicator-info">
          <h4>TOTAL TASKS</h4>
          <h3>{{tasks.tasksCounter}}</h3>
        </div>
      </div>
      <div class="indicator">
        <div class="indic-icon-container completed-icon">
          <span class="icon-lg icon-v"></span>
        </div>
        <div class="indicator-info">
          <h4>COMPLETED TASKS</h4>
          <h3>{{tasks.completedCounter}}</h3>
        </div>
      </div>
      <div class="indicator">
        <div class="indic-icon-container incomplete">
          <span class="icon-lg icon-x"></span>
        </div>
        <div class="indicator-info">
          <h4>INCOMPLETE TASKS</h4>
          <h3>{{tasks.incompleteCounter}}</h3>
        </div>
      </div>
    </div>
    <div class="dashboard-container">
    <div class="charts-container">
    <section class="chart-container" style="position:relative;min-width:200px; width:25vw;">
      <h4>Card Per List</h4>
      <cards-chart class="chart" :board="board" />
    </section>
    <section class="chart-container" style="position:relative;min-width:200px; width:25vw;">
      <h4>Cards Per Member</h4>
      <members-chart class="chart" :board="board" />
    </section>
    </div>
    </div>
  </section>
</template>

<script>
import membersChart from "./charts/member.cards.chart.vue";
import cardsChart from "./charts/cards.group.chart.vue";
export default {
  props: {
    board: Object,
  },
  components: {
    membersChart,
    cardsChart,
  },
  computed:{
    members(){
      return this.board.members.length
    },
    tasks(){
      var tasksCounter = 0;
      var completedCounter = 0;
      var incompleteCounter = 0
      if(!this.board.groups) return {tasksCounter,completedCounter,incompleteCounter}
      this.board.groups.forEach(group =>{
        if(!group.cards) return
        tasksCounter += group.cards.length
        group.cards.forEach(card => {
          if(card.isCompleted) completedCounter++
          else incompleteCounter++
        })       
      })

      return {tasksCounter,completedCounter,incompleteCounter}
    }
  }
};
</script>

<style>
</style>