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
          v-if="isAddingLabel"
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
      <div class="quick-sidebar-btn">
        <span class="icon-sm icon-cover"></span>
        <p class="sidebar-btn-title">Cover</p>
      </div>
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
export default {
  props: {
    card: Object,
  },
  components: {
    membersList,
    labelsList,
  },
  data() {
    return {
      cardToEdit: null,
      isAddingLabel: false,
      isAddingMember: false,
      isAddingAttachment: false,
      cardDate: "",
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  methods: {
    closePopups() {
      this.isAddingLabel = false;
      this.isAddingMember = false;
      this.isAddingAttachment = false;
    },
    toggleLabel() {
      if (!this.isAddingLabel) {
        this.closePopups();
      }
      this.isAddingLabel = !this.isAddingLabel;
    },
    toggleMember() {
      if (!this.isAddingMember) {
        this.closePopups();
      }
      this.isAddingMember = !this.isAddingMember;
    },
    toggleAttch() {
      if (!this.isAddingAttachment) {
        this.closePopups();
      }
      this.isAddingAttachment = !this.isAddingAttachment;
    },
    updateDate() {
      this.cardToEdit.dueDate = this.cardDate;
      this.emitCard();
    },
    updateCard() {
      const cardCopy = JSON.parse(JSON.stringify(this.cardToEdit));
      this.$emit("updateCard", cardCopy);
    },
    updateTitle() {
      this.emitCard();
    },
    updateMembers(members) {
      this.cardToEdit.members = members;
      this.emitCard();
    },
    updateLabels(labels) {
      this.cardToEdit.labelIds = labels;
      this.emitCard();
    },
    openCard() {
      this.$emit("openCard");
    },
    emitCard() {
      const cardCopy = JSON.parse(JSON.stringify(this.cardToEdit));
      this.$emit("emitCard", cardCopy);
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