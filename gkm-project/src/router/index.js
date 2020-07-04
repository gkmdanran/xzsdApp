import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import register from '@/components/register'
import homepage from '@/components/homepage'
import kinds from '@/components/kinds'
import shopcar from '@/components/shopcar'
import mine from '@/components/mine'
import homes from '@/components/homes'
import invite from '@/components/invite'
import password from '@/components/password'
import orders from '@/components/orders'
import orderdetails from '@/components/orderdetails'
import bookdetail from '@/components/bookdetail'
import comments from '@/components/comments'
import remark from '@/components/remark'
Vue.use(Router)
const originalPush = Router.prototype.push 
Router.prototype.push = function push(location) { 
  return originalPush.call(this, location).catch(err => err) 
}
var router= new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
      redirect:'homes',
      children:[
        {
          path: '/homes',
          name: 'homes',
          component: homes
        },
        {
          path: '/kinds',
          name: 'kinds',
          component: kinds
        },
        {
          path: '/shopcar',
          name: 'shopcar',
          component: shopcar
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine
        },
      ]
    },
    {
      path: '/invite',
      name: 'invite',
      component: invite
    },
    {
      path: '/password',
      name: 'password',
      component: password
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    },
    {
      path: '/orderdetails',
      name: 'orderdetails',
      component: orderdetails
    },
    {
      path: '/bookdetail',
      name: 'bookdetail',
      component: bookdetail
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/remark',
      name: 'remark',
      component: remark
    },
  ]
})
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next()直接放行 next('/login)强制跳转到login
  if(to.path=="/")return next();
  if(to.path=="/register")return next();
  const tokenStr=window.sessionStorage.getItem('apptoken')
  if(!tokenStr) return next("/")
  next()
})
export default router
