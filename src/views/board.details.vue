<template>
	<section class="board-details">
		<!-- <p>{{ board }}</p> -->
		<card-details></card-details>
	</section>
</template>

<script>
import cardDetails from '../cmps/card.details.vue'

export default {
	computed: {
		board() {
			return this.$store.getters.board;
		},
	},
	components: {
		cardDetails
	},
	watch: {
		'this.$route.params.boardId': {
			immediate: true,
			async handler() {
				if (this.$route.params.boardId) {
					const { boardId } = this.$route.params;
					try {
						await this.$store.dispatch('loadBoard', boardId);
					} catch (err) {
						console.log('didnt find board', err);
						// this.$router.push(`/`);
					}
				}
			},
		},
	},
};
</script>
