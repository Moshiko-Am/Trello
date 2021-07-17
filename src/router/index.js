import Vue from 'vue';
import VueRouter from 'vue-router';
import board from '@/views/board.details.vue';
import boards from '@/cmps/board.list.vue';
import canvasCmp from '@/cmps/card-details-cmps/canvas.cmp'
import VueKonva from "vue-konva";

Vue.use(VueRouter);
Vue.use(VueKonva);

const routes = [{
        path: '/',
        name: 'Home',
        component: board,
    },
    {
        path: '/boards',
        name: 'Boards',
        component: boards,
    },
    {
        path: '/canvas',
        name: 'Canvas',
        component: canvasCmp,
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