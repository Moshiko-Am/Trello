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
    updateMembers(newMembers) {
      this.membersToEdit = newMembers;
      this.emitMembers();
    },
    emitMembers() {
      this.$emit("updateMembers", this.membersToEdit);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>