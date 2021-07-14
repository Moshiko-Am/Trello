<template>
	<section class="board-header-container">
		<h1>{{ board.title }}</h1>
	</section>
</template>

<script>
export default {
	props: {
		board: Object,
	},
};
</script>
