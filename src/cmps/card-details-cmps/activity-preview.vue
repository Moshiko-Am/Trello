<template>
  <section class="activity-preview">
    <div class="inner-container">
      <avatar :username="activity.byMember.fullname" inline :size="32"></avatar>
      <div class="activity-info">
        <div>
          <span>{{ activity.byMember.fullname }}</span>
          {{activity.txt}} 
          <span v-if="render === 'menu' && activity.isSpecific">on card "{{activity.cTitle}}"</span>
          <span v-if="render === 'card'" >on this card</span>
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
        activity: Object,
        render:String
    },
    components: {
        avatar,
    }

};
</script>