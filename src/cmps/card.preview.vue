<template>
  <section
    class="card-preview-container"
    v-click-outside="closeQuickEdit"
    :class="{ 'quick-edit-card': isQuickEdit }"
  >
    <section class="card-preview-inner-container">
      <template v-if="card.id && card.cover && card.cover.layout === 'full'">
        <section
          class="card-preview-full-image"
          :class="{ color: card.cover.type === 'color' }"
          v-if="
            card.cover.type === 'color' ||
              card.cover.type === 'url' ||
              (card.cover.type === 'attachment' &&
                card.attachments[card.cover.attachmentIdx].props.type ===
                  'image')
          "
          :style="background"
          @mouseenter="toggleHover"
          @mouseleave="toggleHover"
        >
          <audio
            v-if="
              card.attachments &&
                card.attachments.length &&
                card.attachments[0].props.type === 'audio'
            "
            controls
          >
            <source :src="card.attachments[0].props.url" />
          </audio>
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
          class="card-preview-full-image"
          v-else-if="
            card.cover.type === 'attachment' &&
              card.attachments[card.cover.attachmentIdx].props.type === 'video'
          "
          :style="background"
          @mouseenter="toggleHover"
          @mouseleave="toggleHover"
        >
          <video
            :poster="card.attachments[card.cover.attachmentIdx].props.thumbnail"
            autoplay
            muted
            loop
          >
            <source
              :src="card.attachments[card.cover.attachmentIdx].props.url"
              type="video/mp4"
            />
          </video>
          <span
            v-if="cardHover"
            class="icon-sm icon-edit"
            @click.stop="toggleQuickEdit"
          ></span>
          <span
            class="card-preview-full-image-title video-card"
            v-if="!isQuickEdit"
            >{{ card.title }}</span
          >
          <textarea
            @click.stop
            v-model="cardTitle"
            ref="cardtitle"
            v-if="isQuickEdit"
          ></textarea>
        </section>
        <section
          class="card-preview-full-image"
          v-else-if="
            card.attachments &&
              card.attachments.length &&
              card.attachments[0].props.type === 'audio'
          "
          @mouseenter="toggleHover"
          @mouseleave="toggleHover"
        >
          <audio controls>
            <source :src="card.attachments[0].props.url" />
          </audio>
          <span
            v-if="cardHover"
            class="icon-sm icon-edit"
            @click.stop="toggleQuickEdit"
          ></span>
          <span
            class="card-preview-full-image-title audio-card"
            v-if="!isQuickEdit"
            >{{ card.title }}</span
          >
          <textarea
            @click.stop
            v-model="cardTitle"
            ref="cardtitle"
            v-if="isQuickEdit"
          ></textarea>
        </section>
      </template>
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
              @mouseover="isHover = true"
              @mouseout="isHover = false"
              @click.stop="toggleCompleted"
            >
              <span v-if="!isHover" class="icon-sm icon-date"></span>
              <span
                v-else-if="card.isCompleted"
                class="icon-sm icon-checklist"
              ></span>
              <span v-else class="icon-sm icon-checkbox"></span>
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
            <div class="preview-desc-container" v-if="card.description">
              <span class="icon-sm icon-desc"></span>
            </div>
          </div>
          <div class="preview-members-container" v-if="card.members">
            <transition-group
              class="preview-members-container"
              name="list-complete"
            >
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
        <audio
          v-if="
            card.attachments &&
              card.attachments.length &&
              card.attachments[0].props.type === 'audio'
          "
          controls
        >
          <source :src="card.attachments[0].props.url" />
        </audio>
      </section>
      <quick-edit
        ref="quickedit"
        v-if="isQuickEdit"
        :card="card"
        :group="group"
        @emitCard="emitCard"
        @openCard="openCard"
        @removeCard="removeCard"
        @toggleAttach="openCard"
        @createLabel="createLabel"
        @removeLabel="removeLabel"
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
      isHover: false,
    };
  },
  props: {
    card: Object,
    group: Object,
  },
  computed: {
    background() {
      if (!this.card.cover.isCover) return false;
      else if (this.card.cover.type === "attachment")
        if (
          this.card.attachments[this.card.cover.attachmentIdx].props.type ===
          "image"
        )
          return `background-color: rgb(${
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
          }'); height: 245px`;
        else if (this.card.cover.layout === "top")
          return `background-image: url(${
            this.card.attachments[this.card.cover.attachmentIdx].props.thumbnail
          }); background-color: ${
            this.card.attachments[this.card.cover.attachmentIdx].props
              .colorArray.rgb
          }; height: 245px`;
        else return "height: 245px";
      else if (this.card.cover.type === "color")
        return `background-color: ${this.card.cover.color}; height: ${
          this.card.cover.layout === "full"
            ? this.card.attachments &&
              this.card.attachments.length &&
              this.card.attachments[0].props.type === "audio"
              ? "80px"
              : "56px"
            : "32px"
        }`;
      else
        return `background-color: rgb(${this.card.cover.photo.colorArray[0]},${this.card.cover.photo.colorArray[1]},${this.card.cover.photo.colorArray[2]});background-image: url('${this.card.cover.photo.url}');min-height: 245px`;
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
    toggleCompleted() {
      const updatedCard = JSON.parse(JSON.stringify(this.card));
      console.log("cardCopy", updatedCard);
      updatedCard.isCompleted = !updatedCard.isCompleted;
      const activityTxt = updatedCard.isCompleted
        ? " marked completed "
        : " marked incomplete ";
      this.emitCard({ updatedCard, activityTxt });
    },
    toggleHover() {
      this.cardHover = !this.cardHover;
    },
    toggleQuickEdit(ev) {
      this.$emit("openBg");
      this.isQuickEdit = !this.isQuickEdit;
      if (this.isQuickEdit)
        this.$nextTick(() => {
          this.$refs.cardtitle.select();
          const coords = ev.target.getBoundingClientRect();
          if (window.innerHeight - coords.y < 210)
            coords.y = window.innerHeight - 210;
          if (window.innerWidth - coords.x < 158) {
            coords.x =
              window.innerWidth -
              (461 + 13 + (window.innerWidth - coords.x) - 38);
            this.$refs.quickedit.$el.children[0].classList.add("invert");
            document.querySelector(".el-date-editor").classList.add("invert");
          }
          this.$refs.quickedit.$el.style.top = `${coords.y - 6}px`;
          this.$refs.quickedit.$el.style.left = `${coords.x + 20}px`;
        });
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
      const activityTxt = ` changed the title to ${cardCopy.title} `;
      this.emitCard({ updatedCard: cardCopy, activityTxt });
      this.toggleQuickEdit();
    },
    emitCard({ updatedCard, activityTxt }) {
      console.log("updatedCard", updatedCard);
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
    createLabel(label) {
      this.$emit("createLabel", label);
    },
    removeLabel(labelId) {
      this.$emit("removeLabel", labelId);
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
