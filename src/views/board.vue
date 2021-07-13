<template>
	<section>
		<p>{{ board }}</p>
	</section>
</template>

<script>
export default {
	computed: {
		board() {
			return this.$store.getters.board;
		},
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
