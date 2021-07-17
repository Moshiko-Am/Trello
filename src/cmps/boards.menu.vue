<template>
	<section class="boards-menu-container">
		<div class="boards-menu-header">
			<h3>Boards</h3>
			<button class="icon-md icon-x" @click="boardsMenuClose"></button>
		</div>
		<hr />
		<div class="boards-input-container">
			<input
				type="text"
				placeholder="Find board by name..."
				class="boards-input-search"
			/>
		</div>
		<div class="boards-menu-content">
			<div class="boards-list">
				<div
					class="board-item"
					v-for="board in boards"
					:key="board._id"
					:style="{ backgroundImage: `url(${board.style.content}` }"
				>
					<img class="board-item-img" :src="board.style.content" />
					<div class="board-item-title-container">
						<h4 class="board-item-title">{{ board.title }}</h4>
					</div>
				</div>
			</div>
			<div class="board-btns-container">
				<button class="btn-create-board" @click="toggleCreateBoard">
					Create new board
				</button>
				<button class="btn-boards-page">Boards page</button>
			</div>
		</div>
		<create-board
			@createBoard="createBoard"
			class="hideCreateMenu"
			:class="createShowMenu"
			@closeMenu="boardsMenuClose"
			@menuBack="toggleCreateBoard"
		></create-board>
	</section>
</template>

<script>
import createBoard from './create.board';
export default {
	props: {
		boards: Array,
	},
	components: {
		createBoard,
	},
	data() {
		return {
			isCreateOpen: false,
		};
	},
	computed: {
		createShowMenu() {
			return { showCreateMenu: this.isCreateOpen };
		},
	},
	methods: {
		boardsMenuClose() {
			this.$emit('closeBoardsMenu');
			this.isCreateOpen = false;
		},
		toggleCreateBoard() {
			this.isCreateOpen = !this.isCreateOpen;
			console.log(this.isCreateOpen);
		},
		createBoard(board) {
			this.$emit('createBoard', board);
		},
	},
};
</script>
