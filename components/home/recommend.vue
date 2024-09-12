<script setup>
import {onMounted, ref} from "vue";
import request from "../../utils/request";
import {getCourseList, getNewCourseList, getRecommendCourseList} from "../../api/course";
import {getCourseType} from "@/utils/utils";
defineProps({
  welcomeCourseList: {
    type: Array,
    required: true,
    default: []
  }
})

const list = ref([])
onMounted(async function () {
  const res = await request.get("/slider/getSliders")
  list.value = res.data.list.map(item => item.imageUrl)
  console.log(res.data)
})

const newCourseList = ref([])
const recommendCourseList = ref([])
onMounted(function () {
  getRecommendCourseList({pageNum: 1, pageSize: 6}).then(res => {
    recommendCourseList.value = res.data.pageInfo.list
  })
  getNewCourseList({pageNum: 1, pageSize: 6}).then(res => {
    newCourseList.value = res.data.pageInfo.list
  })

})



</script>

<template>
  <view>
    <view class="swiper">
      <!--      轮播图-->
      <u-swiper :list="list" height="310" mode="rect" indicator-pos="bottomRight" border-radius="8"></u-swiper>
    </view>
    <!--    新上好课-->
    <view class="course">
      <view class="course-title">
        <view class="course-title-text">新上好课</view>
        <view class="course-title-more">查看更多</view>
      </view>
      <view class="course-list">
        <view class="course-item" v-for="item in newCourseList" :key="item.id">
          <view class="course-item-image" style="border-radius: 8rpx;background-color: red">
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
    <!--    推荐好课-->
    <view class="recommend-course">
      <view class="course-title">
        <view class="course-title-text">推荐好课</view>
        <view class="course-title-more">查看更多</view>
      </view>
      <view class="recommend-course-list">
        <scroll-view scroll-x="true" class="nav-bar">
          <view class="nav-bar-wrap">
            <block v-for="item in recommendCourseList" :key="item.id">
              <view class="nav-bar-item">
                <view class="nav-bar-item-image">
                  <image :src="item.courseCover" mode="aspectFill"></image>
                </view>
                <view class="nav-bar-item-info">
                  <view class="nav-bar-item-title">{{ item.courseName }}</view>
                  <view class="nav-bar-item-price-info" v-if="item.discountPrice===0">
                    <view class="nav-bar-item-sale-price">免费</view>
                  </view>
                  <view class="nav-bar-item-price-info" v-else>
                    <view class="nav-bar-item-sale-price">¥ {{ item.discountPrice }}</view>
                    <view class="nav-bar-item-original-price">¥ {{ item.salePrice }}</view>
                  </view>
                  <view class="nav-bar-item-text">限时优惠</view>
                </view>
              </view>
            </block>
          </view>
        </scroll-view>
      </view>
    </view>
    <!--    大家都在看-->
    <view class="course">
      <view class="course-title">
        <view class="course-title-text">大家都在看</view>
      </view>
      <view class="course-list">
        <view class="course-item" v-for="item in welcomeCourseList " :key="item.id">
          <view class="course-item-image" style="border-radius: 8rpx;background-color: red">
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
.nav-bar-item-price-info {
  display: flex;
  //justify-content: space-between;
  align-items: center;
  padding: 4rpx 0;
}

.nav-bar-item-info {
  padding: 12rpx;
}

.nav-bar-item-image image {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.nav-bar-item-sale-price {
  font-size: 22rpx;
  font-weight: 500;
  color: #ff0018;
}

.nav-bar-item-original-price {
  font-size: 18rpx;
  font-weight: 400;
  text-decoration: line-through;
  color: #7b7b7b;
  margin-left: 16rpx;
}

.nav-bar-item-title {
  //width: 146rpx;
  //height: 28rpx;
  font-size: 21rpx;
  color: #7b7b7b;
}

.nav-bar-item-text {
  font-size: 19rpx;
  color: #ff6464;
}

.nav-bar-item-image {
  width: 265rpx;
  height: 160rpx;
  border-radius: 12rpx;
  background-color: red;
}

.nav-bar-wrap {
  display: flex;
  flex-flow: column wrap;
  height: 632rpx;
}

.nav-bar-item {
  height: 286rpx;
  width: 265rpx;
  margin-top: 28rpx;
  margin-right: 17rpx;
  background: rgba(255, 255, 255, 0.39);
  box-shadow: 1px 3px 3px rgba(27, 39, 94, 0.1);
  border-radius: 12px;
}

.recommend-course {
  margin-top: 40rpx;
}

.course-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40rpx;
}

.course-title-text {
  font-size: 40rpx;
  font-weight: 400;
  color: #333333;
}

.course-title-more {
  font-size: 26rpx;
  font-weight: 400;
  color: #A0A4AD;
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

.course-title-text {
  font-size: 40rpx;
  font-weight: 400;
  color: #333333;
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