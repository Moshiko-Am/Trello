<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h4 class="main-item-title">LABELS</h4>
    </div>
    <div class="labels-container">
      <!-- <transition-group class="labels-container" name="list-complete"> -->
      <div
        v-for="label in labels"
        :key="label.id"
        class="labelDisplay list-complete-item"
        :style="{ backgroundColor: label.color }"
      >
        {{ label.title }}
      </div>
      <div class="add-label-btn" @click="toggleLabels">
        <span class="icon-sm icon-add"> </span>
        <labels-list
          :optionsLabels="board.labels"
          :cardLabels="card.labelIds"
          @updateLabels="updateLabels"
          @closePopups="toggleLabels"
          @toggleCreateLabel="toggleCreateLabel"
          @editLabel="setLabelToEdit"
          v-if="isAddingLabel"
        />
        <create-labels
          v-if="isCreateLabel"
          @close="isCreateLabel = false"
          :label="labelToEdit"
          @createLabel="createLabel"
          @removeLabel="removeLabel"
          @back="toggleCreateLabel"
        />
      </div>
      <!-- </transition-group> -->
    </div>
  </div>
</template>

<script>
import labelsList from "../labels/labels.list.vue";
import createLabels from "../create.labels.vue";

export default {
  data() {
    return {
      isAddingLabel: false,
      isCreateLabel: false,
      labelToEdit: null,
    };
  },
  props: {
    cardLabels: Array,
    card: Object,
    optionsLabels: Array,
    labels: Array,
  },
  components: {
    labelsList,
    createLabels,
  },
  methods: {
    toggleLabels() {
      this.isAddingLabel = !this.isAddingLabel;
    },
    setLabelToEdit(label) {
      this.labelToEdit = label;
      this.toggleCreateLabel();
    },
    createLabel(label) {
      this.labelToEdit = null;
      this.$emit("createLabel", label);
      this.toggleCreateLabel();
    },
    removeLabel(labelId) {
      this.labelToEdit = null;
      this.toggleCreateLabel();
      this.$emit("removeLabel", labelId);
    },
    toggleCreateLabel() {
      this.isAddingLabel = this.isCreateLabel;
      this.isCreateLabel = !this.isCreateLabel;
    },
    updateLabels(labels) {
      this.$emit('updateLabels', labels)
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
};
</script>

<style>
</style>