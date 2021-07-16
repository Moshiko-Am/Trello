<template>
	<section class="background-menu-container">
		<div class="background-menu-header">
			<button class="icon-md icon-back" @click="menuBack"></button>
			<h3>Change background</h3>
			<button class="icon-md icon-x" @click="closeMenu"></button>
		</div>
		<hr />
		<div class="background-menu-content">
			<div class="background-menu-select">
				<div class="background-menu-option" @click="togglePhotosMenu">
					<img
						class="background-menu-img"
						src="@/assets/img/background-choose-photos.jpg"
						alt=""
					/>
					<span class="background-selection-txt">Photos</span>
				</div>
				<div class="background-menu-option">
					<img
						class="background-menu-img"
						src="@/assets/img/background-choose-colors.jpg"
						alt=""
					/>
					<span class="background-selection-txt">Colors</span>
				</div>
			</div>
		</div>
		<background-photos
			@closeMenu="closeMenu"
			class="hideImgMenu"
			:class="photosShowMenu"
			@photosBack="togglePhotosMenu"
		></background-photos>
	</section>
</template>

<script>
import backgroundPhotos from './background-photos';
export default {
	components: {
		backgroundPhotos,
	},
	data() {
		return {
			isPhotosShow: false,
		};
	},
	computed: {
		photosShowMenu() {
			return { showImgMenu: this.isPhotosShow };
		},
	},
	methods: {
		closeMenu() {
			this.$emit('closeMenu');
			this.isPhotosShow = false;
		},
		menuBack() {
			this.$emit('menuBack');
		},
		togglePhotosMenu() {
			this.isPhotosShow = !this.isPhotosShow;
		},
	},
};
</script>
