<template>
  <div id="app" v-if="boards" :style="boardStyle">
    <app-header
      @logOut="logOut"
      :users="users"
      :user="user"
      :boards="boards"
      @createBoard="createBoard"
      :style="defaultBackground"
    ></app-header>
    <router-view />
  </div>
  <div v-else class="load"></div>
</template>

<script>
import appHeader from "@/cmps/app.header.vue";
import { socketService } from "@/services/socket.service.js";
export default {
  components: {
    appHeader,
  },
  async created() {
    try {
      await this.$store.dispatch({ type: "loadBoards" });
      await this.$store.dispatch({ type: "loadUsers" });
      if (this.user) {
        socketService.emit("user-watch", this.user._id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    boardStyle() {
      const background = this.$store.getters.boardStyle;
      if (!background) return;
      return background.type === "backgroundImage"
        ? `${background.type}: url(${background.content})`
        : `${background.type}: ${background.content}`;
    },
    boards() {
      return this.$store.getters.boards;
    },
    users() {
      return this.$store.getters.users;
    },
    user() {
      return this.$store.getters.user;
    },
    defaultBackground() {
      if (!this.boardStyle) return "background-color: #026AA7";
      else return "";
    },
  },
  methods: {
    async createBoard(board) {
      try {
        const savedBoard = await this.$store.dispatch({
          type: "addBoard",
          board,
        });
        this.$store.commit({
          type: "getBoardById",
          boardId: board._id,
        });
        this.$router.push(`/board/${savedBoard._id}`);
      } catch (err) {
        console.log("cant create board", err);
      }
    },
    logOut() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.load {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 0;
  height: 62px;
  text-align: left;
  vertical-align: middle;
  width: 62px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.load::before,
.load::after {
  animation-name: loadingAnim;
  animation-direction: alternate;
  animation-duration: 0.25s;
  animation-iteration-count: infinite;
  background-color: #f4f5f7;
  border-radius: 2px;
  content: "";
  display: inline-block;
  height: 50px;
  margin: 4px 0 0 4px;
  vertical-align: top;
  width: 24px;
}
.load::after {
  animation-direction: alternate-reverse;
  animation-duration: 0.24s;
  height: 50px;
  margin-left: 4px;
}
</style>
