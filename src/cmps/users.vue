<template>
  <section class="members-list-container">
    <header>Members</header>
    <span class="icon-sm icon-x" @click="closeInvite"></span>
    <hr />
    <div class="users-details">
      <h4 class="members-list-header" v-if="!onlyBoard">Invite Members</h4>
      <h4 class="members-list-header" v-else>Board Members</h4>
      <single-user
        @addUser="addUser"
        :user="user"
        v-for="user in usersToShow"
        :key="user._id"
      />
    </div>
  </section>
</template>

<script>
import singleUser from "./single.user.vue";
export default {
  components: {
    singleUser,
  },
  props: {
    board: Object,
    card: Object,
    onlyBoard: Boolean,
  },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    usersToShow() {
      if (!this.onlyBoard) {
        return this.users.filter((user) => {
          if (!this.board.members.some((member) => member._id === user._id))
            return user;
        });
      } else {
        if (!this.card.members) return this.board.members;
        return this.board.members.filter((user) => {
          if (!this.card.members.some((member) => member._id === user._id))
            return user;
        });
      }
    },
  },
  methods: {
    addUser(userId) {
      this.$emit("addUser", userId);
    },
    closeInvite() {
      this.$emit("closeInvite");
    },
    toggleMember(){
      this.$emit('toggleMember')
    }
  },
  created() {
    this.users = this.$store.getters.users;
  },
};
</script>
