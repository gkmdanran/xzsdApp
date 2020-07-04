// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
Vue.prototype.$http=axios
Vue.use(Vant);
Vue.prototype.$http.defaults.baseURL = '/api'
axios.interceptors.request.use(config=>{
  if(window.sessionStorage.getItem('apptoken')){
    config.headers.Authorization=window.sessionStorage.getItem('apptoken')
    
  }
  return config
})
axios.interceptors.response.use(function (response) {
  if(response){
   
    if(response.data.code==401){
      window.sessionStorage.clear()
      router.push({
        path:'/'
      })   
    }
  }
  return response;
},function (error) {
  return Promise.reject(error);
  }
);




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
