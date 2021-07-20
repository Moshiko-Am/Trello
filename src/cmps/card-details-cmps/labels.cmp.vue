<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h3 class="main-item-title">Labels</h3>
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
        <span class="icon-sm icon-add"></span>
        <labelsList
          :optionsLabels="optionsLabels"
          :cardLabels="cardLabels"
          @updateLabels="updateLabels"
          @closePopups="closePopups"
          v-if="isAddingLabel"
        />
      </div>
      <!-- </transition-group> -->
    </div>
  </div>
</template>

<script>
import labelsList from "../labels/labels.list.vue";
export default {
  data(){
    return {
      isAddingLabel: false
    }
  },
  props: {
    cardLabels:Array,
    optionsLabels:Array,
    labels: Array,
  },
  components: {
    labelsList,
  },
  methods:{
    toggleLabels(){
      this.isAddingLabel = !this.isAddingLabel
    }
  }
};
</script>

<style>
</style>