import request from "@/utils/request";
export function getFirstCategoryList(data) {
    return request.get("/course/category/getFirstCategorys",{
        params: data
    })
}


export function getSecondCategoryList(data) {
    return request.get("/course/category/getSecondCategorys",{
        params: data
    })
}

