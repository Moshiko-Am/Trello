<template>
  <section class="pop-over">
    <div class="pop-over-header">
      <span class="pop-over-header-title">Cover</span>
      <a class="icon-sm icon-close"></a>
    </div>
    <div>
      <div class="pop-over-content">
        <div>
          <h4>Size</h4>
          <div>
            <div role="button" class="">
              <div class=""></div>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { unsplashService } from "@/services/unsplash.service.js";
export default {
  data() {
    return {
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
  methods: {
    async loadPhotos() {
      this.photos = await unsplashService.loadPhotos(this.photoSearch);
    },
    chooseBg(photoUrl) {
      this.$emit("updateBoard", {
        type: "style",
        payload: { type: "backgroundImage", content: photoUrl },
      });
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
  },
  async created() {
    this.debounceFunc = this.debounce(this.loadPhotos);
  },
};
</script>
