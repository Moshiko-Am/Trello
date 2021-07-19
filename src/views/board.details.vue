<template>
  <section class="board-details">
    <section v-if="bgOpen" class="bg" @click="toggleBg"></section>
    <board-header
      @bgColor="boardUpdate"
      @updateBoard="boardUpdate"
      @boardUpdate="boardUpdate"
      v-if="board && board.title"
      :board="board"
    />
    <group-list
      :groups="board.groups"
      @boardUpdate="boardUpdate"
      v-if="board && board.groups"
      @openBg="toggleBg"
    />
  </section>
</template>

<script>
import boardHeader from "@/cmps/board.header.vue";
import groupList from "@/cmps/group.list.vue";
import { socketService } from "@/services/socket.service.js";
export default {
  data() {
    return {
      bgOpen: false,
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  components: {
    boardHeader,
    groupList,
  },
  methods: {
    async boardUpdate(update) {
      const board = JSON.parse(JSON.stringify(this.board));
      board[update.type] = update.payload;
      console.log("board", board);
      try {
        await this.$store.dispatch({ type: "saveBoard", board });
      } catch (err) {
        console.log(`coldn't save board`);
      }
    },
    toggleBg() {
      this.bgOpen = !this.bgOpen;
    },
    updateCard(card) {
      console.log('card changed');
      this.$store.commit({ type: "cardChanged", card });
    },
    updateGroups(groups) {
      console.log('groups changed',groups);
      this.$store.commit({ type: "groupsChanged", groups });
    },
    updateTitle(title) {
      console.log('title changed');
      this.$store.commit({ type: "titleChanged", title });
    },
    updateStyle(style) {
      console.log('style changed');
      this.$store.commit({ type: "styleChanged", style });
    },
    updateMembers(members) {
      console.log('members changed');
      this.$store.commit({ type: "membersChanged", members });
    },
  },
  created() {
    socketService.on("get card", this.updateCard);
    socketService.on("get groups", this.updateGroups);
    socketService.on("get title", this.updateTitle);
    socketService.on("get style", this.updatestyle);
    socketService.on("get members", this.updateMembers);
  },
  watch: {
    "$route.params.boardId": {
      immediate: true,
      async handler() {
        if (this.$route.params.boardId) {
          const { boardId } = this.$route.params;
          socketService.emit('board changed', boardId)
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
