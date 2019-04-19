import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store';
import {icon} from  './components/IconMap'


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.mixin({
  methods: {icon}
})


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
