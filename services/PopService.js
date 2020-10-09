import { GET } from '../utils/Network';

export const SeenPop = (id, onSuccess, onFailure) => {
    GET(`Popup/seen?Id=${id}`, res => {
        onSuccess && onSuccess(res)
    }, err => {
        onFailure && onFailure(err)
    })
}