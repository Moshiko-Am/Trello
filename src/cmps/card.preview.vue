<template>
  <section
    class="card-preview-container"
    v-click-outside="closeQuickEdit"
    :class="{ 'quick-edit-card': isQuickEdit }"
  >
    <section class="card-preview-inner-container">
      <section
        class="card-preview-full-image"
        v-if="card.id && card.cover && card.cover.layout === 'full'"
        :style="background"
        @mouseenter="toggleHover"
        @mouseleave="toggleHover"
      >
        <span
          v-if="cardHover"
          class="icon-sm icon-edit"
          @click.stop="toggleQuickEdit"
        ></span>
        <span class="card-preview-full-image-title" v-if="!isQuickEdit">{{
          card.title
        }}</span>
        <textarea
          @click.stop
          v-model="cardTitle"
          ref="cardtitle"
          v-if="isQuickEdit"
        ></textarea>
      </section>
      <section
        class="card-preview"
        v-else
        @mouseenter="toggleHover"
        @mouseleave="toggleHover"
      >
        <template
          v-if="
            card.cover &&
            card.cover.isCover &&
            (card.cover.type === 'attachment' || card.cover.type === 'url') &&
            card.cover.layout === 'top'
          "
        >
          <div class="card-cover" :style="background"></div>
        </template>
        <template
          v-else-if="
            card.cover &&
            card.cover.isCover &&
            card.cover.type === 'color' &&
            card.cover.layout === 'top'
          "
        >
          <div class="card-cover color" :style="background"></div>
        </template>
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
          >
            <transition name="fade">
              <span v-if="showLabels">{{ label.title }}</span>
            </transition>
          </div>
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
          spellcheck="false"
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
            <transition-group name="list-complete">
              <avatar
                v-for="member in card.members"
                :key="member._id"
                class="member-name list-complete-item"
                :username="member.fullname"
                :size="28"
                :inline="true"
                backgroundColor="#dfe1e6"
                color="#172b4d"
                :style="{
                  margin: '2px',
                }"
              ></avatar>
            </transition-group>
          </div>
        </div>
      </section>
      <quick-edit
        v-if="isQuickEdit"
        :card="card"
        :group="group"
        @emitCard="emitCard"
        @openCard="openCard"
        @removeCard="removeCard"
        @toggleAttach="openCard"
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
    group: Object,
  },
  computed: {
    background() {
      if (!this.card.cover.isCover) return false;
      else
        return this.card.cover.type === "attachment"
          ? `background-color: rgb(${
              this.card.attachments[this.card.cover.attachmentIdx].props
                .colorArray[0]
            },${
              this.card.attachments[this.card.cover.attachmentIdx].props
                .colorArray[1]
            },${
              this.card.attachments[this.card.cover.attachmentIdx].props
                .colorArray[2]
            }); background-image: url('${
              this.card.attachments[this.card.cover.attachmentIdx].url
            }'); height: 245px`
          : this.card.cover.type === "color"
          ? `background-color: ${this.card.cover.color}; height: ${
              this.card.cover.layout === "full" ? "56px" : "32px"
            }`
          : `background-color: rgb(${this.card.cover.photo.colorArray[0]},${this.card.cover.photo.colorArray[1]},${this.card.cover.photo.colorArray[2]});background-image: url('${this.card.cover.photo.url}');min-height: 245px`;
    },
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
      if (timeLeft < 0) return { backgroundColor: "#eb5a46", color: "white" };
      else if (timeLeft < 86400000)
        return { backgroundColor: "#F2D600", color: "#172B4D" };
      else timeLeft < 172800000;
      return { backgroundColor: "rgba(9, 30, 66, 0.08)", color: "#5e6c84" };
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
        }, 500);
    },
    onEndQuickEdit() {
      if (!this.cardTitle) {
        this.$refs.cardtitle.focus();
        return;
      }
      const cardCopy = JSON.parse(JSON.stringify(this.card));
      cardCopy.title = this.cardTitle;
      const activityTxt = ` changed the title to ${cardCopy.title} `
      this.emitCard({updatedCard:cardCopy,activityTxt});
      this.toggleQuickEdit();
    },
    emitCard({ updatedCard, activityTxt }) {
      const cardCopy = JSON.parse(JSON.stringify(updatedCard));
      const activity = {};
      if (activityTxt) {
        activity.byMember = this.$store.getters.user;
        activity.cTitle = this.card.title;
        activity.cId = this.card.id;
        activity.gId = this.group.id;
        activity.txt = activityTxt;
        activity.isSpecific = true;
      }
      console.log(activity, "4");
      this.$emit("updateCard", { updatedCard: cardCopy, activity });
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
