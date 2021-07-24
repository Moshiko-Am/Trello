<template>
  <section class="notification-preview" :class="{ unread: unread }">
    <button
      class="read-btn"
      @click="toggleRead"
      :class="{ unread: unread }"
    ></button>
    <div class="notification-container">
      <div class="notification-card" :style="style">
        <div class="mention-card-preview">
          <span>{{ titles.cTitle }}</span>
          <span class="mention-due-date" v-if="mention.dueDate" :style="isSoon">
              <span class="icon-sm icon-date"></span>
              {{mention.dueDate.slice(5)}}
              </span>
        </div>
        <span class="board-group" :class="{ dark: !titles.isDark }"
          ><span>{{ titles.bTitle }}</span
          >: {{ titles.gTitle }}</span
        >
      </div>
      <div class="notification-info">
        <div class="mention-by-member">
          <avatar
            :username="mention.byMember"
            :size="24"
            backgroundColor="#dfe1e6"
          ></avatar>
          <span>{{ mention.byMember }}</span>
        </div>
        <div class="mention-txt">
          <div><span class="icon-sm icon-assign"></span></div>
          <span>{{ mention.txt }} you</span
          ><span class="mention-date">{{
            mention.createdAt | moment("calendar")
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  props: {
    mention: Object,
    boards: Array,
  },
  components: {
    avatar,
  },
  computed: {
    isSoon() {
      const board = this.boards.find((board) => board._id === this.mention.bId);
      const group = board.groups.find((group) => group.id === this.mention.gId);
      const card = group.cards.find((card) => card.id === this.mention.cId);
      if (card.isCompleted)
        return { backgroundColor: "#61BD4F", color: "white" };
      const currDate = Date.parse(new Date());
      const dueDate = Date.parse(card.dueDate);
      const timeLeft = dueDate - currDate;
      if (timeLeft < 0) return { backgroundColor: "#ec9488", color: "white" };
      else if (timeLeft < 86400000)
        return { backgroundColor: "#F2D600", color: "#172B4D" };
      else timeLeft < 172800000;
      return { backgroundColor: "rgba(9, 30, 66, 0.08)", color: "#5e6c84" };
    },
    titles() {
      const board = this.boards.find((board) => board._id === this.mention.bId);
      const group = board.groups.find((group) => group.id === this.mention.gId);
      const card = group.cards.find((card) => card.id === this.mention.cId);
      var style =
        board.style.type === "backgroundColor"
          ? `background-color: ${board.style.content}`
          : `background-image: url(${board.style.preview})`;
      return {
        bTitle: board.title,
        gTitle: group.title,
        cTitle: card.title,
        style,
        isDark: board.style.props.isDark,
      };
    },
    style() {
      return this.titles.style;
    },
    unread() {
      return !this.mention.isRead;
    },
  },
  methods: {
    toggleRead() {
      this.$emit("toggleRead");
    },
  },
};
</script>