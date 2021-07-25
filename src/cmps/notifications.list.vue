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
      mentionsToEdit: JSON.parse(JSON.stringify(this.mentions)),
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
        const group = board.groups.find((group) => group.id === mention.gId);
        const card = group.cards.find((card) => card.id === mention.cId);
        var style =
          board.style.type === "backgroundColor"
            ? `background-color: ${board.style.content}`
            : `background-image: url(${board.style.preview})`;
        mention.bTitle = board.title;
        mention.gTitle = group.title;
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
      const idx = this.mentions.findIndex(
        (mention) => mention.id === mentionId
      );
      this.mentions[idx].isRead = !this.mentions[idx].isRead;
      const mentionsCopy = JSON.parse(JSON.stringify(this.mentions));
      this.$emit("updateMentions", mentionsCopy);
    },
    toggleFilter() {
      this.filtered = !this.filtered;
    },
    readAll() {
      this.mentions.forEach((mention) => (mention.isRead = true));
      const mentionsCopy = JSON.parse(JSON.stringify(this.mentions));
      this.$emit("updateMentions", mentionsCopy);
    },
  },
};
</script>