<template>
  <section class="labels-list">
    <header>Labels</header>
    <hr>
    <h3>LABELS</h3>
    <div class="label-options">
      <div v-for="label in optionsLabels" :key="label.id">
        <label-preview :label="label" :cardLabels="cardLabels"/>
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
      // toggleLabel(labelId){
      //   // if(this.labelsToEdit.includes(labelId)) {
      //   //   const idx = this.labelsToEdit.findIndex(label => labelId === label.id)
      //   // }
      // },
      // changeLabelTitle(){
        // 
      // }
    }
}
</script>