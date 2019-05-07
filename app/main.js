import Vue from 'nativescript-vue'
import CalendarView from 'nativescript-ui-calendar/vue'
Vue.use(CalendarView)
import App from './components/App'
import store from './store';
import {icon} from  './components/IconMap'
import {setCssFileName} from 'tns-core-modules/application'


setCssFileName('app.css')


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.config.silent = true
Vue.mixin({
  methods: {icon}
})


new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
