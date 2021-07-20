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
        labels: this.members,
        datasets: [
          {
            label: "Cards per member",
            backgroundColor: [
              "#eb5a46",
              "#ff78cb",
              "#f2d600",
              "#61bd4f",
              "#ffac00",
            ],
            data: this.cardPerMember,
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
        responsive:true
      }
    );
  },
  computed: {
    members() {
      if (!this.board.members) return [];
      const members = this.board.members.map((member) => member.fullname);
      return members;
    },
    cardPerMember() {
      return this.members.map((member) => {
        var counter = 0;
        if (!this.board.groups) return counter;
        this.board.groups.forEach((group) => {
          if (!group.cards) return;
          group.cards.forEach((card) => {
            if (!card.members) return;
            const isIncluded = card.members.some((cardMember) => {
              return cardMember.fullname === member;
            });
            if (isIncluded) counter++;
          });
        });
        return counter;
      });
    },
  },
};
</script>