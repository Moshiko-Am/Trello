<template>
  <section class="user-menu-container">
    <div class="user-menu-header">
      <h4>Account</h4>
      <button class="icon-md icon-x" @click="closeUserMenu"></button>
    </div>
    <hr />
    <div class="user-menu-content">
      <div class="user-menu-name">
        <avatar
          v-if="user.username"
          class="member-name"
          :username="user.fullname"
          :size="40"
          :inline="true"
          backgroundColor="#dfe1e6"
          color="#172b4d"
        ></avatar>
        <avatar
          v-else
          class="member-name"
          username="Guest User"
          :size="40"
          :inline="true"
          backgroundColor="#dfe1e6"
          color="#172b4d"
        ></avatar>
        <span class="user-menu-username" v-if="user.username">{{
          user.fullname
        }}</span>
        <span class="user-menu-username" v-else>Guest user</span>
      </div>
      <hr />
      <div class="user-menu-actions">
        <button
          @click="login"
          class="user-logout"
          v-if="user.username === 'guest'"
        >
          Login
        </button>
        <button @click="logOut" class="user-logout" v-else>Log out</button>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  components: {
    avatar,
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    logOut() {
      this.$emit("logOut");
      this.closeUserMenu();
    },
    closeUserMenu() {
      this.$emit("closeUserMenu");
    },
  },
};
</script>
