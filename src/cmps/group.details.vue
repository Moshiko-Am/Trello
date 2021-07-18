<template>
  <section v-if="group">
    <div class="group-details">
      <div class="group-header">
        <textarea
          class="group-header-name mod-group-name"
          v-bind:aria-label="group.title"
          spellcheck="false"
          dir="auto"
          v-model="groupToEdit.title"
          @change="updateGroup"
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
                <a @click="deleteGroup">Delete this list</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section ref="card-preview-wrapper" class="card-preview-wrapper">
        <div class="card-list">
          <draggable
            @start="drag = true"
            @end="
              drag = false;
              updateGroups();
            "
            animation="500"
            dragClass="ghost"
            ghost-class="ghost"
            group="cards"
            v-model="groupToEdit.cards"
          >
            <card-preview
              v-for="card in groupToEdit.cards"
              :key="card.id"
              :card="card"
              @click.native="setCard(card)"
              @openCard="openCard"
              @openBg="openBg"
              @updateCard="updateCard"
              @removeCard="removeCard"
            />
          </draggable>
        </div>
      </section>
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
            <button class="btn-add-card" @click="saveCard">Add card</button>
            <a class="icon-lg icon-close" @click="closeCardEdit"></a>
          </div>
        </div>
        <div v-else class="card-composer-container">
          <a class="open-card-composer" @click="toggleCardEdit">
            <span class="icon-sm icon-add"></span>
            <span class="add-card">Add a card</span></a
          >
        </div>
      </section>
    </div>
    <card-details
      v-if="currCard"
      :card="currCard"
      :group="groupToEdit"
      @clearCard="clearCard"
      @updateCard="updateCard"
      @removeCard="removeCard"
    ></card-details>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import cardPreview from "./card.preview.vue";
import cardDetails from "./card.details.vue";
import ClickOutside from "vue-click-outside";
import draggable from "vuedraggable";

export default {
  props: {
    group: Object,
  },
  data() {
    return {
      isAddingCard: false,
      isExtrasShowing: false,
      groupToEdit: {},
      cardToEdit: {
        id: this.makeId(),
        title: "",
        createdAt: Date.now(),
      },
      currCard: null,
    };
  },
  computed: {
    groups() {
      return this.$store.getters.board.groups;
    },
  },
  methods: {
    openBg() {
      this.$emit("openBg");
    },
    openCard(card) {
      this.setCard(card);
    },
    setCard(card) {
      this.currCard = card;
    },
    clearCard() {
      this.currCard = null;
    },
    saveCard() {
      if (!this.cardToEdit.title) return;
      const savedCard = { ...this.cardToEdit };
      savedCard.id = this.makeId();
      this.groupToEdit.cards.push(savedCard);
      this.updateGroup();
      this.cardToEdit.title = "";
      this.$refs["card-preview-wrapper"].scrollTop = this.$refs[
        "card-preview-wrapper"
      ].scrollHeight;
      this.$refs.content.focus();
    },
    removeCard(cardId) {
      const idx = this.groupToEdit.cards.findIndex(
        (card) => card.id === cardId
      );
      this.groupToEdit.cards.splice(idx, 1);
      this.currCard = null;
      this.updateGroup();
    },
    toggleCardEdit() {
      this.isAddingCard = !this.isAddingCard;
      this.$refs["card-preview-wrapper"].classList.toggle("is-editing");
      if (this.isAddingCard) this.$nextTick(() => this.$refs.content.focus());
      else if (this.cardToEdit.title) this.saveCard();
    },
    toggleExtras() {
      this.isExtrasShowing = !this.isExtrasShowing;
    },
    closeCardEdit() {
      this.isAddingCard = false;
      this.$refs["card-preview-wrapper"].classList.remove("is-editing");
      this.cardToEdit.title = "";
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
    updateCard(updatedCard) {
      const idx = this.groupToEdit.cards.findIndex(
        (card) => card.id === updatedCard.id
      );
      this.groupToEdit.cards.splice(idx, 1, updatedCard);
      this.updateGroup();
    },
    updateGroups() {
      const groupsCopy = JSON.parse(JSON.stringify(this.groups));
      const idx = groupsCopy.findIndex((group) => {
        return group.id === this.groupToEdit.id;
      });
      groupsCopy.splice(idx, 1, this.groupToEdit);
      this.$emit("saveGroups", groupsCopy);
    },
    updateGroup() {
      this.$emit("updateGroup", this.groupToEdit);
    },
    deleteGroup() {
      this.$emit("deleteGroup", this.groupToEdit.id);
    },
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        this.groupToEdit = JSON.parse(JSON.stringify(this.group));
      },
    },
  },
  created() {
    this.groupToEdit = JSON.parse(JSON.stringify(this.group));
  },
  mounted() {
    this.popupItem = this.$refs.addcard;
  },
  components: {
    cardPreview,
    cardDetails,
    draggable,
  },
  directives: {
    ClickOutside,
  },
};
</script>
