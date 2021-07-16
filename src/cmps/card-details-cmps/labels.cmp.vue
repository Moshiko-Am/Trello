<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h3 class="main-item-title">Labels</h3>
    </div>
    <div class="labels-container">
      <div
        v-for="label in labels"
        :key="label.id"
        class="labelDisplay"
        :style="{ backgroundColor: label.color }"
      >
        {{ label.title }}
      </div>
    </div>
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