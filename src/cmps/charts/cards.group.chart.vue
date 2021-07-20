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
              "#eb5a46",
              "#ff78cb",
              "#f2d600",
              "#61bd4f",
              "#ffac00",
            ],
            data: this.cards,
          },
        ],
      },
      {
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        },
        responsive:true
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