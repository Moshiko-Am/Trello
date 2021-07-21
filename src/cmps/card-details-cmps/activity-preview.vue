<template>
  <section class="activity-preview">
    <div class="inner-container">
      <avatar :username="activity.byMember.fullname" inline :size="32"></avatar>
      <div class="activity-info">
        <div>
          <span>{{ activity.byMember.fullname }}</span>
          {{activity.txt}}
        </div>
        <p>{{ activity.createdAt | moment("calendar")}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from 'vue-avatar'

export default {
    props: {
        activity: Object
    },
    components: {
        avatar,
    }

};
</script>