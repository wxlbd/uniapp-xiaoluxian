<template>
  <view class="content">
    <Header></Header>
    <view class="home-tabs">
      <u-tabs-swiper ref="tabs1" :list="list" :current="current" @change="onTabChange" :is-scroll="true"
                     swiperWidth="750"></u-tabs-swiper>
    </view>
    <view class="home-swiper">
      <swiper :current="current" @animationfinish="animationFinish" @change="onSwiperItemChange" :indicator-dots="false"
              :style="'height:'+swiperHeight+'px;'">
        <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
          <scroll-view scroll-y="true" :style="'height:'+swiperHeight+'px;'" @scrolltolower="onScrollToLower">
            <keep-alive>
              <component :is="activeComponent" v-if="current === index"
                         :welcomeCourseList="welcomeCourseList"></component>
            </keep-alive>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>

  </view>
</template>

<script setup>
import Header from "../../components/common/Header.vue";
import Recommend from "../../components/home/recommend.vue";
import Free from "../../components/home/free.vue";
import Practical from "../../components/home/practical.vue";
import {onMounted, reactive, ref, shallowRef} from 'vue'
import {getCourseList} from "@/api/course";


const welcomeCourseList = ref([])

const getCourseListParam = {
  pageNum: 1,
  pageSize: 3,
  entity: {
    sortBy: "clicks-desc"
  }
}

getCourseList(getCourseListParam).then(function (res) {
  welcomeCourseList.value = res.data.pageInfo.list
})


const current = ref(1)
const tabs1 = ref()
const list = reactive([{
  name: '今日推荐'
}, {
  name: '免费课程'
}, {
  name: '实战课程',
}])

const getActiveComponent = () => {
  switch (current.value) {
    case 0:
      activeComponent.value = Recommend
      break
    case 1:
      activeComponent.value = Free
      break
    case 2:
      activeComponent.value = Practical
      break
  }

}
const activeComponent = shallowRef(getActiveComponent)

onMounted(function () {

  let searchHeight = 0
  let tabsHeight = 0
  //顶部搜索框高度
  let searchView = uni.createSelectorQuery().select(".header-search")
  searchView.boundingClientRect((data) => {
    searchHeight = data.height
  }).exec()
  //tabs高度
  let tabsView = uni.createSelectorQuery().select(".home-tabs")
  tabsView.boundingClientRect((data) => {
    tabsHeight = data.height
  }).exec()
  uni.getSystemInfo({
    success: function (res) {
      swiperHeight.value = (res.windowHeight - searchHeight - tabsHeight)
    }
  })
})
const swiperHeight = ref(0)

const onTabChange = (index) => {
  current.value = index
  getActiveComponent(index)
}
const animationFinish = (e) => {
  tabs1.value.setFinishCurrent(current);
  current.value = e.detail.current;
}
const onSwiperItemChange = (e) => {
  current.value = e.detail.current
  getActiveComponent(current.value)
}

// 触底加载更多
const onScrollToLower = () => {
  getCourseListParam.pageNum++
  getCourseList(getCourseListParam).then(res => {
    res.data.pageInfo.list.forEach(item => welcomeCourseList.value.push(item))
  })
  console.log('到底了', getCourseListParam.pageNum)

}

</script>

<style scoped>
.home-swiper {
  padding: 29rpx;
  //background-color: red;
  border-radius: 8rpx;
}

</style>
