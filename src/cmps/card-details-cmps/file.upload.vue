<template>
  <section class="file-upload-cmp" @click.stop>
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Attach an image...</header>
    <el-upload
      action=""
      ref="upload"
      submit.prevent="handleFile()"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      list-type="picture-card"
    >
      <el-button type="primary" @click.stop="handleFile" v-if="isUploaded">
        Upload
      </el-button>
      <i v-else class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </section>
</template>

<script>
import { uploadImg } from "@/services/img-upload.service.js";
export default {
  data() {
    return {
      isUploaded: false,
      dialogImageUrl: "",
      dialogVisible: false,
      uploadedFile: null,
    };
  },
  methods: {
    handleFile() {
      this.onUploadImg();
    },
    handleChange(file) {
      this.uploadedFile = file;
      this.isUploaded = true;
      document.querySelector(".el-upload__input").disabled = true;
    },
    async onUploadImg() {
      const res = await uploadImg(this.uploadedFile);
      this.isUploaded = false;
      document.querySelector(".el-upload__input").disabled = false;
      this.close();
      this.$emit("updateAttachments", res.url);
    },
    close() {
      this.$emit("close");
    },
    handleRemove() {
      this.isUploaded = false;
      document.querySelector(".el-upload__input").disabled = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
