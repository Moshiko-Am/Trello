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
          Public boards
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
  </section>
</template>

<script>
import boardPreview from "./board.preview.vue";
export default {
  components: {
    boardPreview,
  },
  created() {
    this.$store.commit("clearStyle");
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
};
</script>
