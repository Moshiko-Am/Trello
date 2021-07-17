<template>
  <section class="board-header-container">
    <div class="board-header-controls">
      <div class="board-header-title">
        <textarea
          rows="1"
          cols="12"
          class="title-textArea"
          @input="saveTitle"
          v-model="boardTitle"
        ></textarea>
      </div>
      <span class="board-header-divider">|</span>
      <div class="board-header-members">
        <span
          v-for="member in boardMembers"
          :key="member._id"
          class="members-list"
        >
          <avatar
            class="member-name"
            :username="member.fullname"
            :size="28"
            :inline="true"
            :style="{ margin: '2px' }"
          ></avatar>
          <span class="remove-member" @click="removeMember(member._id)">X</span>
        </span>
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
      <button class="btn-dashboard">Dashboard</button>
    </div>
    <button class="btn-show-menu" @click="toggleMenu">
      <span class="icon-sm icon-dots-menu"></span>
      <span class="menu-show-txt">Show menu</span>
    </button>
    <side-menu
      @bgColor="bgColor"
      @chooseBg="chooseBg"
      @closeMenu="toggleMenu"
      class="hideMenu"
      :class="menuShow"
      :board="board"
    ></side-menu>
  </section>
</template>

<script>
import sideMenu from "./side.menu.vue";
import avatar from "vue-avatar";
import users from "./users.vue";
export default {
  components: {
    sideMenu,
    avatar,
    users,
  },
  data() {
    return {
      isMenuShow: false,
      boardTitle: null,
      boardMembers: null,
      isInviteShow: false,
    };
  },
  computed: {
    menuShow() {
      return { showMenu: this.isMenuShow };
    },
    board() {
      return this.$store.getters.board;
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    bgColor(style) {
      this.$emit("bgColor", style);
    },
    chooseBg(style) {
      this.$emit("updateBoard", style);
    },
    toggleMenu() {
      this.isMenuShow = !this.isMenuShow;
    },
    toggleInvite() {
      this.isInviteShow = !this.isInviteShow;
    },
    saveTitle() {
      const titleCopy = JSON.parse(JSON.stringify(this.boardTitle));
      this.$emit("boardUpdate", {
        type: "title",
        payload: titleCopy,
      });
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
    },
    addUser(userId) {
      const user = this.users.find((user) => user._id === userId);
      this.boardMembers.push(user);
      this.saveMembers();
    },
  },
  created() {
    this.boardTitle = JSON.parse(
      JSON.stringify(this.$store.getters.board.title)
    );
    this.boardMembers = JSON.parse(
      JSON.stringify(this.$store.getters.board.members)
    );
  },
};
</script>
