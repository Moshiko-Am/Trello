<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    board: Object,
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Labels Summary",
            backgroundColor: [
              "#FADBD8",
              "#E8DAEF",
              "#D6EAF8",
              "#D0ECE7",
              "#D5F5E3",
              "#FDEBD0",
              "#F6DDCC",
              "#F2F3F4",
              "#E5E8E8",
              "#D5D8DC",
            ],
            data: this.labelsCount,
          },
        ],
      },
      {
        responsive: true,
        legend: {
          display: false,
        },
      }
    );
  },
  computed: {
    labels() {
      if (!this.board.labels) return;
      return this.board.labels.map((label) => label.title);
    },
    labelsCount() {
      var labelsCount = [];
      if (!this.board.labels) return [];
      this.board.labels.forEach((label) => {
        var labelCount = 0;
        if (!this.board.groups) return labelCount;
        this.board.groups.forEach((group) => {
          if (!group.cards) return labelCount;
          group.cards.forEach((card) => {
            if (!card.labelIds) return labelCount;
            if (card.labelIds.includes(label.id)) labelCount++;
          });
        });
        labelsCount.push(labelCount);
      });
      return labelsCount;
    },
    labelsColors() {
      if (!this.board.labels) return;
      return this.board.labels.map((label) => label.color);
    },
  },
};
</script>