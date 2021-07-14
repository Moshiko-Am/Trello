<template>
  <section class="board-details">
    <p>{{ board }}</p>
    <!-- <card-details></card-details> -->
    <group-list />
  </section>
</template>

<script>
// import cardDetails from '../cmps/card.details.vue'
import groupList from "../cmps/group.list.vue";

export default {
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  components: {
    groupList,
    // cardDetails
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
