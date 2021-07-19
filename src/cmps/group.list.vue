<template>
  <section v-if="groupsToEdit" class="group-list-wrapper">
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
              <div class="group-header-extras">
                <a
                  class="group-header-extras-menu icon-sm icon-dots-menu"
                  @click="toggleExtras"
                >
                </a>
                <div v-if="isExtrasShowing" class="popup">
                  <div class="header">
                    <div class="header-title">List actions</div>
                    <span
                      class="header-close icon-sm icon-x"
                      @click="toggleExtras"
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
            <section :ref="'card-preview-wrapper-'+gIdx" class="card-preview-wrapper">
              <draggable
                group="cards"
                animation="500"
                v-model="group.cards"
                @change="saveGroups"
              >
                <card-preview
                  v-for="card in group.cards"
                  :card="card"
                  :key="card.id"
                  @click.native="setCard(card, gIdx)"
                  @openCard="openCard"
                  @openBg="openBg"
                  @updateCard="updateCard($event, gIdx)"
                  @removeCard="removeCard($event, gIdx)"
                />
              </draggable>
            </section>
          </div>
          <div v-if="isAddingCard" class="add-card card-preview">
            <textarea
              v-click-outside="toggleCardEdit"
              placeholder="Enter a title for this card..."
              dir="auto"
              ref="content"
              v-model="cardToEdit.title"
            ></textarea>
          </div>
          <section class="add-card-container" ref="addcard">
            <div v-if="isAddingCard" class="card-composer-container">
              <div class="add-card-controls">
                <button class="btn-add-card" @click="saveCard(gIdx)">Add card</button>
                <a class="icon-lg icon-close" @click="closeCardEdit"></a>
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
    <card-details
      v-if="currCard"
      :card="currCard"
      :group="groupsToEdit[currGroupIdx]"
      @clearCard="clearCard"
      @updateCard="updateCard($event, currGroupIdx)"
      @removeCard="removeCard($event, currGroupIdx)"
    ></card-details>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import cardDetails from "./card.details.vue";
import ClickOutside from "vue-click-outside";
import cardPreview from "./card.preview.vue";
import draggable from "vuedraggable";
export default {
  props: {
    groups: Array,
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
      currCard: null,
      currGroupIdx: null,
      isExtrasShowing: false,
      // isAddingCard: false,
      cardToEdit: {
        id: this.makeId(),
        title: "",
        createdAt: Date.now(),
      },
    };
  },
  components: {
    // groupDetails,
    cardPreview,
    cardDetails,
    draggable,
  },
  computed: {
    isAddingCard(){
      if(!this.currGroupIdx) return false
      return this.$refs[`card-preview-wrapper-${this.currGroupIdx}`][0].className.contains("is-editing");
    }
  },
  methods: {
    closeCardEdit() {
      this.isAddingCard = false;
      this.$refs["card-preview-wrapper"].classList.remove("is-editing");
      this.cardToEdit.title = "";
    },
    saveCard(gIdx) {
      if (!this.cardToEdit.title) {
        this.$refs.content.focus();
        return;
      }
      const savedCard = { ...this.cardToEdit };
      savedCard.id = this.makeId();
      this.groupsToEdit[gIdx].cards.push(savedCard);
      this.saveGroups();
      this.cardToEdit.title = "";
      this.$refs.content.focus();
    },
    toggleCardEdit(gIdx) {
      // this.currGroup = this.$refs[`card-preview-wrapper-${gIdx}`][0]
      console.log('this.$refs',this.$refs[`card-preview-wrapper-${gIdx}`][0]);
      // this.isAddingCard = !this.isAddingCard;
      this.$refs[`card-preview-wrapper-${gIdx}`][0].classList.toggle("is-editing");
      if (this.isAddingCard) this.$nextTick(() => this.$refs.content.focus());
      else if (this.cardToEdit.title) this.saveCard();
    },
    toggleExtras() {
      this.isExtrasShowing = !this.isExtrasShowing;
    },
    openBg() {
      this.$emit("openBg");
    },
    openCard(card) {
      this.setCard(card);
    },
    setCard(card, gIdx) {
      this.currCard = card;
      this.currGroupIdx = gIdx;
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
      console.log("gIdx", gIdx);
      const idx = this.groupsToEdit[gIdx].cards.findIndex(
        (card) => card.id === updatedCard.id
      );
      this.groupsToEdit[gIdx].cards.splice(idx, 1, updatedCard);
      this.saveGroups();
    },
    saveGroups() {
      // var savedGroups;
      // if (newGroups) {
      //   savedGroups = JSON.parse(JSON.stringify(newGroups));
      // } else {
      //   savedGroups = JSON.parse(JSON.stringify(this.groupsToEdit));
      // }
      this.$emit("boardUpdate", {
        type: "groups",
        payload: this.groupsToEdit,
      });
    },
    saveGroup() {
      const savedGroup = { ...this.groupToEdit };
      savedGroup.id = this.makeId();
      this.groupsToEdit.push(savedGroup)
      this.saveGroups();
      this.groupToEdit.title = "";
    },
    deleteGroup(gIdx) {
      this.groupsToEdit.splice(gIdx, 1);
      this.saveGroups();
    },
    toggleGroupEdit() {
      this.isAddingGroup = !this.isAddingGroup;
      if (this.isAddingGroup) {
        this.$nextTick(() => {
          this.$refs.content.focus();
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
  directives: {
    ClickOutside,
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
