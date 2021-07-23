<template>
  <section class="background-photos-container">
    <div class="background-photos-header">
      <button class="icon-md icon-back" @click="photosBack"></button>
      <h3>Photos by Unsplash</h3>
      <button class="icon-md icon-x" @click="closeMenu"></button>
    </div>
    <hr />
    <div class="background-photos-content">
      <div class="photos-input-container">
        <span class="icon-sm icon-search"></span>
        <input
          type="text"
          v-model="photoSearch"
          placeholder="Photos"
          class="photos-input-search"
          @input="debounceFunc"
        />
      </div>
      <div
        v-if="
          (isLoading && chosenPhotoIdx !== -1) ||
            (!isLoading && chosenPhotoIdx === -1)
        "
        class="background-photos"
      >
        <div
          @click="chooseBg(photo.urlBig, photo.urlSmall, pIdx)"
          class="photo-example"
          v-for="(photo, pIdx) in photos"
          :key="photo.id"
        >
          <img :src="photo.urlSmall" />
          <template v-if="isLoading && chosenPhotoIdx === pIdx">
            <div class="uploading">
              <img
                class="spinner small"
                src="~@/assets/img/loader/loader.svg"
              />
              <span>Uploading…</span>
            </div>
          </template>
        </div>
      </div>
      <div
        v-if="isLoading && chosenPhotoIdx === -1"
        class="logo-loading active"
      ></div>
    </div>
  </section>
</template>

<script>
import { unsplashService } from "../services/unsplash.service.js";
import FastAverageColor from "fast-average-color";
import axios from "axios";
export default {
  data() {
    return {
      photoSearch: "",
      photos: [],
      debounceFunc: null,
      isLoading: false,
      chosenPhotoIdx: -1,
    };
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    photosBack() {
      this.$emit("photosBack");
    },
    debounce(func, wait = 1000) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    async loadPhotos() {
      this.isLoading = true;
      this.photos = await unsplashService.loadPhotos(this.photoSearch);
      this.isLoading = false;
    },
    async getRandomPhotos() {
      const url = `https://api.unsplash.com/photos/random/?client_id=3G3H2YrHWdLEk7zLzjy33Ykx0eACFpe497xZ1BWXAQg&count=20`;
      const res = await axios.get(url);
      const data = res.data;
      let results = data.map((result, idx) => {
        return {
          idx,
          id: result.id,
          urlBig: result.urls.full,
          urlSmall: result.urls.small,
        };
      });
      return results;
    },
    async chooseBg(photoUrlBig, photoUrlSmall, pIdx) {
      this.chosenPhotoIdx = pIdx;
      this.isLoading = true;
      const fac = new FastAverageColor();
      let color;
      color = await fac.getColorAsync(photoUrlBig);
      this.$emit("updateBoard", {
        type: "style",
        payload: {
          type: "backgroundImage",
          content: photoUrlBig,
          preview: photoUrlSmall,
          props: color,
        },
      });
      this.isLoading = false;
      this.chosenPhotoIdx = -1;
    },
  },
  async created() {
    this.debounceFunc = this.debounce(this.loadPhotos);
    this.photos = await this.getRandomPhotos();
  },
};
</script>
