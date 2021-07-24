<template>
  <section class="members-list-cmp" @click.stop>
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Board Members</header>
    <h4>MEMBERS</h4>
    <div class="member-options">
      <div v-for="member in boardMembers" :key="member._id">
        <member-preview
          :member="member"
          :cardMembers="membersToEdit"
          @updateMembers="updateMembers"
          @updateMentions ="updateMentions"
        />
      </div>
    </div>
  </section>
</template>

<script>
import memberPreview from "./member-preview.vue";

export default {
  components: {
    memberPreview,
  },
  props: {
    boardMembers: Array,
    cardMembers: Array,
  },
  data() {
    return {
      membersToEdit: this.cardMembers || [],
    };
  },
  methods: {
    updateMembers({newMembers,activityTxt}) {
      this.membersToEdit = newMembers;
      this.emitMembers(activityTxt);
    },
    updateMentions(mention){
      this.$emit('updateMentions' , mention)
    },
    emitMembers(activityTxt) {
      this.$emit("updateMembers", {members:this.membersToEdit,activityTxt});
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>