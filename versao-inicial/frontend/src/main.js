import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
  
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// temposrario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlJhbW9uIFJvZHJpZ3VlcyBkZSBPbGl2ZWlyYSIsImVtYWlsIjoicmFtb25yb2xpdmllaXJhIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2OTgwMjI2NywiZXhwIjoxNTcwMDYxNDY3fQ.8nXTC3GPyC-h265OLz9VEGgnj2lqgr9gLmvr9DWwxzQ'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')