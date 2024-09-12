<template>
  <view class="login-page-container">
    <view class="login-page-content">
      <u-toast ref="uToastRef"/>

      <view class="login-page-close" @click="back">
        <u-icon name="close" color="#2C405A" size="30"></u-icon>
      </view>
      <view class="login-page-image">
        <image src="../../static/logo.png" mode="aspectFill"></image>
        <text>{{ loginType === 0 ? '手机号登陆' : '账号登陆' }}</text>
      </view>
      <view class="login-page-info" v-if="loginType===0">首次登陆手机号将在验证后生成新账号</view>
      <view v-if="loginType===0" class="login-page-form">
        <view class="login-page-input">
          <input placeholder="请输入手机号" v-model="phone" @blur="checkPhoneNumber"></input>
        </view>

      </view>
      <view v-else class="login-page-form">
        <view class="login-page-input">
          <input placeholder="请输入用户名" v-model="userRef.username"></input>
        </view>
        <view class="login-page-input">
          <input placeholder="请输入密码" v-model="userRef.password" type="password"></input>
        </view>
      </view>
      <view class="login-page-code">
        <button @click="onSubmit">{{ loginType === 0 ? '获取短信验证码' : '登录' }}</button>
      </view>
      <view class="login-select" @click="changeLoginType">{{ loginType === 0 ? '用户名密码登陆' : '手机号登陆' }}</view>
      <view class="login-page-protocol">
        <u-checkbox v-model="protocolAgree" shape="circle"></u-checkbox>
        <view>我已阅读并同意<u class="login-page-protocol-text">用户协议</u>和<u
            class="login-page-protocol-text">用户协议</u>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";
import {loginByUsername} from "@/api/user";
import {Encrypt} from "@/utils/aes";
import {useUserStore} from "@/stores/user";
const userStore = useUserStore()

const uToastRef = ref(null);
const phone = ref('')
const showToast = (title, type, callback, duration) => {
  if (uToastRef.value) {
    uToastRef.value.show({
      duration: duration ? duration : 2000,
      title: title,
      type: type,
      callback: callback
    });
  }
};

const userRef = ref({
  username: '',
  password: ''
})

const loginType = ref(1)
const changeLoginType = () => {
  loginType.value = loginType.value === 0 ? 1 : 0
}

const list = [
  {
    name: 'apple',
    disabled: false
  },
  {
    name: 'banner',
    disabled: false
  },
  {
    name: 'orange',
    disabled: false
  }
]

function checkPhoneNumber() {
  if (!phone.value) {
    showToast('请输入手机号', 'error')
  }
  if (!(/^1[3456789]\d{9}$/.test(phone.value))) {
    showToast('手机号格式有误', 'error')
    return
  }
}

function onSubmit() {
  if (!protocolAgree.value) {
    showToast('请先同意用户协议', 'error')
    return
  }
  if (loginType.value == 0) {
    sendCodeAndJump()
    return
  }
  if (loginType.value === 1) {
    const data = {
      username: Encrypt(userRef.value.username),
      password: Encrypt(userRef.value.password)
    }
    userStore.login(data).then(()=>{
      showToast('登录成功', 'success', function () {
        uni.switchTab({
          url: '/pages/tabs/my'
        })
      }, 1000)
    })
  }
}

function sendCodeAndJump() {

  if (phone.value === '') {
    showToast('请输入手机号', 'error')
    return
  }
  if (!(/^1[3456789]\d{9}$/.test(phone.value))) {
    showToast('手机号格式有误', 'error')
    return
  }
  showToast("短信发送成功", 'success', function () {
    uni.navigateTo({
      url: '/pages/login/code?phone=' + phone.value
    })
  }, 1000)
}

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
const r = ref(0)
const radioGroupChange = (e) => {
  console.log(e)
}
const protocolAgree = ref(false)
</script>


<style scoped lang="scss">
.login-page-form {
  margin-top: 80rpx;
}

.login-select {
  margin-top: 20rpx;
  display: flex;
  justify-content: flex-end;
  color: #343234;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}

.login-page-protocol {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
}

.login-page-protocol view {
  margin-left: -20rpx;
}

:deep(.u-radio__label) {
  font-size: 24rpx;
}

.login-page-protocol-text {

  color: #659ee6;
}

view {
  box-sizing: border-box;
}

.login-page-container {
  position: relative;
  background-color: rgba(245, 245, 245, 0.39);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 58rpx;
}

.login-page-content {
  margin: 0 37rpx;

}

.login-page-close {
  position: absolute;
  top: 70rpx;
  left: 50rpx;
}

.login-page-image {
  display: flex;
  align-items: center;
}

.login-page-image image {
  width: 83rpx;
  height: 83rpx;
}

.login-page-image text {
  font-size: 56rpx;
  font-weight: bold;
  color: #2C405A;
  margin-left: 22rpx;
}

.login-page-info {
  padding-top: 46rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #343234;
  letter-spacing: 2rpx;
}

.login-page-input {
  padding-top: 44rpx;
  border-bottom: 2rpx solid #dddcdc;
  padding-bottom: 18rpx;
}

.login-page-code {
  margin-top: 88rpx;
  height: 100rpx;
}

.login-page-code button {
  background-color: #337aff;
  color: #f1f1f1;
  font-weight: bold;
  letter-spacing: 2rpx;
  font-size: 33rpx;
  line-height: 100rpx;
}
</style>
