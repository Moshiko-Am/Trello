<template>
  <section class="label-preview">
    <div
      class="label-option"
      @click="toggleLabel(label.id)"
      :style="{ backgroundColor: label.color }"
    >
      <span v-if="label.title">{{ label.title }}</span>
      <span v-if="labeled" class="icon-sm icon-v"></span>
    </div>
    <span class="icon-sm icon-edit"></span>
  </section>
</template>

<script>
export default {
  props: {
    label: Object,
    cardLabels: Array,
  },
  data() {
    return {
      labelsToEdit: this.cardLabels.slice(),
    };
  },
  computed: {
    labeled() {
      return this.cardLabels.some((labelId) => labelId === this.label.id);
    },
  },
  methods: {
    toggleLabel(labelId) {
      if(this.labelsToEdit.includes(labelId)) {
        const idx = this.labelsToEdit.findIndex(label => label===labelId)
        this.labelsToEdit.splice(idx ,1)
      } else {
        this.labelsToEdit.push(labelId)
      }
      this.updateLabels()
    },
    changeLabelTitle() {

    },
    updateLabels(){
      this.$emit('updateLabels' , this.labelsToEdit)
    }
  },
};
</script>