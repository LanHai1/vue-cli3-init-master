import {
    _getBrah
} from './brahmaHttp.js'

export const testHttp = ({
    fnRes
}) => {
    return _getBrah({
        url: `/dealer-user/getScore`,
        fnRes
    })
}