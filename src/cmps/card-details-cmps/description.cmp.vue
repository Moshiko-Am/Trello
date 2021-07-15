<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <span class="icon-lg icon-desc"></span>
      <h3 class="main-item-title">Description</h3>
    </div>
    <div class="description-textarea" @click="editDesc(true)">
      <p v-if="!descTextarea">{{ descToEdit }}</p>
      <div v-else>
        <textarea
          id=""
          cols="30"
          rows="5"
          v-model="descToEdit"
          @input="updateDesc"
        ></textarea>
        <button class="desc-save-btn" @click.stop="editDesc(false)">
          Save
        </button>
      </div>
    </div>
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
      descToEdit : this.description || '',
    }
  },
  methods: {
    editDesc(boolean) {
      this.descTextarea = boolean;
    },
    updateDesc(){
        this.$emit('updateDesc' , this.descToEdit)
    }
  },
};
</script>
