<template>
  <section class="pop-over">
    <div class="pop-over-header">
      <span class="pop-over-header-title">Cover</span>
      {{ cardToEdit.cover }}
      <a class="icon-sm icon-close" @click="close"></a>
    </div>
    <div>
      <div class="pop-over-content">
        <div>
          <h4 class="title">Size</h4>
          <div class="grid">
            <div
              role="button"
              class="button"
              :class="{ 'is-selected': cardToEdit.cover.layout === 'top' }"
              @click.stop="changeLayout('top')"
            >
              <div
                class="image"
                :style="{
                  'background-image': `url('${cardToEdit.attachments[1].url}')`,
                }"
              ></div>
              <div class="layover">
                <div></div>
                <div></div>
                <div>
                  <div></div>
                  <div></div>
                </div>
                <div class=""></div>
              </div>
            </div>
            <div
              role="button"
              class="button"
              :class="{ 'is-selected': cardToEdit.cover.layout === 'full' }"
              :style="{
                'background-image': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${card.attachments[1].url}')`,
              }"
              @click.stop="changeLayout('full')"
            >
              <div class="">
                <div class=""></div>
                <div class=""></div>
                <div class="">
                  <div class=""></div>
                  <div class=""></div>
                </div>
                <div class=""></div>
              </div>
            </div>
          </div>
          <button class="btn" @click="removeCover">Remove cover</button>
          <h4 class="title">Colors</h4>
          <div class="colors">
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
            <button class="color"></button>
          </div>
          <h4 class="title">Attachments</h4>
          <div
            class="attachments"
            v-if="card.attachments && card.attachments.length"
          >
            <button
              v-for="attachment in cardToEdit.attachments"
              :key="attachment.id"
              class="btn-attach"
              :class="{ 'is-selected': attachment.isCover }"
              :style="{
                'background-color': `rgb(${attachment.props.colorArray[0]}, ${attachment.props.colorArray[1]}, ${attachment.props.colorArray[2]})`,
                'background-image': `url('${attachment.url}')`,
                'background-size': 'contain',
              }"
            ></button>
          </div>
          <button class="btn">Upload a cover image</button>
          <div class="tip">Tip: Drag an image on to the card to upload it.</div>
          <h4 class="title">unsplash</h4>
          <div class="photos">
            <div v-for="photo in photos" :key="photo" class="photo">
              <button
                class="btn-photo"
                :style="{ 'background-image': `url('${photo}')` }"
              ></button>
            </div>
          </div>
          <button class="btn">Search for photos</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      cardToEdit: null,
      photos: [
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x182/2b80f3ff0258e985f49cbd3f54aedce5/photo-1626203662544-69e778ddc0ee.jpg",
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/aa2d9b78b5c9523010a84ece94e0e3e7/photo-1626515728846-d09aacfee23d.jpg",
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/82e0e591c48dd4802db6b7fcdb3fdf5a/photo-1626327524471-b4487aba8a26.jpg",
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/c0f5dd5ef29e39b820032b367cb82516/photo-1626621732093-add91dee1749.jpg",
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/ab95826232857e3b0dba45f81ee8f795/photo-1626534578032-2fa71338dbdc.jpg",
        "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/698c6f5ebc9b1df6b0cfefeb3b42fbfb/photo-1626617834031-a2ad88e37bea.jpg",
      ],
      debounceFunc: null,
    };
  },
  computed: {},
  methods: {
    close() {
      this.$emit("close");
    },
    changeLayout(layout) {
      console.log(layout);
      this.cardToEdit.cover.layout = layout;
      // updateCover();
    },
    removeCover() {
      this.cardToEdit.cover.isCover = false;
    },
  },
  created() {
    this.cardToEdit = { ...this.card };
    if (!this.cardToEdit.cover) this.cardToEdit.cover = {};
  },
  watch: {
    card: {
      immediate: true,
      deep: true,
      handler() {
        this.cardToEdit = this.card;
        if (!this.cardToEdit.cover) this.cardToEdit.cover = {};
      },
    },
  },
};
</script>
