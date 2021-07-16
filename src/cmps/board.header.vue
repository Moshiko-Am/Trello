<template>
	<section class="board-header-container">
		<div class="board-header-controls">
			<div class="board-header-title">
				<textarea
					rows="1"
					cols="12"
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
				<button class="btn-invite" @click="toggleInvite">Invite</button>
				<transition name="slide-fade">
					<users
						v-if="isInviteShow"
						:users="allUsers"
						:board="boardToEdit"
						@addUser="addUser"
						:onlyBoard="false"
						@closeInvite="toggleInvite"
					></users>
				</transition>
			</div>
			<span class="board-header-divider">|</span>
			<button class="btn-dashboard">Dashboard</button>
		</div>
		<button class="btn-show-menu" @click="toggleMenu">
			<span class="icon-sm icon-dots-menu"></span>
			<span class="menu-show-txt">Show menu</span>
		</button>
		<side-menu
			@bgColor="bgColor"
			@chooseBg="chooseBg"
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
import users from './users.vue';
export default {
	components: {
		sideMenu,
		avatar,
		users,
	},
	props: {
		board: Object,
		allUsers: Array,
	},
	data() {
		return {
			isMenuShow: false,
			boardToEdit: null,
			isInviteShow: false,
		};
	},
	computed: {
		menuShow() {
			return { showMenu: this.isMenuShow };
		},
	},
	methods: {
		bgColor(style) {
			this.$emit('bgColor', style);
			console.log(style);
		},
		chooseBg(style) {
			this.$emit('updateBoard', style);
			console.log(style);
		},
		toggleMenu() {
			this.isMenuShow = !this.isMenuShow;
		},
		toggleInvite() {
			this.isInviteShow = !this.isInviteShow;
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
			this.saveMembers();
		},
		saveMembers() {
			this.$emit('boardUpdate', {
				type: 'members',
				payload: this.boardToEdit.members,
			});
		},
		addUser(userId) {
			const user = this.allUsers.find((user) => user._id === userId);
			this.boardToEdit.members.push(user);
			this.saveMembers();
		},
		// async loadUsers() {
		// 	const users = await this.$store.dispatch({ type: 'loadUsers' });
		// 	console.log(users);
		// },
	},
	created() {
		this.boardToEdit = JSON.parse(JSON.stringify(this.board));
	},
};
</script>
