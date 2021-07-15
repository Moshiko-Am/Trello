<template>
  <section class="label-preview">
    <div class="label-option" @click="toggleLabel(label.id)" :style="{backgroundColor : label.color}">
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
  created(){
      console.log('this.label',this.label);
      console.log('this.cardLabel',this.cardLabels);
  },
  computed: {
      labeled(){
          return this.cardLabels.some(labelId => labelId === this.label.id)
      }
  }
//   methods: {
//     toggleLabel(labelId) {
//       if (this.labelsToEdit.includes(labelId)) {
//         const idx = this.labelsToEdit.findIndex(
//           (label) => labelId === label.id
//         );
//       }
//     },
//     changeLabelTitle() {},
//   },
};
</script>