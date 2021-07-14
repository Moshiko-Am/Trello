<template>
	<section class="side-menu-container">
		<div class="side-menu-header">
			<h3>Menu</h3>
			<button class="icon-md icon-x"></button>
		</div>
		<hr />
		<div class="menu-change-background">
			<img :src="board.style.backgroundImage" class="side-bar-bgc-img" />
			<button>Change background</button>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		board: Object,
	},
};
</script>
