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
					@input="debounceFunc"
				/>
			</div>
			<div class="background-photos">
				<div
					@click="chooseBg(photo.urlBig)"
					class="photo-example"
					v-for="photo in photos"
					:key="photo.id"
				>
					<img :src="photo.urlSmall" />
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
			debounceFunc: null,
		};
	},
	methods: {
		closeMenu() {
			this.$emit('closeMenu');
		},
		photosBack() {
			this.$emit('photosBack');
		},
		debounce(func, wait = 1000) {
			let timeout;
			return function executedFunction(...args) {
				const later = () => {
					clearTimeout(timeout);
					func(...args);
				};

				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			};
		},
		async loadPhotos() {
			this.photos = await unsplashService.loadPhotos(this.photoSearch);
		},
		chooseBg(photoUrl) {
			this.$emit('updateBoard', {
				type: 'style',
				payload: { type: 'backgroundImage', content: photoUrl },
			});
		},
	},
	async created() {
		this.debounceFunc = this.debounce(this.loadPhotos);
	},
};
</script>
