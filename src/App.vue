<template>
  <div id="app">
    <div id="nav">
      <app-header></app-header>
      <board-details />
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/cmps/app.header.vue";
import boardDetails from "@/views/board.details.vue";
export default {
  components: {
    appHeader,
    boardDetails,
  },
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
};
</script>
