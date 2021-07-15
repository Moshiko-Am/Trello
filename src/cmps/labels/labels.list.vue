<template>
  <section class="labels-list" @click.stop="">
    <header>Labels</header>
    <hr>
    <h3>LABELS</h3>
    <div class="label-options">
      <div v-for="label in optionsLabels" :key="label.id">
        <label-preview :label="label" :cardLabels="cardLabels" @updateLabels="updateLabels"/>
      </div>
    </div>
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
        labelsToEdit:[...this.cardLabels]
      }
    },
    components:{
      labelPreview
    },
    methods:{
      updateLabels(newLabels){
        this.labelsToEdit = newLabels
        this.emitLabels()
      },
      emitLabels(){
        this.$emit('updateLabels', this.labelsToEdit)
      }
    }
}
</script>