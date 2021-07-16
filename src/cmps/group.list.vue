<template>
  <section v-if="groups" class="group-list">
    <div v-for="group in groups" v-bind:key="group.id" class="group-wrapper">
      <div class="group">
        <group-details
          :group="group"
          :labels="labels"
          @saveGroup="saveGroups"
        />
      </div>
    </div>
    <div ref="addgroup" class="group-wrapper mod-add">
      <form v-if="isAddingGroup">
        <input
          class="group-name-input"
          type="text"
          name="name"
          ref="content"
          v-model="groupToEdit.title"
          placeholder="Enter list title…"
          autocomplete="off"
          dir="auto"
          v-click-outside="toggleGroupEdit"
        />
        <div class="group-add-controls">
          <input
            class="btn-add-group"
            type="submit"
            value="Add list"
            @click="toggleGroupEdit"
          />
          <a
            class="icon-lg icon-close"
            aria-label="Cancel list editing"
            @click="toggleGroupEdit"
          ></a>
        </div>
      </form>
      <a v-if="!isAddingGroup" class="open-add-list" @click="toggleGroupEdit">
        <span class="icon-sm icon-add"></span>Add another list
      </a>
    </div>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import groupDetails from "@/cmps/group.details.vue";
import ClickOutside from "vue-click-outside";
export default {
  props: {
    groups: Array,
    labels: Array,
  },
  data() {
    return {
      isAddingGroup: false,
      groupToEdit: {
        id: this.makeId(),
        title: "",
        createdAt: Date.now(),
        cards: [],
      },
    };
  },
  components: {
    groupDetails,
  },
  methods: {
    saveGroups(savedGroup) {
      const groupsToEdit = JSON.parse(JSON.stringify(this.groups));
      const idx = groupsToEdit.findIndex((group) => {
        return group.id === savedGroup.id;
      });
      idx !== -1
        ? groupsToEdit.splice(idx, 1, savedGroup)
        : groupsToEdit.push(savedGroup);
      this.$emit("boardUpdate", {
        type: "groups",
        payload: groupsToEdit,
      });
    },
    toggleGroupEdit() {
      this.isAddingGroup = !this.isAddingGroup;
      if (this.isAddingGroup) this.$nextTick(() => this.$refs.content.focus());
      else if (this.groupToEdit.title) {
        const savedGroup = { ...this.groupToEdit };
        savedGroup.id = this.makeId();
        this.saveGroups(savedGroup);
        this.groupToEdit.title = "";
      }
    },
    makeId(length = 5) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
  },
  mounted() {
    this.popupItem = this.$refs.addgroup;
  },
  directives: {
    ClickOutside,
  },
};
</script>
