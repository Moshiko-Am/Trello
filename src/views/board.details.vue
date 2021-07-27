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
      :bgImage="board.style"
      @boardUpdate="boardUpdate"
      v-if="board && board.groups"
      @openBg="toggleBg"
      @createLabel="createLabel"
      @removeLabel="removeLabel"
      @emitActivity="addActivity"
      @updateMentions="updateMentions"
      ref="grouplist"
    />
    <transition name="fade">
      <board-dashboard
        @toggleDashboard="toggleDashboard"
        v-if="showDashboard && board && board.groups"
        :board="board"
      />
    </transition>
  </section>
</template>

<script>
import boardHeader from "@/cmps/board.header.vue";
import groupList from "@/cmps/group.list.vue";
import boardDashboard from "@/cmps/board.dashboard.vue";
import { socketService } from "@/services/socket.service.js";
import { utilService } from "@/services/util.service.js";

export default {
  data() {
    return {
      bgOpen: false,
      showDashboard: false,
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
    boardDashboard,
  },
  methods: {
    addActivity(newActivity) {
      const boardActivities = JSON.parse(JSON.stringify(this.board)).activities;
      newActivity.id = utilService.makeId();
      newActivity.createdAt = Date.now();
      boardActivities.unshift(newActivity);
      this.boardUpdate({ type: "activities", payload: boardActivities });
    },
    createLabel(newLabel) {
      const boardLabels = JSON.parse(JSON.stringify(this.board)).labels;
      const idx = boardLabels.findIndex((label) => label.id === newLabel.id);
      if (idx === -1) boardLabels.push(newLabel);
      else boardLabels.splice(idx, 1, newLabel);
      this.boardUpdate({ type: "labels", payload: boardLabels });
    },
    removeLabel(labelId) {
      const boardLabels = JSON.parse(JSON.stringify(this.board)).labels;
      const idx = boardLabels.findIndex((label) => label.id === labelId);
      boardLabels.splice(idx, 1);
      this.boardUpdate({ type: "labels", payload: boardLabels });
    },
    async updateMentions(mention) {
      mention.bId = this.board._id;
      mention.id = utilService.makeId();
      try {
        const userToUpdate = await this.$store.dispatch({
          type: "getById",
          userId: mention.userId,
        });
        if (userToUpdate.mentions) userToUpdate.mentions.unshift(mention);
        else userToUpdate.mentions = [mention];

        socketService.emit("send mention", mention);
        this.$store.dispatch({ type: "updateUser", userToUpdate });
      } catch (err) {
        console.log(err);
      }
    },
    async boardUpdate(update) {
      const board = JSON.parse(JSON.stringify(this.board));
      board[update.type] = update.payload;
      if (update.activities && update.activities.txt) {
        update.activities.id = utilService.makeId();
        update.activities.createdAt = Date.now();
        board.activities.unshift(update.activities);
        socketService.emit("send activities", board.activities);
      }
      try {
        await this.$store.dispatch({ type: "saveBoard", board });
      } catch (err) {
        console.log(`couldn't save board`, err);
      }
    },
    toggleDashboard() {
      this.showDashboard = !this.showDashboard;
      this.toggleBg();
    },
    toggleBg() {
      if (this.bgOpen) this.showDashboard = false;
      this.bgOpen = !this.bgOpen;
      if (this.bgOpen) this.$refs.grouplist.$el.classList.add("bg-open");
      else this.$refs.grouplist.$el.classList.remove("bg-open");
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
    updateActivities(activities) {
      this.$store.commit({ type: "activitiesChanged", activities });
    },
  },
  created() {
    socketService.on("card updated", this.updateCard);
    socketService.on("groups updated", this.updateGroups);
    socketService.on("title updated", this.updateTitle);
    socketService.on("style updated", this.updateStyle);
    socketService.on("members updated", this.updateMembers);
    socketService.on("activities updated", this.updateActivities);
  },
  destroyed() {
    socketService.off("card updated", this.updateCard);
    socketService.off("groups updated", this.updateGroups);
    socketService.off("title updated", this.updateTitle);
    socketService.off("style updated", this.updateStyle);
    socketService.off("members updated", this.updateMembers);
    socketService.off("activities updated", this.updateActivities);
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
          }
        }
      },
    },
  },
};
</script>
