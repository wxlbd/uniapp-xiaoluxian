import axios from "axios";
import {useUserStore} from "@/stores/user";

const request = axios.create({
    baseURL: "http://testapp.xuexiluxian.cn",
});

request.interceptors.request.use(function (config) {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.Authorization = userStore.token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})


request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么/slider/getSliders
    return Promise.reject(error);
})

export default request