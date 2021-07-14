<template>
  <section class="card-details-bg" @click="exitCard">
    <section class="card-details" @click.stop="">
      <button class="close-btn" @click="exitCard"><span class="icon-md icon-x"></span></button>
      <div class="card-details-header">
        <div class="inner-container">
          <span class="icon-lg icon-card details-header-icon"></span>
          <h2 class="card-details-title">{{ card.title }}</h2>
        </div>
        <div class="card-details-list">From list {{group.title}}</div>
      </div>

      <div class="card-details-content">
        <div class="card-details-main">

          <div class="card-main-item">
            <div class="main-item-header">
              <span class="icon-lg icon-label"></span>
              <h3 class="main-item-title">Labels</h3>
            </div>
            <div v-if="card.labelIds.length" class="labels-container">
              <div v-for="label in labelsForDisplay" :key="label.id" class="labelDisplay" :style="{backgroundColor:label.color}">
                {{label.title}}
              </div>
            </div>
          </div>

          <div class="card-main-item">
            <div class="main-item-header">
              <span class="icon-lg icon-member"></span>
              <h3 class="main-item-title">Members</h3>
            </div>
            <div v-if="card.members.length" class="members-container">
              <div v-for="member in card.members" :key="member._id" class="memberDisplay">
                <avatar :username="member.fullname" :size="35" inline color="black"></avatar>
              </div>
            </div>
          </div>

          <div class="card-main-item">
            <div class="main-item-header">
              <span class="icon-lg icon-desc"></span>
              <h3 class="main-item-title">Description</h3>
            </div>
            <div class="description-textarea">
              <p>{{ card.description }}</p>
            </div>
          </div>

          <div class="checklists" v-if="card.checklists.length">
            <div
              class="card-main-item"
              v-for="checklist in card.checklists"
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
              <div v-for="todo in checklist.todos" :key="todo.id" class="todo">
                <div class="inner">
                  <input type="checkbox" :checked="todo.isDone" />
                  <div>
                    <span :class="{ completed: todo.isDone }">{{
                      todo.title
                    }}</span>
                  </div>
                </div>
                <div class="todo-btns">
                  <button><span class="icon-sm icon-date"></span></button>
                  <button><span class="icon-sm icon-assign"></span></button>
                  <button><span class="icon-sm icon-delete"></span></button>
                </div>
              </div>
              <button class="add-todo-btn card-sidebar-btn">Add an item</button>
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
import avatar from 'vue-avatar';

export default {
  props:{
    card: Object,
    group : Object,
    labels : Array,
  },
  components:{
    avatar
  },
  methods: {
    exitCard(){
      this.$emit('clearCard')
    }
  },
  computed: {
    labelsForDisplay(){
     return this.labels.filter(label => {
        if(this.card.labelIds.includes(label.id)) return label
      })
    }
  }
};
</script>
