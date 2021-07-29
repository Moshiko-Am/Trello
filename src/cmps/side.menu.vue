<template>
	<section class="side-menu-container">
		<div class="side-menu-header">
			<h3>Menu</h3>
			<button class="icon-md icon-x" @click="closeMenu"></button>
		</div>
		<hr />
		<div class="side-menu-content">
			<div
				class="side-menu-item"
				v-if="board.style"
				@click="toggleBgMenu"
			>
				<img
					class="side-bar-bgc-img"
					:src="board.style.content"
					v-if="board.style.type === 'backgroundImage'"
				/>
				<span
					class="side-bar-bgc-img"
					:style="{ 'background-color': board.style.content }"
					v-else
				></span>
				<button class="btn-menu-change-background">
					Change background
				</button>
			</div>
			<div class="side-menu-item search-btn" @click="toggleFilterMenu">
				<span class="icon-md icon-search"></span>
				<span class="menu-search">
					Search Cards
				</span>
			</div>
			<div class="side-menu-item" v-if="board.style">
				<span class="icon-sm icon-activity"></span>
				<span class="menu-activity">
					Activity
				</span>
			</div>
			<div class="menu-activity-list" v-if="board.activities">
				<activity-preview class="activity-list" v-for="activity in board.activities" render="menu" :key="activity.id" :activity="activity" />
			</div>
		</div>
		<background-menu
			ref="bgMenu"
			@bgColor="bgColor"
			@chooseBg="chooseBg"
			@closeMenu="closeMenu"
			@menuBack="toggleBgMenu"
			class="hideBgMenu"
			:class="bgShowMenu"
		></background-menu>
		<filter-menu
		@closeMenu="closeMenu"
		@menuBack="toggleFilterMenu"
		:board="board"
		:class="{'show':isFilterShow}"
		@emitFilter="emitFilter"
		>
		</filter-menu>
	</section>
</template>

<script>
import activityPreview from './card-details-cmps/activity-preview.vue'
import backgroundMenu from './background.menu';
import filterMenu from './filter.menu';

export default {
	components: {
		filterMenu,
		backgroundMenu,
		activityPreview
	},
	props: {
		board: Object,
	},
	data() {
		return {
			isBgShow: false,
			isFilterShow : false,
		};
	},
	computed: {
		bgShowMenu() {
			return { showBgMenu: this.isBgShow };
		},
	},
	methods: {
		bgColor(style) {
			this.$emit('bgColor', style);
		},
		chooseBg(style) {
			this.$emit('chooseBg', style);
		},
		closeMenu() {
			this.$emit('closeMenu');
			this.isBgShow = false;
			this.isColorShow = false;
		},
		toggleBgMenu() {
			this.isBgShow = !this.isBgShow;
		},
		toggleFilterMenu() {
			this.isFilterShow = !this.isFilterShow;
		},
		emitFilter(filterBy){
			this.$emit('emitFilter', filterBy)
		}
	},
};
</script>
