// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as _ from 'lodash'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: _.get(process.env, 'MY_GOOGLE_API_KEY'),
    libraries: 'places, directions',
    language: 'en'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
