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
            data: this.cards,
            barPercentage:0.7,
            borderWidth:2,
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