<template>
  <section class="card-preview" v-if="card.id">
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

    <div
      class="preview-checklist-container"
      v-if="card.checklists && card.checklists.length"
    >

      <span class="icon-sm icon-checklist"></span>
      <span class="checklist-indicator">{{ checklistToShow }}</span>

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
						:style="{ margin: '2px', 'font-size':'12px'}"
					></avatar>
    </div>
  </section>
</template>

<script>
import avatar from 'vue-avatar';


export default {
  components: {
    avatar
  },
  data() {
    return {
      openLabels: false,
      showLabels: false,
    };
  },
  props: {
    card: Object,
    labels: Array,
  },
  computed: {
    labelsForDisplay() {
      return this.labels.filter((label) => {
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
