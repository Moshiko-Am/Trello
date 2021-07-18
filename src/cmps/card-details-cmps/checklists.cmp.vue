<template>
  <div class="checklists">
    <div
      class="card-main-item"
      v-for="(checklist, cIdx) in checklists"
      :key="checklist.id"
    >
      <checklist-preview
        :checklist="checklist"
        @updateChecklist="updateCl($event, cIdx)"
        @removeCl="removeCl(cIdx)"
      />
    </div>
  </div>
</template>

<script>
import checklistPreview from "./checklist-preview.vue";
export default {
  props: {
    checklists: Array,
  },
  components: {
    checklistPreview,
  },
  data() {
    return {
      checklistsToEdit: JSON.parse(JSON.stringify(this.checklists)),
      addingTodo: false,
    };
  },
  computed: {},
  methods: {
    updateCl(checklist, cIdx) {
      this.checklistsToEdit.splice(cIdx, 1, checklist);
      this.updateChecklists();
    },
    removeCl(cIdx) {
      this.checklistsToEdit.splice(cIdx, 1);
      this.updateChecklists();
    },
    updateChecklists() {
      const clsCopy = JSON.parse(JSON.stringify(this.checklistsToEdit));
      this.$emit("updateChecklists", clsCopy);
    },
  },
  watch: {
    checklists: {
      handler(newVal) {
        this.checklistsToEdit = newVal;
      },
      deep: true,
    },
  },
};
</script>
