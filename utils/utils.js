 export function getCourseType(level) {
    let type = ''
    switch (level) {
        case 1:
            type = "初级"
            break;
        case 2:
            type = "中级"
            break;
        case 3:
            type = "高级"
            break;
        default:
            type = "未知"
            break;
    }
    return type
}