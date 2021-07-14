<template>
  <section v-if="group">
    <div class="group-details">
      <div class="group-header">
        <textarea
          class="group-header-name mod-group-name"
          v-bind:aria-label="group.title"
          spellcheck="false"
          dir="auto"
          maxlength="512"
          v-model="groupTitle"
        ></textarea>
        <div class="group-header-extras">
          <a class="group-header-extras-menu icon-sm icon-dots-menu"></a>
        </div>
      </div>
      <card-preview
        v-for="card in group.cards"
        :key="card.id"
        :card="card"
        @click.native="setCard(card)"
      />
      <div class="card-composer-container js-card-composer-container">
        <a class="open-card-composer js-open-card-composer" href="#">
          <span class="icon-sm icon-add"></span>
          <span class="btn-add-card">Add a card</span></a
        >
      </div>
    </div>
    <card-details
      v-if="currCard"
      :card="currCard"
      :group="group"
    ></card-details>
  </section>
  <!-- <loader v-else /> -->
</template>

<script>
import cardPreview from "./card.preview.vue";
import cardDetails from "./card.details.vue";
export default {
  props: {
    group: Object,
  },
  data() {
    return {
      groupTitle: "",
      currCard: null,
    };
  },
  methods: {
    setCard(card) {
      this.currCard = card;
    },
  },
  created() {
    this.groupTitle = this.group.title;
  },
  components: {
    cardPreview,
    cardDetails,
  },
};
</script>
