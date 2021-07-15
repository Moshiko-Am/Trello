<template>
  <section class="checklist-add">
      <span class="sm-icon icon-x" @click="close"></span>
    <h3>Add checklist</h3>
    <hr />
    <label>
      Title
      <input type="text" placeholder="checkList" v-model="checklist.title" />
    </label>
    <button class="add-cl-btn" @click="addCl">Add</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkList: {
        id: makeId(),
        title: "",
        todos: [],
      },
    };
  },
  methods: {
    addCl() {
      this.$emit("addCl", { ...this.checkList });
      this.checkList = {
        id: makeId(),
        title: "",
        todos: [],
      };
    },
    close(){
        
    }
  },
};
</script>