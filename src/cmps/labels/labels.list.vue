<template>
  <section class="labels-list" @click.stop="">
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Labels</header>
    <h3>LABELS</h3>
    <div class="label-options">
      <div v-for="label in optionsLabels" :key="label.id">
        <label-preview :label="label" :cardLabels="labelsToEdit" @editLabel="editLabel" @updateLabels="updateLabels"/>
      </div>
    </div>
    <button class="create-label-btn" @click="toggleCreateLabel">Create a new label</button>
  </section>
</template>

<script>
import labelPreview from './label-preview.vue'

export default {
    props:{
        optionsLabels:Array,
        cardLabels:Array,
    },
    data(){
      return{
        labelsToEdit:this.cardLabels || []
      }
    },
    components:{
      labelPreview
    },
    methods:{
      editLabel(label){
        this.$emit('editLabel', label)
      },
      updateLabels(newLabels){
        this.labelsToEdit = newLabels
        this.emitLabels()
      },
      emitLabels(){
        this.$emit('updateLabels', this.labelsToEdit)
      },
      close(){
        this.$emit('closePopups')
      },
      toggleCreateLabel(){
        this.$emit('toggleCreateLabel')
      }
    }
}
</script>