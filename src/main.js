import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import '@/styles/styles.scss';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
