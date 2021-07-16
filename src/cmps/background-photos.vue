<template>
	<section class="background-photos-container">
		<div class="background-photos-header">
			<button class="icon-md icon-back" @click="photosBack"></button>
			<h3>Photos by Unsplash</h3>
			<button class="icon-md icon-x" @click="closeMenu"></button>
		</div>
		<hr />
		<div class="background-photos-content">
			<div class="photos-input-container">
				<span class="icon-sm icon-search"></span>
				<input
					type="text"
					v-model="photoSearch"
					placeholder="Photos"
					class="photos-input-search"
				/>
			</div>
			<div class="background-photos">
				<div
					class="photo-example"
					v-for="photo in photos"
					:key="photo.id"
				>
					<img :src="photo.url" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { unsplashService } from '../services/unsplash.service.js';
export default {
	data() {
		return {
			photoSearch: '',
			photos: [],
		};
	},
	methods: {
		closeMenu() {
			this.$emit('closeMenu');
		},
		photosBack() {
			this.$emit('photosBack');
		},
	},
	async created() {
		this.photos = await unsplashService.loadPhotos('random');

		console.log(this.photos);
	},
};
</script>
