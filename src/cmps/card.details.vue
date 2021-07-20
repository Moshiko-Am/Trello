<template>
  <section class="card-details-bg" @click="exitCard">
    <section class="card-details" @click.stop="">
      <button class="close-btn" @click="exitCard">
        <span class="icon-md icon-x"></span>
      </button>
      <div class="card-details-header">
        <div class="inner-container">
          <span class="icon-lg icon-card details-header-icon"></span>
          <input
            type="text"
            class="card-details-title"
            @input="updateTitle"
            v-model="cardToEdit.title"
          />
        </div>
        <div class="card-details-list">From list {{ group.title }}</div>
      </div>

      <div class="card-details-content">
        <div class="card-details-main">
          <div class="labels-members-container">
            <transition name="fade">
              <labels-cmp
                v-if="cardToEdit.labelIds && cardToEdit.labelIds.length"
                :labels="labelsForDisplay"
              />
            </transition>
            <transition name="fade">
              <members-cmp
                v-if="cardToEdit.members"
                :members="cardToEdit.members"
              />
            </transition>
            <transition name="fade">
              <date-cmp
                v-if="cardToEdit.dueDate"
                @toggleCompleted="toggleCompleted"
                :isCompleted="card.isCompleted"
                :date="cardToEdit.dueDate"
              />
            </transition>
          </div>
          <description-cmp
            :description="cardToEdit.description"
            @updateDesc="updateDesc"
          />
          <transition name="fade">
            <attachment-cmp
              v-if="cardToEdit.attachments && cardToEdit.attachments.length"
              :attachments="cardToEdit.attachments"
              @updateAttachments="updateAttachments"
            />
          </transition>
          <transition name="fade">
            <checklists-cmp
              v-if="cardToEdit.checklists"
              :checklists="cardToEdit.checklists"
              @updateChecklists="updateCL"
            />
          </transition>
          <activity-cmp :activities="activities" />
        </div>
        <div class="card-details-sidebar">
          <h3>Suggested</h3>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-member"></span>
            <p class="sidebar-btn-title">Join</p>
          </div>
          <h3>Add To Card</h3>
          <div class="card-sidebar-btn" @click="toggleMember">
            <span class="icon-sm icon-member"></span>
            <p class="sidebar-btn-title">Members</p>
            <members-list
              v-if="isAddingMember"
              @close="closePopups"
              :boardMembers="board.members"
              :cardMembers="card.members"
              @updateMembers="updateMembers"
            />
          </div>
          <div class="card-sidebar-btn" @click="toggleLabel">
            <span class="icon-sm icon-label"></span>
            <p class="sidebar-btn-title">Labels</p>
            <labels-list
              :optionsLabels="board.labels"
              :cardLabels="card.labelIds"
              @updateLabels="updateLabels"
              @closePopups="closePopups"
              v-if="isAddingLabel"
            />
          </div>
          <div class="card-sidebar-btn" @click="toggleCl">
            <span class="icon-sm icon-checklist"></span>
            <p class="sidebar-btn-title">Checklist</p>
            <checklist-add
              @addCl="addCl"
              @closePopups="closePopups"
              v-if="isAddingChecklist"
            />
          </div>
          <el-date-picker
            v-model="cardDate"
            @change="updateDate"
            placeholder="Dates"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
          >
            <span class="icon-sm icon-date"></span>
          </el-date-picker>
          <div class="card-sidebar-btn" @click="toggleAttch">
            <span class="icon-sm icon-attach"></span>
            <p class="sidebar-btn-title">Attachments</p>
            <file-upload
              @close="closePopups"
              @updateAttachments="updateAttachments"
              :attachments="cardToEdit.attachments"
              v-if="isAddingAttachment"
            />
          </div>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-cover"></span>
            <p class="sidebar-btn-title">Cover</p>
          </div>
          <h3>Delete Card</h3>
          <div class="card-sidebar-btn delete" @click="removeCard">
            <span class="icon-sm icon-minus"></span>
            <p class="sidebar-btn-title">Delete</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import labelsCmp from "./card-details-cmps/labels.cmp.vue";
import membersCmp from "./card-details-cmps/members.cmp.vue";
import activityCmp from "./card-details-cmps/activity.cmp.vue";
import dateCmp from "./card-details-cmps/date.cmp.vue";
import descriptionCmp from "./card-details-cmps/description.cmp.vue";
import checklistsCmp from "./card-details-cmps/checklists.cmp.vue";
import checklistAdd from "./checklist.add.vue";
import labelsList from "./labels/labels.list.vue";
import fileUpload from "./card-details-cmps/file.upload.vue";
import attachmentCmp from "./card-details-cmps/attachment.cmp.vue";
import membersList from "./card-details-cmps/members.list.vue";

export default {
  props: {
    card: Object,
    group: Object,
  },
  data() {
    return {
      cardToEdit: this.card,
      addingTodo: false,
      isAddingChecklist: false,
      isAddingLabel: false,
      isAddingMember: false,
      isAddingAttachment: false,
      cardDate: "",
    };
  },
  components: {
    labelsCmp,
    dateCmp,
    membersCmp,
    descriptionCmp,
    checklistsCmp,
    activityCmp,
    labelsList,
    checklistAdd,
    membersList,
    fileUpload,
    attachmentCmp,
  },
  methods: {
    exitCard() {
      this.$emit("clearCard");
    },
    closePopups() {
      this.isAddingChecklist = false;
      this.isAddingLabel = false;
      this.isAddingMember = false;
      this.isAddingAttachment = false;
    },
    makeId() {
      const num = Math.floor(Math.random() * (900 - 1) + 1);
      return "c" + num;
    },
    toggleCl() {
      if (!this.isAddingChecklist) {
        this.closePopups();
      }
      this.isAddingChecklist = !this.isAddingChecklist;
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
    toggleCompleted(isCompleted) {
      this.cardToEdit.isCompleted = isCompleted;
      this.emitCard();
    },
    updateDesc(desc) {
      this.cardToEdit.description = desc;
      this.emitCard();
    },
    updateDate() {
      this.cardToEdit.dueDate = this.cardDate;
      this.emitCard();
    },
    updateTitle() {
      this.emitCard();
    },
    updateMembers(members) {
      this.cardToEdit.members = members;
      this.emitCard();
    },
    addUser(userId) {
      const member = this.board.members.find((member) => member._id === userId);
      if (!this.card.members) {
        this.cardToEdit.members = [];
      }
      this.cardToEdit.members.push(member);
      this.emitCard();
    },
    addCl(checklist) {
      if (!this.cardToEdit.checklists) this.cardToEdit.checklists = [];
      const clsCopy = JSON.parse(JSON.stringify(this.cardToEdit.checklists));
      clsCopy.push(checklist);
      this.cardToEdit.checklists = JSON.parse(JSON.stringify(clsCopy));
      this.closePopups();
      this.emitCard();
    },
    updateCL(checklists) {
      this.cardToEdit.checklists = checklists;
      this.emitCard();
    },
    updateLabels(labels) {
      this.cardToEdit.labelIds = labels;
      this.emitCard();
    },
    removeCard() {
      this.$emit("removeCard", this.cardToEdit.id);
    },
    emitCard() {
      const cardCopy = JSON.parse(JSON.stringify(this.cardToEdit));
      this.$emit("updateCard", cardCopy);
    },
    updateAttachments(attachments) {
      this.cardToEdit.attachments = attachments;
      this.emitCard();
    },
  },
  computed: {
    activities() {
      return this.$store.getters.board.activities;
    },
    labelsForDisplay() {
      const labels = this.$store.getters.board.labels;
      return labels.filter((label) => {
        if (this.cardToEdit.labelIds.includes(label.id)) return label;
      });
    },
    allUsers() {
      return this.$store.getters.users;
    },
    board() {
      return this.$store.getters.board;
    },
  },
};
</script>
