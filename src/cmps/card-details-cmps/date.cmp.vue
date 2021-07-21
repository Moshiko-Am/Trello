<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h4 class="main-item-title">DUE DATE</h4>
    </div>
    <div class="checkbox-date-container">
      <input
        type="checkbox"
        v-model="isCompletedCopy"
        @change="toggleCompleted"
      />
      <div class="date-container">
        {{ date }}
        <span
          class="due-date-text"
          :style="{
            backgroundColor: isSoon.backgroundColor,
            color: isSoon.color,
          }"
          >{{ isSoon.time }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: String,
    isCompleted: Boolean,
  },
  data() {
    return {
      isCompletedCopy: this.isCompleted,
    };
  },
  computed: {
    isSoon() {
      if (this.isCompleted)
        return {
          time: "COMPLETE",
          backgroundColor: "#61BD4F",
          color: "white",
        };
      const currDate = Date.parse(new Date());
      const dueDate = Date.parse(this.date);
      const timeLeft = dueDate - currDate;
      if (timeLeft < 0) {
        return { time: "OVERDUE", backgroundColor: "#ec9488", color: "white" };
      } else if (timeLeft < 86400000)
        return {
          time: "DUE SOON",
          backgroundColor: "#F2D600",
          color: "#172B4D",
        };
      else timeLeft < 172800000;
      return {
        time: "",
        backgroundColor: "rgba(9, 30, 66, 0.08)",
        color: "#172B4D",
      };
    },
  },
  methods: {
    toggleCompleted() {
      this.$emit("toggleCompleted", this.isCompletedCopy);
    },
  },
};
</script>