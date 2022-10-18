import { createRouter, createWebHashHistory } from 'vue-router'
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home/index')
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index')
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

export default router
