<template>
	<section class="members-list-container">
		<div class="members-list-close">
			<span class="icon-md icon-x" @click="closeInvite"></span>
		</div>
		<hr />
		<div class="users-details">
			<h4 class="members-list-header">Invite Members</h4>
			<single-user
				@addUser="addUser"
				:user="user"
				v-for="user in usersToShow"
				:key="user._id"
			/>
		</div>
	</section>
</template>

<script>
import singleUser from './single.user.vue';
export default {
	components: {
		singleUser,
	},
	props: {
		board: Object,
		card: Object,
		onlyBoard: Boolean,
	},
	data() {
		return {
			users: [],
		};
	},
	computed: {
		usersToShow() {
			if (!this.onlyBoard) {
				return this.users.filter((user) => {
					if (!this.board.members.includes(user._id)) return user;
				});
			} else {
				return this.board.members.filter((user) => {
					if (!this.card.members.includes(user._id)) return user;
				});
			}
		},
	},
	methods: {
		addUser(userId) {
			this.$emit('addUser', userId);
		},
		closeInvite() {
			this.$emit('closeInvite');
		},
	},
	created() {
		this.users = this.$store.getters.users;
	},
};
</script>
