<template>
  <section
    v-if="groupsToEdit"
    ref="grouplistwrapper"
    class="group-list-wrapper"
  >
    <draggable
      class="group-list"
      handle=".group-wrapper"
      animation="500"
      v-model="groupsToEdit"
      @start="drag = true"
      @end="
        drag = false;
        saveGroups();
      "
      dragClass="ghost"
      ghostClass="tilted"
    >
      <div
        v-for="(group, gIdx) in groupsToEdit"
        :key="group.id"
        class="group-wrapper"
      >
        <div class="group">
          <div class="group-details">
            <div class="group-header">
              <textarea
                class="group-header-name mod-group-name"
                v-bind:aria-label="group.title"
                spellcheck="false"
                dir="auto"
                v-model="group.title"
                @change="saveGroups"
              ></textarea>
              <div class="group-header-extras" @click="toggleExtras(gIdx)">
                <a class="group-header-extras-menu icon-sm icon-dots-menu"> </a>
                <div
                  v-if="isExtrasShowing && currGroupIdx === gIdx"
                  class="popup"
                >
                  <div class="header">
                    <div class="header-title">List actions</div>
                    <span
                      class="header-close icon-sm icon-x"
                      @click.stop="toggleExtras(gIdx)"
                    ></span>
                  </div>
                  <div class="popup-content">
                    <div class="item">
                      <a @click="deleteGroup(gIdx)">Delete this list</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section
              :ref="'card-preview-wrapper-' + gIdx"
              class="card-preview-wrapper"
            >
              <draggable
                group="cards"
                animation="500"
                v-model="group.cards"
                @change="saveGroups"
                dragClass="ghost"
                ghostClass="tilted"
              >
                <card-preview
                  v-for="(card, cIdx) in group.cards"
                  :ref="'cardpreview-' + gIdx + '-' + cIdx"
                  :card="card"
                  :key="card.id"
                  @click.native="setCard(card, gIdx, cIdx)"
                  @openCard="openCard(card, gIdx)"
                  @openBg="openBg"
                  @updateCard="updateCard($event, gIdx)"
                  @removeCard="removeCard($event, gIdx)"
                />
              </draggable>
            </section>
          </div>
          <div
            v-if="isAddingCard && currGroupIdx === gIdx"
            class="add-card card-preview"
          >
            <textarea
              @blur="toggleCardEdit(gIdx)"
              placeholder="Enter a title for this card..."
              dir="auto"
              :ref="'content-' + gIdx"
              v-model="cardToEdit.title"
            ></textarea>
          </div>
          <section class="add-card-container" ref="addcard">
            <div
              v-if="isAddingCard && currGroupIdx === gIdx"
              class="card-composer-container"
            >
              <div class="add-card-controls">
                <button class="btn-add-card" @click.stop="saveCard(gIdx)">
                  Add card
                </button>
                <a class="icon-lg icon-close" @click="closeCardEdit(gIdx)"></a>
              </div>
            </div>
            <div v-else class="card-composer-container">
              <a class="open-card-composer" @click="toggleCardEdit(gIdx)">
                <span class="icon-sm icon-add"></span>
                <span class="add-card">Add a card</span></a
              >
            </div>
          </section>
        </div>
      </div>
      <div
        ref="addgroup"
        class="group-wrapper mod-add"
        :class="{ 'is-edit': isAddingGroup }"
      >
        <form v-if="isAddingGroup" v-click-outside="toggleGroupEdit">
          <input
            class="group-name-input"
            type="text"
            name="name"
            ref="newgroupcontent"
            v-model="groupToEdit.title"
            placeholder="Enter list title…"
            autocomplete="off"
            dir="auto"
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
    <transition name="fade">
      <card-details
        v-if="currCard"
        :card="currCard"
        :group="groupsToEdit[currGroupIdx]"
        @createLabel="createLabel"
        @removeLabel="removeLabel"
        @clearCard="clearCard"
        @updateCard="updateCard($event, currGroupIdx)"
        @removeCard="removeCard($event, currGroupIdx)"
      ></card-details>
    </transition>
  </section>
</template>

<script>
import cardDetails from "./card.details.vue";
import cardPreview from "./card.preview.vue";
import draggable from "vuedraggable";
import { socketService } from "@/services/socket.service.js";
import clickOutside from "vue-click-outside";
export default {
  props: {
    groups: Array,
  },
  directives: {
    clickOutside,
  },
  data() {
    return {
      isAddingGroup: false,
      isAddingCard: false,
      groupsToEdit: null,
      groupToEdit: {
        id: this.makeId(),
        title: "",
        createdAt: Date.now(),
        cards: [],
      },
      currCard: null,
      currGroupIdx: null,
      isExtrasShowing: false,
      cardToEdit: {
        id: this.makeId(),
        title: "",
        createdAt: Date.now(),
      },
    };
  },
  components: {
    cardPreview,
    cardDetails,
    draggable,
  },
  methods: {
    createLabel(label){
      this.$emit('createLabel',label)
    },
    removeLabel(labelId){
      this.$emit('removeLabel',labelId)
    },
    closeCardEdit(gIdx) {
      this.isAddingCard = false;
      this.$refs[`card-preview-wrapper-${gIdx}`][0].classList.remove(
        "is-editing"
      );
      this.cardToEdit.title = "";
    },
    saveCard(gIdx) {
      console.log(this.cardToEdit.title);
      if (!this.cardToEdit.title) {
        this.$refs[`content-${gIdx}`][0].focus();
        return;
      }
      const savedCard = { ...this.cardToEdit };
      savedCard.id = this.makeId();
      console.log(gIdx);
      this.groupsToEdit[gIdx].cards.push(savedCard);
      this.saveGroups();
      this.cardToEdit.title = "";
      this.$refs[`content-${gIdx}`][0].focus();
    },
    toggleCardEdit(gIdx) {
      this.isExtrasShowing = false;
      this.$refs[`card-preview-wrapper-${gIdx}`][0].classList.toggle(
        "is-editing"
      );
      if (this.isAddingCard && gIdx !== this.currGroupIdx)
        this.currGroupIdx = gIdx;
      else {
        this.currGroupIdx = gIdx;
        this.isAddingCard = !this.isAddingCard;
      }
      if (this.isAddingCard)
        this.$nextTick(() => this.$refs[`content-${gIdx}`][0].focus());
      else if (this.cardToEdit.title) this.saveCard(gIdx);
    },
    toggleExtras(gIdx) {
      this.isAddingCard = false;
      if (this.isExtrasShowing && gIdx !== this.currGroupIdx) {
        this.currGroupIdx = gIdx;
      } else {
        this.currGroupIdx = gIdx;
        this.isExtrasShowing = !this.isExtrasShowing;
      }
    },
    openBg() {
      this.$emit("openBg");
    },
    openCard(card, gIdx) {
      this.setCard(card, gIdx);
    },
    setCard(card, gIdx, cIdx) {
      this.currCard = card;
      this.currGroupIdx = gIdx;
      this.$refs[`cardpreview-${gIdx}-${cIdx}`][0].isQuickEdit = false;
      this.$parent.bgOpen = false;
    },
    clearCard() {
      this.currCard = null;
      this.currGroupIdx = null;
    },
    removeCard(cardId, gIdx) {
      const idx = this.groupsToEdit[gIdx].cards.findIndex(
        (card) => card.id === cardId
      );
      this.groupsToEdit[gIdx].cards.splice(idx, 1);
      this.clearCard();
      this.saveGroups();
    },
    updateCard(updatedCard, gIdx) {
      const cIdx = this.groupsToEdit[gIdx].cards.findIndex(
        (card) => card.id === updatedCard.id
      );
      this.groupsToEdit[gIdx].cards.splice(cIdx, 1, updatedCard);
      socketService.emit("send card", { payload: updatedCard, cIdx, gIdx });
      this.saveGroups();
    },
    saveGroups() {
      this.$emit("boardUpdate", {
        type: "groups",
        payload: this.groupsToEdit,
      });
      socketService.emit("send groups", this.groupsToEdit);
    },
    saveGroup() {
      const savedGroup = { ...this.groupToEdit };
      savedGroup.id = this.makeId();
      this.groupsToEdit.push(savedGroup);
      this.saveGroups();
      this.groupToEdit.title = "";
    },
    deleteGroup(gIdx) {
      this.groupsToEdit.splice(gIdx, 1);
      this.currGroupIdx = null;
      this.isExtrasShowing = false;
      this.saveGroups();
    },
    toggleGroupEdit() {
      this.isAddingGroup = !this.isAddingGroup;
      if (this.isAddingGroup) {
        this.$nextTick(() => {
          this.$refs.newgroupcontent.focus();
        });
      } else if (this.groupToEdit.title) this.saveGroup();
    },
    closeGroupEdit() {
      this.isAddingGroup = false;
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
    this.groupsToEdit = JSON.parse(JSON.stringify(this.groups));
  },
  mounted() {
    this.popupItem = this.$refs.addgroup;
  },
  watch: {
    groups: {
      immediate: true,
      handler() {
        this.groupsToEdit = JSON.parse(JSON.stringify(this.groups));
      },
    },
  },
};
</script>
