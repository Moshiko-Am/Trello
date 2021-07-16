<template>
	<section class="background-colors-container">
		<div class="background-colors-header">
			<button class="icon-md icon-back" @click="colorsBack"></button>
			<h3>Colors</h3>
			<button class="icon-md icon-x" @click="closeMenu"></button>
		</div>
		<hr />
		<div class="background-colors-content">
			<div
				@click="bgColor(color)"
				class="color-picks"
				v-for="color in colors"
				:key="color.id"
				:style="{ 'background-color': color }"
			></div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			colors: [
				'#0079bf',
				'#d29034',
				'#519839',
				'#b04632',
				'#89609e',
				'#cd5a91',
				'#4bbf6b',
				'#00aecc',
				'#838c91',
			],
		};
	},
	methods: {
		closeMenu() {
			this.$emit('closeMenu');
		},
		colorsBack() {
			this.$emit('colorsBack');
		},
		bgColor(color) {
			this.$emit('bgColor', {
				type: 'style',
				payload: { type: 'backgroundColor', content: color },
			});
		},
	},
};
</script>

<style></style>
