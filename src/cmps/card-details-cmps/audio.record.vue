<template>
  <section class="file-upload-cmp audio">
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Upload your message...</header>
    <vue-record-audio
      mode="press"
      @result="onRecorded"
      :disabled="isUploading"
    />
    <div v-if="record" class="recorded-audio">
      <audio :src="record" controls />
      <el-button @click="onRemove" type="danger" size="medium" plain round>
        Delete
      </el-button>
    </div>
    <el-button
      type="primary"
      @click.stop="saveAudio"
      :disabled="!record || isUploading"
    >
      Save Audio
    </el-button>
    <template v-if="isUploading">
      <div class="uploading audio-card">
        <img class="spinner small" src="@/assets/img/loader/loader.svg" />
        <span>Uploading…</span>
      </div>
    </template>
  </section>
</template>

<script>
import { fileUpload } from "@/services/file.upload.service.js";
import { VueRecordAudio } from "@codekraft-studio/vue-record";

export default {
  data() {
    return {
      isUploading: false,
      record: null,
    };
  },
  components: {
    VueRecordAudio,
  },
  methods: {
    onRecorded(data) {
      this.record = URL.createObjectURL(data);
      this.isFinished = true;
    },
    onRemove() {
      this.record = null;
    },
    async saveAudio() {
      this.isUploading = true;
      const file = {
        url: this.record,
        type: "video",
      };
      const res = await fileUpload(file);
      this.$emit("audioRecord", res);
    },
    close() {
      this.$emit("toggleAudioRecord");
    },
  },
};
</script>
