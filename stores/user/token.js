
const SetToken = (token) => {
    uni.setStorageSync('token', token)
}

const GetToken = () => {
    return uni.getStorageSync('token')
}