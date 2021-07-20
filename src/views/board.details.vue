<template>
  <section class="board-details">
    <section v-if="bgOpen" class="bg" @click="toggleBg"></section>
    <board-header
      @bgColor="boardUpdate"
      @updateBoard="boardUpdate"
      @boardUpdate="boardUpdate"
      @toggleDashboard="toggleDashboard"
      v-if="board && board.title"
      :board="board"
    />
    <group-list
      :groups="board.groups"
      @boardUpdate="boardUpdate"
      v-if="board && board.groups"
      @openBg="toggleBg"
      @createLabel="createLabel"
    />
    <transition name="fade">
    <board-dashboard @toggleDashboard="toggleDashboard" v-if="showDashboard && board && board.groups" :board="board" />
    </transition>
  </section>
</template>

<script>
import boardHeader from "@/cmps/board.header.vue";
import groupList from "@/cmps/group.list.vue";
import boardDashboard from "@/cmps/board.dashboard.vue"
import { socketService } from "@/services/socket.service.js";
export default {
  data() {
    return {
      bgOpen: false,
      showDashboard : false,
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
    boardDashboard
  },
  methods: {
    createLabel(newLabel){
      const boardLabels = this.board.labels
      console.log('newLabel',newLabel);
      const idx = boardLabels.findIndex(label => label.id === newLabel.id)
      if(idx === -1) boardLabels.push(newLabel)
      else boardLabels.splice(idx ,1 ,newLabel)
      this.boardUpdate({type:'labels',payload:boardLabels})
    },
    async boardUpdate(update) {
      const board = JSON.parse(JSON.stringify(this.board));
      board[update.type] = update.payload;
      try {
        await this.$store.dispatch({ type: "saveBoard", board });
      } catch (err) {
        console.log(`coldn't save board`);
      }
    },
    toggleDashboard(){
      this.showDashboard = !this.showDashboard
      this.toggleBg()
    },
    toggleBg() {
      if(this.bgOpen) this.showDashboard = false;
      this.bgOpen = !this.bgOpen;
    },
    updateCard(card) {
      this.$store.commit({ type: "cardChanged", card });
    },
    updateGroups(groups) {
      this.$store.commit({ type: "groupsChanged", groups });
    },
    updateTitle(title) {
      this.$store.commit({ type: "titleChanged", title });
    },
    updateStyle(style) {
      this.$store.commit({ type: "styleChanged", style });
    },
    updateMembers(members) {
      this.$store.commit({ type: "membersChanged", members });
    },
  },
  created() {
    socketService.on("get card", this.updateCard);
    socketService.on("get groups", this.updateGroups);
    socketService.on("get title", this.updateTitle);
    socketService.on("get style", this.updateStyle);
    socketService.on("get members", this.updateMembers);
  },
  watch: {
    "$route.params.boardId": {
      immediate: true,
      async handler() {
        if (this.$route.params.boardId) {
          const { boardId } = this.$route.params;
          socketService.emit("board changed", boardId);
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
