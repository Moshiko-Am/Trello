<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <span class="icon-md icon-member"></span>
      <h3 class="main-item-title">Members</h3>
    </div>
    <div class="members-container">
      <div
        v-for="member in members"
        :key="member._id"
        class="memberDisplay"
      >
        <avatar
          :username="member.fullname"
          :size="32"
          inline
          color="black"
          :title="member.fullname"
        ></avatar>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "vue-avatar";

export default {
    props: {
        members:Array,
    },
    components: {
        avatar,
    }
};
</script>