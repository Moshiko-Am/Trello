<template>
	<section class="side-menu-container">
		<div class="side-menu-header">
			<h3>Menu</h3>
			<button class="icon-md icon-x" @click="closeMenu"></button>
		</div>
		<hr />
		<div class="side-menu-content">
			<div class="side-menu-item" v-if="board.style">
				<img class="side-bar-bgc-img" :src="board.style.content" />
				<button class="btn-menu-change-background">
					Change background
				</button>
			</div>
			<hr />
			<div class="side-menu-item" v-if="board.style">
				<span class="icon-lg icon-activity"></span>
				<span class="menu-activity">
					Activity
				</span>
			</div>
			<div class="menu-activity-list">
				<div
					v-for="activity in board.activities"
					:key="activity.id"
					class="activity-list"
				>
					<avatar
						:username="activity.byMember.fullname"
						size="30"
						inline="true"
					></avatar>
					<span class="activity-txt">{{ activity.txt }}</span>
				</div>
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
	props: {
		board: Object,
	},
	methods: {
		closeMenu() {
			this.$emit('closeMenu');
		},
	},
};
</script>
