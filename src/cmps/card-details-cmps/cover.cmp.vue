<template>
  <section class="pop-over">
    <div class="pop-over-header">
      <span class="pop-over-header-title">Cover</span>
      <a class="icon-sm icon-close" @click="close"></a>
    </div>
    <div class="pop-over-content">
      <div class="wrapper">
        <h4 class="title">Size</h4>
        <div class="grid">
          <div
            role="button"
            class="button"
            :class="{
              'is-selected':
                cardToEdit.cover.layout === 'top' && cardToEdit.cover.isCover,
              disabled: !cardToEdit.cover.isCover,
            }"
            @click.stop="changeLayout('top')"
          >
            <div class="image" :style="background"></div>
            <div class="layover">
              <div></div>
              <div></div>
              <div>
                <div></div>
                <div></div>
              </div>
              <div></div>
            </div>
          </div>
          <div
            role="button"
            class="button"
            :class="{
              'is-selected':
                cardToEdit.cover.layout === 'full' && cardToEdit.cover.isCover,
              disabled: !cardToEdit.cover.isCover,
            }"
            :style="background"
            @click.stop="changeLayout('full')"
          >
            <div>
              <div></div>
              <div></div>
              <div>
                <div></div>
                <div></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <button
          class="btn"
          v-if="cardToEdit.cover.isCover"
          @click="removeCover"
        >
          Remove cover
        </button>
        <h4 class="title">Colors</h4>
        <div class="colors">
          <button
            v-for="color in colors"
            :key="color"
            class="color"
            :style="{ 'background-color': color }"
            @click.stop="setBgColor(color)"
          ></button>
        </div>
        <h4 class="title">Attachments</h4>
        <div
          class="attachments"
          v-if="cardToEdit.attachments && cardToEdit.attachments.length"
        >
          <button
            v-for="(attachment, idx) in cardToEdit.attachments"
            :key="attachment.id"
            @click.stop="setAttachment(idx)"
            class="btn-attach"
            :class="{
              'is-selected':
                cardToEdit.cover.type === 'attachment' && attachment.isCover,
            }"
            :style="{
              'background-color': `rgb(${attachment.props.colorArray[0]}, ${attachment.props.colorArray[1]}, ${attachment.props.colorArray[2]})`,
              'background-image': `url('${attachment.url}')`,
              'background-size': 'contain',
            }"
          ></button>
        </div>
        <button class="btn" @click="openFileUpload">
          Upload a cover image
        </button>
        <div class="tip">Tip: Drag an image on to the card to upload it.</div>
        <h4 class="title">unsplash</h4>
        <div class="photos">
          <div v-for="(photo, idx) in photos" :key="idx + 1" class="photo">
            <button
              class="btn-photo"
              :style="{ 'background-image': `url('${photo.url}')` }"
              @click.stop="setPhoto(photo)"
            ></button>
          </div>
        </div>
        <button class="btn" @click="togglePhotos">Search for photos</button>
      </div>
    </div>
    <background-photos
      @updateBoard="setPhoto({ url: $event.payload.content, colorArray: [] })"
      @closeMenu="togglePhotos"
      v-if="isAddingPhotos"
    />
  </section>
</template>

<script>
import backgroundPhotos from "@/cmps/background.photos";
import ColorThief from "colorthief";

export default {
  components: {
    backgroundPhotos,
  },
  props: {
    card: Object,
  },
  data() {
    return {
      cardToEdit: this.card,
      isAddingPhotos: false,
      photos: [
        {
          url:
            "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          colorArray: [202, 181, 174],
        },
        {
          url:
            "https://images.unsplash.com/photo-1512641406448-6574e777bec6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
          colorArray: [43, 38, 52],
        },
        {
          url:
            "https://images.unsplash.com/photo-1459745930869-b3d0d72c3cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80",
          colorArray: [188, 183, 178],
        },
        {
          url:
            "https://images.unsplash.com/photo-1626711656195-4db07dd46c8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
          colorArray: [60, 67, 69],
        },
        {
          url:
            "https://images.unsplash.com/photo-1422493757035-1e5e03968f95?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          colorArray: [4, 12, 17],
        },
        {
          url:
            "https://images.unsplash.com/photo-1626800349607-773f9a7b105c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          colorArray: [198, 199, 199],
        },
      ],
      colors: [
        "#7bc86c",
        "#f5dd29",
        "#ffaf3f",
        "#ef7564",
        "#cd8de5",
        "#5ba4cf",
        "#29cce5",
        "#6deca9",
        "#ff8ed4",
        "#172b4d",
      ],
    };
  },
  computed: {
    background() {
      return this.cardToEdit.cover.type === "attachment"
        ? `background-image: url('${
            this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx].url
          }')`
        : this.cardToEdit.cover.type === "color"
        ? `background-color: ${this.cardToEdit.cover.color}`
        : `background-image: url('${this.cardToEdit.cover.photo.url}')`;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    togglePhotos() {
      this.isAddingPhotos = !this.isAddingPhotos;
    },
    changeLayout(layout) {
      this.$set(this.cardToEdit.cover, "layout", layout);
      this.$emit("updateCard", this.cardToEdit);
    },
    setBgColor(color) {
      this.$set(this.cardToEdit.cover, "isCover", true);
      this.$set(this.cardToEdit.cover, "type", "color");
      this.$set(this.cardToEdit.cover, "color", color);
      if (this.cardToEdit.attachments)
        this.cardToEdit.attachments.forEach((attachment) => {
          this.$set(attachment, "isCover", false);
        });
      this.$set(this.cardToEdit.cover, "photo", null);
      this.$set(this.cardToEdit.cover, "attachmentIdx", null);
      if (!this.cardToEdit.cover.layout)
        this.$set(this.cardToEdit.cover, "layout", "top");
      this.$emit("updateCard", this.cardToEdit);
    },
    setAttachment(attachmentIdx) {
      if (attachmentIdx) this.$set(this.cardToEdit.cover, "isCover", true);
      this.$set(this.cardToEdit.cover, "type", "attachment");
      this.$set(this.cardToEdit.cover, "attachmentIdx", attachmentIdx);
      this.$set(this.cardToEdit.cover, "photo", null);
      this.cardToEdit.attachments.forEach((attachment, idx) => {
        if (attachment.isCover)
          this.$set(this.cardToEdit.attachments[idx], "isCover", false);
      });
      this.$set(this.cardToEdit.attachments[attachmentIdx], "isCover", true);

      this.$emit("updateCard", this.cardToEdit);
    },
    async setPhoto(photo) {
      photo.colorArray = await new Promise((resolve) => {
        const colorThief = new ColorThief();
        const img = new Image();
        img.onload = () => {
          resolve(colorThief.getColor(img));
        };
        img.crossOrigin = "Anonymous";
        console.log(photo);
        img.src = photo.url;
      });

      this.$set(this.cardToEdit.cover, "isCover", true);
      this.$set(this.cardToEdit.cover, "type", "url");
      this.$set(this.cardToEdit.cover, "photo", photo);
      this.$set(this.cardToEdit.cover, "attachmentIdx", null);
      this.$set(this.cardToEdit.cover, "color", "");
      if (this.cardToEdit.attachments)
        this.cardToEdit.attachments.forEach((attachment) => {
          this.$set(attachment, "isCover", false);
        });
      if (!this.cardToEdit.cover.layout)
        this.$set(this.cardToEdit.cover, "layout", "full");
      this.$emit("updateCard", this.cardToEdit);
    },
    removeCover() {
      if (this.cardToEdit.attachments)
        this.$set(
          this.cardToEdit.attachments[this.cardToEdit.cover.attachmentIdx],
          "isCover",
          false
        );
      this.$set(this.cardToEdit, "cover", {
        isCover: false,
        type: "",
        color: "",
        attachmentIdx: null,
        photo: { url: "", colorArray: [] },
        layout: "",
      });
      this.$emit("updateCard", this.cardToEdit);
    },
    openFileUpload() {
      this.$emit("toggleAttch");
    },
  },
};
</script>
