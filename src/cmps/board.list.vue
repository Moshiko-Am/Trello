<template>
  <section class="boards-list-container">
    <nav class="boards-list-menu">
      <div class="btn-workspace-container" :class="selectedBoards">
        <span class="icon-board icon-sm"></span>
        <a class="btn-workspace" @click="showBoards">Available workspaces</a>
      </div>
      <div class="btn-template-container" :class="selectedTemplates">
        <span class="icon-template icon-sm"></span>
        <a
          class="btn-template"
          @click="showTemplates"
          :class="selectedTemplates"
          >Available templates</a
        >
      </div>
    </nav>
    <div class="boards-lists" v-if="isBoards">
      <div class="boards-list-header">
        <h3 class="boards-list-header-name">AVAILABLE WORKSPACES</h3>
        <div>
          <div class="boards-page-board-section-header-icon">
            <span class="icon-lg icon-organization"></span>
          </div>
          <h3 class="boards-page-board-section-header-name">
            {{ loggedinUser }}'s Workspaces
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
    </div>
  </section>
</template>

<script>
import boardPreview from "./board.preview.vue";
export default {
  components: {
    boardPreview,
  },
  data() {
    return {
      isBoards: true,
      isTemplates: false,
    };
  },
  created() {
    this.$store.commit("clearStyle");
  },
  computed: {
    selectedBoards() {
      return { "btn-selected": this.isBoards };
    },
    selectedTemplates() {
      return { "btn-selected": this.isTemplates };
    },
    boards() {
      return this.$store.getters.boards;
    },
    loggedinUser() {
      return this.$store.getters.user.fullname;
    },
  },
  methods: {
    showBoards() {
      this.isBoards = true;
      this.isTemplates = false;
    },
    showTemplates() {
      this.isBoards = false;
      this.isTemplates = true;
    },
  },
};
</script>
