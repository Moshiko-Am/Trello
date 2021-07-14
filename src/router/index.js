import Vue from 'vue';
import VueRouter from 'vue-router';
import board from '@/views/board.details.vue';

Vue.use(VueRouter);

const routes = [
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
