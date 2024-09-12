<template>
  <view class="page-container">
    <view class="my-header">
      <view class="my-header-icon">
        <image src="../../static/con.png" mode="aspectFill"></image>
        <image src="../../static/sh.png" mode="aspectFill"></image>
      </view>
      <view class="my-header-nickname">
        <view class="my-header-avatar">
          <image :src=" userStore.loginStatus?userStore.avatar:'../../static/avatar.png'" mode="aspectFill"></image>
        </view>
        <view class="my-header-login" @click="toLogin">
          <view class="my-header-login-text">{{ userStore.loginStatus ? userStore.username : '点击登录' }}</view>
          <view class="my-header-login-desc" v-if="userStore.loginStatus===false">登陆同步数据，学习更安心</view>
        </view>
      </view>
      <view class="my-header-vip">
        <view class="my-header-vip-left">
          <view>
            <image src="../../static/vip.png" mode="aspectFill"></image>
          </view>
          <view>VIP会员</view>
        </view>
        <view class="my-header-vip-middle">
          <view>开通小鹿线学习平台</view>
          <view>VIP会员尽享优质课程</view>
        </view>
        <view class="my-header-vip-right">
          <view>
            <view class="my-header-vip-btn">
              立即开通
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="my-menu">
      <view class="my-menu-list">
        <view class="menu-item">
          <view class="menu-info">
            <u-icon name="shopping-cart" size="40"></u-icon>
            <view class="menu-info-title">
              购物车
            </view>
          </view>
          <u-icon name="arrow-right" size="28" color="#919294"></u-icon>
        </view>
        <view class="menu-item">
          <view class="menu-info">
            <u-icon name="file-text" size="40"></u-icon>
            <view class="menu-info-title">
              我的订单
            </view>
          </view>
          <u-icon name="arrow-right" size="28" color="#919294"></u-icon>
        </view>
        <view class="menu-item">
          <view class="menu-info">
            <u-icon name="red-packet" size="40"></u-icon>
            <view class="menu-info-title">
              我的余额
            </view>
          </view>
          <u-icon name="arrow-right" size="28" color="#919294"></u-icon>
        </view>
        <view class="menu-item">
          <view class="menu-info">
            <u-icon name="gift" size="40"></u-icon>
            <view class="menu-info-title">
              电子兑换码
            </view>
          </view>
          <u-icon name="arrow-right" size="28" color="#919294"></u-icon>
        </view>
      </view>
      <view class="about-us">
        <view class="menu-item">
          <view class="menu-info">
            <u-icon name="info-circle" size="40"></u-icon>
            <view class="menu-info-title">
              关于我们
            </view>
          </view>
          <u-icon name="arrow-right" size="28" color="#919294"></u-icon>
        </view>
      </view>
      <view class="logout-btn" v-if="userStore.loginStatus" @click="userStore.logout">
        退出登陆
      </view>
    </view>
  </view>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {getUserInfo} from "@/api/user";
import {useUserStore} from "@/stores/user";
import {onShow} from '@dcloudio/uni-app'

const userStore = useUserStore()

const loginStatus = computed(() => userStore.loginStatus)
const userInfo = computed(() => userStore.info())
const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

onShow(() => {
  userStore.userInfo()
});
</script>


<style scoped lang="scss">
.page-container {
  box-sizing: border-box;
  height: calc(100vh - 50px);
  width: 100vw;
  background-color: rgba(245, 245, 245, 0.39);
}

.my-header-icon image {
  width: 42rpx;
  height: 42rpx;
  padding-top: 24rpx;
}

.my-header-icon image:nth-child(2) {
  margin-left: 42rpx;
  margin-right: 36rpx;
}

.my-header-icon {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.my-header-avatar {
  width: 108rpx;
  height: 108rpx;
  //padding-top: 24rpx;
}

.my-header-avatar image {
  width: 100%;
  height: 100%;
  border-radius: 54rpx;
}

.my-header-nickname {
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: 0 37rpx;
}

.my-header-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 27rpx;
}

.my-header-login-text {
  font-size: 38rpx;
  font-weight: bold;
  color: #343234;
}

.my-header-login-desc {
  font-size: 24rpx;
  font-weight: 400;
  color: #919294;
  padding-top: 10rpx;
}

.my-header-vip {
  height: 167rpx;
  margin: 35rpx 37rpx 42rpx;
  background: url('../../static/me-bg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  font-size: 22rpx;
}

.my-header-vip-btn {
  background: url("../../static/vip-button.png") no-repeat;
  background-size: 100% 100%;
  width: 163rpx;
  height: 58rpx;
  text-align: center;
  line-height: 58rpx;
  color: #2C405A;
  font-size: 28rpx;
}

.my-header-vip-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.my-header-vip-left:after {
  position: absolute;
  content: '';
  width: 4rpx;
  height: 58rpx;
  background-color: #ffffff;
  top: 50%;
  margin-top: -29rpx;
  right: -25rpx;
}

.my-header-vip-left image {
  width: 79rpx;
  height: 57rpx;
}

.my-header-vip-middle:first-child {
  font-size: 24rpx;
  font-weight: 400;

}

.my-header-vip-middle:last-child {
  margin-top: 4rpx;
  font-size: 28rpx;
  font-weight: 400;
}

.my-header-vip-right {
  text-align: center;
}

.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28rpx;
  font-weight: 400;
  color: #343234;
  justify-content: space-between;
  height: 100rpx;
  padding: 37rpx 30rpx;
  background-color: #ffffff;
  border-bottom: 3rpx solid #e8e8e8;
}

.my-menu {
  margin: 23rpx 37rpx 0;
}

.menu-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.menu-info-title {
  font-size: 28rpx;
  font-weight: 400;
  color: #343234;
  margin-left: 10rpx;
}

.about-us {
  margin-top: 23rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.my-menu-list {
  border-radius: 12rpx;
  overflow: hidden;
}

.logout-btn {
  height: 100rpx;
  background-color: #ffffff;
  font-size: 28rpx;
  margin-top: 126rpx;
  text-align: center;
  line-height: 100rpx;
  border-radius: 12rpx;
}
</style>
