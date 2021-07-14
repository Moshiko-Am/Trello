<template>
  <section class="card-preview" v-if="card.id">
      <div class="preview-labels-container" v-if="card.labelIds">
          <div v-for="label in card.labelIds" :key="label" class="label">
              {{label}}
          </div>
      </div>
      <span>{{card.title}}</span>
      <div class="preview-checklist-container" v-if="card.checklists && card.checklists.length">
          <span class="icon-sm icon-checklist"></span>
          <span>{done/undone}</span>
      </div>
  </section>
</template>

<script>
export default {
    props: {
        card: Object
    },
    created(){
        console.log('this.card',this.card);
    }
}
</script>