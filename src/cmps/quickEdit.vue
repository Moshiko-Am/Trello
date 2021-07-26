<template>
  <section class="quick-edit" @click.stop>
    <div class="quick-edit-sidebar">
      <div class="quick-sidebar-btn" @click="openCard">
        <span class="icon-sm icon-card"></span>
        <p class="sidebar-btn-title">Open card</p>
      </div>
      <div class="quick-sidebar-btn" @click="toggleMember">
        <span class="icon-sm icon-member"></span>
        <p class="sidebar-btn-title">Change members</p>
        <members-list
          v-if="isAddingMember"
          @close="closePopups"
          :boardMembers="board.members"
          :cardMembers="card.members"
          @updateMembers="updateMembers"
          @updateMentions="updateMentions"
          ref="membermodal"
        />
      </div>
      <div class="quick-sidebar-btn" @click="toggleLabel">
        <span class="icon-sm icon-label"></span>
        <p class="sidebar-btn-title">Edit labels</p>
        <labels-list
          :optionsLabels="board.labels"
          :cardLabels="card.labelIds"
          @updateLabels="updateLabels"
          @closePopups="closePopups"
          @toggleCreateLabel="toggleCreateLabel"
          @editLabel="setLabelToEdit"
          v-if="isAddingLabel"
          ref="labelmodal"
        />
        <create-labels
          v-if="isCreateLabel"
          @close="closePopups"
          :label="labelToEdit"
          @createLabel="createLabel"
          @removeLabel="removeLabel"
          @back="toggleCreateLabel"
        />
      </div>
      <el-date-picker
        v-model="cardDate"
        @change="updateDate"
        placeholder="Edit dates"
        type="date"
        format="yyyy/MM/dd"
        value-format="yyyy-MM-dd"
      >
        <span class="icon-sm icon-date"></span>
      </el-date-picker>
      <div class="quick-sidebar-btn" @click="toggleCover">
        <span class="icon-sm icon-cover"></span>
        <p class="sidebar-btn-title">Cover</p>
      </div>
      <cover-cmp
        :card="cardToEdit"
        @close="closePopups"
        @updateCard="emitCard"
        @toggleAttch="toggleAttch"
        v-if="isAddingCover"
        ref="covermodal"
      />
      <div class="quick-sidebar-btn delete" @click="removeCard">
        <span class="icon-sm icon-minus"></span>
        <p class="sidebar-btn-title">Delete</p>
      </div>
    </div>
  </section>
</template>

<script>
import membersList from "./card-details-cmps/members.list.vue";
import labelsList from "./labels/labels.list.vue";
import coverCmp from "@/cmps/card-details-cmps/cover.cmp";
import createLabels from "./create.labels.vue";

export default {
  props: {
    card: Object,
    group: Object,
  },
  components: {
    membersList,
    labelsList,
    coverCmp,
    createLabels,
  },
  data() {
    return {
      cardToEdit: null,
      isAddingLabel: false,
      isAddingMember: false,
      isAddingAttachment: false,
      isAddingCover: false,
      isCreateLabel: false,
      labelToEdit: null,
      cardDate: "",
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  methods: {
    setLabelToEdit(label) {
      this.labelToEdit = label;
      this.toggleCreateLabel();
    },
    createLabel(label) {
      this.labelToEdit = null;
      this.$emit("createLabel", label);
      this.toggleCreateLabel();
    },
    removeLabel(labelId) {
      this.labelToEdit = null;
      this.toggleCreateLabel();
      this.$emit("removeLabel", labelId);
    },
    closePopups() {
      this.isAddingLabel = false;
      this.isAddingMember = false;
      this.isAddingAttachment = false;
      this.isAddingCover = false;
      this.isCreateLabel = false;
    },
    toggleCreateLabel() {
      this.isAddingLabel = this.isCreateLabel;
      this.isCreateLabel = !this.isCreateLabel;
    },
    toggleLabel() {
      if (!this.isAddingLabel) {
        this.closePopups();
      }
      this.isAddingLabel = !this.isAddingLabel;
      if (this.isAddingLabel) {
        this.$nextTick(() => {
          const coords = this.$refs.labelmodal.$el.getBoundingClientRect();
          if (window.innerWidth - coords.left < 305) {
            this.$refs.labelmodal.$el.style.right = 0;
            this.$refs.labelmodal.$el.style.left = `unset`;
          }
          if (window.innerHeight - coords.top < coords.height) {
            this.$refs.labelmodal.$el.style.top = -coords.height + "px";
          }
        });
      }
    },
    toggleMember() {
      if (!this.isAddingMember) {
        this.closePopups();
      }
      this.isAddingMember = !this.isAddingMember;
      if (this.isAddingMember) {
        this.$nextTick(() => {
          const coords = this.$refs.membermodal.$el.getBoundingClientRect();
          if (window.innerWidth - coords.left < 305) {
            this.$refs.membermodal.$el.style.right = 0;
            this.$refs.membermodal.$el.style.left = `unset`;
          }
          if (window.innerHeight - coords.top < coords.height) {
            this.$refs.membermodal.$el.style.top = -coords.height + "px";
          }
        });
      }
    },
    toggleAttch() {
      this.$emit("toggleAttach");
    },
    toggleCover(ev) {
      if (!this.isAddingCover) {
        this.closePopups();
      }
      this.isAddingCover = !this.isAddingCover;
      if (this.isAddingCover) {
        this.$nextTick(() => {
          const coords = this.$refs.covermodal.$el.getBoundingClientRect();
          if (window.innerWidth - coords.left < 305) {
            this.$refs.covermodal.$el.style.right = 0;
            this.$refs.covermodal.$el.style.left = `unset`;
          }
          if (window.innerHeight - coords.top < 585) {
            this.$refs.covermodal.$el.style.top =
              -(ev.target.getBoundingClientRect().top - 565 + 38) + "px";
          }
        });
      }
    },
    updateDate() {
      this.cardToEdit.dueDate = this.cardDate;
      const activityTxt = ` changed the due date to ${this.cardDate} `;
      this.emitCard(activityTxt);
    },
    updateTitle() {
      this.emitCard();
    },
    updateMembers({ members, activityTxt }) {
      this.cardToEdit.members = members;
      this.emitCard(activityTxt);
    },
    updateLabels(labels) {
      this.cardToEdit.labelIds = labels;
      this.emitCard();
    },
    updateMentions(mention) {
      this.$emit("updateMentions", mention);
    },
    openCard() {
      this.$emit("openCard");
    },
    emitCard(activityTxt) {
      const cardCopy = JSON.parse(JSON.stringify(this.cardToEdit));
      this.$emit("emitCard", { updatedCard: cardCopy, activityTxt });
    },
    removeCard() {
      this.$emit("removeCard", this.cardToEdit.id);
    },
  },
  created() {
    this.cardToEdit = JSON.parse(JSON.stringify(this.card));
  },
};
</script>
