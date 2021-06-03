import Vue from 'vue'
import App from './App'

import store from './store';
import dayjs from './libs/dayjs';
import filter from '@/libs/filter';
import util from './libs/util';
import ajax from './libs/ajax';
import appApi from './libs/app-api';
import uView from './uview-ui';
import formChecker from './libs/form-checker';

import '@/libs/zh-cn'
dayjs.locale('zh-cn');

Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
});

Vue.prototype.$formChecker = formChecker;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$util = util;
Vue.prototype.$store = store;

Vue.use(uView);
Vue.mixin(ajax);
Vue.mixin(appApi);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
