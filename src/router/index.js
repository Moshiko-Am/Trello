import Vue from 'vue';
import VueRouter from 'vue-router';
import board from '@/views/board.details.vue';
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