<template>
  <div id="app" :style="boardStyle">
    <app-header></app-header>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <router-view />
  </div>
</template>

<script>
import appHeader from "@/cmps/app.header.vue";
export default {
  components: {
    appHeader,
  },
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
  computed: {
    boardStyle() {
      const background = this.$store.getters.boardStyle;
      if (!background) return;
      return background.type === "backgroundImage"
        ? `${background.type}: url(${background.content})`
        : `${background.type}: ${background.content}`;
    },
  },
};
</script>
