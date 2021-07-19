<template>
	<section class="user-menu-container">
		<div class="user-menu-header">
			<h4>Account</h4>
			<button class="icon-md icon-x" @click="closeUserMenu"></button>
		</div>
		<hr />
		<div class="user-menu-content">
			<div class="user-menu-name">
				<avatar
					class="member-name"
					:username="user.fullname"
					:size="40"
					:inline="true"
					backgroundColor="#dfe1e6"
					color="#172b4d"
				></avatar>
				<span class="user-menu-username">{{ user.fullname }}</span>
			</div>
			<hr />
			<div class="user-menu-actions">
				<button>User dashboard</button>
				<!-- needs changing to router link -->
				<button @click="logOut" class="user-logout" v-if="user">
					Log out
				</button>
				<button @click="login" class="user-logout" v-else>
					Login
				</button>
			</div>
		</div>
	</section>
</template>

<script>
import avatar from 'vue-avatar';
export default {
	components: {
		avatar,
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		logOut() {
			this.$emit('logOut');
		},
		closeUserMenu() {
			this.$emit('closeUserMenu');
		},
		login() {
			this.$router.push('/login');
		},
	},
};
</script>
