<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h4 class="main-item-title">MEMBERS</h4>
    </div>
    <div class="members-container">
      <div
        v-for="member in members"
        :key="member._id"
        class="memberDisplay list-complete-item"
        :style="{ 'margin-right': '0' }"
      >
        <avatar
          :username="member.fullname"
          :size="32"
          inline
          color="black"
          :title="member.fullname"
        ></avatar>
      </div>
      <div class="add-member-btn list-complete-item">
        <span class="icon-sm icon-add" @click="toggleAddingMember"></span>
      </div>
      <members-list
        :cardMembers="members"
        :boardMembers="boardMembers"
        class="in-cmp"
        v-if="isAddingMember"
        @close="toggleAddingMember"
        @updateMembers="updateMembers"
      />
    </div>
  </div>
</template>

<script>
import avatar from "vue-avatar";
import membersList from "./members.list.vue";
export default {
  props: {
    members: Array,
  },
  data(){
    return{
      isAddingMember:false
    }
  },
  components: {
    avatar,
    membersList,
  },
  computed: {
    boardMembers() {
      return this.$store.getters.board.members;
    },
  },
  methods:{
    toggleAddingMember(){
      this.isAddingMember = !this.isAddingMember
    },
    updateMembers(members){
      this.$emit('updateMembers', members)
    }
  }
};
</script>