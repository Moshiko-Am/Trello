<template>
  <section class="card-details-bg">
    <section class="card-details">
      <button class="close-btn"><span class="icon-md icon-x"></span></button>
      <div class="card-details-header">
        <div class="inner-container">
          <span class="icon-lg icon-card details-header-icon"></span>
          <h2 class="card-details-title">{{ card.title }}</h2>
        </div>
        <div class="card-details-list">From list {listname}</div>
      </div>
      <div class="card-details-content">
        <div class="card-details-main">
          <div class="card-main-item">
            <div class="main-item-header">
              <span class="icon-lg icon-label"></span>
              <h3 class="main-item-title">Labels</h3>
            </div>
            <div v-if="card.labelIds.length" class="labels-container">
              <div v-for="label in card.labelIds" :key="label" class="labelDisplay">
                {{label}}
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
                {{member.fullname}}
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
export default {
  data() {
    return {
      card: {
        id: "c104",
        title: "Help me",
        description:
          "I need to make a very special super duper app that looks like trello",
        comments: [
          {
            id: "ZdPnm",
            txt: "also @yaronb please CR this",
            createdAt: 1590999817436.0,
            byMember: {
              _id: "u101",
              fullname: "Tal Tarablus",
              imgUrl:
                "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
            },
          },
        ],
        checklists: [
          {
            id: "YEhmF",
            title: "Checklist 1",
            todos: [
              {
                id: "212jX",
                title: "To Do 1",
                isDone: false,
              },
              {
                id: "242jX",
                title: "To Do that",
                isDone: true,
              },
            ],
          },
          {
            id: "YEt5F",
            title: "Checklist 2",
            todos: [
              {
                id: "212yX",
                title: "To Do this",
                isDone: true,
              },
            ],
          },
        ],
        members: [
          {
            _id: "u101",
            username: "Tal",
            fullname: "Tal Tarablus",
            imgUrl:
              "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
          },
        ],
        labelIds: ["l101", "l102"],
        createdAt: 1590999730348,
        dueDate: 16156215211,
        byMember: {
          _id: "u101",
          username: "Tal",
          fullname: "Tal Tarablus",
          imgUrl:
            "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
        },
        style: {
          bgColor: "#26de81",
        },
      },
    };
  },
};
</script>
