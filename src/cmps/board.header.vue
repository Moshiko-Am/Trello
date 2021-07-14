<template>
	<section class="board-header-container">
		<div class="board-header-controls">
			<div class="board-header-title">
				<h1>{{ board.title }}</h1>
			</div>
			<span class="board-header-divider">|</span>
			<div class="board-header-members">
				<span v-for="member in board.members" :key="member._id">
					{{ member.fullname }}
				</span>
				<button class="btn-invite">Invite</button>
			</div>
			<span class="board-header-divider">|</span>
			<button class="btn-dashboard">Dashboard</button>
		</div>
		<button class="btn-show-menu" @click="toggleMenu">
			<span class="icon-sm icon-dots-menu"></span>
			<span class="menu-show-txt">Show menu</span>
		</button>
		<side-menu
			class="hideMenu"
			:class="menuShow"
			:board="board"
		></side-menu>
	</section>
</template>

<script>
import sideMenu from './side.menu.vue';
export default {
	components: {
		sideMenu,
	},
	props: {
		board: Object,
	},
	data() {
		return {
			isShow: false,
		};
	},
	computed: {
		members() {
			return this.board.members;
		},
		menuShow() {
			return { showMenu: this.isShow };
		},
	},
	methods: {
		toggleMenu() {
			this.isShow = !this.isShow;
		},
	},
};
</script>
