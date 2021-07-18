<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h3 class="main-item-title">Members</h3>
    </div>
    <transition-group class="members-container" name="list-complete">
      <div v-for="member in members" :key="member._id" class="memberDisplay list-complete-item" :style="{'margin-right':'0'}">
        <avatar
          :username="member.fullname"
          :size="32"
          inline
          color="black"
          :title="member.fullname"
        ></avatar>
      </div>
    </transition-group>
  </div>
</template>

<script>
import avatar from "vue-avatar";

export default {
  props: {
    members: Array,
  },
  components: {
    avatar,
  },
};
</script>