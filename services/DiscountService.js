import { GET } from '../utils/Network';

export const GetDiscount = (id, onSuccess, onFailure) => {
	GET(`Discount/Details?orderId=${id}`, res => {
		onSuccess && onSuccess(res)
	}, err => {
		// Do something special if this request fails or ignore
		onFailure && onFailure(err)
	})
}