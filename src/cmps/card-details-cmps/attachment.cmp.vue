<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <span class="icon-lg icon-attach"></span>
      <h3 class="main-item-title">Attachments</h3>
    </div>
    <div
      v-for="attachment in attachmentsToEdit"
      :key="attachment.id"
      class="attachment-thumbnail"
    >
      <a
        class="attachment-thumbnail-preview"
        :href="attachment.url"
        target="_blank"
        :style="{
          'background-image': `url('${attachment.url}')`,
          'background-color': `rgb(${attachment.props.colorArray[0]},${attachment.props.colorArray[1]},${attachment.props.colorArray[2]})`,
          'background-size': 'contain',
        }"
      ></a>
      <p class="attachment-thumbnail-details">
        <span class="attachment-thumbnail-name">{{ attachment.filename }}</span>
        <a
          class="attachment-thumbnail-details-title"
          :href="attachment.url"
          target="_blank"
        >
          <span class="icon-sm icon-external-link"></span>
        </a>
        <span class="attachment-thumbnail-details-title-options">
          <span
            >Added
            <span class="date past">{{
              attachment.createdAt | moment("calendar")
            }}</span>
          </span>
          <span>
            <a
              class="attachment-thumbnail-details-title-options-item"
              @click="commetAttachment"
            >
              <span class="attachment-thumbnail-details-options-item-text"
                >Comment</span
              >
            </a>
          </span>
          <span>
            <a
              class="attachment-thumbnail-details-title-options-item"
              @click="deleteAttachment(attachment.id)"
            >
              <span class="attachment-thumbnail-details-options-item-text"
                >Delete
              </span>
            </a>
          </span>
          <span>
            <a
              class="attachment-thumbnail-details-title-options-item"
              @click="editFileName"
            >
              <span class="attachment-thumbnail-details-options-item-text"
                >Edit
              </span>
            </a>
          </span>
        </span>
        <span class="attachment-thumbnail-details-options">
          <a
            v-if="!attachment.isCover"
            class="attachment-thumbnail-details-options-item"
          >
            <span class="icon-sm icon-card-cover"></span>
            <span
              class="attachment-thumbnail-details-options-item-text"
              @click="toggleCover(attachment.id)"
              >Make cover
            </span>
          </a>
          <a v-else class="attachment-thumbnail-details-options-item">
            <span class="icon-sm icon-card-cover"></span>
            <span
              class="attachment-thumbnail-details-options-item-text"
              @click="toggleCover(attachment.id)"
              >Remove cover
            </span>
          </a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attachments: Array,
  },
  data() {
    return {
      attachmentsToEdit: this.attachments,
    };
  },
  methods: {
    commetAttachment() {},
    deleteAttachment(attachmentId) {
      const idx = this.attachmentsToEdit.findIndex((attachment) => {
        return attachment.id === attachmentId;
      });
      this.attachmentsToEdit.splice(idx, 1);
      this.updateAttachments();
    },
    editFileName() {},
    toggleCover(attachmentId) {
      this.attachmentsToEdit.forEach((attachment, idx) => {
        if (
          attachment.id !== attachmentId &&
          this.attachmentsToEdit[idx].isCover
        )
          this.attachmentsToEdit[idx].isCover = false;
        if (attachment.id === attachmentId)
          this.attachmentsToEdit[idx].isCover = !this.attachmentsToEdit[idx]
            .isCover;
      });
      this.updateAttachments();
    },
    updateAttachments() {
      const attachmentsCopy = JSON.parse(
        JSON.stringify(this.attachmentsToEdit)
      );
      this.$emit("updateAttachments", attachmentsCopy);
    },
  },
};
</script>
