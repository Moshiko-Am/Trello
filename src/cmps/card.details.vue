<template>
  <section class="card-details-bg" @click="exitCard">
    <section class="card-details" @click.stop="">
      <button class="close-btn" @click="exitCard">
        <span class="icon-md icon-x"></span>
      </button>
      <div class="card-details-header">
        <div class="inner-container">
          <span class="icon-lg icon-card details-header-icon"></span>
          <h2 class="card-details-title">{{ cardToEdit.title }}</h2>
        </div>
        <div class="card-details-list">From list {{ group.title }}</div>
      </div>

      <div class="card-details-content">
        <div class="card-details-main">
          <div class="labels-members-container">
            <labels-cmp v-if="cardToEdit.labelIds" :labels="labelsForDisplay" />
            <members-cmp
              v-if="cardToEdit.members"
              :members="cardToEdit.members"
            />
          </div>
          <description-cmp
            :description="cardToEdit.description"
            @updateDesc="updateDesc"
          />
          <checklists-cmp
            v-if="cardToEdit.checklists"
            :checklists="cardToEdit.checklists"
            @updateChecklists="updateCL"
          />
          <activity-cmp :activities="activities" />
        </div>
        <div class="card-details-sidebar">
          <h3>Suggested</h3>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-member"></span>
            <p class="sidebar-btn-title">Join</p>
          </div>
          <h3>Add To Card</h3>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-member"></span>
            <p class="sidebar-btn-title">Members</p>
          </div>
          <div class="card-sidebar-btn" @click="toggleLabel">
            <span class="icon-sm icon-label"></span>
            <p class="sidebar-btn-title">Labels</p>
          </div>
          <div class="card-sidebar-btn" @click="toggleCl">
            <span class="icon-sm icon-checklist"></span>
            <p class="sidebar-btn-title">Checklist</p>
          </div>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-date"></span>
            <p class="sidebar-btn-title">Dates</p>
          </div>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-attach"></span>
            <p class="sidebar-btn-title">Attachments</p>
          </div>
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-cover"></span>
            <p class="sidebar-btn-title">Cover</p>
          </div>
        </div>
      </div>
    </section>
    <labels-list
      :optionsLabels="labels"
      :cardLabels="card.labelIds"
      @updateLabels="updateLabels"
      v-if="isAddingLabel"
    />
    <checklist-add @addCl="addCl" v-if="isAddingChecklist"/>
  </section>
</template>

<script>
import labelsCmp from "./card-details-cmps/labels.cmp.vue";
import membersCmp from "./card-details-cmps/members.cmp.vue";
import activityCmp from "./card-details-cmps/activity.cmp.vue";
import descriptionCmp from "./card-details-cmps/description.cmp.vue";
import checklistsCmp from "./card-details-cmps/checklists.cmp.vue";
import checklistAdd from "./checklist.add.vue";
import labelsList from "./labels/labels.list.vue";
export default {
  props: {
    card: Object,
    group: Object,
    labels: Array,
  },
  data() {
    return {
      cardToEdit: null,
      addingTodo: false,
      isAddingChecklist: false,
      isAddingLabel:false,
    };
  },
  components: {
    labelsCmp,
    membersCmp,
    descriptionCmp,
    checklistsCmp,
    activityCmp,
    labelsList,
    checklistAdd,
  },
  methods: {
    exitCard() {
      this.$emit("clearCard");
    },
    makeId() {
      const num = Math.floor(Math.random() * (900 - 1) + 1);
      return "c" + num;
    },
    toggleCl(){
      this.isAddingChecklist = !this.isAddingChecklist
    },
    toggleLabel(){
      this.isAddingLabel = !this.isAddingLabel
    },
    updateDesc(desc) {
      this.cardToEdit.description = desc;
      this.emitCard()
    },
    addCl(checklist){
      if(!this.cardToEdit.checklists) this.cardToEdit.checklists = []
      this.cardToEdit.checklists.push(checklist);
      console.log(this.cardToEdit);
      // this.cardToEdit
      this.emitCard()
    },
    updateCL(checklists) {
      this.cardToEdit.checklists = checklists;
      this.emitCard()
    },
    updateLabels(labels) {
      this.cardToEdit.labelIds = labels;
      this.emitCard()
    },
    emitCard() {
      this.$emit("updateCard", this.cardToEdit);
    },
  },
  computed: {
    activities() {
      return this.$store.getters.board.activities;
    },
    labelsForDisplay() {
      return this.labels.filter((label) => {
        if (this.cardToEdit.labelIds.includes(label.id)) return label;
      });
    },
  },
  created() {
    this.cardToEdit = JSON.parse(JSON.stringify(this.card));
  },
};
</script>
