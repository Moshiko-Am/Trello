import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home.vue';
import board from '@/views/board.details.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: home,
	},
	{
		path: '/board/:boardId',
		name: 'Board',
		component: board,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
