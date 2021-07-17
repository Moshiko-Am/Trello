<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <span class="icon-lg icon-desc"></span>
      <h3 class="main-item-title">Description</h3>
    </div>
    <textarea
      class="description-textarea"
      v-model="descToEdit"
      @input="updateDesc"
      spellcheck="false"
    ></textarea>
    <button class="desc-save-btn" @click.stop="editDesc(false)">Save</button>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
  },
  data() {
    return {
      descTextarea: false,
      descToEdit: this.description || "",
    };
  },
  methods: {
    editDesc(boolean) {
      this.descTextarea = boolean;
    },
    updateDesc() {
      this.$emit("updateDesc", this.descToEdit);
    },
  },
};
</script>
