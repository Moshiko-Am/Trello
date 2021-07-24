<template>
  <section class="create-board-container">
    <div class="create-menu-header">
      <button class="icon-md icon-back" @click="menuBack"></button>
      <h3>Create board</h3>
      <button class="icon-md icon-x" @click="closeMenu"></button>
    </div>
    <hr />
    <div class="create-board-content">
      <div class="create-board-title">
        <h4>Board title</h4>
        <div class="board-title-input-container">
          <input type="text" placeholder="Title" v-model="boardToSaveTitle" />
        </div>
      </div>
      <hr />
      <div class="create-board-bg">
        <h4>Choose background</h4>
        <div class="rand-photos-container">
          <div
            @click="saveBg('backgroundImage', photo.urlBig, photo.urlSmall)"
            class="rand-photos"
            v-for="photo in photos"
            :key="photo.id"
          >
            <span
              v-if="selectedBg && selectedBg.content === photo.urlBig"
              class="icon-lg icon-v selected-bg"
            ></span>
            <img :src="photo.urlSmall" />
          </div>
        </div>
        <div class="rand-colors-container">
          <div
            @click="saveBg('backgroundColor', color)"
            class="rand-colors"
            v-for="color in colors"
            :key="color.id"
            :style="{ 'background-color': color }"
          >
            <span
              v-if="selectedBg && selectedBg.content === color"
              class="icon-lg icon-v selected-bg"
            ></span>
          </div>
        </div>
      </div>
      <div class="create-board-btn">
        <button
          class="btn-create"
          @click="createBoard"
          :class="{ ready: isReady, disabled: !isReady }"
        >
          Create board
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { utilService } from "@/services/util.service.js";
import FastAverageColor from "fast-average-color";

export default {
  data() {
    return {
      photos: [],
      colors: ["#0079bf", "#b04632", "#519839", "#89609e"],
      boardToSaveTitle: "",
      selectedBg: null,
    };
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedInUser;
    },
    isReady() {
      return this.selectedBg && this.boardToSaveTitle ? true : false;
    },
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
    menuBack() {
      this.$emit("menuBack");
    },
    async saveBg(type, content, preview = "") {
      this.selectedBg = {
        type,
        content,
        preview,
      };
      if (type === "backgroundImage") {
        const fac = new FastAverageColor();
        let color;
        color = await fac.getColorAsync(content);
        this.$set(this.selectedBg, "props", color);
      }
    },
    async getRandomPhotos() {
      const url = `https://api.unsplash.com/photos/random/?client_id=3G3H2YrHWdLEk7zLzjy33Ykx0eACFpe497xZ1BWXAQg&count=4`;
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
    createBoard() {
      if (!this.isReady) return;
      const boardToSave = {
        title: this.boardToSaveTitle,
        createdAt: Date.now(),
        createdBy: this.loggedUser,
        style: this.selectedBg,
        labels: [
          {
            id: "l101",
            title: "Done",
            color: "#61bd4f",
          },
          {
            id: "l102",
            title: "Almost",
            color: "#f2d600",
          },
          {
            id: "l103",
            title: "Nice",
            color: "#ff78cb",
          },
          {
            id: "l104",
            title: "Bad",
            color: "#eb5a46",
          },
        ],
        members: [this.loggedUser],
        groups: [
          {
            id: utilService.makeId(),
            title: "Need to check",
            cards: [
              {
                id: utilService.makeId(),
                createdAt: Date.now(),
                title: "Card details component",
              },
              {
                id: utilService.makeId(),
                createdAt: Date.now(),
                title: "Login auth",
              },
            ],
          },
          {
            id: utilService.makeId(),
            title: "In progress",
            cards: [
              {
                id: utilService.makeId(),
                createdAt: Date.now(),
                title: "Card cover",
              },
            ],
          },
          {
            id: utilService.makeId(),
            title: "Done",
            cards: [],
          },
          {
            id: utilService.makeId(),
            title: "Need to refactor",
            cards: [],
          },
        ],
        activities: [
          {
            id: utilService.makeId(),
            createdAt: Date.now(),
            byMember: this.loggedUser,
            txt: " created this board ",
          },
        ],
      };
      this.$emit("createBoard", boardToSave);
    },
  },
  async created() {
    this.photos = await this.getRandomPhotos();
  },
};
</script>
