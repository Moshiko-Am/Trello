<template>
  <section class="card-details-bg">
    <section class="card-details">
      <div class="card-details-header">
        <div class="icon details-header-icon">i</div>
        <div class="card-details-title">Card Title</div>
        <div class="card-details-list">From list "listname"</div>
      </div>
      <div class="card-details-content">
        <div class="card-details-main">
          <div class="card-main-item">
            <div class="main-item-header">
              <div class="icon description-header-icon">i</div>
              <h3 class="main-item-title">Description</h3>
            </div>
            <div class="description-textarea">
              <p>Add a more detailed description...</p>
            </div>
          </div>
          <div class="card-main-item">
            <div class="main-item-header">
              <div class="icon description-header-icon">i</div>
              <h3 class="main-item-title">Checklist</h3>
            </div>
          </div>
          <div class="card-main-item">
            <div class="main-item-header activity">
              <div>
                <div class="icon description-header-icon">i</div>
                <h3 class="main-item-title">Activity</h3>
              </div>
              <button>Show Details</button>
            </div>
          </div>
        </div>
        <div class="card-details-sidebar">
          <div class="card-sidebar-btn">
            <img src="@/assets/img/icons/user.png" class="icon" alt="">
            <p class="sidebar-btn-title">Members</p>
          </div>
          <div class="card-sidebar-btn">
            <div>i</div>
            <p class="sidebar-btn-title">Labels</p>
          </div>
          <div class="card-sidebar-btn">
            <div>i</div>
            <p class="sidebar-btn-title">Checklist</p>
          </div>
          <div class="card-sidebar-btn">
            <div>i</div>
            <p class="sidebar-btn-title">Dates</p>
          </div>
          <div class="card-sidebar-btn">
            <div>i</div>
            <p class="sidebar-btn-title">Attachments</p>
          </div>
          <div class="card-sidebar-btn">
            <div>i</div>
            <p class="sidebar-btn-title">Cover</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {};
</script>
