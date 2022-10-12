<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏"></HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹"></HomePanel>
    <!-- 猜你 -->
    <!-- <GoodsRelevant /> -->
  </div>
</template>
<script>
import HomeOverview from './components/home-overview'
import HomePanel from './components/home-panel'
// import GoodsRelevant from '@/views/goods/components/goods-relevant'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel
    // GoodsRelevant
  }
}
</script>
<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>