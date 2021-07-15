<template>
	<section class="board-header-container">
		<div class="board-header-controls">
			<div class="board-header-title">
				<textarea
					class="title-textArea"
					@input="saveTitle"
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
		menuShow() {
			return { showMenu: this.isShow };
		},
	},
	methods: {
		toggleMenu() {
			this.isShow = !this.isShow;
		},
		saveTitle() {
			this.$emit('boardUpdate', {
				type: 'title',
				payload: this.boardToEdit.title,
			});
		},
		removeMember(memberId) {
			const idx = this.boardToEdit.members.findIndex(
				(member) => member._id === memberId
			);
			this.boardToEdit.members.splice(idx, 1);
			console.log(this.boardToEdit.members);
			this.saveMembers();
		},
		saveMembers() {
			this.$emit('boardUpdate', {
				type: 'members',
				payload: this.boardToEdit.members,
			});
		},
	},
	created() {
		this.boardToEdit = JSON.parse(JSON.stringify(this.board));
	},
};
</script>
