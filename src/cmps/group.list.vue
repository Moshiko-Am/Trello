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
  methods: {
    saveGroups(savedGroup) {
      console.log('savedGroup',savedGroup);
      const groupsToEdit = JSON.parse(JSON.stringify(this.groups));
      const idx = groupsToEdit.findIndex((group) => {
        return group.id === savedGroup.id;
      });
      groupsToEdit.splice(idx, 1, savedGroup);
      console.log('from group list',groupsToEdit);
      this.$emit("boardUpdate", {
        type: "groups",
        payload: groupsToEdit,
      });
    },
  },
};
</script>
