<template>
  <section class="boards-menu-container">
    <div class="boards-menu-header">
      <h3>Boards</h3>
      <button class="icon-md icon-x" @click="boardsMenuClose"></button>
    </div>
    <hr />
    <div class="boards-input-container">
      <input
        type="text"
        placeholder="Find board by name..."
        class="boards-input-search"
      />
    </div>
    <div class="boards-menu-content">
      <div class="boards-list-sm">
        <board-preview
          v-for="board in boards"
          display="small"
          :board="board"
          :key="board._id"
        />
      </div>
      <div class="board-btns-container">
        <button class="btn-create-board">Create new board</button>
        <button class="btn-boards-page" @click="showBoards">Boards page</button>
      </div>
    </div>
  </section>
</template>

<script>
import boardPreview from "@/cmps/board.preview.vue";
export default {
  props: {
    boards: Array,
  },
  components: {
    boardPreview,
  },
  methods: {
    boardsMenuClose() {
      this.$emit("closeBoardsMenu");
    },
    showBoards() {
      this.$router.push(`/boards`);
      this.boardsMenuClose();
    },
  },
};
</script>
