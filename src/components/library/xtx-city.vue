<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span @click="changeItem(i)" class="ellipsis" v-for="i in currList" :key="i.code">{{i.name}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: ''
})
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    const openDialog = () => {
      active.value = true
      loading.value = true
      getCityData().then(data => {
        cityData.value = data
        loading.value = false
      })
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const closeDialog = () => {
      active.value = false
    }
    // 切换展开收起
    const toggleDialog = () => {
      active.value ? closeDialog() : openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      closeDialog()
    })
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        closeDialog()
        emit('change', changeResult)
      }
    }
    return { active, toggleDialog, target, loading, currList, changeItem }
  }
}
// 获取城市数据
const getCityData = () => {
  // 这个位置可能有异常操作，封装成promise
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
// 获取城市数据,显示当前地方列表
const loading = ref(false)
const cityData = ref([])
// 定义计算属性
const currList = computed(() => {
  // TODO 根据点击的省份城市获取对应的列表
  // 省份
  let currList = cityData.value
  // 城市
  if (changeResult.provinceCode) {
    currList = currList.find(p => p.code === changeResult.provinceCode).areaList
  }
  // 地区
  if (changeResult.cityCode) {
    currList = currList.find(c => c.code === changeResult.cityCode).areaList
  }
  return currList
})

</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/load.gif) no-repeat center;
    }
  }
}
</style>