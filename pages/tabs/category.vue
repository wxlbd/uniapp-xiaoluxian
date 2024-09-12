<template>
  <view>
    <Header></Header>
    <view class="category-container">
      <view class="category-left">
        <view v-for="(item, index) in firstCategoryList" :key="item.id" :class="firstCateIndex===index?'active':''"
              @click="onFirstCateClick(index)">
          {{ item.categoryName }}
        </view>
      </view>
      <view class="category-right">
        <view class="category-right-ad-img">
          <image src="../../static/banner.d093dd6e.png"></image>
        </view>
        <scroll-view scroll-y="true" :style="'height:'+scrollViewHeight+'rpx'">

          <view class="second-category">
            <view class="second-category-item" v-for="item in secondCategoryList" :key="item.id">
              <image :src="item.thumbnail"></image>
              <text>{{ item.categoryName }}</text>
            </view>
          </view>
        </scroll-view>

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import {getFirstCategoryList, getSecondCategoryList} from "@/api/category";
import {onMounted, ref} from "vue";

const firstCategoryList = ref([
  {
    categoryName: "全部",
    id: -1
  }
])
const firstCateIndex = ref(0)
const secondCategoryList = ref([])

const scrollViewHeight = ref(0)

onMounted(function () {

  let searchHeight = 0
  let tabsHeight = 0
  //顶部搜索框高度
  let searchView = uni.createSelectorQuery().select(".header-search")
  searchView.boundingClientRect((data) => {
    searchHeight = data.height
    console.log(searchHeight)
  }).exec()
  //tabs高度
  let tabsView = uni.createSelectorQuery().select(".category-right-ad-img")
  tabsView.boundingClientRect((data) => {
    tabsHeight = data.height
  }).exec()
  uni.getSystemInfo({
    success: function (res) {
      console.log(res.windowHeight - searchHeight)
      scrollViewHeight.value = (res.windowHeight - searchHeight - tabsHeight - 15) * 2
    }
  })

  getFirstCategoryList().then(function (res) {
    firstCategoryList.value = [...firstCategoryList.value, ...res.data.list]
  })
  getSecondCategoryList({categoryId: -1}).then(function (res) {
    secondCategoryList.value = res.data.list
  })
})

const onFirstCateClick = (index) => {
  firstCateIndex.value = index
  getSecondCategoryList({categoryId: firstCategoryList.value[index].id}).then(function (res) {
    secondCategoryList.value = res.data.list
  })
}
</script>


<style scoped lang="scss">
.category-container {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 0;
}

.category-left {
  text-align: center;
  font-size: 28rpx;
  width: 217rpx;
  display: flex;
  flex-direction: column;
  background-color: rgba(247, 249, 255, 0.39);
  color: #777777;
  line-height: 77rpx;
}

.category-right {
  flex: 1;
}

.category-right {
  display: flex;
  flex-direction: column;
}

.category-right-ad-img {
  display: flex;

  padding: 0 34rpx;
}

.category-right-ad-img image {
  width: 479rpx;
  height: 192rpx;
  border-radius: 17rpx;
}

.second-category {
  display: flex;
  flex-wrap: wrap;
}

.second-category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.33333%;
  margin-top: 44rpx;
}

.second-category-item image {
  height: 83rpx;
  width: 83rpx;
}

.second-category-item text {
  font-size: 24rpx;
  color: #a9a9a9;
}

.active {
  position: relative;
  color: #3780ef;
  font-weight: 500;
}

.active:before {
  position: absolute;
  content: '';
  top: 50%;
  display: block;
  width: 6rpx;
  height: 26rpx;
  background-color: #3780ef;
  margin-right: 10rpx;
  transform: translateY(-50%);
}

:deep(.uni-scroll-view) {
  margin-top: 15rpx;
}
</style>
