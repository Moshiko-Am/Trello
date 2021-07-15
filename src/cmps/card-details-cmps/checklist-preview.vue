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
      <span>{{ progressBar }}</span>
      <div class="progress-bar">
        <div :style="{ width: progressBar }"></div>
      </div>
    </div>
    <div v-for="(todo, tIdx) in checklist.todos" :key="todo.id" class="todo">
      <div class="inner">
        <input type="checkbox" v-model="todo.isDone" />
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
    <input
      v-if="addingTodo"
      type="text"
      v-model="checklist.todos[checklist.todos.length - 1].title"
    />
    <button class="add-todo-btn card-sidebar-btn" @click="addTodo()">
      <span v-if="!addingTodo">Add an item</span>
      <span v-if="addingTodo" class="icon-md icon-v"></span>
    </button>
  </section>
</template>

<script>
export default {
  props: {
    checklist: Object,
  },
  data() {
    return {
      checklistToEdit: {...this.checklist},
      addingTodo: false,
    };
  },
  computed: {
    progressBar() {
      if(!this.checklistToEdit.todos.length) return '0%'
      const progress = {
        done: 0,
        total: 0,
      };
      this.checklistToEdit.todos.forEach((todo) => {
        if (todo.isDone) progress.done++;
        progress.total++;
      });

      return ((progress.done / progress.total) * 100).toFixed(0) + "%"
    },
  },
  methods: {
    removeCl(){
      this.$emit('removeCl', this.checklistToEdit)
    },
    toggleTodo(tIdx) {
      this.checklistToEdit.todos[tIdx].isDone = !this.checklistToEdit.todos[tIdx].isDone;
      this.updateChecklist();
    },
    deleteTodo(tIdx) {
      this.checklistToEdit.todos.splice(tIdx, 1);
      this.updateChecklist();
    },
    addTodo() {
      this.addingTodo = !this.addingTodo;
      if (!this.addingTodo) return;
      const newTodo = {
        id: this.makeId(),
        title: "",
        isDone: false,
      };
      this.checklistToEdit.todos.push(newTodo);
      this.updateChecklist();
    },
    makeId() {
      const num = Math.floor(Math.random() * (900 - 1) + 1);
      return "t" + num;
    },
    updateChecklist() {
      this.$emit("updateChecklist", this.checklistToEdit);
    },
  },
};
</script>

<style>
</style>