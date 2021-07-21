<template>
  <section class="create-labels" @click.stop="">
    <span class="icon-sm icon-x" @click="close"></span>
    <span class="icon-sm icon-back" @click="back"></span>
    <header>Create label</header>
    <h3>Name</h3>
    <input type="text" v-model="labelToEdit.title" />
    <h3>Select a color</h3>
    <div class="color-options">
      <div
        v-for="color in colors"
        class="color-option"
        :key="color"
        @click="setColor(color)"
        :style="{backgroundColor : color}"
      >
      <div v-if="selectedColor === color">
        <span class="icon-md icon-v"></span>
      </div>
      </div>
    </div>
    <div class="edit-btns"  v-if="this.label">
    <button class="create-btn" @click="saveLabel">save</button>
    <button class="delete-btn" @click="removeLabel">Delete</button>
    </div>
    <button class="create-btn" v-else @click="createLabel">Create</button>
  </section>
</template>

<script>
export default {
  props:{
    label: Object
  },
  data() {
    return {
      labelToEdit: JSON.parse(JSON.stringify(this.label)) || {
        title: "",
        color: "",
        id: this.makeId(),
      },
      colors: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
      ],
    };
  },
  methods: {
    makeId() {
      const num = Math.floor(Math.random() * (900 - 1) + 1);
      return "l" + num;
    },
    setColor(color) {
        this.labelToEdit.color = color;
        console.log('color',this.labelToEdit.color);
    },
    createLabel() {
      if(!this.labelToEdit.color) return
      this.$emit("createLabel", { ...this.labelToEdit });
      this.labelToEdit = {
        title: "",
        color: "",
        id: this.makeId(),
      };
    },
    saveLabel() {
      this.$emit("createLabel", { ...this.labelToEdit });
    },
    removeLabel(){
      this.$emit("removeLabel",this.label.id)
    },
    close(){
      this.$emit('close')
    },
    back(){
      this.$emit('back')
    }
  },
  computed:{
      selectedColor(){
          return this.labelToEdit.color
      }
  }
};
</script>
