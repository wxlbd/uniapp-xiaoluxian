<script setup>
import {onMounted, ref} from "vue";
import {getCourseList} from "@/api/course";
import {getCourseType} from "@/utils/utils";

const courseList = ref([])
const getFreeCourseParam = {
  pageNum: 1,
  pageSize: 6,
  entity: {
    isFree: 1
  }
}

const current = ref(1)

const onFilterChange = (key) => {
  current.value = key
  if (key === 1) {
    getFreeCourseParam.entity.sortBy = ""
  } else if (key === 2) {
    getFreeCourseParam.entity.sortBy = "time-desc"
  } else if (key === 3) {
    getFreeCourseParam.entity.sortBy = "clicks-desc"
  }
  getCourseList(getFreeCourseParam).then(function (res) {
    courseList.value = res.data.pageInfo.list
  })
}

const jumpToCourseDetail = (courseId) => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${courseId}`
  })
}

onMounted(function () {
  getCourseList(getFreeCourseParam).then(function (res) {
    courseList.value = res.data.pageInfo.list
  })
})

const filterList = [
  {"name": "综合推荐", "key": 1},
  {"name": "最新", "key": 2},
  {"name": "浏览最多", "key": 3},
]
</script>

<template>
  <view class="free-filter">
    <view class="free-filter-item" v-for="item in filterList" :key="item.key"
          :class="current===item.key?'free-filter-item-active':''" @click="onFilterChange(item.key)">
      {{ item.name }}
    </view>
  </view>
  <view class="free-list">
    <view class="course">
      <view class="course-list">
        <view class="course-item" v-for="item in courseList " :key="item.id" @click="jumpToCourseDetail(item.id)">
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
</template>

<style scoped>
.free-filter {
  display: flex;
  //justify-content: space-between;
  align-items: center;
}

.free-filter-item {
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #A0A4AD;
  font-weight: 400;
}

.free-filter-item-active {
  color: #000000;
  font-weight: 500;
}

.course-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40rpx;
}

.course-item:after {
  position: absolute;
  bottom: -20rpx;
  margin-top: 25rpx;
  content: '';
  width: 100%;
  border-bottom: 1px solid #000000;
  opacity: 0.15;
}

.course-item-image {
  width: 237rpx;
  height: 186rpx;
  background-color: red;
  border-radius: 8rpx;
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