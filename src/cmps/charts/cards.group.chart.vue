<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    board: Object,
  },
  mounted() {
    this.renderChart(
      {
        labels: this.groups,
        datasets: [
          {
            label: "Cards per list",
            backgroundColor: [
              "#61bd4f",
              "#f2d600",
              "#ff9f1a",
              "#eb5a46",
              "#c377e0",
              "#0079bf",
              "#00c2e0",
              "#51e898",
              "#ff78cb",
              "#344563",
            ],
            data: this.cards,
            barPercentage:0.6,
            borderWidth:3,
          },
        ],
      },
      {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        responsive: true,
        legend: {
          display: false,
        },
      }
    );
  },
  computed: {
    groups() {
      if (!this.board.groups) return [];
      return this.board.groups.map((group) => group.title);
    },
    cards() {
      if (!this.board.groups) return [];
      return this.board.groups.map((group) => {
        return group.cards.length;
      });
    },
  },
};
</script>