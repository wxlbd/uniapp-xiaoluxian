<template>
  <view class="code-container">
    <u-navbar :border-bottom="false"></u-navbar>
    <view class="code-content">
      <view class="code-title">输入六位验证码</view>
      <view class="code-info">
        <view>
          验证码已发送至 {{ phone }}
        </view>
        <view>
          {{ seconds }} 秒后重发
        </view>
      </view>
      <view class="code-input">
        <u-message-input mode="box" maxlength="6"></u-message-input>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";

const phone = ref('')
onMounted(() => {
  phone.value = getCurrentInstance().attrs.phone
  countdownTimer()
})

const seconds = ref(60)
const countdownTimer = setInterval(function () {
  seconds.value--;
  if (seconds.value <= 0) {
    clearInterval(countdownTimer); // 停止计时器

  }
}, 1000); // 1000毫秒 = 1秒

</script>


<style scoped lang="scss">
.code-container {
  background-color: rgba(255, 255, 255, 0.39);
  height: 100vh;
  width: 100vw;
}

.code-title {
  font-size: 46rpx;
  font-weight: bold;
}

.code-content {
  display: flex;
  flex-direction: column;
  margin: 40rpx 37rpx 0;
}

.code-info {
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #343234;
  margin-top: 40rpx;
  opacity: 0.53;
}

.code-input {
  margin-top: 83rpx;
}
</style>
