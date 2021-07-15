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
            <div class="card-main-item">
              <div class="main-item-header">
                <span class="icon-md icon-label"></span>
                <h3 class="main-item-title">Labels</h3>
              </div>
              <div v-if="cardToEdit.labelIds" class="labels-container">
                <div
                  v-for="label in labelsForDisplay"
                  :key="label.id"
                  class="labelDisplay"
                  :style="{ backgroundColor: label.color }"
                >
                  {{ label.title }}
                </div>
              </div>
            </div>

            <div class="card-main-item">
              <div class="main-item-header">
                <span class="icon-md icon-member"></span>
                <h3 class="main-item-title">Members</h3>
              </div>
              <div v-if="cardToEdit.members" class="members-container">
                <div
                  v-for="member in cardToEdit.members"
                  :key="member._id"
                  class="memberDisplay"
                >
                  <avatar
                    :username="member.fullname"
                    :size="32"
                    inline
                    color="black"
                    :title="member.fullname"
                  ></avatar>
                </div>
              </div>
            </div>
          </div>

          <div class="card-main-item">
            <div class="main-item-header">
              <span class="icon-lg icon-desc"></span>
              <h3 class="main-item-title">Description</h3>
            </div>
            <div class="description-textarea" @click="editDesc(true)">
              <p v-if="!descTextarea">{{ cardToEdit.description }}</p>
              <div v-else>
                <textarea
                  id=""
                  cols="30"
                  rows="5"
                  v-model="cardToEdit.description"
                ></textarea>
                <button class="desc-save-btn" @click.stop="editDesc(false)">
                  Save
                </button>
              </div>
            </div>
          </div>

          <div class="checklists" v-if="cardToEdit.checklists">
            <div
              class="card-main-item"
              v-for="(checklist, cIdx) in cardToEdit.checklists"
              :key="checklist.id"
            >
              <div class="main-item-header checklist">
                <div class="inner-header">
                  <span class="icon-lg icon-checklist"></span>
                  <h3 class="main-item-title">{{ checklist.title }}</h3>
                </div>
                <button class="card-sidebar-btn">Delete</button>
              </div>
              <div class="progress-bar-container">
                <span>0%</span>
                <div class="progress-bar"><div></div></div>
              </div>
              <div v-for="(todo,tIdx) in checklist.todos" :key="todo.id" class="todo">
                <div class="inner">
                  <input type="checkbox" v-model="todo.isDone" />
                  <div @click="toggleTodo(tIdx , cIdx)">
                    <span :class="{ completed: todo.isDone }">{{
                      todo.title
                    }}</span>
                  </div>
                </div>
                <div class="todo-btns">
                  <button><span class="icon-sm icon-date"></span></button>
                  <button><span class="icon-sm icon-assign"></span></button>
                  <button><span class="icon-sm icon-delete" @click="deleteTodo(tIdx, cIdx)"></span></button>
                </div>
              </div>
              <input v-if="addingTodo" type="text" v-model="checklist.todos[checklist.todos.length-1].title">
              <button class="add-todo-btn card-sidebar-btn" @click="addTodo(cIdx)">Add an item</button>
            </div>
          </div>
          <div class="card-main-item">
            <div class="main-item-header activity">
              <div class="inner-header">
                <span class="icon-lg icon-activity"></span>
                <h3 class="main-item-title">Activity</h3>
              </div>
              <button class="card-sidebar-btn">Show Details</button>
            </div>
          </div>
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
          <div class="card-sidebar-btn">
            <span class="icon-sm icon-label"></span>
            <p class="sidebar-btn-title">Labels</p>
          </div>
          <div class="card-sidebar-btn">
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
  </section>
</template>

<script>
import avatar from "vue-avatar";

export default {
  props: {
    card: Object,
    group: Object,
    labels: Array,
  },
  data() {
    return {
      cardToEdit: null,
      descTextarea: false,
      addingTodo : false,
    };
  },
  components: {
    avatar,
  },
  methods: {
    exitCard() {
      this.$emit("clearCard");
    },
    editDesc(boolean) {
      this.descTextarea = boolean;
    },
    toggleTodo(tIdx , cIdx){
      this.cardToEdit.checklists[cIdx].todos[tIdx].isDone = !this.cardToEdit.checklists[cIdx].todos[tIdx].isDone
    },
    deleteTodo(tIdx,cIdx){
      this.cardToEdit.checklists[cIdx].todos.splice(tIdx , 1);
    },
    addTodo(cIdx){
      this.addingTodo = !this.addingTodo
      console.log('this.addingTodo',this.addingTodo);
      if(!this.addingTodo) return
      const newTodo = {
        id : this.makeId(),
        title : '',
        isDone : false
      }
      console.log('newTodo',newTodo);
      this.cardToEdit.checklists[cIdx].todos.push(newTodo)
    },
    makeId(){
      const num = Math.floor(Math.random()*(900-1) + 1)
      return 'c'+num
    }
  },
  computed: {
    labelsForDisplay() {
      return this.labels.filter((label) => {
        if (this.card.labelIds.includes(label.id)) return label;
      });
    },
  },
  created() {
    this.cardToEdit = JSON.parse(JSON.stringify(this.card));
  },
};
</script>
