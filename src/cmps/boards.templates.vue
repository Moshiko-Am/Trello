<template>
  <section class="template-boards-container">
    <div class="boards-list-lg">
      <board-preview
        v-for="board in templates"
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
// import {utilService} from '../services/utilService.js'
export default {
  components: {
    boardPreview,
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
            id: this.makeId(),
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
        console.log(boardToSave);
        this.$router.push(`/board/${boardToSave._id}`);
      } catch (err) {
        console.log("cant save new template", err);
      }
    },
  },
};
</script>

