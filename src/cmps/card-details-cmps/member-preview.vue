<template>
  <section class="member-preview" @click="toggleMember(member._id)">
    <div class="inner-container">
      <avatar
        :username="member.fullname"
        :size="32"
        :inline="true"
        :style="{
          backgroundColor: '#dfe1e6',
          color: '#172b4d',
        }"
      >
      </avatar>
      <span class="member-txt">{{ member.fullname }} </span>
      <span class="member-txt" v-if="member.username">
        ({{ member.username }})
      </span>
    </div>
    <span v-if="assigned" class="icon-sm icon-v"></span>
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  components: {
    avatar,
  },
  props: {
    member: Object,
    cardMembers: Array,
  },
  data() {
    return {
      membersToEdit: this.cardMembers || [],
    };
  },
  computed: {
    assigned() {
      const isAssigned = this.cardMembers.some(
        (member) => member._id === this.member._id
      );
      return isAssigned;
    },
  },
  methods: {
    toggleMember(memberId) {
      const idx = this.membersToEdit.findIndex(
        (member) => member._id === memberId
      );
      var currTxt
      if (idx === -1) {
        this.membersToEdit.push(this.member);
        currTxt = ` added ${this.member.fullname} `
      } else {
        this.membersToEdit.splice(idx, 1);
        currTxt = ` removed ${this.member.fullname} `
      }
      const activityTxt = currTxt
      this.updateMembers(activityTxt);
    },
    updateMembers(activityTxt) {
      this.$emit("updateMembers", {newMembers:this.membersToEdit,activityTxt});
    },
  },
};
</script>

<style>
</style>