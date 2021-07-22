<template>
  <section class="checklist-preview">
    <div class="main-item-header checklist">
      <div class="inner-header">
        <span class="icon-lg icon-checklist"></span>
        <h3 class="main-item-title">{{ checklistToEdit.title }}</h3>
      </div>
      <button class="card-sidebar-btn" @click="removeCl">Delete</button>
    </div>
    <div class="progress-bar-container">
      <span>{{ progressBar.width }}</span>
      <div class="progress-bar">
        <div :style="progressBar"></div>
      </div>
    </div>
    <div v-for="(todo, tIdx) in checklist.todos" :key="todo.id" class="todo">
      <div class="inner">
        <input
          type="checkbox"
          v-model="todo.isDone"
          @change="toggleTodo(tIdx)"
        />
        <div @click="toggleTodo(tIdx)">
          <span :class="{ completed: todo.isDone }">{{ todo.title }}</span>
        </div>
      </div>
      <div class="todo-btns">
        <button><span class="icon-sm icon-date"></span></button>
        <button><span class="icon-sm icon-assign"></span></button>
        <button>
          <span class="icon-sm icon-delete" @click="deleteTodo(tIdx)"></span>
        </button>
      </div>
    </div>
    <button
      class="add-todo-btn card-sidebar-btn"
      v-if="!addingTodo"
      @click="addTodo()"
    >
      <span>Add an item</span>
    </button>
    <div v-else class="add-todo-container">
      <input
        class="add-todo-input"
        type="text"
        v-model="todoToAdd.title"
        placeholder="Add an item"
        ref="addTodo"
      />
      <div>
        <button class="save-todo-btn" @click="addTodo()">Add</button>
        <span class="icon-lg icon-x"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "@/services/util.service.js";


export default {
  props: {
    checklist: Object,
  },
  data() {
    return {
      checklistToEdit: { ...this.checklist },
      addingTodo: false,
      todoToAdd: {
        title: "",
        isDone: false,
        id: utilService.makeId(),
      },
    };
  },
  computed: {
    progressBar() {
      if (!this.checklistToEdit.todos.length) return { width: "0%" };
      const progress = {
        done: 0,
        total: 0,
      };
      this.checklistToEdit.todos.forEach((todo) => {
        if (todo.isDone) progress.done++;
        progress.total++;
      });
      const width = ((progress.done / progress.total) * 100).toFixed(0) + "%";
      var color;
      if (width === "100%") {
        color = "#61bd4f";
      }
      return { width: width, "background-color": color };
    },
  },
  methods: {
    removeCl() {
      this.$emit("removeCl", this.checklistToEdit);
    },
    toggleTodo(tIdx) {
      console.log("hi");
      var currTxt = this.checklistToEdit.todos[tIdx].isDone
        ? ` marked ${this.checklistToEdit.todos[tIdx].title} incomplete `
        : ` completed ${this.checklistToEdit.todos[tIdx].title} `;
      const activityTxt = currTxt;
      this.checklistToEdit.todos[tIdx].isDone =
        !this.checklistToEdit.todos[tIdx].isDone;
      this.updateChecklist(activityTxt);
    },
    deleteTodo(tIdx) {
      this.checklistToEdit.todos.splice(tIdx, 1);
      this.updateChecklist();
    },
    addTodo() {
      this.addingTodo = !this.addingTodo;
      if (!this.addingTodo) {
        this.checklistToEdit.todos.push({ ...this.todoToAdd });
        this.todoToAdd = {
          title: "",
          isDone: false,
          id: utilService.makeId(),
        };
        this.updateChecklist();
        return;
      } else {
        this.$nextTick(() => this.$refs.addTodo.focus());
      }
    },
    updateChecklist(activityTxt) {
      this.$emit("updateChecklist", {checklist:this.checklistToEdit,activityTxt});
    },
    emitActivity(activity) {
      console.log("activity", activity);
      this.$emit("emitActivity", activity);
    },
  },
};
</script>

<style>
</style>