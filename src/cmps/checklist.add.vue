<template>
  <section class="checklist-add" @click.stop="">
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Add checklist</header>
    <label>
      <h4>Title</h4>
      <input
        type="text"
        ref="input"
        placeholder="checkList"
        v-model="checklist.title"
      />
    </label>
    <button class="add-cl-btn" @click="addCl">Add</button>
  </section>
</template>

<script>
import { utilService } from "@/services/util.service.js";

export default {
  data() {
    return {
      checklist: {
        id: utilService.makeId(),
        title: "",
        todos: [],
      },
    };
  },
  methods: {
    addCl() {
      if (!this.checklist.title) {
        this.$refs.input.focus();
        return;
      }
      this.$emit("addCl", { ...this.checklist });
      this.checklist = {
        id: utilService.makeId(),
        title: "",
        todos: [],
      };
    },
    close() {
      this.$emit("closePopups");
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
