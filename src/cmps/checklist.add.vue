<template>
  <section class="checklist-add" @click.stop="">
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Add checklist</header>
    <label>
      <h4>Title</h4>
      <input type="text" placeholder="checkList" v-model="checklist.title" />
    </label>
    <button class="add-cl-btn" @click="addCl">Add</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checklist: {
        id: this.makeId(),
        title: "",
        todos: [],
      },
    };
  },
  methods: {
    addCl() {
      this.$emit("addCl", { ...this.checklist });
      this.checklist = {
        id: this.makeId(),
        title: "",
        todos: [],
      };
    },
    close() {
      this.$emit("closePopups");
    },
    makeId() {
      const num = Math.floor(Math.random() * (900 - 1) + 1);
      return "c" + num;
    },
  },
};
</script>