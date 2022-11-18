<template>
  <nav>
    <AppTopnav></AppTopnav>
    <app-header/>
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
import AppFooter from '../components/app-footer.vue'
import { useStore } from 'vuex'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import AppHeader from '@/components/app-header.vue'
export default {
  name: 'xtx-layout',
  components: { AppTopnav, AppFooter, AppHeaderSticky, AppHeader },
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
