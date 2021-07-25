<template>
  <section
    v-if="groupsToEdit"
    ref="grouplistwrapper"
    class="group-list-wrapper"
    @mousedown="setPageScroll"
    @mouseup="unsetPageScroll"
    @mousemove="dragList"
  >
    <draggable
      class="group-list"
      handle=".group-wrapper"
      animation="150"
      delay="500"
      delay-on-touch-only="true"
      v-model="groupsToEdit"
      @start="
        isScrolling = false;
        drag = true;
      "
      @end="
        drag = false;
        saveGroups();
      "
      dragClass="ghost"
      ghostClass="tilted"
      ref="grouplist"
    >
      <div
        v-for="(group, gIdx) in groupsToEdit"
        :key="group.id"
        class="group-wrapper"
      >
        <div class="group">
          <div class="group-details">
            <div class="group-header">
              <textarea
                ref="grouptitle"
                class="group-header-name mod-group-name"
                :aria-label="group.title"
                spellcheck="false"
                dir="auto"
                v-model="group.title"
                @change="saveGroups"
                @input="textHeight"
                maxlength="300"
              ></textarea>
              <div class="group-header-extras" @click.stop="toggleExtras(gIdx)">
                <span class="icon-sm icon-dots-menu"></span>
                <div
                  v-if="isExtrasShowing && currGroupIdx === gIdx"
                  class="popup"
                >
                  <div @click.stop="" class="header">
                    <div @click.stop="" class="header-title">List actions</div>
                    <span
                      class="header-close icon-sm icon-x"
                      @click.self.stop="toggleExtras(gIdx)"
                    ></span>
                  </div>
                  <div class="popup-content">
                    <div class="item">
                      <a @click.self.stop="deleteGroup(gIdx)"
                        >Delete this list</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section
              :ref="'card-preview-wrapper-' + gIdx"
              class="card-preview-wrapper"
            >
              <draggable
                group="cards"
                animation="500"
                v-model="group.cards"
                @change="saveGroups"
                dragClass="ghost"
                ghostClass="tilted"
                delay="500"
                delay-on-touch-only="true"
              >
                <card-preview
                  v-for="(card, cIdx) in group.cards"
                  :ref="'cardpreview-' + gIdx + '-' + cIdx"
                  :card="card"
                  :group="group"
                  :key="card.id"
                  @click.native="setCard(card, gIdx, cIdx)"
                  @openCard="openCard(card, gIdx, cIdx)"
                  @openBg="openBg"
                  @updateCard="updateCard($event, gIdx)"
                  @removeCard="removeCard($event, gIdx)"
                  @createLabel="createLabel"
                  @removeLabel="removeLabel"
                  @updateMentions="updateMentions"
                />
              </draggable>
            </section>
          </div>
          <div
            v-if="isAddingCard && currGroupIdx === gIdx"
            class="add-card card-preview"
          >
            <textarea
              @blur="toggleCardEdit(gIdx)"
              placeholder="Enter a title for this card..."
              dir="auto"
              :ref="'content-' + gIdx"
              v-model="cardToEdit.title"
            ></textarea>
          </div>
          <section class="add-card-container" ref="addcard">
            <div
              v-if="isAddingCard && currGroupIdx === gIdx"
              class="card-composer-container"
            >
              <div class="add-card-controls">
                <button class="btn-add-card" @click.stop="saveCard(gIdx)">
                  Add card
                </button>
                <a
                  class="icon-lg icon-close"
                  @click.stop="closeCardEdit(gIdx)"
                ></a>
              </div>
            </div>
            <div v-else class="card-composer-container">
              <a class="open-card-composer" @click.stop="toggleCardEdit(gIdx)">
                <span class="icon-sm icon-add"></span>
                <span class="add-card">Add a card</span></a
              >
              <button
                class="video-button"
                @click="toggleVideoRecord(gIdx)"
                type="button"
              >
                <span class="video-icon">
                  <span
                    class="icon-md icon-video"
                    role="img"
                    aria-label="VideoIcon"
                  >
                  </span>
                </span>
              </button>
              <button
                class="video-button"
                @click="toggleAudioRecord(gIdx)"
                type="button"
              >
                <span class="video-icon">
                  <span
                    class="icon-md icon-audio"
                    role="img"
                    aria-label="AudioIcon"
                  >
                  </span>
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
      <div
        ref="addgroup"
        class="group-wrapper mod-add"
        :class="{ 'is-edit': isAddingGroup, 'is-dark': bgImage.props.isDark }"
      >
        <!-- :class="{ 'is-edit': isAddingGroup, 'is-dark': bgImage.props.isDark }" -->
        <form v-if="isAddingGroup" v-click-outside="toggleGroupEdit">
          <input
            class="group-name-input"
            type="text"
            name="name"
            ref="newgroupcontent"
            v-model="groupToEdit.title"
            placeholder="Enter list title…"
            autocomplete="off"
            dir="auto"
          />
          <div class="group-add-controls">
            <input
              class="btn-add-group"
              type="submit"
              value="Add list"
              @click.stop="toggleGroupEdit"
            />
            <a
              class="icon-lg icon-close"
              aria-label="Cancel list editing"
              @click.stop="closeGroupEdit"
            ></a>
          </div>
        </form>
        <a
          v-if="!isAddingGroup"
          class="open-add-list"
          @click.stop="toggleGroupEdit"
        >
          <span
            class="icon-sm icon-add"
            :style="{ 'is-dark': bgImage.props.isDark }"
          ></span
          >Add another list
        </a>
      </div>
    </draggable>
    <transition name="fade">
      <card-details
        v-if="currCard"
        :card="currCard"
        :group="groupsToEdit[currGroupIdx]"
        @createLabel="createLabel"
        @removeLabel="removeLabel"
        @clearCard="clearCard"
        @updateCard="updateCard($event, currGroupIdx)"
        @removeCard="removeCard($event, currGroupIdx)"
        @updateMentions="updateMentions"
      ></card-details>
    </transition>
    <section
      v-if="isRecordingVideo"
      class="card-details-bg"
      @click.self="toggleVideoRecord"
    >
      <video-record
        @videoRecord="addVideoCard"
        @toggleVideoRecord="toggleVideoRecord"
        v-if="isRecordingVideo"
      />
    </section>
    <section
      @click.self="toggleAudioRecord"
      v-if="isRecordingAudio"
      class="card-details-bg"
    >
      <component
        v-bind:is="audioRecord"
        @toggleAudioRecord="toggleAudioRecord"
        @audioRecord="addAudioCard"
        v-if="isRecordingAudio"
      />
    </section>
  </section>
</template>

<script>
import cardDetails from "./card.details.vue";
import cardPreview from "./card.preview.vue";
import draggable from "vuedraggable";
import { socketService } from "@/services/socket.service.js";
import { utilService } from "@/services/util.service.js";
import clickOutside from "vue-click-outside";
import videoRecord from "@/cmps/card-details-cmps/video.record.vue";

export default {
  props: {
    groups: Array,
    bgImage: Object,
  },
  directives: {
    clickOutside,
  },
  data() {
    return {
      isAddingGroup: false,
      isAddingCard: false,
      groupsToEdit: null,
      groupToEdit: {
        id: utilService.makeId(),
        title: "",
        createdAt: Date.now(),
        cards: [],
      },
      currCard: null,
      currGroupIdx: null,
      isExtrasShowing: false,
      cardToEdit: {
        id: utilService.makeId(),
        title: "",
        createdAt: Date.now(),
        attachments: [],
        cover: {
          isCover: false,
          type: "",
          color: "",
          attachmentIdx: null,
          photo: { url: "", colorArray: [] },
          layout: "",
        },
      },
      isScrolling: false,
      isRecordingVideo: false,
      isRecordingAudio: false,
    };
  },
  components: {
    cardPreview,
    cardDetails,
    draggable,
    videoRecord,
    audioRecord: () => import("@/cmps/card-details-cmps/audio.record.vue"),
  },
  computed: {
    height() {
      return this.getTextHeight();
    },
    audioRecord() {
      return this.isRecordingAudio ? "audioRecord" : "";
    },
  },
  methods: {
    createLabel(label) {
      this.$emit("createLabel", label);
    },
    removeLabel(labelId) {
      this.$emit("removeLabel", labelId);
    },
    closeCardEdit(gIdx) {
      this.isAddingCard = false;
      this.$refs[`card-preview-wrapper-${gIdx}`][0].classList.remove(
        "is-editing"
      );
      this.cardToEdit.title = "";
    },
    saveCard(gIdx, type) {
      if (!this.cardToEdit.title) {
        this.$refs[`content-${gIdx}`][0].focus();
        return;
      }
      const savedCard = { ...this.cardToEdit };
      savedCard.id = utilService.makeId();
      this.groupsToEdit[gIdx].cards.push(savedCard);
      const activity = {
        gId: this.groupsToEdit[gIdx].id,
        cTitle: savedCard.title,
        txt: ` added card "${savedCard.title}" to list "${this.groupsToEdit[gIdx].title}" `,
        byMember: this.$store.getters.loggedInUser,
        isSpecific: false,
      };
      this.saveGroups(activity);
      this.cardToEdit.title = "";
      this.cardToEdit.attachments = [];
      if (!type) this.$refs[`content-${gIdx}`][0].focus();
    },
    toggleCardEdit(gIdx) {
      this.isExtrasShowing = false;
      this.$refs[`card-preview-wrapper-${gIdx}`][0].classList.toggle(
        "is-editing"
      );
      if (this.isAddingCard && gIdx !== this.currGroupIdx)
        this.currGroupIdx = gIdx;
      else {
        this.currGroupIdx = gIdx;
        this.isAddingCard = !this.isAddingCard;
      }
      if (this.isAddingCard)
        this.$nextTick(() => this.$refs[`content-${gIdx}`][0].focus());
      else if (this.cardToEdit.title) this.saveCard(gIdx);
    },
    toggleExtras(gIdx) {
      this.isAddingCard = false;
      if (this.isExtrasShowing && gIdx !== this.currGroupIdx) {
        this.currGroupIdx = gIdx;
      } else {
        this.currGroupIdx = gIdx;
        this.isExtrasShowing = !this.isExtrasShowing;
      }
    },
    openBg() {
      this.$emit("openBg");
    },
    openCard(card, gIdx, cIdx) {
      this.setCard(card, gIdx, cIdx);
    },
    setCard(card, gIdx, cIdx) {
      if (!card.cover) {
        this.$set(card, "cover", {
          isCover: false,
          type: "",
          color: "",
          attachmentIdx: null,
          photo: { url: "", colorArray: [] },
          layout: "",
        });
      }
      this.currCard = card;
      this.currGroupIdx = gIdx;
      this.$refs[`cardpreview-${gIdx}-${cIdx}`][0].isQuickEdit = false;
      this.$parent.bgOpen = false;
    },
    clearCard() {
      this.currCard = null;
      this.currGroupIdx = null;
    },
    removeCard(cardId, gIdx) {
      const idx = this.groupsToEdit[gIdx].cards.findIndex(
        (card) => card.id === cardId
      );
      const activity = {
        gId: this.groupsToEdit[gIdx].id,
        cTitle: this.groupsToEdit[gIdx].cards[idx].title,
        txt: ` removed card "${this.groupsToEdit[gIdx].cards[idx].title}" from list "${this.groupsToEdit[gIdx].title}" `,
        byMember: this.$store.getters.loggedInUser,
        isSpecific: false,
      };
      this.groupsToEdit[gIdx].cards.splice(idx, 1);
      this.clearCard();
      this.saveGroups(activity);
    },
    updateCard({ updatedCard, activity }, gIdx) {
      const cIdx = this.groupsToEdit[gIdx].cards.findIndex(
        (card) => card.id === updatedCard.id
      );
      this.groupsToEdit[gIdx].cards.splice(cIdx, 1, updatedCard);
      socketService.emit("send card", { payload: updatedCard, cIdx, gIdx });
      this.saveGroups(activity);
    },
    updateMentions(mention) {
      this.$emit("updateMentions", mention);
    },
    saveGroups(activity) {
      this.$emit("boardUpdate", {
        type: "groups",
        payload: this.groupsToEdit,
        activities: activity,
      });
      socketService.emit("send groups", this.groupsToEdit);
    },
    saveGroup() {
      const savedGroup = { ...this.groupToEdit };
      savedGroup.id = utilService.makeId();
      this.groupsToEdit.push(savedGroup);
      const activity = {
        gId: savedGroup.id,
        gTitle: savedGroup.title,
        txt: ` added list "${savedGroup.title}" to this board `,
        byMember: this.$store.getters.loggedInUser,
        isSpecific: false,
      };
      this.saveGroups(activity);
      this.groupToEdit.title = "";
    },
    deleteGroup(gIdx) {
      const activity = {
        gTitle: this.groupsToEdit[gIdx].title,
        txt: ` removed list "${this.groupsToEdit[gIdx].title}" from this board `,
        byMember: this.$store.getters.loggedInUser,
        isSpecific: false,
      };
      this.groupsToEdit.splice(gIdx, 1);
      this.currGroupIdx = null;
      this.isExtrasShowing = false;
      this.saveGroups(activity);
    },
    toggleGroupEdit() {
      this.isAddingGroup = !this.isAddingGroup;
      if (this.isAddingGroup) {
        this.$nextTick(() => {
          this.$refs.newgroupcontent.focus();
        });
      } else if (this.groupToEdit.title) this.saveGroup();
    },
    closeGroupEdit() {
      this.isAddingGroup = false;
      this.groupToEdit.title = "";
    },
    textHeight(ev, gIdx) {
      const text = document.createElement("div");
      text.style.font = "Segoe UI";
      text.style.fontSize = 14 + "px";
      text.style.height = "auto";
      text.style.width = "228px";
      text.style.position = "absolute";
      text.style.whiteSpace = "no-wrap";
      text.style.lineBreak = "anywhere";
      text.style.paddingBlock = "2px";
      text.style.paddingInline = "8px";
      text.style.lineHeight = "20px";
      if (ev) {
        text.innerHTML = ev.target.value;
      } else {
        text.innerHTML = this.$refs.grouptitle[gIdx].value;
      }
      document.body.appendChild(text);
      const height = Math.ceil(text.clientHeight);
      const formattedHeight = height + "px";
      document.body.removeChild(text);
      if (ev) ev.target.style.height = formattedHeight;
      else this.$refs.grouptitle[gIdx].style.height = formattedHeight;
    },
    dragList(ev) {
      if (this.isScrolling && ev.buttons === 1) {
        document.body.style.userSelect = "none";
        document.querySelector(".group-list").scrollBy({
          top: 0,
          left: ev.movementX ? -ev.movementX : ev.movementX,
        });
      }
    },
    setPageScroll(ev) {
      if (ev.target.className === "group-list") this.isScrolling = true;
    },
    unsetPageScroll() {
      this.isScrolling = false;
      document.body.style.userSelect = "unset";
    },
    toggleVideoRecord(gIdx) {
      this.currGroupIdx = gIdx;
      this.isRecordingVideo = !this.isRecordingVideo;
    },
    toggleAudioRecord(gIdx) {
      this.currGroupIdx = gIdx;
      this.isRecordingAudio = !this.isRecordingAudio;
    },
    addVideoCard(res) {
      this.isRecordingVideo = false;
      const attachment = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        isCover: true,
        filename: `${res.public_id}.${res.format}`,
        props: {
          width: res.width,
          height: res.height,
          format: res.format,
          size: res.bytes,
          url: res.secure_url,
          type: "video",
          colorArray: res.color,
          thumbnail: res.thumbnail,
        },
      };
      this.cardToEdit.attachments.push(JSON.parse(JSON.stringify(attachment)));
      this.cardToEdit.title = "Video Card";
      this.cardToEdit.cover.isCover = true;
      this.cardToEdit.cover.type = "attachment";
      this.cardToEdit.cover.layout = "full";
      this.cardToEdit.cover.attachmentIdx = 0;
      this.saveCard(this.currGroupIdx, "video");
      this.cardToEdit = {
        id: utilService.makeId(),
        title: "",
        createdAt: Date.now(),
        attachments: [],
        cover: {
          isCover: false,
          type: "",
          color: "",
          attachmentIdx: null,
          photo: { url: "", colorArray: [] },
          layout: "",
        },
      };
    },
    addAudioCard(res) {
      console.log(res);
      this.isRecordingAudio = false;
      const attachment = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        isCover: false,
        filename: `Audio file`,
        props: {
          format: res.format,
          size: res.bytes,
          url: res.secure_url,
          type: "audio",
        },
      };
      this.cardToEdit.attachments.push(JSON.parse(JSON.stringify(attachment)));
      this.cardToEdit.title = "Audio Card";
      this.cardToEdit.cover.isCover = false;
      this.cardToEdit.cover.type = "attachment";
      this.cardToEdit.cover.layout = "top";
      this.cardToEdit.cover.attachmentIdx = 0;
      this.saveCard(this.currGroupIdx, "audio");
      this.cardToEdit = {
        id: utilService.makeId(),
        title: "",
        createdAt: Date.now(),
        attachments: [],
        cover: {
          isCover: false,
          type: "",
          color: "",
          attachmentIdx: null,
          photo: { url: "", colorArray: [] },
          layout: "",
        },
      };
    },
  },
  created() {
    this.groupsToEdit = JSON.parse(JSON.stringify(this.groups));
  },
  mounted() {
    this.popupItem = this.$refs.addgroup;
    this.$refs.grouptitle.forEach((group, idx) => {
      this.$refs.grouptitle[idx].style.height = this.textHeight(null, idx);
    });
    document.addEventListener("mouseleave", () => {
      this.isScrolling = false;
      document.body.style.userSelect = "unset";
    });
  },
  destroyed() {
    document.removeEventListener("mouseleave", () => {
      this.isScrolling = false;
      document.body.style.userSelect = "unset";
    });
  },
  watch: {
    groups: {
      immediate: true,
      handler() {
        this.groupsToEdit = JSON.parse(JSON.stringify(this.groups));
      },
    },
  },
};
</script>
