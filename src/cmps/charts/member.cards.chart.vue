<script>
import { doughnut } from "vue-chartjs";
export default {
  extends: doughnut,
  props: {
    board: Object,
  },
  mounted() {
    this.renderChart({});
  },
  computed: {
    members() {
      const members = this.board.members.map((member) => member.fullname);
      return members;
    },
    cardPerMember() {
      this.members.map((member) => {
        var counter = 0;
        if (!this.board.groups) return counter;
        this.board.groups.forEach((group) => {
          if (!group.cards) return;
          group.cards.forEach((card) => {
            if (!card.members) return;
            const isIncluded = card.members.some((cardMember) => {
              return cardMember.fullname === member.fullname;
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