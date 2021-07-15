<template>
	<section class="board-header-container" v-if="boardToEdit">
		<div class="board-header-controls">
			<div class="board-header-title">
				<textarea
					class="title-textArea"
					@input="boardChange"
					v-model="boardToEdit.title"
				></textarea>
			</div>
			<span class="board-header-divider">|</span>
			<div class="board-header-members">
				<span
					v-for="member in boardToEdit.members"
					:key="member._id"
					class="members-list"
				>
					<avatar
						class="member-name"
						:username="member.fullname"
						:size="28"
						:inline="true"
						:style="{ margin: '2px' }"
					></avatar>
					<span
						class="remove-member"
						@click="removeMember(member._id)"
						>X</span
					>
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
			@closeMenu="toggleMenu"
			class="hideMenu"
			:class="menuShow"
			:board="board"
		></side-menu>
	</section>
</template>

<script>
import sideMenu from './side.menu.vue';
import avatar from 'vue-avatar';
export default {
	components: {
		sideMenu,
		avatar,
	},
	props: {
		board: Object,
	},
	data() {
		return {
			isShow: false,
			boardToEdit: null,
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
		boardChange() {
			this.$emit('boardUpdate', this.boardToEdit);
		},
		removeMember(memberId) {
			console.log(memberId);
		},
	},
	created() {
		this.boardToEdit = JSON.parse(JSON.stringify(this.board));
	},
};
</script>
