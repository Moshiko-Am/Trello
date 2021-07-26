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
              "#E5E8E8",
              "#FADBD8",
              "#E8DAEF",
              "#D5F5E3",
              "#D5D8DC",
              "#F2F3F4",
              "#D6EAF8",
              "#D0ECE7",
              "#FDEBD0",
              "#F6DDCC",
            ],
            data: this.cardPerMember,
            barPercentage: 0.7,
            borderWidth: 2,
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