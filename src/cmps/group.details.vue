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
      <card-preview
        v-for="card in group.cards"
        :key="card.id"
        :card="card"
        :labels="labels"
        @click.native="setCard(card)"
      />
      <div v-if="isAddingCard" class="add-card card-preview">
        <textarea
          v-click-outside="toggleCardEdit"
          placeholder="Enter a title for this card..."
          dir="auto"
          ref="content"
          v-model="cardToEdit.title"
        ></textarea>
      </div>
      <section ref="addcard">
        <div v-if="isAddingCard" class="card-composer-container">
          <div class="add-card-controls">
            <button class="btn-add-card" @click="toggleCardEdit">
              Add card
            </button>
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
      :group="group"
      :labels="labels"
      @clearCard="clearCard"
      @updateCard="updateCard"
    ></card-details>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import cardPreview from "./card.preview.vue";
import cardDetails from "./card.details.vue";
import ClickOutside from "vue-click-outside";
export default {
  props: {
    group: Object,
    labels: Array,
  },
  data() {
    return {
      isAddingCard: false,
      isExtrasShowing: false,
      groupToEdit: {},
      cardToEdit: {
        id: "",
        title: "",
        createdAt: Date.now(),
      },
      currCard: null,
    };
  },
  methods: {
    setCard(card) {
      this.currCard = card;
    },
    clearCard() {
      this.currCard = null;
    },
    savedCard() {
      const savedCard = { ...this.cardToEdit };
      savedCard.id = this.makeId();
      this.groupToEdit.cards.push(savedCard);
      this.updateGroup();
      this.cardToEdit.title = "";
    },
    toggleCardEdit() {
      this.isAddingCard = !this.isAddingCard;
      if (this.isAddingCard) this.$nextTick(() => this.$refs.content.focus());
      else if (this.cardToEdit.title) this.savedCard();
    },
    toggleExtras() {
      this.isExtrasShowing = !this.isExtrasShowing;
    },
    closeCardEdit() {
      this.isAddingCard = false;
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
      console.log("updated card in group details", updatedCard);
      const idx = this.group.cards.findIndex(
        (card) => card.id === updatedCard.id
      );
      console.log("idx", idx);
      this.groupToEdit.cards.splice(idx, 1, updatedCard);
      console.log("from group details", this.groupToEdit);
      this.updateGroup();
    },
    updateGroup() {
      this.$emit("updateGroup", this.groupToEdit);
    },
    deleteGroup() {
      this.$emit("deleteGroup", this.groupToEdit.id);
    },
  },
  created() {
    this.groupToEdit = JSON.parse(JSON.stringify(this.group));
    this.groupTitle = this.group.title;
  },
  mounted() {
    this.popupItem = this.$refs.addcard;
  },
  components: {
    cardPreview,
    cardDetails,
  },
  directives: {
    ClickOutside,
  },
};
</script>
