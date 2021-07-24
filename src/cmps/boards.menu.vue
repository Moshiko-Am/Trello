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
        v-model="filterBy"
        @input="setFilter"
      />
    </div>
    <div class="boards-menu-content">
      <div class="boards-list-sm">
        <board-preview
          v-for="board in boardsForDisplay"
          display="small"
          :board="board"
          :key="board._id"
          @click.native="showBoard(board._id)"
          @removeBoard="removeBoard"
        />
      </div>
      <div class="board-btns-container">
        <button class="btn-create-board" @click="toggleCreateBoard">
          Create new board
        </button>
        <button class="btn-boards-page" @click="showBoards">Boards page</button>
      </div>
    </div>
    <create-board
      @createBoard="createBoard"
      class="hideCreateMenu"
      :class="createShowMenu"
      @closeMenu="boardsMenuClose"
      @menuBack="toggleCreateBoard"
      v-if="isCreateOpen"
    ></create-board>
  </section>
</template>

<script>
import boardPreview from "@/cmps/board.preview.vue";
import createBoard from "./create.board";

export default {
  props: {
    boards: Array,
  },
  components: {
    boardPreview,
    createBoard,
  },
  data() {
    return {
      isCreateOpen: false,
      currBoardId: "",
      filterBy: "",
    };
  },
  computed: {
    boardsForDisplay() {
      return this.$store.getters.boardsForDisplay;
    },
    createShowMenu() {
      return { showCreateMenu: this.isCreateOpen };
    },
  },
  methods: {
    setFilter() {
      this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
    },
    removeBoard(boardId) {
      this.$emit("removeBoard", boardId);
    },
    showBoard(boardId) {
      this.$router.push(`/board/${boardId}`);
      this.filterBy = "";
    },
    boardsMenuClose() {
      this.$emit("closeBoardsMenu");
      this.isCreateOpen = false;
      this.filterBy = "";
    },
    toggleCreateBoard() {
      this.isCreateOpen = !this.isCreateOpen;
    },
    createBoard(board) {
      this.boardsMenuClose();
      this.$emit("createBoard", board);
    },
    showBoards() {
      this.$router.push(`/boards`);
      this.boardsMenuClose();
    },
  },
  created() {
    this.currBoardId = this.$route.params.boardId;
  },
  watch: {
    "$route.params.boardId": {
      immediate: true,
      async handler() {
        if (this.$route.params.boardId !== this.currBoardId) {
          this.boardsMenuClose();
        }
      },
    },
  },
};
</script>
