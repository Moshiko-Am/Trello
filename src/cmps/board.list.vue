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
      <div class="btn-user-container" :class="selectedDashboard">
        <span class="icon-user icon-sm"></span>
        <a class="btn-user" @click="showDashboard" :class="selectedDashboard"
          >User Dashboard</a
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
      <div class="boards-list-lg">
        <board-preview
          v-for="board in boards"
          display="large"
          :board="board"
          :key="board._id"
          @click.native="showBoard(board._id)"
        />
      </div>
    </div>
    <boards-templates v-if="isTemplates"></boards-templates>
    <user-dashboard v-if="isDashboard" :boards="boards" :user="user" />
  </section>
</template>

<script>
import boardPreview from "./board.preview";
import userDashboard from "./user.dashboard";
import boardsTemplates from "./boards.templates";
export default {
  components: {
    userDashboard,
    boardPreview,
    boardsTemplates,
  },
  data() {
    return {
      isBoards: true,
      isTemplates: false,
      isDashboard: false,
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
    selectedDashboard() {
      return { "btn-selected": this.isDashboard };
    },
    boards() {
      return this.$store.getters.boards;
    },
    loggedinUser() {
      return this.$store.getters.loggedInUser.fullname;
    },
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    showBoard(boardId) {
      this.$router.push(`/board/${boardId}`);
    },
    showBoards() {
      this.isBoards = true;
      this.isDashboard = false;
      this.isTemplates = false;
    },
    showTemplates() {
      this.isBoards = false;
      this.isDashboard = false;
      this.isTemplates = true;
    },
    showDashboard() {
      this.isBoards = false;
      this.isTemplates = false;
      this.isDashboard = true;
    },
  },
};
</script>
