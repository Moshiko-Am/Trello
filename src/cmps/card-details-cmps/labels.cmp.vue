<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h3 class="main-item-title">Labels</h3>
    </div>
    <transition-group class="labels-container" name="list-complete">
      <div
        v-for="label in labels"
        :key="label.id"
        class="labelDisplay list-complete-item"
        :style="{ backgroundColor: label.color }"
      >
        {{ label.title }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    labels: Array,
  },
};
</script>

<style>
</style>