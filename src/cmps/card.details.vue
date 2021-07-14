<template>
  <section class="card-details-bg">
    <section class="card-details">
      <div class="card-details-header">
        <div class="inner-container">
        <span class="m-icon details-header-icon"></span>
        <h2 class="card-details-title">{{card.title}}</h2>
        </div>
        <div class="card-details-list">From list "listname"</div>
      </div>
      <div class="card-details-content">
        <div class="card-details-main">
          <div class="card-main-item">
            <div class="main-item-header">
              <img class="m-icon description-header-icon" src="@/assets/img/icons/description.png" />
              <h3 class="main-item-title">Description</h3>
            </div>
            <div class="description-textarea">
              <p>{{card.description}}</p>
            </div>
          </div>
          <div class="card-main-item">
            <div class="main-item-header">
              <img class="m-icon description-header-icon" src="@/assets/img/icons/checked-box.png" />
              <h3 class="main-item-title">Checklist</h3>
            </div>
          </div>
          <div class="card-main-item">
            <div class="main-item-header activity">
              <div>
                <img class="m-icon description-header-icon" src="@/assets/img/icons/activity.png" />
                <h3 class="main-item-title">Activity</h3>
              </div>
              <button>Show Details</button>
            </div>
          </div>
        </div>
        <div class="card-details-sidebar">
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/user.png" class="s-icon" alt="">
            <p class="sidebar-btn-title">Members</p>
          </div>
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/label.png" class="s-icon" alt="">
            <p class="sidebar-btn-title">Labels</p>
          </div>
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/checked-box.png" class="s-icon" alt="">
            <p class="sidebar-btn-title">Checklist</p>
          </div>
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/clock.png" class="s-icon" alt="">
            <p class="sidebar-btn-title">Dates</p>
          </div>
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/attachments.png" class="s-icon" alt="">
            <p class="sidebar-btn-title">Attachments</p>
          </div>
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/cover.png" class="s-icon" alt="">
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
        description: "I need to make a very special super duper app that looks like trello",
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
            title: "Checklist",
            todos: [
              {
                id: "212jX",
                title: "To Do 1",
                isDone: false,
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
