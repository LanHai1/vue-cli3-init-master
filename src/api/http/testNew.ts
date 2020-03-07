import { _getBrah } from "./projectHttp"

// export const testHttp = ({
//     (fnRes:any)
// }) => {
//     return _getBrah({
//         url: `/dealer-user/getScore`,
//         fnRes
//     })
// }

export function testHttp(obj: any): any {
    const fnRes = obj.fnRes
    return _getBrah({
        url: `/dealer-user/getScore`,
        fnRes
    })
}