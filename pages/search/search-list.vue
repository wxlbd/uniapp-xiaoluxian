<template>
  <view>
    <u-navbar back-text="" :is-fixed="false" class="search-navbar">
      <template v-slot:default>
        <view class="content-left">
          <text>{{ keyword }}</text>
        </view>
      </template>
      <template v-slot:right>
        <view class="content-right" style="width: 100rpx">
          <u-icon name="search" size="35"></u-icon>
          <u-icon name="shopping-cart" size="35"></u-icon>
        </view>
      </template>
    </u-navbar>
    <view class="course-list-content">
      <view class="course-filter">
        <view v-for="item in filterList" :key="item.key" class="course-filter-item"
              :class="currentKey===item.key?'course-filter-item-active':''" @click="onFilterChange(item.key)">
          {{ item.name }}
        </view>
      </view>
      <scroll-view :scroll-y="true" :style="'height:'+scrollHeight+'rpx'" style="margin-top: 20rpx"
                   @scrolltolower="onScrollToLower">
        <view class="free-list">
          <view class="new-course">
            <view class="course-list">
              <view class="course-item" v-for="item in courseList " :key="item.id">
                <view class="course-item-image" style="border-radius: 8rpx;">
                  <image :src="item.courseCover" mode="aspectFill"></image>
                </view>
                <view class="course-item-info">
                  <view class="course-item-title">
                    {{ item.courseName }}
                  </view>
                  <view class="course-item-type">
                    {{ getCourseType(item.courseLevel) }}
                  </view>
                  <view class="course-item-price-info">
                    <view class="course-item-price" v-if="item.discountPrice===0">
                      <view>免费</view>
                    </view>
                    <view class="course-item-price" v-else>
                      <view>限时优惠</view>
                      <view>¥{{ item.discountPrice }}</view>
                    </view>
                    <view class="course-item-studied">
                      {{ item.purchaseCounter }}人学习
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, onMounted, ref} from "vue";
import {getCourseType} from "@/utils/utils";
import {getCourseList} from "@/api/course";

const currentKey = ref("")
const courseList = ref([])
const ins = getCurrentInstance()
const keyword = ref()
const filterObj = {
  pageNum: 1,
  pageSize: 10,
  entity: {
    sortBy: currentKey.value,
    courseName: keyword.value
  }
}
const onScrollToLower = () => {
  filterObj.pageNum++
  getCourseList(filterObj).then(function (res) {
    courseList.value = courseList.value.concat(res.data.pageInfo.list)
  })
}
onBeforeMount(() => {
  keyword.value = ins.attrs.keyword
  filterObj.entity.courseName = keyword.value
})

function assignCourseList() {
  getCourseList(filterObj).then(function (res) {
    courseList.value = res.data.pageInfo.list
  })
}

const scrollHeight = ref(0)
let navHeight = 0
let filterHeight = 0
onMounted(() => {
  assignCourseList();
  uni.createSelectorQuery().select(".search-navbar").boundingClientRect(function (params) {
    navHeight = params.height

  }).exec()

  uni.createSelectorQuery().select(".course-filter").boundingClientRect(function (params) {
    filterHeight = params.height

  }).exec()
  uni.getSystemInfo({
    success: function (res) {
      scrollHeight.value = (res.windowHeight - navHeight - filterHeight - 10) * 2
    }
  })
})
const filterList = ref([
  {
    name: "综合",
    key: ""
  },
  {
    name: "最新",
    key: "time-desc"
  },
  {
    name: "浏览最多",
    key: "clicks-desc"
  }
])

const onFilterChange = (key) => {
  currentKey.value = key
  filterObj.entity.sortBy = key
  assignCourseList()
}

</script>


<style scoped>

:deep(.u-slot-content) {
  justify-content: space-around;
}

.course-list-content {
  padding: 20rpx 33rpx 0;
}

.content-right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.content-left {
  font-size: 38rpx;
}

.course-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.course-filter-item {
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #A0A4AD;
  font-weight: 400;
}

.course-filter-item-active {
  color: #007aff;
  font-weight: 800;
}

.course-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1px solid #e8e8e8;
}

.course-item-image {
  width: 237rpx;
  height: 186rpx;
  border-radius: 12rpx;
}

.course-item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 23rpx;
  flex: 1;
  height: 186rpx;
}

.course-item-type {
  font-size: 24rpx;
  font-weight: 400;
  color: #c5c5c5;
}

.course-item-price-info {
  display: flex;
  justify-content: space-between;
  //align-items: center;
}

.course-item-price {
  display: flex;
  justify-content: space-between;
  font-size: 21rpx;
  font-weight: 600;
  color: rgb(255, 75, 92);
}

.course-item-price view:nth-child(2) {
  padding-left: 21rpx;
}

.course-item-studied {
  font-size: 21rpx;
  font-weight: 400;
  color: #C5C5C5;
}

.course-item-image image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}
</style>
