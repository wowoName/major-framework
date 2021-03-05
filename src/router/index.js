import { createRouter, createWebHashHistory } from 'vue-router'
// import store from '../store'
//路由切换进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: 'main',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found.vue'),
    meta: {
      title: '404',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
/**添加路由守卫 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // //用户信息未存储
  // console.log('跳转',!store.getters['user/userName'])
  // if(!store.getters['user/userName']&& to.path!=='/login'){
  //   //存储了信息
  //   let userInfos=sessionStorage.getItem('teyiting')
  //   if(!!userInfos){
  //     //进行登录
  //     store.dispatch('user/DO_LOGIN',JSON.parse(userInfos))
  //     next()
  //   }else{
  //     next('/login')
  //   }
  // }else{
  //   next()
  // }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
