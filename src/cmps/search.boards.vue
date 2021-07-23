<template>
  <section class="search-boards-container">
    <div class="search-board-input-container">
      <input
        type="text"
        placeholder="Start typing..."
        class="search-board-input"
        @input="setFilter"
        v-model="filterBy"
      />
    </div>
    <div class="search-header-container">
      <h1 class="board-search-header" v-if="boardsForDisplay">
        Search results
      </h1>
      <h1 class="board-search-header" v-else>Start Typing...</h1>
    </div>
    <div class="boards-list-sm">
      <board-preview
        @click.native.stop="closeSearch"
        v-for="board in boardsForDisplay"
        display="small"
        :board="board"
        :key="board._id"
      />
    </div>
  </section>
</template>

<script>
import boardPreview from "./board.preview";
export default {
  props: {
    boardsForDisplay: Array,
  },
  components: {
    boardPreview,
  },
  data() {
    return {
      filterBy: "",
    };
  },
  methods: {
    setFilter() {
      this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
    },
    closeSearch() {
      this.$emit("closeSearch");
    },
  },
};
</script>
