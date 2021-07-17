<template>
  <div id="app" :style="boardStyle">
    <app-header
      :boards="boards"
      v-if="boards"
      :style="defaultBackground"
    ></app-header>
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
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
    await this.$store.dispatch({ type: "loadUsers" });
  },
  computed: {
    boardStyle() {
      const background = this.$store.getters.boardStyle;
      if (!background) return;
      return background.type === "backgroundImage"
        ? `${background.type}: url(${background.content})`
        : `${background.type}: ${background.content}`;
    },
    defaultBackground() {
      if (!this.boardStyle) return "background-color: #026AA7";
      else return "";
    },
    boards() {
      return this.$store.getters.boards;
    },
  },
};
</script>
