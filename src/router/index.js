import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home/index')
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')
const PayCheckout = () => import('@/views/member/pay/checkout.vue')
const PayIndex = () => import('@/views/member/pay/index')
const PayResult = () => import('@/components/pay/pay-result.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/', component: Home
      },
      {
        path: '/category/:id', component: TopCategory
      },
      {
        path: '/category/sub/:id', component: SubCategory
      },
      {
        path: '/product/:id', component: Goods
      },
      {
        path: '/cart', component: Cart
      },
      {
        path: '/member/checkout', component: PayCheckout
      },
      {
        path: '/member/pay', component: PayIndex
      },
      {
        path: '/member/order/:id', component: PayResult, props: true
      },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome }
        ]
      }
    ]
  },
  { path: '/login', component: Login }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
