<template>
  <section class="file-upload-cmp" @click.stop>
    <span class="icon-sm icon-x" @click="close"></span>
    <header>Attach an image...</header>
    <el-upload
      v-show="!isUploading"
      action=""
      ref="upload"
      submit.prevent="handleFile()"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :class="{ uploaded: isChosen }"
      list-type="picture-card"
    >
      <el-button type="primary" @click.stop="handleFile" v-if="isChosen">
        Save image
      </el-button>
      <i v-else class="el-icon-plus"></i>
    </el-upload>
    <img
      v-show="isUploading"
      class="loader"
      src="~@/assets/img/loader/loader.svg"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      top="7vh"
      :center="true"
      :lock-scroll="true"
      :append-to-body="true"
    >
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </section>
</template>

<script>
import { fileUpload } from "@/services/file.upload.service.js";
import { utilService } from "@/services/util.service.js";
import ColorThief from "colorthief";
export default {
  props: {
    attachments: Array,
  },
  data() {
    return {
      attachmentsToEdit: this.attachments || [],
      isUploading: false,
      isChosen: false,
      dialogImageUrl: "",
      dialogVisible: false,
      uploadedFile: null,
      attachment: {
        id: "",
        isCover: false,
        createdAt: null,
        filename: "",
        props: {},
        url: "",
      },
    };
  },
  methods: {
    handleFile() {
      this.onfileUpload();
    },
    handleChange(file) {
      if (!file.raw.type.includes("image")) {
        this.$message.error("Only images can be uploaded.");
        this.$refs.upload.clearFiles();
        return;
      }
      this.uploadedFile = JSON.parse(JSON.stringify(file));
      this.isChosen = true;
      document.querySelector(".el-upload__input").disabled = true;
    },
    async onfileUpload() {
      this.isUploading = true;
      const res = await fileUpload({
        url: this.uploadedFile.url,
        type: "image",
      });
      this.attachment.props.colorArray = await new Promise((resolve) => {
        const colorThief = new ColorThief();
        const img = new Image();
        img.onload = () => {
          resolve(colorThief.getColor(img));
        };
        img.crossOrigin = "Anonymous";
        img.src = res.url;
      });
      this.attachment.id = utilService.makeId();
      this.attachment.createdAt = Date.now();
      this.attachment.filename = this.uploadedFile.name;
      this.attachment.props.width = res.width;
      this.attachment.props.height = res.height;
      this.attachment.props.format = res.format;
      this.attachment.props.size = res.bytes;
      this.attachment.url = res.secure_url;
      this.attachment.props.type = "image";
      document.querySelector(".el-upload__input").disabled = false;
      this.close();
      this.attachmentsToEdit.push(this.attachment);
      if (this.attachmentsToEdit.length === 1)
        this.attachmentsToEdit[0].isCover = true;
      this.$emit("updateAttachments", this.attachmentsToEdit);
    },
    close() {
      this.$emit("close");
    },
    handleRemove() {
      this.isChosen = false;
      document.querySelector(".el-upload__input").disabled = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
