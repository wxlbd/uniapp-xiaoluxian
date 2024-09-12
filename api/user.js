import request from "@/utils/request";

export async function loginByUsername(data) {
    return await request.post("/u/loginByJson", data)
}

export async function getUserInfo(data) {
    return await request.get("/member/getInfo", data)
}