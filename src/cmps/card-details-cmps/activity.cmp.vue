<template>
  <div class="card-main-item">
    <div class="main-item-header activity">
      <div class="inner-header">
        <span class="icon-lg icon-activity"></span>
        <h3 class="main-item-title">Activity</h3>
      </div>
      <button class="card-sidebar-btn">Show Details</button>
    </div>
      <activity-preview v-for="activity in activities" :key="activity.id" :activity="activity" />
  </div>
</template>

<script>
import activityPreview from './activity-preview.vue'

export default {
    props:{
        activities:Array,
    },
    components:{
      activityPreview
    }
};
</script>