<template>
  <div class="checklists">
    <transition-group name="fade">
      <div
        class="card-main-item"
        v-for="(checklist, cIdx) in checklists"
        :key="checklist.id"
      >
        <checklist-preview
          :checklist="checklist"
          @updateChecklist="updateCl($event, cIdx)"
          @removeCl="removeCl(cIdx)"
          @emitActivity="emitActivity"
        />
      </div>
    </transition-group>
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
    emitActivity(activity) {
      console.log('activity',activity);
      this.$emit("emitActivity", activity);
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
