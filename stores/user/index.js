import {defineStore} from "pinia";
import {loginByUsername} from "@/api/user";
import {getUserInfo} from "@/api/user";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            avatar: '',
            username: 'username',
            token: '',
            loginStatus: false
        }
    },
    actions: {
        async login(formData) {
            const res = await loginByUsername(formData)
            this.setToken(res.data.accessToken)
        },
        setUserInfo(data) {
            this.avatar = data.avatar
            this.username = data.username
            this.loginStatus = true
        },
        setToken(token) {
            this.token = token

        },
        logout() {
            this.$reset();
            uni.removeStorageSync('user')
        },
        async userInfo(formData) {
            const res = await getUserInfo()
            this.setUserInfo({
                avatar: res.data.data.avatar,
                username: res.data.data.nickName
            })
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user-store',
                storage: {
                    getItem(key) {
                        return uni.getStorageSync(key)
                    },
                    setItem(key, value) {
                        uni.setStorageSync(key, value)
                    },
                    removeItem(key) {
                        uni.removeStorageSync(key)
                    },
                }, // 你也可以选择 sessionStorage
            },
        ],
    },
})