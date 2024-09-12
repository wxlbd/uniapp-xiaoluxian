import request from "../utils/request";

export async function getNewCourseList(data) {
    return await request.post("/course/mostNew", data)
}

export async function getRecommendCourseList(data) {
    return await request.post("/course/mostHeat",data)
}

export async function getCourseList(data) {
    return await request.post("/course/search",data)
}