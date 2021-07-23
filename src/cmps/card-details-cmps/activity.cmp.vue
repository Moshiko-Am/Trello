<template>
  <div class="card-main-item">
    <div class="main-item-header activity">
      <div class="inner-header">
        <span class="icon-lg icon-activity"></span>
        <h3 class="main-item-title">Activity</h3>
      </div>
      <button class="card-sidebar-btn" @click="toggleDetails">
        <span v-if="!showDetails">Show Details</span
        ><span v-else>Hide Details</span>
      </button>
    </div>
    <div v-if="activities.length && showDetails">
      <activity-preview
        v-for="activity in activities"
        render="card"
        :key="activity.id"
        :activity="activity"
      />
    </div>
    <div v-else-if="activities.length">
      <template v-for="index in 1">
        <activity-preview
          :activity="activities[index]"
          :key="activities[index].id"
        />
      </template>
    </div>
  </div>
</template>

<script>
import activityPreview from "./activity-preview.vue";

export default {
  props: {
    activities: Array,
  },
  data() {
    return {
      showDetails: false,
    };
  },
  components: {
    activityPreview,
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>
