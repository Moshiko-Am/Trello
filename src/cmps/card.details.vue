<template>
  <section class="card-details-bg" @click="exitCard">
    <section class="card-details" @click.stop="">
      <div
        class="card-cover"
        v-if="cardToEdit.cover && cardToEdit.cover.isCover"
        :style="background"
      ></div>
      <button
        class="close-btn"
        :class="{ dark: cardToEdit.cover && !cardToEdit.cover.isCover.length }"
        @click="exitCard"
      >
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
                :optionsLabels="board.labels"
                :cardLabels="card.labelIds"
                @updateLabels="updateLabels"
                @closePopups="closePopups"
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
              @emitActivity="emitActivity"
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
              @emitActivity="emitActivity"
            />
          </div>
          <div class="card-sidebar-btn" @click="toggleLabel">
            <span class="icon-sm icon-label"></span>
            <p class="sidebar-btn-title">Labels</p>
            <labels-list
              :optionsLabels="board.labels"
              :cardLabels="card.labelIds"
              @toggleCreateLabel="toggleCreateLabel"
              @updateLabels="updateLabels"
              @editLabel="setLabelToEdit"
              @closePopups="closePopups"
              v-if="isAddingLabel"
            />
            <create-labels
              v-if="isCreateLabel"
              @close="closePopups"
              :label="labelToEdit"
              @createLabel="createLabel"
              @back="toggleCreateLabel"
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
          <div class="card-sidebar-btn cover" @click="toggleCover">
            <span class="icon-sm icon-cover"></span>
            <p class="sidebar-btn-title">Cover</p>
          </div>
          <cover-cmp
            :card="cardToEdit"
            @close="closePopups"
            @updateCard="updateCard"
            @toggleAttch="toggleAttch"
            v-if="isAddingCover"
          />
          <h3>Delete Card</h3>
          <div class="card-sidebar-btn delete" @click="removeCard">
            <span class="icon-sm icon-minus"></span>
            <p class="sidebar-btn-title">Delete</p>
          </div>
        </div>
      </div>
    </section>
    <section class="padding-bottom"></section>
  </section>
</template>

<script>
import labelsCmp from "./card-details-cmps/labels.cmp.vue";
import createLabels from "./create.labels.vue";
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
import coverCmp from "./card-details-cmps/cover.cmp.vue";

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
      isCreateLabel: false,
      isAddingMember: false,
      isAddingAttachment: false,
      isAddingCover: false,
      labelToEdit: null,
      cardDate: "",
    };
  },
  components: {
    labelsCmp,
    createLabels,
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
    coverCmp,
  },
  methods: {
    emitActivity(activity) {
      activity.cId = this.card.id;
      activity.gId = this.group.id;
      activity.cTitle = this.card.title;
      this.$emit("emitActivity", activity);
    },
    exitCard() {
      this.$emit("clearCard");
    },
    closePopups() {
      this.isAddingChecklist = false;
      this.isAddingLabel = false;
      this.isCreateLabel = false;
      this.isAddingMember = false;
      this.isAddingAttachment = false;
      this.isAddingCover = false;
    },
    setLabelToEdit(label) {
      this.labelToEdit = label;
      this.isCreateLabel = true;
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
    toggleCreateLabel() {
      // if(!this.isCreateLabel) this.isAddingLabel = false;
      this.isAddingLabel = this.isCreateLabel;
      this.isCreateLabel = !this.isCreateLabel;
      // console.log('this.isAddingLabel',this.isAddingLabel);
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
    toggleCover() {
      if (!this.isAddingCover) {
        this.closePopups();
      }
      if (!this.cardToEdit.cover) {
        this.$set(this.cardToEdit, "cover", {
          isCover: false,
          type: "",
          color: "",
          attachmentIdx: null,
          photo: { url: "", colorArray: [] },
          layout: "",
        });
      }
      this.isAddingCover = !this.isAddingCover;
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
      const activity = {
        byMember: this.$store.getters.user,
        txt: " changed the due date ",
      };
      this.emitCard();
      this.emitActivity(activity);
    },
    updateTitle() {
      this.emitCard();
    },
    updateMembers(members) {
      this.cardToEdit.members = members;
      this.emitCard();
    },
    updateCover() {},
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
    removeCard() {
      this.$emit("removeCard", this.cardToEdit.id);
    },
    updateCard(card) {
      this.$set(this, "cardToEdit", card);
      this.emitCard();
    },
    emitCard() {
      const cardCopy = JSON.parse(JSON.stringify(this.cardToEdit));
      this.$emit("updateCard", cardCopy);
    },
    updateAttachments(attachments) {
      this.$set(this.cardToEdit, "attachments", attachments);
      if (!this.cardToEdit.cover) this.$set(this.cardToEdit, "cover", {});
      if (
        this.cardToEdit.cover.type === "attachment" &&
        this.cardToEdit.attachments.every((attachment) => !attachment.isCover)
      ) {
        this.$set(this.cardToEdit.cover, "isCover", false);
        this.$set(this.cardToEdit.cover, "type", "");
      } else
        this.cardToEdit.attachments.forEach((attachment, idx) => {
          if (attachment.isCover) {
            this.$set(this.cardToEdit.cover, "isCover", true);
            this.$set(this.cardToEdit.cover, "type", "attachment");
            this.$set(this.cardToEdit.cover, "attachmentIdx", idx);
            this.$set(this.cardToEdit.cover, "layout", "top");
          }
        });
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
    background() {
      if (!this.cardToEdit.cover.isCover) return false;
      else
        return this.cardToEdit.cover.type === "attachment"
          ? `background-color: rgb(${
              this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx]
                .props.colorArray[0]
            },${
              this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx]
                .props.colorArray[1]
            },${
              this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx]
                .props.colorArray[2]
            }); background-image: url('${
              this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx]
                .url
            }');`
          : this.cardToEdit.cover.type === "color"
          ? `background-color: ${this.cardToEdit.cover.color}; height: 116px`
          : `background-color: rgb(${this.cardToEdit.cover.photo.colorArray[0]},${this.cardToEdit.cover.photo.colorArray[1]},${this.cardToEdit.cover.photo.colorArray[2]}); background-image: url('${this.cardToEdit.cover.photo.url}')`;
    },
  },
};
</script>
