<template>
  <section class="video">
    <video id="myVideo" playsinline class="video-js vjs-default-skin"></video>
    <el-button type="primary" @click.stop="saveVideo" v-if="isFinished">
      Save Video
      <template v-if="isUploading">
        <div class="uploading video-card">
          <img class="spinner small" src="@/assets/img/loader/loader.svg" />
          <span>Uploading…</span>
        </div>
      </template>
    </el-button>
  </section>
</template>

<script>
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import record from "videojs-record/dist/videojs.record.js";
import RecordRTC from "recordrtc";
import videojs from "video.js";
import "webrtc-adapter";
import { fileUpload } from "@/services/file.upload.service.js";
import FastAverageColor from "fast-average-color";
import { Video } from "video-metadata-thumbnails";

export default {
  data() {
    return {
      player: null,
      options: {
        controls: true,
        bigPlayButton: false,
        width: 500,
        height: 375,
        fluid: false,
        plugins: {
          record: {
            audio: true,
            video: true,
            maxLength: 10,
            debug: false,
          },
        },
      },
      isFinished: false,
      isUploading: false,
    };
  },
  mounted() {
    this.player = videojs("myVideo", this.options, () => {
      videojs.getPluginVersion(record);
      RecordRTC.version;
    });

    this.player.on("deviceError", () => {
      console.log("device error:", this.player.deviceErrorCode);
    });

    this.player.on("error", (error) => {
      console.error(error);
    });

    this.player.on("startRecord", () => {
      this.isFinished = false;
    });

    this.player.on("finishRecord", () => {
      this.isFinished = true;
    });
  },
  methods: {
    async saveVideo() {
      this.isUploading = true;
      const file = {
        url: URL.createObjectURL(this.player.recordedData),
        type: "video",
      };
      const res = await fileUpload(file);
      const video = new Video(this.player.recordedData);
      res.thumbnail = await video.getThumbnails({
        interval: 1,
        start: 0,
        end: 0,
        quality: 0.8,
      });
      const reader = new FileReader();
      reader.readAsDataURL(res.thumbnail[0].blob);
      res.thumbnail = await new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
      const fac = new FastAverageColor();
      res.color = fac.getColor(video.videoElement);
      this.$emit("videoRecord", res);
    },
  },
  beforeDestroy() {
    this.player.dispose();
  },
};
</script>
