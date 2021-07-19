<template>
  <section
    class="card-preview-container"
    v-click-outside="closeQuickEdit"
    :class="{ 'quick-edit-card': isQuickEdit }"
  >
    <section class="card-preview-inner-container">
      <section
        class="card-preview"
        v-if="card.id"
        :style="!isCover"
        @mouseenter="toggleHover"
        @mouseleave="toggleHover"
      >
        <div v-if="card.attachments && card.attachments.length">
          <div
            :key="attachment[0].id"
            class="card-cover"
            v-if="isCover"
            :style="isCover"
          ></div>
        </div>
        <div
          @click.stop="toggleLabels"
          class="preview-labels-container"
          v-if="card.labelIds"
        >
          <div
            v-for="label in labelsForDisplay"
            :key="label.id"
            class="label"
            :style="{ backgroundColor: label.color }"
            :class="{ shown: openLabels }"
          ></div>
        </div>
        <span
          v-if="cardHover"
          class="icon-sm icon-edit"
          @click.stop="toggleQuickEdit"
        ></span>

        <span v-if="!isQuickEdit">{{ card.title }}</span>
        <textarea
          @click.stop
          v-else
          v-model="cardTitle"
          ref="cardtitle"
        ></textarea>

        <div class="preview-indicators-container">
          <div class="preview-inner-container">
            <div
              class="preview-checklist-container"
              v-if="card.checklists && card.checklists.length"
            >
              <span class="icon-sm icon-checklist"></span>
              <span class="checklist-indicator">{{ checklistToShow }}</span>
            </div>

            <div
              class="preview-date-container"
              :style="isSoon"
              v-if="card.dueDate && card.dueDate.length"
            >
              {{ card.dueDate.slice(5) }}
            </div>
            <div
              class="preview-attach-container"
              v-if="card.attachments && card.attachments.length"
            >
              <span class="icon-sm icon-attach"></span>
              <span class="attach-indicator">{{
                card.attachments.length
              }}</span>
            </div>
          </div>
          <div class="preview-members-container" v-if="card.members">
            <avatar
              v-for="member in card.members"
              :key="member._id"
              class="member-name"
              :username="member.fullname"
              :size="28"
              :inline="true"
              backgroundColor="#dfe1e6"
              color="#172b4d"
              :style="{
                margin: '2px',
                'font-weight': '700',
                'font-size': '12px',
                'font-family': 'segoe UI',
              }"
            ></avatar>
          </div>
        </div>
      </section>
      <quick-edit
        v-if="isQuickEdit"
        :card="card"
        @emitCard="emitCard"
        @openCard="openCard"
        @removeCard="removeCard"
      />
    </section>
    <button
      v-if="isQuickEdit"
      @click.stop="onEndQuickEdit"
      class="quick-edit-btn"
    >
      Save
    </button>
  </section>
</template>

<script>
import avatar from "vue-avatar";
import ClickOutside from "vue-click-outside";
import quickEdit from "./quickEdit.vue";
export default {
  name: "cardPreview",
  components: {
    avatar,
    quickEdit,
  },
  data() {
    return {
      openLabels: false,
      showLabels: false,
      cardHover: false,
      isQuickEdit: false,
      cardTitle: this.card.title,
    };
  },
  props: {
    card: Object,
  },
  computed: {
    labelsForDisplay() {
      const labels = this.$store.getters.board.labels;
      return labels.filter((label) => {
        if (this.card.labelIds.includes(label.id)) return label;
      });
    },
    checklistToShow() {
      var total = 0;
      var done = 0;
      this.card.checklists.forEach((cl) => {
        cl.todos.forEach((td) => {
          total++;
          if (td.isDone) done++;
        });
      });
      return `${done}/${total}`;
    },
    isSoon() {
      if (this.card.isCompleted)
        return { backgroundColor: "#61BD4F", color: "white" };
      const currDate = Date.parse(new Date());
      const dueDate = Date.parse(this.card.dueDate);
      const timeLeft = dueDate - currDate;
      if (timeLeft < 86400000)
        return { backgroundColor: "#eb5a46", color: "white" };
      else if (timeLeft < 172800000)
        return { backgroundColor: "#F2D600", color: "black" };
      else
        return { backgroundColor: "rgba(9, 30, 66, 0.08)", color: "#5e6c84" };
    },
    attachment() {
      if (this.card.attachments && this.card.attachments.length) {
        return this.card.attachments.filter((attachment) => {
          if (attachment.isCover) {
            return attachment;
          }
        });
      } else return false;
    },
    isCover() {
      if (this.attachment.length) {
        return this.attachment[0].isCover
          ? `background-image: url('${this.attachment[0].url}')`
          : "";
      } else return false;
    },
  },
  methods: {
    removeCard(cardId) {
      this.toggleQuickEdit();
      this.$emit("removeCard", cardId);
    },
    openCard() {
      this.toggleQuickEdit();
      this.$emit("openCard", this.card);
    },
    toggleHover() {
      this.cardHover = !this.cardHover;
    },
    toggleQuickEdit() {
      this.$emit("openBg");
      this.isQuickEdit = !this.isQuickEdit;
      if (this.isQuickEdit) this.$nextTick(() => this.$refs.cardtitle.select());
    },
    closeQuickEdit() {
      this.isQuickEdit = false;
    },
    toggleLabels() {
      this.openLabels = !this.openLabels;
      if (this.showLabels) this.showLabels = !this.showLabels;
      else
        setTimeout(() => {
          this.showLabels = !this.showLabels;
        }, 800);
    },
    onEndQuickEdit() {
      if (!this.cardTitle) {
        this.$refs.cardtitle.focus();
        return;
      }
      const cardCopy = JSON.parse(JSON.stringify(this.card));
      cardCopy.title = this.cardTitle;
      this.emitCard(cardCopy);
      this.toggleQuickEdit();
    },
    emitCard(cardCopy) {
      this.$emit("updateCard", cardCopy);
    },
  },
  directives: {
    ClickOutside,
  },
  mounted() {
    this.popupItem = this.$el;
  },
};
</script>
