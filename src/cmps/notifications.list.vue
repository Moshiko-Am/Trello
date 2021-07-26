<template>
  <section class="notifications-list">
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Notifications</header>
    <div class="filter-options">
      <span v-if="!filtered" @click="toggleFilter">Filter by unread</span>
      <span v-else @click="toggleFilter">View all</span>
      <span @click="readAll">Mark all as read</span>
    </div>
    <div class="notifications-container" v-if="mentions">
      <!-- {{mentions}} -->
      <template v-for="mention in mentionsForDisplay">
        <notification-preview
          v-if="mention.cTitle"
          :mention="mention"
          :boards="boards"
          :key="mention.createdAt"
          @toggleRead="toggleRead(mention.id)"
        />
      </template>
    </div>
    <h3 v-else>No unread notifications</h3>
  </section>
</template>

<script>
import notificationPreview from "./notification-preview.vue";

export default {
  props: {
    boards: Array,
    mentions: Array,
  },
  data() {
    return {
      // mentionsToEdit: JSON.parse(JSON.stringify(this.mentions)),
      filtered: false,
    };
  },
  components: {
    notificationPreview,
  },
  computed: {
    mentionsForDisplay() {
      var newMentions;
      if (this.filtered) {
        newMentions = this.mentions.filter((mention) => !mention.isRead);
      } else newMentions = this.mentions;

      return newMentions.map((mention) => {
        const board = this.boards.find((board) => board._id === mention.bId);
        if (!board) return mention;
        const group = board.groups.find((group) => group.id === mention.gId);
        if (!group) return mention;
        const card = group.cards.find((card) => card.id === mention.cId);
        var style =
          board.style.type === "backgroundColor"
            ? `background-color: ${board.style.content}`
            : `background-image: url(${board.style.preview})`;
        if (board) mention.bTitle = board.title;
        if (group) mention.gTitle = group.title;
        if (card) mention.cTitle = card.title;
        mention.style = style;
        mention.isDark = board.style.props.isDark;
        return mention;
      });
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    toggleRead(mentionId) {
      const mentionsCopy = JSON.parse(JSON.stringify(this.mentions));
      const idx = mentionsCopy.findIndex((mention) => mention.id === mentionId);
      mentionsCopy[idx].isRead = !mentionsCopy[idx].isRead;
      this.$emit("updateMentions", mentionsCopy);
    },
    toggleFilter() {
      this.filtered = !this.filtered;
    },
    readAll() {
      const mentionsCopy = JSON.parse(JSON.stringify(this.mentions));
      mentionsCopy.forEach((mention) => (mention.isRead = true));
      this.$emit("updateMentions", mentionsCopy);
    },
  },
};
</script>