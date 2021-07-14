<template>
	<section v-if="group" class="group-wrapper">
		<div class="group-details">
			<div class="group-header">
				<div
					class="group-header-name-assist js-group-name-assist"
				></div>
				<div class="group-header-target js-editing-target"></div>
				<textarea
					class="group-header-name mod-group-name js-group-name-input"
					v-bind:aria-label="group.title"
					spellcheck="false"
					dir="auto"
					maxlength="512"
					style="overflow: hidden; overflow-wrap: break-word; height: 28px;"
					v-model="groupTitle"
				></textarea>
				<div class="group-header-extras">...</div>
			</div>
			<div v-for="card in group.cards" v-bind:key="card.id">
				<!-- <card-list :card="card" /> -->
			</div>
			<div class="card-composer"></div>
		</div>
	</section>
	<loader v-else />
</template>

<script>
export default {
	props: {
		group: Object,
	},
	data() {
		return {
			groupTitle: '',
		};
	},
	created() {
		this.groupTitle = this.group.title;
	},
};
</script>
