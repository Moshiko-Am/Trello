<template>
	<div id="app" :style="boardStyle">
		<app-header
			@logOut="logOut"
			:users="users"
			:user="user"
			:boards="boards"
			v-if="boards"
			@createBoard="createBoard"
			:style="defaultBackground"
		></app-header>
		<!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
		<router-view />
	</div>
</template>

<script>
import appHeader from '@/cmps/app.header.vue';
export default {
	components: {
		appHeader,
	},
	async created() {
		await this.$store.dispatch({ type: 'loadBoards' });
		await this.$store.dispatch({ type: 'loadUsers' });
	},
	computed: {
		boardStyle() {
			const background = this.$store.getters.boardStyle;
			if (!background) return;
			return background.type === 'backgroundImage'
				? `${background.type}: url(${background.content})`
				: `${background.type}: ${background.content}`;
		},
		boards() {
			return this.$store.getters.boards;
		},
		users() {
			return this.$store.getters.users;
		},
		user() {
			return this.$store.getters.user;
		},
		defaultBackground() {
			if (!this.boardStyle) return 'background-color: #026AA7';
			else return '';
		},
	},
	methods: {
		async createBoard(board) {
			try {
				const savedBoard = await this.$store.dispatch({
					type: 'addBoard',
					board,
				});
				this.$store.commit({
					type: 'getBoardById',
					boardId: board._id,
				});
				this.$router.push(`/board/${savedBoard._id}`);
			} catch (err) {
				console.log('cant create board', err);
			}
		},
		logOut() {
			this.$store.dispatch({ type: 'logout' });
		},
	},
};
</script>
