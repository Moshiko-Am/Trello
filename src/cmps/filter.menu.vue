<template>
  <section class="filter-menu">
    <div class="filter-menu-header">
      <button class="icon-md icon-back" @click="menuBack"></button>
      <h3>Search Cards</h3>
      <button class="icon-md icon-x" @click="closeMenu"></button>
    </div>
    <hr />
    <input
      type="text"
      class="filter-input"
      v-model="filterBy.txt"
      @input="emitFilter"
    />
    <p class="search-txt">Search by term, label, member, or due time.</p>
    <hr />
    <div class="filter-labels-list">
      <div
        class="filter-label-preview"
        v-for="label in board.labels"
        :key="label.id"
        @click="toggleLabel(label.id)"
      >
        <div
          class="label-color"
          :style="{ backgroundColor: label.color }"
        ></div>
        <div class="inner-container">
          <div class="label-title" v-if="label.title">{{ label.title }}</div>
          <span
            v-if="filterBy.labels.includes(label.id)"
            class="icon-sm icon-v"
          ></span>
        </div>
      </div>
    </div>
    <hr />
    <div class="filter-members-list">
      <div
        class="filter-member-preview"
        v-for="member in board.members"
        :key="member._id"
        @click="toggleMember(member._id)"
      >
        <avatar
          :username="member.fullname"
          :size="32"
          backgroundColor="#dfe1e6"
          color="black"
        />
        <div class="inner-container">
          <span class="member-info"
            >{{ member.fullname }} ({{ member.username }})</span
          >
          <span
            v-if="filterBy.members.includes(member._id)"
            class="icon-sm icon-v"
          ></span>
        </div>
      </div>
    </div>
    <hr />
    <div class="filter-due-list">
      <div
        v-for="(date, idx) in dueDates"
        :key="idx"
        class="filter-due-preview"
        @click="setDueDate(idx)"
      >
        <span>{{ date }}</span>
        <span v-if="filterBy.dueDate === idx" class="icon-sm icon-v"></span>
      </div>
    </div>
    <hr />
    <div class="filter-types">
      <div
        class="type"
        v-for="(type, idx) in types"
        :key="type"
        @click="setType(idx)"
      >
        <span>{{ type }}</span>
        <span class="icon-sm icon-v" v-if="idx === filterBy.type"></span>
      </div>
    </div>
    <hr />
    <div class="clear-search" @click="clearFilter">Clear search</div>
  </section>
</template>

<script>
import avatar from "vue-avatar";
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        labels: [],
        members: [],
        dueDate: null,
        type: 0,
      },
      dueDates: [
        "Due in the next day",
        "Due in the next week",
        "Due in the next month",
        "Overdue",
        "Has no due date",
        "Due date marked complete",
      ],
      types: [
        "Matches any label and any member",
        "Matches all label and all member",
      ],
    };
  },
  components: {
    avatar,
  },
  props: {
    board: Object,
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    menuBack() {
      this.$emit("menuBack");
    },
    toggleLabel(labelId) {
      if (this.filterBy.labels.includes(labelId)) {
        const idx = this.filterBy.labels.findIndex(
          (label) => label === labelId
        );
        this.filterBy.labels.splice(idx, 1);
      } else {
        this.filterBy.labels.push(labelId);
      }
      this.emitFilter();
    },
    toggleMember(memberId) {
      if (this.filterBy.members.includes(memberId)) {
        const idx = this.filterBy.members.findIndex(
          (member) => member === memberId
        );
        this.filterBy.members.splice(idx, 1);
      } else {
        this.filterBy.members.push(memberId);
      }
      this.emitFilter();
    },
    setDueDate(idx) {
      this.filterBy.dueDate = idx;
      this.emitFilter();
    },
    setType(idx) {
      this.filterBy.type = idx;
      this.emitFilter();
    },
    clearFilter() {
      this.filterBy = {
        txt: "",
        labels: [],
        members: [],
        dueDate: null,
        type: 0,
      };
      this.emitFilter();
    },
    emitFilter() {
      this.$emit("emitFilter", this.filterBy);
    },
  },
};
</script>
