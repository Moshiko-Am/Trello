<template>
  <section class="card-preview" v-if="card.id">
    <div
      @click.stop="toggleLabels"
      class="preview-labels-container"
      v-if="card.labelIds"
    >
      <div
        v-for="label in labelsForDisplay"
        :key="label.id"
        class="label"
        :style="{ backgroundColor: label.color }"
      >
        <span v-if="showLabels">{{ label.title }}</span>
      </div>
    </div>
    <span>{{ card.title }}</span>
    <div
      class="preview-checklist-container"
      v-if="card.checklists && card.checklists.length"
    >
      <span class="icon-sm icon-checklist"></span>
      <span>{done/undone}</span>
    </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            showLabels : false,
        }
    },
    props: {
        card: Object,
        labels:Array,
    },
    computed: {
        labelsForDisplay(){
            return this.labels.filter(label => {
            if(this.card.labelIds.includes(label.id)) return label
            })
        },
    },
    methods: {
        toggleLabels(){
            this.showLabels = !this.showLabels
        }
    }
}
</script>