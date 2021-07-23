<template>
  <section class="audio">
    <vue-record-audio
      mode="press"
      @result="onRecorded"
      :disabled="isUploading"
    />
    <el-button
      type="primary"
      @click.stop="saveAudio"
      :disabled="!isFinished || isUploading"
    >
      Save Audio
      <template v-if="isUploading">
        <div class="uploading audio-card">
          <img class="spinner small" src="@/assets/img/loader/loader.svg" />
          <span>Uploading…</span>
        </div>
      </template>
    </el-button>
  </section>
</template>

<script>
import { fileUpload } from "@/services/file.upload.service.js";

export default {
  data() {
    return {
      isFinished: false,
      isUploading: false,
      data: null,
    };
  },
  methods: {
    onRecorded(data) {
      this.data = data;
      this.isFinished = true;
    },
    async saveAudio() {
      this.isUploading = true;
      const file = {
        url: URL.createObjectURL(this.data),
        type: "video",
      };
      const res = await fileUpload(file);
      this.$emit("audioRecord", res);
    },
  },
  beforeDestroy() {},
};
</script>
