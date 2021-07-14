<template>
	<section v-if="groups" class="group-list">
		<div
			v-for="group in groups"
			v-bind:key="group.id"
			class="group-wrapper"
		>
			<div class="group">
				<group-details :group="group" :labels="labels" />
			</div>
		</div>
	</section>
	<!-- <loader v-else /> -->
</template>

<script>
import groupDetails from '@/cmps/group.details.vue';
export default {
	props: {
		groups: Array,
		labels: Array
	},
	components: {
		groupDetails,
	},
	created(){
		console.log('this.labels',this.labels);
	}
};
</script>
