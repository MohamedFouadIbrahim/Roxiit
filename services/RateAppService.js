import { POST } from "../utils/Network"

export const RateApp = (data, onSuccess, onFailure) => {
    POST(`Customer/Rate`, data, res => {
        onSuccess && onSuccess(res)
    }, err => {
        onFailure && onFailure(err)
    })
}