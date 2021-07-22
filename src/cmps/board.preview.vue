<template>
  <div
    v-if="board"
    :class="{
      'board-item-lg': display === 'large',
      'board-item': display === 'small',
    }"
    :style="background"
  >
    <img
      v-if="board.style.type === 'backgroundImage' && display === 'small'"
      class="board-item-img"
      :src="board.style.preview"
    />
    <div
      :style="{ backgroundColor: board.style.content }"
      class="board-item-color-img"
      v-else-if="board.style.type === 'backgroundColor' && display === 'small'"
    ></div>
    <div class="board-item-title-container">
      <h4 class="board-item-title">{{ board.title }}</h4>
      <button
        class="icon-md btn-remove"
        v-if="display === 'small'"
        @click.stop="removeBoard"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    board: Object,
    display: String,
  },
  computed: {
    background() {
      return this.board.style.type === "backgroundImage"
        ? `background-image: url('${this.board.style.preview}')`
        : `background-color: ${this.board.style.content}`;
    },
  },
  methods: {
    removeBoard() {
      this.$emit("removeBoard", this.board._id);
      const openedBoardId = this.$route.params.boardId;
      if (openedBoardId === this.board._id) {
        this.$router.push("/boards");
      }
      return;
    },
  },
};
</script>
