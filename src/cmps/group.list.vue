<template>
  <section v-if="groupsToEdit" class="group-list-wrapper">
    <draggable
      class="group-list"
      :options="{ handle: '.group-wrapper', filter: '.mod-add' }"
      v-model="groupsToEdit"
      @start="drag = true"
      @end="
        drag = false;
        saveGroups();
      "
      ghost-class="ghost"
    >
      <!-- <transition-group> -->
      <div v-for="group in groupsToEdit" :key="group.id" class="group-wrapper">
        <div class="group">
          <group-details
            :group="group"
            :labels="labels"
            @updateGroup="updateGroup"
            @deleteGroup="deleteGroup"
          />
        </div>
      </div>
      <!-- </transition-group> -->
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
              @click="closeGroupEdit"
            ></a>
          </div>
        </form>
        <a v-if="!isAddingGroup" class="open-add-list" @click="toggleGroupEdit">
          <span class="icon-sm icon-add"></span>Add another list
        </a>
      </div>
    </draggable>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import groupDetails from "@/cmps/group.details.vue";
import ClickOutside from "vue-click-outside";
import draggable from "vuedraggable";
export default {
  props: {
    groups: Array,
    labels: Array,
  },
  data() {
    return {
      isAddingGroup: false,
      groupsToEdit: null,
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
    draggable,
  },
  methods: {
    saveGroups() {
      this.$emit("boardUpdate", {
        type: "groups",
        payload: this.groupsToEdit,
      });
    },
    updateGroup(savedGroup) {
      const idx = this.groupsToEdit.findIndex((group) => {
        return group.id === savedGroup.id;
      });
      idx !== -1
        ? this.groupsToEdit.splice(idx, 1, savedGroup)
        : this.groupsToEdit.push(savedGroup);
      this.saveGroups();
    },
    saveGroup() {
      const savedGroup = { ...this.groupToEdit };
      savedGroup.id = this.makeId();
      this.updateGroup(savedGroup);
      this.groupToEdit.title = "";
    },
    deleteGroup(groupId) {
      const groupsToEdit = JSON.parse(JSON.stringify(this.groups));
      const idx = groupsToEdit.findIndex((group) => {
        return group.id === groupId;
      });
      if (idx !== -1) groupsToEdit.splice(idx, 1);
      else return;
      this.$emit("boardUpdate", {
        type: "groups",
        payload: groupsToEdit,
      });
    },
    toggleGroupEdit() {
      this.isAddingGroup = !this.isAddingGroup;
      this.$refs.addgroup.classList.toggle("is-edit");
      if (this.isAddingGroup) {
        this.$nextTick(() => {
          this.$refs.content.focus();
        });
      } else if (this.groupToEdit.title) this.saveGroup();
    },
    closeGroupEdit() {
      this.isAddingGroup = false;
      this.$refs.addgroup.classList.remove("is-edit");
      this.groupToEdit.title = "";
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
  created() {
    this.groupsToEdit = this.groups;
  },
  mounted() {
    this.popupItem = this.$refs.addgroup;
  },
  directives: {
    ClickOutside,
  },
};
</script>
