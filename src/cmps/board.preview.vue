<template>
  <div
    v-if="board"
    :class="{
      'board-item-lg': display === 'large',
      'board-item': display === 'small',
    }"
    :style="{ backgroundImage: `url(${board.style.preview}` }"
    @click="showBoard(board._id)"
  >
    <img
      v-if="display === 'small'"
      class="board-item-img"
      :src="board.style.preview"
    />
    <div class="board-item-title-container">
      <h4 class="board-item-title">{{ board.title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    board: Object,
    display: String,
  },
  methods: {
    showBoard(boardId) {
      this.$store.commit("getBoardById", boardId);
      this.$router.push(`/board/${boardId}`);
    },
  },
};
</script>
