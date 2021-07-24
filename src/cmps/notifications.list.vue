<template>
  <section class="notifications-list">
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Notifications</header>
    <div class="filter-options">
      <span>Filter by unread</span>
      <span>Mark all as read</span>
    </div>
    <div class="notifications-container" v-if="mentions">
      <notification-preview
        v-for="(mention,idx) in mentions"
        :mention="mention"
        :boards="boards"
        :key="mention.createdAt"
        @toggleRead="toggleRead(idx)"
      />
    </div>
  </section>
</template>

<script>
import notificationPreview from "./notification-preview.vue";

export default {
  props: {
    boards: Array,
  },
  data(){
      return {
          mentions : JSON.parse(JSON.stringify(this.$store.getters.user.mentions))
      }
  },
  components: {
    notificationPreview,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    toggleRead(idx){
        this.mentions[idx].isRead = !this.mentions[idx].isRead
        const mentionsCopy = JSON.parse(JSON.stringify(this.mentions))
        this.$emit('updateMentions', mentionsCopy)
    }
  },
};
</script>