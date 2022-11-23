// 封装一个通用的方法实现数据的懒加载
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
/**
 * 懒加载
 */
export const useLazyData = (apiFn) => {
  // target表示组件的最外层div元素
  const target = ref(null)
  // 懒加载接口返回的数据
  const result = ref([])
  // 监听组件是否进入可视区
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    // 如果target对应的DOM进入可视区，那么该回调函数就触发
    if (isIntersecting) {
      // 被监听的DOM进入了可视区:此时调用接口获取数据；停止继续监听
      stop()
      apiFn().then(data => {
        result.value = data.result
      })
    }
  }, {
    threshold: 0
  }
  )
  // result表示接口懒加载获取的业务数据
  // target表示被监听的DOM元素，需要在模板中被ref属性绑定
  return { result, target }
}

/**
 * 支付倒计时函数
 */
export const usePayTime = () => {
  // 倒计时逻辑
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    if (time.value <= 0) {
      pause()
    }
  }, 1000, false)
  onUnmounted(() => {
    pause()
  })

  // 开启定时器 countdown 倒计时时间
  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }

  return {
    start,
    timeText
  }
}
