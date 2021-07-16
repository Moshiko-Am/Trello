<template>
	<section class="board-details">
		<board-header
			:board="boardToEdit"
			:allUsers="allUsers"
			@boardUpdate="boardUpdate"
			v-if="boardToEdit"
		/>
		<group-list
			@boardUpdate="boardUpdate"
			v-if="boardToEdit"
			:groups="boardToEdit.groups"
			:labels="labels"
		/>
	</section>
</template>

<script>
import boardHeader from '@/cmps/board.header.vue';
import groupList from '@/cmps/group.list.vue';

export default {
	data() {
		return {
			boardToEdit: null,
			currCard: null,
			allUsers: null,
		};
	},
	computed: {
		board() {
			return this.$store.getters.board;
		},
		users() {
			return this.$store.getters.users;
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
		async boardUpdate(update) {
			this.boardToEdit[update.type] = update.payload;
			const board = JSON.parse(JSON.stringify(this.boardToEdit));
			try {
				await this.$store.dispatch({ type: 'saveBoard', board });
			} catch (err) {
				console.log(`coldn't save board`);
			}
		},
		setCurrCard(card) {
			this.currCard = card;
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
						this.boardToEdit = JSON.parse(
							JSON.stringify(
								this.$store.state.boardStore.selectedBoard
							)
						);
						this.allUsers = JSON.parse(
							JSON.stringify(this.$store.state.userStore.users)
						);
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
