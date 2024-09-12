<script setup>
const goSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search'
  })
}
</script>

<template>
  <view class="header-search">
    <view class="header-search-left" @click="goSearch">
      <view class="header-search-left-text" >
        <u-icon name="search" size="26"></u-icon>
        <text>搜索</text>
      </view>
      <view>
        <u-icon name="scan" size="26"></u-icon>
      </view>
    </view>
    <view >
      <u-icon name="chat" size="40"></u-icon>
    </view>
  </view>
</template>

<style scoped>
  .header-search {
    width: 100%;
    padding: 29rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f1f3;
  }

  .header-search-left {
    width: 570rpx;
    height: 61rpx;
    padding: 0 20rpx;
    background-color: rgba(240,241,243,0.39);
    opacity: 1;
    border-radius: 31rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-search-left-text {
    display: flex;
    align-items: center;
  }
  .header-search-left-text text {
    font-size: 25rpx;
    padding-left: 20rpx;
    font-weight: 400;
    color: #848f94;
  }

</style>