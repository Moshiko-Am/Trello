<template>
  <section class="board-header-container">
    <div class="board-header-controls">
      <div class="board-header-title">
        <input
          class="title-input"
          @change="saveTitle()"
          @input="getTextWidth()"
          v-model="boardTitle"
          :style="{ width: getWidth }"
          @click="selectTxt"
          ref="txt"
        />
      </div>
      <span class="board-header-divider">|</span>
      <transition name="fade">
        <div class="board-members-mobile-container" v-if="mobileRemove">
          <span
            v-for="member in board.members"
            :key="member._id"
            class="members-list-mobile"
          >
            <span class="member-name-avatar-mobile">
              <avatar
                :title="member.fullname"
                class="member-name"
                :username="member.fullname"
                :size="28"
                :inline="true"
                :style="{ 'margin-left': '-3px' }"
              ></avatar>
              <span class="member-fullname-mobile">{{ member.fullname }}</span>
            </span>
            <span
              class="remove-member-mobile icon-sm"
              @click="removeMember(member._id)"
              v-if="board.createdBy._id !== member._id"
            ></span>
          </span>
        </div>
      </transition>
      <div class="board-header-members">
        <span
          v-for="member in board.members"
          :key="member._id"
          class="members-list"
        >
          <avatar
            :title="member.fullname"
            class="member-name"
            :username="member.fullname"
            :size="28"
            :inline="true"
            :style="{ 'margin-left': '-3px' }"
          ></avatar>
          <span
            class="remove-member"
            @click="removeMember(member._id)"
            v-if="board.createdBy._id !== member._id"
            >X</span
          >
          <img
            title="This member is the creator of this board"
            class="member-admin"
            v-if="board.createdBy._id === member._id"
            src="https://a.trellocdn.com/prgb/dist/images/chevron.88a4454280d68a816b89.png"
          />
        </span>
        <span
          @click="toggleRemoveMembersMobile"
          class="icon-md icon-remove-members"
          title="Remove members from board"
        ></span>
        <span
          title="Invite members"
          @click="toggleInvite"
          class="icon-md icon-members btn-invite"
        ></span>
        <button class="btn-invite" @click="toggleInvite">Invite</button>
        <transition name="slide-fade">
          <users
            v-if="isInviteShow"
            :users="users"
            :board="board"
            @addUser="addUser"
            :onlyBoard="false"
            @closeInvite="toggleInvite"
          ></users>
        </transition>
      </div>
      <span class="board-header-divider">|</span>
      <span
        title="Dashboard"
        @click="toggleDashboard"
        class="icon-md icon-dashboard"
      ></span>
      <button class="btn-dashboard" @click="toggleDashboard">Dashboard</button>
    </div>
    <span
      class="icon-md icon-mobile-menu"
      @click="toggleMenu"
      title="Show menu"
    ></span>
    <button class="btn-show-menu" @click="toggleMenu">
      <span class="icon-sm icon-dots-menu"></span>
      <span class="menu-show-txt">Show menu</span>
    </button>
    <side-menu
      v-click-outside="closeMenu"
      @bgColor="bgColor"
      @chooseBg="chooseBg"
      @closeMenu="toggleMenu"
      class="hideMenu"
      :class="menuShow"
      :board="board"
      ref="sideMenu"
    ></side-menu>
  </section>
</template>

<script>
import sideMenu from "./side.menu.vue";
import avatar from "vue-avatar";
import users from "./users.vue";
import { socketService } from "@/services/socket.service.js";
import ClickOutside from "vue-click-outside";
export default {
  components: {
    sideMenu,
    avatar,
    users,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      isMenuShow: false,
      boardTitle: null,
      boardMembers: null,
      isInviteShow: false,
      txtWidth: null,
      mobileRemove: false,
    };
  },
  directives: {
    ClickOutside,
  },
  computed: {
    getWidth() {
      return this.getTextWidth();
    },
    menuShow() {
      return { showMenu: this.isMenuShow };
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    toggleRemoveMembersMobile() {
      this.mobileRemove = !this.mobileRemove;
    },
    selectTxt() {
      this.$refs.txt.select();
    },
    getTextWidth() {
      const text = document.createElement("span");
      document.body.appendChild(text);
      text.style.font = "Segoe UI";
      text.style.fontSize = 18 + "px";
      text.style.height = "auto";
      text.style.width = "auto";
      text.style.position = "absolute";
      text.style.whiteSpace = "no-wrap";
      text.innerHTML = this.boardTitle;
      const width = Math.ceil(text.clientWidth);
      const formattedWidth = width + 40 + "px";
      document.body.removeChild(text);
      return formattedWidth;
    },

    bgColor(style) {
      this.$emit("bgColor", style);
      socketService.emit("send style", style);
    },
    chooseBg(style) {
      this.$emit("updateBoard", style);
      socketService.emit("send style", style);
    },
    toggleMenu() {
      this.isMenuShow = !this.isMenuShow;
    },
    closeMenu() {
      this.isMenuShow = false;
      this.$refs.sideMenu.isBgShow = false;
      this.$refs.sideMenu.$refs.bgMenu.isColorsShow = false;
      this.$refs.sideMenu.$refs.bgMenu.isPhotosShow = false;
    },
    toggleInvite() {
      this.isInviteShow = !this.isInviteShow;
    },
    saveTitle() {
      if (!this.boardTitle) {
        this.boardTitle = this.board.title;
      }
      const titleCopy = JSON.parse(JSON.stringify(this.boardTitle));
      this.$emit("boardUpdate", {
        type: "title",
        payload: titleCopy,
      });
      socketService.emit("send title", titleCopy);
    },
    toggleDashboard() {
      this.$emit("toggleDashboard");
    },
    removeMember(memberId) {
      const idx = this.boardMembers.findIndex(
        (member) => member._id === memberId
      );
      this.boardMembers.splice(idx, 1);
      this.saveMembers();
    },
    saveMembers() {
      const membersCopy = JSON.parse(JSON.stringify(this.boardMembers));
      this.$emit("boardUpdate", {
        type: "members",
        payload: membersCopy,
      });
      socketService.emit("send members", membersCopy);
    },
    addUser(userId) {
      const user = this.users.find((user) => user._id === userId);
      this.boardMembers.push(user);
      this.saveMembers();
    },
  },
  watch: {
    board: {
      immediate: true,
      handler() {
        this.boardTitle = JSON.parse(JSON.stringify(this.board.title));
        this.boardMembers = JSON.parse(JSON.stringify(this.board.members));
      },
      deep: true,
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
  created() {
    this.boardTitle = JSON.parse(JSON.stringify(this.board.title));
    this.boardMembers = JSON.parse(JSON.stringify(this.board.members));
    this.getTextWidth();
  },
};
</script>
