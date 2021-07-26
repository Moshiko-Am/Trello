<template>
  <section class="card-details-bg" @click="exitCard">
    <section class="border-container">
      <section class="card-details" @click.stop="">
        <div
          class="card-cover"
          v-if="
            cardToEdit.cover &&
              cardToEdit.cover.isCover &&
              cardToEdit.cover.type === 'attachment' &&
              cardToEdit.attachments[cardToEdit.cover.attachmentIdx].props
                .type === 'video'
          "
          :style="background"
        >
          <video
            :poster="
              cardToEdit.attachments[cardToEdit.cover.attachmentIdx].props
                .thumbnail
            "
            muted
            controls
            height="160px"
          >
            <source
              :src="
                cardToEdit.attachments[cardToEdit.cover.attachmentIdx].props.url
              "
              type="video/mp4"
            />
          </video>
        </div>
        <div
          class="card-cover"
          v-else-if="cardToEdit.cover && cardToEdit.cover.isCover"
          :style="background"
        ></div>
        <button
          class="close-btn"
          :class="{
            dark: cardToEdit.cover && !cardToEdit.cover.isCover.length,
          }"
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
              @change="updateTitle"
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
                  :card="card"
                  :optionsLabels="board.labels"
                  :cardLabels="card.labelIds"
                  @createLabel="createLabel($event, false)"
                  @removeLabel="removeLabel($event, false)"
                  @updateLabels="updateLabels"
                  @closePopups="closePopups"
                />
              </transition>
              <transition name="fade">
                <members-cmp
                  v-if="cardToEdit.members"
                  :members="cardToEdit.members"
                  @updateMembers="updateMembers"
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
            <activity-cmp
              v-if="filteredActivities"
              :activities="filteredActivities"
            />
          </div>
          <div class="card-details-sidebar">
            <div
              class="sidebar-inner-container"
              v-if="!userInCard && loggedUser.username !== 'guest'"
            >
              <h3>Suggested</h3>
              <div class="sidebar-btns-container">
                <div class="card-sidebar-btn" @click="joinToCard">
                  <span class="icon-sm icon-member"></span>
                  <p class="sidebar-btn-title">Join</p>
                </div>
              </div>
            </div>
            <div class="sidebar-inner-container">
              <h3>Add To Card</h3>
              <div class="sidebar-btns-container">
                <div class="card-sidebar-btn" @click="toggleMember">
                  <span class="icon-sm icon-member"></span>
                  <p class="sidebar-btn-title">Members</p>
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
                    ref="labelmodal"
                  />
                  <create-labels
                    v-if="isCreateLabel"
                    @close="closePopups"
                    :label="labelToEdit"
                    @createLabel="createLabel($event, true)"
                    @removeLabel="removeLabel($event, true)"
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
                    ref="checklistmodal"
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
                    ref="attachmentmodal"
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
                  ref="covermodal"
                />
              </div>
            </div>
            <div class="sidebar-inner-container">
              <h3>Delete Card</h3>
              <div class="sidebar-btns-container">
                <div class="card-sidebar-btn delete" @click="removeCard">
                  <span class="icon-sm icon-minus"></span>
                  <p class="sidebar-btn-title">Delete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
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
      this.toggleCreateLabel();
    },
    toggleCl() {
      if (!this.isAddingChecklist) {
        this.closePopups();
      }
      this.isAddingChecklist = !this.isAddingChecklist;
      if (this.isAddingChecklist) {
        this.$nextTick(() => {
          const coords = this.$refs.checklistmodal.$el.getBoundingClientRect();
          if (window.innerWidth - coords.left < 305) {
            this.$refs.checklistmodal.$el.style.right = 0;
            this.$refs.checklistmodal.$el.style.left = `unset`;
          }
          if (window.innerHeight - coords.top < coords.height) {
            this.$refs.checklistmodal.$el.style.top = -coords.height + "px";
          }
        });
      }
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
      if (!this.isAddingAttachment) {
        this.closePopups();
      }
      this.isAddingAttachment = !this.isAddingAttachment;
      if (this.isAddingAttachment) {
        this.$nextTick(() => {
          const coords = this.$refs.attachmentmodal.$el.getBoundingClientRect();
          if (window.innerWidth - coords.left < 305) {
            this.$refs.attachmentmodal.$el.style.right = 0;
            this.$refs.attachmentmodal.$el.style.left = `unset`;
          }
          if (window.innerHeight - coords.top < coords.height) {
            this.$refs.attachmentmodal.$el.style.top = -coords.height + "px";
          }
        });
      }
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
    updateMentions(mention) {
      mention.byMember = this.$store.getters.loggedInUser.fullname;
      mention.cId = this.card.id;
      mention.gId = this.group.id;
      mention.dueDate = this.card.dueDate;
      mention.createdAt = Date.now();
      if (mention.userId === this.$store.getters.loggedInUser._id)
        mention.isRead = true;
      else mention.isRead = false;
      this.$emit("updateMentions", mention);
    },
    addCl(checklist) {
      if (!this.cardToEdit.checklists) this.cardToEdit.checklists = [];
      const clsCopy = JSON.parse(JSON.stringify(this.cardToEdit.checklists));
      clsCopy.push(checklist);
      this.cardToEdit.checklists = JSON.parse(JSON.stringify(clsCopy));
      this.closePopups();
      this.emitCard();
    },
    updateCL({ checklists, activityTxt }) {
      this.cardToEdit.checklists = checklists;
      this.emitCard(activityTxt);
    },
    updateLabels(labels) {
      this.cardToEdit.labelIds = labels;
      this.emitCard();
    },
    joinToCard() {
      const user = this.$store.getters.loggedInUser;
      if (user.username === "guest") user._id = "g001";
      this.cardToEdit.members.push(user);
      const activityTxt = " joined ";
      this.emitCard(activityTxt);
    },
    createLabel(label, isAdding) {
      this.labelToEdit = null;
      this.$emit("createLabel", label);
      // this.toggleCreateLabel();
      this.isAddingLabel = isAdding;
      this.isCreateLabel = false;
    },
    removeLabel(labelId, isAdding) {
      this.labelToEdit = null;
      this.isAddingLabel = isAdding;
      this.isCreateLabel = false;
      this.$emit("removeLabel", labelId);
    },
    removeCard() {
      this.$emit("removeCard", this.cardToEdit.id);
    },
    updateCard(card) {
      this.$set(this, "cardToEdit", card);
      this.emitCard();
    },
    emitCard(activityTxt = "") {
      const cardCopy = JSON.parse(JSON.stringify(this.cardToEdit));
      const activity = {};
      if (activityTxt) {
        activity.byMember = this.$store.getters.loggedInUser;
        activity.cTitle = this.card.title;
        activity.cId = this.card.id;
        activity.gId = this.group.id;
        activity.txt = activityTxt;
        activity.isSpecific = true;
      }
      this.$emit("updateCard", { updatedCard: cardCopy, activity });
    },
    updateAttachments(attachments) {
      this.$set(this.cardToEdit, "attachments", attachments);
      if (!this.cardToEdit.cover) this.$set(this.cardToEdit, "cover", {});
      if (
        this.cardToEdit.cover.type === "attachment" &&
        this.cardToEdit.attachments.every((attachment) => !attachment.isCover)
      ) {
        this.$set(this.cardToEdit, "cover", {
          isCover: false,
          type: "",
          color: "",
          attachmentIdx: null,
          photo: { url: "", colorArray: [] },
          layout: "top",
        });
      } else
        this.cardToEdit.attachments.forEach((attachment, idx) => {
          if (attachment.isCover) {
            this.$set(this.cardToEdit.cover, "isCover", true);
            this.$set(this.cardToEdit.cover, "type", "attachment");
            this.$set(this.cardToEdit.cover, "attachmentIdx", idx);
            this.$set(this.cardToEdit.cover, "layout", "full");
          }
        });
      this.emitCard();
    },
  },
  computed: {
    filteredActivities() {
      const activities = this.$store.getters.board.activities;
      return activities.filter((activity) => {
        return activity.cId === this.card.id && activity.gId === this.group.id;
      });
    },
    labelsForDisplay() {
      const labels = this.$store.getters.board.labels;
      return labels.filter((label) => {
        if (this.cardToEdit.labelIds.includes(label.id)) return label;
      });
    },
    loggedUser() {
      return this.$store.getters.loggedInUser;
    },
    userInCard() {
      const user = this.loggedUser;
      if (!this.cardToEdit.members) return;
      return this.cardToEdit.members.some((member) => member._id === user._id);
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
          ? this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx]
              .props.type === "image"
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
            : `background-color: ${
                this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx]
                  .props.colorArray.rgb
              }; background-image: url('${
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
