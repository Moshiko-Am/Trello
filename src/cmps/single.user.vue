<template>
	<section class="single-member-container" @click="addUser(user._id)">
		<avatar
			:username="user.fullname"
			:size="32"
			:inline="true"
			:style="{
				backgroundColor: '#dfe1e6',
				color: '#172b4d',
				fontSize: '15px',
			}"
		></avatar>
		<span class="user-txt">{{ user.fullname }} </span>
		<span class="user-txt" v-if="user.username">
			({{ user.username }})</span
		>
	</section>
</template>

<script>
import avatar from 'vue-avatar';
export default {
	components: {
		avatar,
	},
	props: {
		user: Object,
	},
	methods: {
		addUser(userId) {
			this.$emit('addUser', userId);
		},
	},
};
</script>
