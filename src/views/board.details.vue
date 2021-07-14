<template>
  <section class="board-details">
    <board-header :board="board" />
    <group-list :groups="board.groups" :labels="labels" />
  </section>
</template>

<script>
import boardHeader from "@/cmps/board.header.vue";
import groupList from "@/cmps/group.list.vue";

export default {
  computed: {
    board() {
      return this.$store.getters.board;
    },
    labels(){
      const board = this.$store.getters.board
      return board.labels
    }
  },
  components: {
    boardHeader,
    groupList,
  },
  watch: {
    "this.$route.params.boardId": {
      immediate: true,
      async handler() {
        if (this.$route.params.boardId) {
          const { boardId } = this.$route.params;
          try {
            await this.$store.dispatch({ type: "loadBoards" });
            this.$store.commit("getBoardById", boardId);
          } catch (err) {
            console.log("didnt find board", err);
            // this.$router.push(`/`);
          }
        }
      },
    },
  },
};
</script>
