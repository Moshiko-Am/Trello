<template>
	<section class="board-details">
		<board-header
			:board="board"
			@boardUpdate="boardUpdate"
			v-if="board.title"
		/>
		<group-list
			v-if="board.groups"
			:groups="board.groups"
			:labels="labels"
		/>
	</section>
</template>

<script>
import boardHeader from '@/cmps/board.header.vue';
import groupList from '@/cmps/group.list.vue';

export default {
	computed: {
		board() {
			return this.$store.getters.board;
		},
		labels() {
			const board = this.$store.getters.board;
			return board.labels;
		},
	},
	components: {
		boardHeader,
		groupList,
	},
	methods: {
		async boardUpdate() {
			const board = JSON.parse(JSON.stringify(this.board));
			try {
				await this.$store.dispatch({ type: 'saveBoard', board });
			} catch (err) {
				console.log(`coldn't save board`);
			}
		},
	},
	created() {},
	watch: {
		'this.$route.params.boardId': {
			immediate: true,
			async handler() {
				if (this.$route.params.boardId) {
					const { boardId } = this.$route.params;
					try {
						await this.$store.dispatch({ type: 'loadBoards' });
						this.$store.commit('getBoardById', boardId);
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
