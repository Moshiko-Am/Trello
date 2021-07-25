<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: {
    boards: Array,
    user: Object,
  },
  mounted() {
    this.renderChart(
      {
        labels: this.boardsTitles,
        datasets: [
          {
            backgroundColor: [
              "#0079bf",
              "#00c2e0",
              "#51e898",
              "#ff78cb",
              "#344563",
              "#61bd4f",
              "#f2d600",
              "#ff9f1a",
              "#eb5a46",
              "#c377e0",
            ],
            data: this.activitiesPerBoard,
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
    boardsTitles() {
      const boardTitles = this.boards
        .filter((board) => {
          return board.activities.some((activity) => {
            return activity.byMember._id === this.user._id;
          });
        })
        .map((board) => board.title);
      return boardTitles;
    },
    activitiesPerBoard() {
      return this.boards
        .filter((board) => {
          return board.activities.some((activity) => {
            return (activity.byMember._id === this.user._id);
          });
        })
        .map((board) => {
          var counter = 0;
          board.activities.forEach((activity) => {
            if (activity.byMember._id === this.user._id) counter++;
          });
          return counter;
        });
    },
  },
};
</script>