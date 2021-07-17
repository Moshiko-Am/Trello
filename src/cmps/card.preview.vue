<template>
  <section class="card-preview" v-if="card.id">
    <div v-if="card.attachments">
      <div
        v-for="attachment in card.attachments"
        :key="attachment.id"
        class="card-cover"
        :style="{ 'background-image': `url('${attachment.str}')` }"
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
      >
        <span v-if="showLabels">{{ label.title }}</span>
      </div>
    </div>

    <span>{{ card.title }}</span>

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
          :style="{ margin: '2px', 'font-size': '12px' }"
        ></avatar>
      </div>
    </div>
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  components: {
    avatar,
  },
  data() {
    return {
      openLabels: false,
      showLabels: false,
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
  },
  methods: {
    toggleLabels() {
      this.openLabels = !this.openLabels;
      if (this.showLabels) this.showLabels = !this.showLabels;
      else
        setTimeout(() => {
          this.showLabels = !this.showLabels;
        }, 800);
    },
  },
};
</script>
