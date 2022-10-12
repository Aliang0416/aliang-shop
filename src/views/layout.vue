<template>
  <nav>
    <AppTopnav></AppTopnav>
    <AppTop></AppTop>
  </nav>
  <AppHeaderSticky/>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>
    <AppFooter></AppFooter>
  </footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppTop from '@/components/app-top.vue'
import AppFooter from '../components/app-footer.vue'
import { useStore } from 'vuex'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
export default {
  name: 'xtx-layout',
  components: { AppTopnav, AppTop, AppFooter, AppHeaderSticky },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped  lang='less'>
.app-body {
  min-height: 600px;
}
</style>
