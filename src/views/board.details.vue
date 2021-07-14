<template>
  <section class="board-details">
    <board-header :board="board" />
    <group-list />
    <!-- <card-details></card-details> -->
  </section>
</template>

<script>
// import cardDetails from '../cmps/card.details.vue'
import boardHeader from "@/cmps/board.header.vue";
import groupList from "@/cmps/group.list.vue";

export default {
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  components: {
    // cardDetails,
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
