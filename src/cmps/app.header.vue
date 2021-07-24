<template>
  <nav class="header-navbar">
    <div class="header-controls-left">
      <router-link to="/" class="link-home"
        ><svg
          width="20"
          height="20"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.58579 10.4142C3.21071 10.7893 3 11.298 3 11.8284V19C3 20.1045 3.89543 21 5 21H10C10.5523 21 11 20.5523 11 20V14H13V20C13 20.5523 13.4477 21 14 21H19C20.1046 21 21 20.1045 21 19V11.8284C21 11.298 20.7893 10.7893 20.4142 10.4142L12.7071 2.70708C12.3166 2.31655 11.6834 2.31655 11.2929 2.70708L3.58579 10.4142ZM13 12C14.1046 12 15 12.8954 15 14V19H19V11.8284L12 4.8284L5 11.8284V19H9V14C9 12.8954 9.89543 12 11 12H13Z"
            fill="currentColor"
          ></path></svg
      ></router-link>
      <button class="btn-boards" @click="toggleBoardsMenu">
        <svg
          width="24"
          height="24"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
            fill="currentColor"
          ></path></svg
        ><span class="btn-boards-txt">Boards</span>
      </button>
      <boards-menu
        @removeBoard="removeBoard"
        v-click-outside="closeBoardsMenu"
        @createBoard="createBoard"
        :boards="boards"
        class="hideBoardsMenu"
        :class="boardsShowMenu"
        @closeBoardsMenu="closeBoardsMenu"
        ref="boardsmenu"
      ></boards-menu>
      <div
        class="headerSearchClosed"
        :class="{ headerSearchOpen: isSearchOpen }"
        @click="openSearch"
        v-click-outside="closeSearch"
      >
        <input
          v-if="!isSearchOpen"
          type="text"
          placeholder="Jump to..."
          class="header-search-input"
        />
        <input
          v-else
          type="text"
          v-model="filterBy"
          @input="setFilter"
          placeholder="Search..."
          class="header-search-input"
        />
        <span class="search-input-img">
          <svg
            v-if="!isSearchOpen"
            width="20"
            height="20"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            @click.stop="closeSearch"
            v-if="isSearchOpen"
            width="20"
            height="20"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        <transition name="fade">
          <search-boards
            :boardsForDisplay="boardsForDisplay"
            @closeSearch="closeSearch"
            v-if="isSearchOpen"
          ></search-boards>
        </transition>
      </div>
    </div>
    <div class="header-logo">
      <div>
        <img src="@/assets/img/logo.png" />
      </div>
      <span>Trailing</span>
    </div>
    <div class="header-controls-right">
      <button @click="login" class="user-login" v-if="!user._id">Login</button>
      <button
        class="btn-notifications"
        :style="{ backgroundColor: isNotified }"
        @click="toggleNotifications"
      >
        <svg
          width="20"
          height="20"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C11.4477 2 11 2.44772 11 3V3.078C10.2728 3.19668 9.65318 3.44603 9.1328 3.79295C8.39456 4.28511 7.91489 4.93416 7.60557 5.55279C7.29822 6.1675 7.14952 6.77011 7.07611 7.2106C7.039 7.43322 7.02007 7.62092 7.01035 7.75688C7.00549 7.82503 7.0029 7.88067 7.00153 7.92176C7.00085 7.94232 7.00046 7.95929 7.00025 7.9724L7.00005 7.98916L7.00001 7.99533L7 7.99786L7 7.99898C7 7.9995 7 8 8 8H7V11.723L4.14251 16.4855C3.95715 16.7944 3.95229 17.1792 4.1298 17.4927C4.30731 17.8062 4.63973 18 5 18H19C19.3603 18 19.6927 17.8062 19.8702 17.4927C20.0477 17.1792 20.0429 16.7944 19.8575 16.4855L17 11.723V8H16C17 8 17 7.9995 17 7.99898L17 7.99786L17 7.99533L17 7.98916L16.9997 7.9724C16.9995 7.95929 16.9992 7.94232 16.9985 7.92176C16.9971 7.88067 16.9945 7.82503 16.9896 7.75688C16.9799 7.62092 16.961 7.43322 16.9239 7.2106C16.8505 6.77011 16.7018 6.1675 16.3944 5.55279C16.0851 4.93416 15.6054 4.28511 14.8672 3.79295C14.3468 3.44603 13.7272 3.19668 13 3.078V3C13 2.44772 12.5523 2 12 2ZM9.00042 7.98839L9 8.00435V12C9 12.1812 8.95074 12.3591 8.85749 12.5145L6.76619 16H17.2338L15.1425 12.5145C15.0493 12.3591 15 12.1812 15 12V8.00436L14.9996 7.98839C14.999 7.97089 14.9977 7.9406 14.9947 7.89937C14.9888 7.81658 14.9765 7.69178 14.9511 7.5394C14.8995 7.22989 14.7982 6.8325 14.6056 6.44721C14.4149 6.06584 14.1446 5.71489 13.7578 5.45705C13.3773 5.20338 12.825 5 12 5C11.175 5 10.6227 5.20338 10.2422 5.45705C9.85544 5.71489 9.58511 6.06584 9.39443 6.44721C9.20178 6.8325 9.10048 7.22989 9.04889 7.5394C9.0235 7.69178 9.01118 7.81658 9.00527 7.89937C9.00233 7.9406 9.001 7.97089 9.00042 7.98839ZM14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19H14Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <button
        @click="toggleUserMenu"
        class="member-avatar-wrapper"
        v-if="user.username"
      >
        <avatar
          class="member-name"
          :username="user.fullname"
          :size="30"
          :inline="true"
          backgroundColor="#dfe1e6"
          color="#172b4d"
        ></avatar>
      </button>
    </div>
    <user-menu
      v-click-outside="closeUserMenu"
      class="hideUserMenu"
      :class="userMenuShow"
      @closeUserMenu="closeUserMenu"
      @logOut="logOut"
    ></user-menu>
    <notifications-list
      v-if="showNotifications"
      @close="toggleNotifications"
      @updateMentions="updateMentions"
      :boards="boards"
    />
  </nav>
</template>

<script>
import boardsMenu from "./boards.menu";
import avatar from "vue-avatar";
import ClickOutside from "vue-click-outside";
import userMenu from "./user.menu.vue";
import searchBoards from "./search.boards";
import notificationsList from "./notifications.list.vue";
import { socketService } from "@/services/socket.service.js";
export default {
  components: {
    notificationsList,
    boardsMenu,
    avatar,
    userMenu,
    searchBoards,
  },
  props: {
    boards: Array,
    users: Array,
    user: Object,
  },
  data() {
    return {
      isBoardsShow: false,
      isUserMenu: false,
      isSearchOpen: false,
      showNotifications: false,
      filterBy: "",
    };
  },
  computed: {
    isNotified() {
      if (!this.user.mentions) return "rgba(255, 255, 255, 0.3)";
      return this.user.mentions.some((mention) => !mention.isRead)
        ? "#EB5A46"
        : "rgba(255, 255, 255, 0.3)";
    },
    boardsShowMenu() {
      return { showBoardsMenu: this.isBoardsShow };
    },
    userMenuShow() {
      return { showUserMenu: this.isUserMenu };
    },
    searchOpen() {
      return { headerSearchOpen: this.isSearchOpen };
    },
    boardsForDisplay() {
      return this.$store.getters.boardsForDisplay;
    },
  },
  directives: {
    ClickOutside,
  },
  methods: {
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: "removeBoard", boardId });
    },
    setFilter() {
      this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
    },
    openSearch() {
      this.isSearchOpen = true;
    },
    closeSearch() {
      this.filterBy = "";
      this.$store.commit({ type: "setFilter", filterBy: "" });
      this.isSearchOpen = false;
    },
    login() {
      this.$router.push("/login");
    },
    closeBoardsMenu() {
      this.isBoardsShow = false;
      this.$nextTick(() => (this.$refs.boardsmenu.isCreateOpen = false));
    },
    closeUserMenu() {
      this.isUserMenu = false;
    },
    toggleBoardsMenu() {
      this.isBoardsShow = !this.isBoardsShow;
    },
    toggleUserMenu() {
      this.isUserMenu = !this.isUserMenu;
    },
    createBoard(board) {
      this.$emit("createBoard", board);
    },
    logOut() {
      this.$emit("logOut");
    },
    updateMentions(mentions) {
      const userToUpdate = JSON.parse(JSON.stringify(this.user));
      userToUpdate.mentions = mentions;
      console.log(userToUpdate);
      socketService.emit("send mentions", userToUpdate);
      this.$store.dispatch("updateUser", { userToUpdate });
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
};
</script>
