// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios'; //主要為AJAX套件
import VueAxios from 'vue-axios'; //將它轉為VUE的套件
import Loading from 'vue-loading-overlay'; //增加使用者體驗 - 讀取中的效果製作
import 'vue-loading-overlay/dist/vue-loading.css'; //增加使用者體驗 - 讀取中的效果製作
import 'bootstrap';

import VueAwesomeSwiper from 'vue-awesome-swiper';
// import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import '../node_modules/swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper, /* { default options with global component } */);
// swiper.use([Navigation, Pagination, Autoplay]);


//建立訂單，驗證是否輸入表單
import { ValidationObserver, 
  ValidationProvider, 
  extend, 
  localize, 
  configure } from 'vee-validate';
//本地化
import TW from 'vee-validate/dist/locale/zh_TW.json';
localize('zh_TW', TW);
import * as rules from 'vee-validate/dist/rules';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency'


axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});


//Register is globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);



new Vue({
  // i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next);
  // ...
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path:'/login',
        })
      }
      });
  } else {
    next();
  }
})

