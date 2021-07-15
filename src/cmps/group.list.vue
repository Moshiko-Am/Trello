<template>
  <section v-if="groups" class="group-list">
    <div v-for="group in groups" v-bind:key="group.id" class="group-wrapper">
      <div class="group">
        <group-details
          :group="group"
          :labels="labels"
          @saveGroup="saveGroups"
        />
      </div>
    </div>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import groupDetails from "@/cmps/group.details.vue";
export default {
  props: {
    groups: Array,
    labels: Array,
  },
  components: {
    groupDetails,
  },
  created() {
    this.groupsForEdit = JSON.parse(JSON.stringify(this.groups));
  },
  methods: {
    saveGroups(savedGroup) {
      const idx = this.groupsForEdit.findIndex((group) => {
        group.id = savedGroup.id;
      });
      this.groupsForEdit.splice(idx, 1, savedGroup);
      this.$emit("boardUpdate", {
        type: "groups",
        payload: this.groupsForEdit,
      });
    },
  },
};
</script>
