<template>
  <section class="template-boards-container">
    <div class="boards-list-header">
      <h3 class="boards-list-header-name">AVAILABLE TEMPLATES</h3>
      <div>
        <div class="boards-page-board-section-header-icon">
          <span class="icon-lg icon-organization"></span>
        </div>
        <h3 class="boards-page-board-section-header-name">Premade Templates</h3>
      </div>
    </div>
    <div class="boards-list-lg">
      <board-preview
        v-for="board in templateToEdit"
        display="large"
        :board="board"
        :key="board._id"
        @click.native="createTemplate(board)"
      />
    </div>
  </section>
</template>

<script>
import boardPreview from "./board.preview";
import { utilService } from "../services/util.service.js";
export default {
  components: {
    boardPreview,
  },
  data() {
    return {
      templateToEdit: null,
    };
  },
  computed: {
    templates() {
      return this.$store.getters.templates;
    },
    loggedUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async createTemplate(board) {
      {
        board.createdBy = this.loggedUser;
        board.members.push(this.loggedUser);
        board.activities = [
          {
            id: utilService.makeId(),
            createdAt: Date.now(),
            byMember: this.loggedUser,
            txt: " created this board ",
          },
        ];
      }
      try {
        const boardToSave = await this.$store.dispatch({
          type: "addBoard",
          board,
        });
        this.$store.commit({
          type: "getBoardById",
          boardId: boardToSave._id,
        });
        this.$router.push(`/board/${boardToSave._id}`);
      } catch (err) {
        console.log("cant save new template", err);
      }
    },
  },
  created() {
    this.templateToEdit = JSON.parse(JSON.stringify(this.templates));
  },
};
</script>

