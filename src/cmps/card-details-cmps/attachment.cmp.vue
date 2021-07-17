<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <span class="icon-lg icon-attach"></span>
      <h3 class="main-item-title">Attachments</h3>
    </div>
    <div
      v-for="attachment in attachments"
      :key="attachment.id"
      class="attachment-thumbnail"
    >
      <a
        class="attachment-thumbnail-preview"
        :href="attachment.str"
        target="_blank"
        :style="{ 'background-image': `url('${attachment.str}')` }"
      ></a>
      <p class="attachment-thumbnail-details"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attachments: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
