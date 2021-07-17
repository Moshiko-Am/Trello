<template>
	<section class="board-details">
		<board-header
			@bgColor="boardUpdate"
			@updateBoard="boardUpdate"
			@boardUpdate="boardUpdate"
			v-if="board.title"
		/>
		<group-list @boardUpdate="boardUpdate" v-if="board.groups" />
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
	},
	components: {
		boardHeader,
		groupList,
	},
	methods: {
		async boardUpdate(update) {
			const board = JSON.parse(JSON.stringify(this.board));
			board[update.type] = update.payload;
			try {
				await this.$store.dispatch({ type: 'saveBoard', board });
			} catch (err) {
				console.log(`coldn't save board`);
			}
		},
		async loadPage() {
			const { boardId } = this.$route.params;
			if (this.$route.params.boardId) {
				try {
					await this.$store.dispatch({ type: 'loadBoards' });
					this.$store.commit('getBoardById', boardId);
					console.log('got here');
				} catch (err) {
					console.log('didnt find board', err);
					// this.$router.push(`/`);
				}
			}
		},
	},
	created() {},
	watch: {
		'this.$route.params.boardId': {
			immediate: true,
			deep: true,
			async handler() {
				if (this.$route.params.boardId) {
					const { boardId } = this.$route.params;
					try {
						await this.$store.dispatch({ type: 'loadBoards' });
						this.$store.commit('getBoardById', boardId);
						console.log('got here');
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
