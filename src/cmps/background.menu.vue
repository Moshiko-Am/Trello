<template>
  <section class="background-menu-container">
    <div class="background-menu-header">
      <button class="icon-md icon-back" @click="menuBack"></button>
      <h3>Change background</h3>
      <button class="icon-md icon-x" @click="closeMenu"></button>
    </div>
    <hr />
    <div class="background-menu-content">
      <div class="background-menu-select">
        <div class="background-menu-option-bg" @click="togglePhotosMenu">
          <img
            class="background-menu-img"
            src="@/assets/img/background-choose-photos.jpg"
            alt=""
          />
          <span class="background-selection-txt">Photos</span>
        </div>
        <div class="background-menu-option-color" @click="toggleColorsMenu">
          <img
            class="background-menu-img"
            src="@/assets/img/background-choose-colors.jpg"
            alt=""
          />
          <span class="background-selection-txt">Colors</span>
        </div>
      </div>
    </div>
    <background-photos
      @updateBoard="chooseBg"
      @closeMenu="closeMenu"
      class="hideImgMenu"
      :class="photosShowMenu"
      @photosBack="togglePhotosMenu"
    ></background-photos>
    <background-colors
      @bgColor="bgColor"
      class="hideColorMenu"
      :class="colorShowMenu"
      @closeMenu="closeMenu"
      @colorsBack="toggleColorsMenu"
    ></background-colors>
  </section>
</template>

<script>
import backgroundPhotos from "./background.photos";
import backgroundColors from "./background.colors";

export default {
  components: {
    backgroundPhotos,
    backgroundColors,
  },
  data() {
    return {
      isPhotosShow: false,
      isColorsShow: false,
    };
  },
  computed: {
    photosShowMenu() {
      return { showImgMenu: this.isPhotosShow };
    },
    colorShowMenu() {
      return { showColorMenu: this.isColorsShow };
    },
  },
  methods: {
    bgColor(style) {
      this.$emit("bgColor", style);
    },
    chooseBg(style) {
      this.$emit("chooseBg", style);
    },
    closeMenu() {
      this.$emit("closeMenu");
      this.isPhotosShow = false;
      this.isColorsShow = false;
    },
    menuBack() {
      this.$emit("menuBack");
    },
    togglePhotosMenu() {
      this.isPhotosShow = !this.isPhotosShow;
    },
    toggleColorsMenu() {
      this.isColorsShow = !this.isColorsShow;
    },
  },
};
</script>
