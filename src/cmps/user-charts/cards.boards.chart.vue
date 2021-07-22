<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    boards: Array,
    user: Object,
  },
  created() {
    console.log(this.boards);
  },
  mounted() {
    this.renderChart(
      {
        labels: this.boardsTitles,
        datasets: [
          {
            label: "Cards per Board",
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
            data: this.cardsPerBoard,
            borderRadius: 100,
            borderWidth: 3,
            barPercentage: 0.5
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
      }
    );
  },
  computed: {
    boardsTitles() {
      return this.$store.getters.boards
        .filter((board) => {
          return board.members.some((member) => member._id === this.user._id);
        })
        .map((board) => board.title);
    },
    cardsPerBoard() {
      return this.boards
        .filter((board) => {
          return board.members.some((member) => member._id === this.user._id);
        })
        .map((board) => {
          var counter = 0;
          board.groups.forEach((group) => {
            group.cards.forEach((card) => {
              if (!card.members) return;
              if (card.members.some((member) => member._id === this.user._id))
                counter++;
            });
          });
          return counter;
        });
    },
  },
};
</script>
