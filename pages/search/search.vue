<template>
  <view>
    <u-navbar back-text="返回">
      <view>
        <u-search placeholder="请输入搜索内容" v-model="keyword" @search="onSearch" :show-action="false"
                  :clearabled="false" :height="48" :focus="true" style="width: 500rpx"></u-search>
      </view>
      <view slot="right" class="search-action" @click="onSearch">
        搜索
      </view>
    </u-navbar>
    <view class="search-content">
      <view class="search-history">
        <view class="search-history-title">
          <view class="search-history-title-text">历史搜索</view>
          <u-icon name="trash" @click="showModal" size="28"></u-icon>
        </view>
        <view v-if="searchHistoryRef.length===0">
          <u-empty mode="history" style="margin-top: 20rpx"></u-empty>
        </view>
        <view v-else>
          <u-modal v-model="modalShowRef"
                   :show-cancel-button="true"
                   content="删除后不可恢复！"
                   :async-close="false" title="您确定要删除搜索历史吗？"
                   @confirm="clearHistory"
          ></u-modal>

          <view class="search-history-list">
            <view v-for="(item,index) in searchHistoryRef" :key="index" @click="onHistoryClick(item)">
              {{ item }}
            </view>
          </view>
        </view>
      </view>

      <view class="search-hot">
        <view class="search-hot-title">
          <u-icon name="search" size="28"></u-icon>

          <view class="search-hot-title-text">热门搜索</view>
        </view>
        <u-line style="padding: 25rpx 0;width: 100%;"/>
        <view class="search-hot-list">
          <view>
            uniapp
          </view>
          <view>
            golang
          </view>
          <view>
            vue
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const searchHistoryRef = ref([])
onMounted(function () {
  // 尝试从本地存储中获取searchHistory
  const rawSearchHistory = uni.getStorageSync('searchHistory');
  if (!rawSearchHistory==="") {
    searchHistoryRef.value = JSON.parse(rawSearchHistory)
  }
})

const keyword = ref('')

const onHistoryClick = (item) => {
  console.log(item)
  keyword.value = item
  onSearch()
}


const onSearch = () => {
  if (!keyword.value) {
    return;
  }
  console.log(searchHistoryRef.value)
  const index = searchHistoryRef.value.indexOf(keyword.value)
  if (index < 0) {
    searchHistoryRef.value.unshift(keyword.value)
    uni.setStorageSync('searchHistory', JSON.stringify(searchHistoryRef.value))
  }
  if (index > 0) {
    searchHistoryRef.value.unshift(searchHistoryRef.value.splice(index, 1)[0])
    uni.setStorageSync('searchHistory', JSON.stringify(searchHistoryRef.value))
  }
  // 跳转到搜索结果页面
  uni.navigateTo({
    url: `/pages/search/search-list?keyword=${keyword.value}`
  })
}

const modalShowRef = ref(false)

const showModal = () => {
  if (searchHistoryRef.value.length === 0) {
    return
  }
  modalShowRef.value = true
}
const clearHistory = () => {
  modalShowRef.value = true
  searchHistoryRef.value = []
  uni.removeStorageSync('searchHistory')
  modalShowRef.value = false
}
</script>

<style scoped>
:deep(.u-slot-content) {

  justify-content: space-evenly;
}

.search-content {
  padding: 33rpx;
  overflow: visible;
}

.search-history {
  margin-bottom: 33rpx;
}

.search-history-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-history-title-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #636363;
}

.search-history-list {
  padding-top: 33rpx;
  display: flex;
  flex-wrap: wrap;
}

.search-history-list > view {
  padding: 5rpx 10rpx;
  background-color: #dddddd;
  margin: 10rpx;
  border-radius: 5rpx;
}

.search-hot-title {
  display: flex;
}

.search-hot-title-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #636363;
}

.search-hot-list {
  display: flex;
  flex-wrap: wrap;
}

.search-hot-list > view {
  padding-top: 33rpx;
  width: 50%;
}

</style>
