<template>
  <div class="card-main-item">
    <div class="main-item-header activity">
      <div class="inner-header">
        <span class="icon-lg icon-activity"></span>
        <h3 class="main-item-title">Activity</h3>
      </div>
      <button class="card-sidebar-btn">Show Details</button>
    </div>
      <div>
          {{activities}}
      </div>
  </div>
</template>

<script>
export default {
    props:{
        activities:Array,
    }
};
</script>