import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import '@/styles/styles.scss';
import locale from 'element-ui/lib/locale/lang/en'
import VueKonva from 'vue-konva';
Vue.use(ElementUI, { locale });
Vue.use(VueKonva);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');