<template>
  <section class="boards-list-container">
    <div class="boards-list-header">
      <h3 class="boards-list-header-name">
        GUEST WORKSPACES
      </h3>
      <div>
        <div class="boards-page-board-section-header-icon">
          <span class="icon-lg icon-organization"></span>
        </div>
        <h3 class="boards-page-board-section-header-name">
          {{loggedinUser}}'s Workspaces
        </h3>
      </div>
    </div>
    <div v-if="boards" class="boards-list-lg">
      <board-preview
        v-for="board in boards"
        display="large"
        :board="board"
        :key="board._id"
      />
    </div>
    <user-dashboard v-if="boards && boards.length" :boards="boards" :user="user" /> 
  </section>
</template>

<script>
import boardPreview from "./board.preview.vue";
import userDashboard from "./user.dashboard.vue"
export default {
  components: {
    userDashboard,
    boardPreview,
  },
  created() {
    this.$store.commit("clearStyle");
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    loggedinUser(){
      return this.$store.getters.user.fullname
    },
    user(){
      return this.$store.getters.user
    }
  },
};
</script>
